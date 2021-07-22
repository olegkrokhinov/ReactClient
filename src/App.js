
import React, { useState } from 'react';
import { Switch, Route, Link } from "react-router-dom";

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
    
    <div>
      <p>selectedToy = {selectedToy}</p>
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
            render = { props => <Home currentUser = {currentUser} setCurrentUser = {setCurrentUser} {...props}/>} />
          <Route exact path="/login" 
            render = {props => <UserLogin currentUser = {currentUser} setCurrentUser = {setCurrentUser} {...props}/>} />
          <Route exact path="/register" 
            component={UserRegister} />
          <Route exact path="/users" 
            render = {props => <UsersList currentUser = {currentUser} setCurrentUser = {setCurrentUser} {...props}/>} />
          <Route exact path="/toys" 
            render = {props => <ToysList currentUser = {currentUser} selectedToy = {selectedToy} setSelectedToy = {setSelectedToy} {...props}/>} />
          <Route exact path="/addToy" 
            render = {props => <Toy currentUser = {currentUser} selectedToy = {selectedToy} {...props}/>} />
          <Route exact path="/editToy" 
            render = {props => <Toy currentUser = {currentUser} selectedToy = {selectedToy} setSelectedToy = {setSelectedToy} {...props}/>} />
        </Switch>
        
        
      </div>
    </div>
  );

}
