import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Nav() {
    return (
        <div id="Navigation">
           <Link to="/"><button>Home</button></Link>
           <Link to="/facts"><button>View All</button></Link>
           <Link to="/change"><button>Edit</button></Link>
        </div>
    )
}
