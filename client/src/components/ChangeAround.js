import React from "react";
import Nav from "./Nav";
import "../App.css";
import { useState, useEffect } from "react";

//allows you to edit a page, changes the url of the page (to each id of each specific item in the database, sets which entry is on the page, then sets the placeholder text for each item in the editable form to be the text that resides in the database for each journal entry.)

//tried to get the delete and edit buttons to work but the proxy error is preventing it from doing so. googling did not help me solve.
export default function ChangeAround(props) {
  let entryId = window.location.pathname.replace("change/", "");
  console.log(entryId);
  const [entry, setEntry] = useState([]);

  useEffect(() => {
    if (entry.length === 0) {
      fetch(`/api` + entryId)
        .then((res) => res.json())
        .then((entryContents) => {
          setEntry(entryContents);
        });
    }
  });

  return (
    <div>
      <Nav></Nav>
      <h3 id="edit-title">Edit a Post</h3>
      <form id="form" action={`/edit${entryId}`} method="POST">
        Title:<br></br>
        <input name="title" type="text" placeholder={entry.title}></input>
        <br></br>
        Author:<br></br>
        <input name="author" type="text" placeholder={entry.author}></input>
        <br></br>
        Content:<br></br>
        <input name="content" type="text" placeholder={entry.content}></input>
        <br></br>
        Tags: <br></br>
        <select name="tags" id="tags">
          <option value="The Bachelor">The Bachelor</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Animals">Animals</option>
          <option value="Food">Food</option>
          <option value="Random">Random</option>
        </select>
        <br></br>
        <br></br>
        {/* this button will delete the post from the list, however it's not linked to anything at the moment  */}
        <input type="submit" id="submit"></input>
        {/* this button will submit the form, but a proxy error prevents it from actually submitting sadly */}
      </form>
      <button
        className="button"
        onClick={() => {
          fetch("/delete" + entryId);
        }}
      >
        Delete This Post
      </button>
    </div>
  );
}
