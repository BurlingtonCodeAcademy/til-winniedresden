//server interfaces w front end and database
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const staticDir = path.resolve('./client/public');

const mongoose = require("mongoose");
//connect to the database 
mongoose.connect("mongodb://localhost:27017/today_i_learned", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const todayDB = mongoose.connection;
//connecting to my today I learned database

//telling the server to show the error if there is one
todayDB.on("error", console.error.bind(console, "connection error:"));

//template for an entry into my DB
const entrySchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: Date,
  tags: String,
});
//model
const PostModel = mongoose.model("posts", entrySchema);
app.use(express.urlencoded({extended: true}));
app.use(express.static(staticDir));
//schema and model have to match
//endpoint / shows all entries into the journal
app.post("/add", async (req, res) => {
  let newEntry = new PostModel({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: req.body.date,
    tags: req.body.tags,
  });
  await newEntry.save();
  res.status(200).send("New entry added")
});
//to show one specific post:
app.get("/facts/:id", async (req, res) => {
  let id = req.params.id
  let data = showOne(id)
  res.send(data)
});
//edit a post
app.post('/facts/:id', (req, res) => {
  let id = req.params.id
  let data = req.content

  updateEntry(id, data)
  res.redirect('/')
})
//add a new entry 
app.post('/facts', express.urlencoded(), (req, res) => {
  let data = req.content
  addEntry(data)
  res.redirect('/')
})

//delete a journal entry  
app.get('/delete/:id', (req, res) => {
  let id = req.params.id

  removeEntry(id)
  res.redirect('/')
})

//shows all the entries 
app.get('/api', async (req, res) => {
const cursor = await PostModel.find({});
let entries = [ ];
await cursor.forEach((post) => {
  entries.push(post);
}) //pushes each result into our results array
res.json(entries);
})
//show one post when you click on it
async function showOne(id) {
  let cursor = await todayDB.getOne(id)
  let oneEntry = []

  await cursor.forEach(entry => {
    oneEntry.push(entry)
  })
}
//add one entry
async function addEntry(obj) {
  const dbObj ={
    title: obj.title,
    content: obj.content,
    author: obj.author,
    tags: obj.tags
  }
}


//to take back to the homepage if they type something wrong
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve("./public/index.html"));
// });
//where this is all going down
app.listen(port, () => {
  console.log("On port", port);
});
