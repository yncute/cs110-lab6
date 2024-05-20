const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

//where books are kept
let books = [];

app.use(cors());

//configuring body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/books", (req, res) => {
  const book = req.body;

  console.log(book);
  books.push(book);

  //res.send("Book added to database");
  //("");
});

app.post("/books/:isbn", (req, res) => {
  //reading isbn from url
  const isbn = req.params.isbn;
  const newBook = req.body;

  console.log(`post request for isbn ${isbn}`);
  console.log(`new book:`);
  console.log(newBook);

  for (let i = 0; i < books.length; i++) {
    let book = books[i];

    if (book.isbn === isbn) {
      books[i] = newBook;
    }
  }

  //res.send("Book is updated");
});

app.get("/books", (req, res) => {
  console.log("get books");
  res.json(books);
});

//get book with given isbn
app.get("/books/:isbn", (req, res) => {
  console.log(`get request for book with isbn: ${req.params.isbn}`);

  const isbn = req.params.isbn;
  const bookIndex = books.findIndex((book) => book.isbn === isbn);
  if (bookIndex !== -1) {
    res.send(books[bookIndex]);
  }
});

app.delete("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  console.log(`delete request for book with isbn ${isbn}`);

  const bookIndex = books.findIndex((book) => book.isbn === isbn);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.send(`Book with ISBN ${isbn} has been deleted`);
  } else {
    res.status(404).send(`Book with ISBN ${isbn} not found`);
  }
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}`)
);
