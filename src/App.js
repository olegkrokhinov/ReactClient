//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import { Switch, Route, Link } from "react-router-dom";

import UserLogin from './components/UserLogin.js';
import UserRegister from './components/UserRegister.js';
import Home from './components/Home.js';

import userAuth from './userAuth.js' 

class  App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      currentUser: '',
    };

    this.logOut = this.logOut.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
    const user = userAuth.getCurrentUser();
    
    if (user) {
      this.setState({currentUser: user});
    }

    
  }

  logOut(){
    userAuth.logOut();
  }
  
  render(){
    return (
      <div>
        <div>
          <nav>
            <Link to={"/"}>
              Home 
            </Link>
          
              <li>
                <Link to={"/"} >
                  Home
                </Link>
              </li>
          
            {this.state.currentUser ? (
              <div>
                <li>
                  <a href="/login" className="nav-link" onClick={this.logOut}>
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
  };
}

export default App;
