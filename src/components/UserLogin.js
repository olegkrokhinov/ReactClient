import React, { useState } from 'react';
import userAuth from '../userAuth.js';
import { setObjectState } from '../utils.js'
 
export default function UserLogin(props) {
  
  const [userLoginVars, setUserLoginVars] =  useState(
    {
      login: '',
      password: '',
      loginResultMessage: ''
    });

  function handleLoginChange(event) {
    setObjectState(setUserLoginVars, { login: event.target.value });
  }
  
  function handlePasswordChange(event) {
    setObjectState(setUserLoginVars, { password: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault();
    userAuth.login(userLoginVars.login, userLoginVars.password)
    .then(()=>{
      props.history.push("/");
      window.location.reload();
    })
    .catch(error => {
      setObjectState(setUserLoginVars ,{ loginResultMessage:  'UserLogin catch error: '+ error.message });
    })
  }

  return (
    <div>
      <div><h3>UserLogin</h3></div>
      <form onSubmit={handleSubmit}>
        <label>Login:</label>
        <input value={userLoginVars.login} onChange={handleLoginChange} />
        <label>Password:</label>
        <input value={userLoginVars.password} onChange={handlePasswordChange} />
        <input type="submit" value="Sign in" />

        {userLoginVars.loginResultMessage && ( 
            <div>
              {userLoginVars.loginResultMessage}
            </div>
        )}

      </form>
    </div>
  );
  
};


 