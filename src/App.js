
import React, { useEffect, useState } from 'react';
import { Switch, Route, Link } from "react-router-dom";

import UserLogin from './components/UserLogin.js';
import UserRegister from './components/UserRegister.js';
import Home from './components/Home.js';

import userAuth from './userAuth.js';
import { setObjectState} from './utils.js'


export default function App(props) {
  
  const [appVars, setAppVars] = useState(
    {
      currentUser: ''
    }) 

  useEffect(()=>{
    const user = userAuth.getCurrentUser();  
    if (user) {
      setObjectState(setAppVars, { currentUser: user });
    }
  });

  function logOut(){
    userAuth.logOut();
    setObjectState(setAppVars, {currentUser: ''});
    
  }
  
  
  return (
    <div>
      <div>
        <nav>
          <Link to={"/"}>
            Home 
          </Link>
        
          {appVars.currentUser ? (
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
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={UserLogin} />
          <Route exact path="/register" component={UserRegister} />
        </Switch>
      </div>
    </div>
  );

}
