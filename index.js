const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  { id: uuidv4(), username: "Jerry", text: "I am not fine" },
  { id: uuidv4(), username: "Spike", text: "I am good" },
  { id: uuidv4(), username: "Tyke", text: "I am bad" },
  { id: uuidv4(), username: "Nibbles", text: "I am not good" },
  { id: uuidv4(), username: "Droopy", text: "I am not bad" },
  { id: uuidv4(), username: "Butch", text: "I am happy" },
  { id: uuidv4(), username: "Lightning", text: "I am sad" },
  { id: uuidv4(), username: "Spike", text: "I am not happy" },
  { id: uuidv4(), username: "Tyke", text: "I am not sad" },
  { id: uuidv4(), username: "Nibbles", text: "I am not happy" },
  { id: uuidv4(), username: "Droopy", text: "I am not sad" },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/create", (req, res) => {
  res.render("comments/create");
});

app.post("/comments", (req, res) => {
  const { username, text } = req.body;
  comments.push({ username, text, id: uuidv4() });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.text;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.text = newComment;
  res.redirect("/comments");
});

app.get("/comments/:id/delete", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/delete", { comment });
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.get("/order", (req, res) => {
  res.send("GET order Response");
});

app.post("/order", (req, res) => {
  const { item, qty } = req.body;
  res.send(`item: ${item}, qty: ${qty}`);
});

app.listen(8080, () => {
  console.log("server is running on: http://localhost:8080");
});
