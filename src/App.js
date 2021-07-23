
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import UserLogin from './components/UserLogin.js';
import UserRegister from './components/UserRegister.js';
import Home from './components/Home.js';
import UsersList from './components/UsersList'
import ToysList from './components/ToysList'
import Toy from './components/Toy'
import userAuth from './userAuth.js';

export default function App(props) {
  
  const [currentUser, setCurrentUser] = useState(()=>{
    return userAuth.getCurrentUser();});  

  const [selectedToy, setSelectedToy] = useState('');    


  function logOut(){
    userAuth.logOut();
    setCurrentUser('');

  }
  
  return (
    <BrowserRouter>
    <div>
      <p>selectedToy = {selectedToy} </p>
      <div>
        <nav>
          <li>
            <Link to={"/"}>
              Home 
            </Link>
          </li>
          <li>
            <Link to={"/users"}>
              Users
            </Link>
          </li>
          <li>
            <Link to={"/toys"}>
              Toys
            </Link>
          </li>
          <li>
            <Link to={"/addToy"}>
              add Toy
            </Link>
          </li>
        
          {currentUser ? (
            <div>
              <li>
                <a href="/" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
              
            </div>
          ) : (
            <div>
              <li>
                <Link to={"/login"}>
                  Login
                </Link>
              </li>

              <li>
                <Link to={"/register"}>
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

      </div>
      <div>
        <Switch>
          <Route exact path="/"
            render={ (props) => <Home {...props} currentUser = {currentUser} setCurrentUser = {setCurrentUser} />}>
          </Route>
          <Route exact path="/login"
              render={ (props) => <UserLogin {...props} currentUser = {currentUser} setCurrentUser = {setCurrentUser} />}>
          </Route> 
          <Route exact path="/register"
             render={ (props) => <UserRegister {...props} />}>
          </Route>
          <Route exact path="/users"
             render={ (props) => <UsersList {...props} currentUser = {currentUser} setCurrentUser = {setCurrentUser} />}>
          </Route>
          <Route exact path="/toys"
             render={ (props) => <ToysList {...props} currentUser = {currentUser} selectedToy = {selectedToy} setSelectedToy = {setSelectedToy}/>}>
          </Route>
          <Route exact path="/addToy"
            render={ (props) => <Toy {...props} currentUser = {currentUser} selectedToy = {selectedToy} setSelectedToy = {setSelectedToy} />}>
          </Route>
          <Route exact path="/editToy"
            render={ (props) => <Toy {...props} currentUser = {currentUser} selectedToy = {selectedToy} setSelectedToy = {setSelectedToy} />}>
          </Route>
        </Switch>
        
        
      </div>
    </div>
    </BrowserRouter>    
    
  );

}
