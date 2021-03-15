//aka page for the routes 
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import ChangeAround from './components/ChangeAround';
import ViewAll from './components/ViewAll'; 

// route functionality to get from one page to another. 
function App() {
  return (
    <div>
        <BrowserRouter>
          <Switch>
            <Route exact path ='/'>
              <Home>
              <h1 id="Home">Today I Learned:</h1>
              </Home> 
            </Route>
            <Route path="/facts">
              <ViewAll><h1>list of entries</h1></ViewAll>
            </Route>
            <Route path={"/change"} component={ChangeAround}/>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
