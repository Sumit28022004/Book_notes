
# BookNotes

Discover a new way to connect with your reading material through BookNotes. Our platform is designed to help you capture, organize, and reflect on your literary experiences.


## Firstly do this after cloning the project

* Check the details(listed below) and fill them according to your database in (index.js)file.
const db = new pg.Client({

    user: "postgres" /*default on installing postgres SQL*/,
    host: "localhost",
    database: "book_notes"  /*database name*/,
    password: "" /*password of your database*/,
    port: 5432  /*port on which your database run*/,
  
  });

* create table ->

CREATE TABLE book_info(

	id serial primary key,
	isbn bigint,
	author varchar(50),
	title char(100),
	summary text,
	url text
);
  




## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd 'path to the project directory'
```

Install dependencies

```bash
  npm init
```
```bash
  npm i -y
```

Start the server

```bash
  nodemon index.js
```


## Tech Stack

**Client:** ejs, CSS

**Server:** Node, Express, pg, ejs , body-parser

**API:** https://openlibrary.org/dev/docs/api/covers
