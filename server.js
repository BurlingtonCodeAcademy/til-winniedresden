//server interfaces w front end and database
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const staticDir = path.resolve('./client/public');
const { ObjectId } = require('mongodb');

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
  res.redirect('/')
  //can we return to home page? or style this cuter? 
});


//updating an entry
app.post("/edit/:id", async(req, res) => {
  let updatedEntry = PostModel.findOneAndUpdate({_id:req.params.id});
  console.log(updatedEntry)
  let id = req.params.id
  let update = req.body
  await updateEntry(id, update);
  res.redirect('/')
})
 //deleting an entry:
 app.get("edit/:id", async(req, res) => {
   let deleteEntry = PostModel.findOneAndDelete({_id:req.params.id});
   console.log(deletedEntry)
   let id = req.params.id
   await deleteEntry(id)
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

// directing the backend to the proper entry in the api 
app.get(`/api/:id`, async (req, res) => {
  const entry = await PostModel.findOne({_id:req.params.id});
  console.log(entry)
  res.json(entry)
}) 

//function to add the updates
async function updateEntry(id, update){
  let updateEntry = {
    $set : update
  }
  await PostModel.updateOne({_id: ObjectId(id), updateEntry})
}


//where this is all going down
app.listen(port, () => {
  console.log("On port", port);
});
