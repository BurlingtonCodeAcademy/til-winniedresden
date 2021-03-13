import React from 'react';
import Nav from './/Nav';
import '../App.css';
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

export default function ViewAll() {
    //props ^
    const [entries, setEntries] = useState([]);
    const [search, setSearch] = useState([])
    
   // fetch the journal entry data and map through it, putting each entry on the page. 
    useEffect(() => {
        if (entries.length === 0) {
            fetch('/api')
            .then((res) => res.json())
            .then((entryContents) => {
                setEntries(entryContents);
            });
        }
    });
    // let entries = [];
    entries && 
        entries.forEach((object) => {
            console.log(entries)
            console.log(entries[0]._id)
        })

    return (
        <div>
            <Nav></Nav>
            <div id="searchFunctionality">
                <div id="dropdown">
                    <label id="search">Search</label>
                        <select name="dropdown" id="dropdown">
                            <option value="Title">Title</option>
                            <option value="Author">Author</option>
                            <option value="Tags">Tags</option>
                        </select>    
                </div> 
                <div id="searchBar">
                    <label id="search" htmlFor="search"></label>
                    <input id="search" type="text" ></input><button>Submit</button>
                </div>
            </div>
            {entries.map((post, index) => {
                return (
                <div id="all-posts">
                    {/* this makes each key totally unique, linking the index of each post to author, title,etc. */}
                    <br></br><h4>author:</h4> <div key={index + "-author"}>{post.author}</div>
                    <h4>title:</h4> <div key={index + "-title"}>{post.title}</div>
                    <h4>date:</h4> <div key={index + "-date"}>{post.date}</div>
                    <h4>Journal Entry:</h4><div key={index + "-content"}>{post.content}</div>
                    <h4>tags:</h4> <div key={index + "-tags"}>{post.tags}</div>
                    <Link to={"/change"}><button>Edit</button></Link><button>Delete</button>
                    
                </div>
                );
            })}
            
          

           
        </div>
    )
}
