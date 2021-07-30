
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import UserLogin from './components/UserLogin.js';
import UserRegister from './components/UserRegister.js';
import Home from './components/Home.js';
import userAuth from './userAuth.js';
import Items from './components/Items'

export default function App(props) {

  const [currentUser, setCurrentUser] = useState(()=>{
    return userAuth.getCurrentUser();});
 
  function logOut(){
    userAuth.logOut();
    setCurrentUser('');

  }

  return (
    <div>
      <div>
        <nav>
          <li>
            <Link to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/items"}>
              Items
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
          <Route exact path="/Items"
             render={ (props) => <Items currentUser = {currentUser} {...props}/>}>
          </Route>
        </Switch>


      </div>
    </div>

  );

}
