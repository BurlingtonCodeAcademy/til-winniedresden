import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

//nav bar that takes you to the home page or the view all page, the edit page was removed since it's on each item on the view all list (you can get to the edit page only from a specific item)
export default function Nav() {
  return (
    <div id="Navigation">
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/facts">
        <button>View All</button>
      </Link>
    </div>
  );
}
