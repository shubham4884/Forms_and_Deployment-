const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://0.0.0.0:27017/Book-Library")
  .then(() => console.log("Connected With Database"))
  .catch((err) => console.log(err));

const authorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: String,
});
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  summary: String,
});
const Author = new mongoose.model("Author", authorSchema);
const Book = new mongoose.model("Book", bookSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "views")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "/index.html"));
});

app.get("/add-author", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "/author.html"));
});
app.get("/add-book", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "/book.html"));
});

app.post("/add-author", (req, res) => {
  const authrDetails = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
  });
  authrDetails.save();
  console.log("Post request made");
  res.sendFile(path.join(__dirname, "views", "/index.html"));
});

app.post("/add-book", (req, res) => {
  const bookDetails = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
  });
  bookDetails.save();
  console.log("Post request made");
  res.sendFile(path.join(__dirname, "views", "/index.html"));
});

app.get("/get-author", (req, res) => {
  Author.find(function (err, datas) {
    if (err) return console.error(err);

    console.log(datas);
    res.json(datas);
  });
});
app.get("/get-book", (req, res) => {
  Book.find(function (err, datas) {
    if (err) return console.error(err);

    console.log(datas);
    res.json(datas);
  });
});

app.delete("/delete-author/:id", function (req, res) {
  let deleteId = req.params.id;
  console.log(typeof deleteId);
  Author.findByIdAndDelete(deleteId, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion");
    res.end();
  });
});


app.delete("/delete-book/:id", function (req, res) {
  let deleteId = req.params.id;
  console.log(typeof deleteId);
  Book.findByIdAndDelete(deleteId, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion");
    res.end();
  });
});

app.listen(4000, () => {
  console.log("Listing on the port 4000");
});
