import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "book_notes",
    password: "",
    port: 5432,
  });
  db.connect();
  let items=[];
app.get("/",async(req,res)=>{
    try{
     const result = await db.query("SELECT * FROM book_info");
     items = result.rows;
     console.log(result.rows);
     res.render("main.ejs",{items:items});
    }catch(err){
        console.log(err);
    }
});

app.get("/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/submit",async(req,res)=>{
  const isbn = req.body.isbn;
  const author = req.body.author;
  const title = req.body.title;
  const summary = req.body.textarea;
  
  try{
    const result = await axios.get(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`);
    const url = result.config.url;
    console.log (result.config.url);
   
    await db.query("Insert INTO book_info (isbn,author,title,summary,url) values($1,$2,$3,$4,$5)",[isbn,author,title,summary,url]);
    res.redirect("/");
    }catch(err){
        console.log(err);
    }
})
app.post("/update",async(req,res)=>{
  const isbn = req.body.isbn;
  const result = (await db.query("SELECT * FROM book_info")).rows;
  
  const author = req.body.author || result[0].author;
  const title = req.body.title || result[0].title;
  const summary = req.body.textarea || result[0].summary;
  await db.query("UPDATE book_info SET author=($1),title=($2),summary=($3) where isbn= $4",
    [author,title,summary,isbn]
  );
  res.redirect("/");
});

app.post("/delete",async(req,res)=>{
    const isbn = req.body.isbn;
    await db.query("DELETE from book_info where isbn=($1)",[isbn]);
    res.redirect("/");
})

app.listen(port,()=>{
    console.log(`Server listen at port: ${port}`);
});