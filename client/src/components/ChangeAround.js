import React from 'react'
import Nav from './Nav';
import '../App.css';
import { useState, useEffect } from 'react';



export default function ChangeAround(props) {
    //let _id = window.location.search
    const [entry, setEntry] = useState([]);
//&& _id === entry._id)
    useEffect(() => {
        if (entry.length === 0)  {
            fetch(`/api/`)
            .then((res) => res.json())
            .then((entryContents) => {
                setEntry(entryContents);
            })
        }
    });
    entry && 
        entry.map(() => {
        // console.log(entry)
         console.log(entry[0]._id)
        // console.log(entry._id)
        })
    
    

    return (
       <div> 
            {/* {entry[0]._id} */}
            <Nav></Nav>
            <h3 id="edit-title">Edit a Post</h3>
            {entry.map((post) => {
                return (
                    <form id="form">
                        Title:<br></br><input type="text" placeholder={post.title}></input><br></br>
                        Author:<br></br><input type="text" placeholder={post.author} ></input><br></br>
                        Content:<br></br><input type="text" placeholder={post.content}></input><br></br>
                           Tags: <br></br><select name="tags" id="tags">
                            <option value="The Bachelor">The Bachelor</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Animals">Animals</option>
                            <option value="Food">Food</option>
                            <option value="Random">Random</option>
                            </select>
                        <br></br><button onClick={setEntry}>Save Changes</button><button>Delete This Post</button>
                    </form>
                )
            })}
            
       </div>
    
    )}


