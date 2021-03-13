import React from 'react';
import { useState, useEffect } from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import ViewAll from './ViewAll';
import '../App.css';
import Nav from './Nav';

//home page containing an entry form and a button to click to see the rest of the posts 
function Home() {
    //the button for if the change page button is clicked (starting false)
    const [clicked] = useState(false);
   
    //state for getting the data
    const [data, setData] = useState();

    //utilizing the clicked state: 
    useEffect(() => {
          //does clicked state now refer to my submit button?
        //it'll fetch the data if the button gets clicked
        if (clicked) {
            fetch('/facts')
            .then((res) => res.json())
            .then((allData) => {
                setData(allData);
            });
        }
    }, [clicked]);
    //setting the button as clicked = true to keep data pulled (?) 

    
    
    return (
        <div>
            <Nav></Nav>
            <h1 id="Home">Today I Learned:</h1>
            <form id="form" action='/add' method='POST'>
                <label>Title:<br></br><input name="title" type="text"/></label><br></br>
                <label>Content:<br></br><textarea name="content" type="textarea"/></label><br></br>
                <label>Author:<br></br><input name="author" type="text"/></label><br></br>
                <label>Date:<br></br><input name="date" type="date"/></label><br></br>
                <label>Tags:<br></br>
                    <select name="tags" id="tags">
                            <option value="The Bachelor">The Bachelor</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Animals">Animals</option>
                            <option value="Food">Food</option>
                            <option value="Random">Random</option>
                            
      
                        </select>
                </label><br></br>
                <button>Submit</button>
            </form>
        </div>
    )
}
export default Home;

// <script>
//          
//       </script>