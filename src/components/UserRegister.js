import React, { useState } from 'react';
import userAuth from '../userAuth.js'
import { setObjectState } from '../utils.js'

export default function UserRegister (props) {
  

  const [userRegisterVars, setUserRegisterVars] = useState(
    {
      login: '',
      password: '',
      registerResultMessage: '',
      registered: false,
    });
    
  function handleLoginChange(event) {
    setObjectState(setUserRegisterVars, {login: event.target.value});    
  }
  
  function handlePasswordChange(event) {
    setObjectState(setUserRegisterVars, {password: event.target.value});    
  }

  function handleSubmit(event) {
      event.preventDefault();
      userAuth.register(userRegisterVars.login, userRegisterVars.password)
      .then((json)=>{
        setObjectState(setUserRegisterVars, 
        {
          registerResultMessage: 'User registered successfuly!', 
          registered: true
        })
      })
      .catch(error => {
        this.setObjectState(setUserRegisterVars, {
          registerResultMessage: 'UserRegister catch error: '+ error.message,
          registered: false
        });
      })
  }

return (
  <div>
    <div><h3>UserRegister</h3></div>
    <form onSubmit={handleSubmit}>
      
      {!userRegisterVars.registered &&
      <div>
        <label>Login:</label>
        <input value={userRegisterVars.login} onChange={handleLoginChange} />
        <label>Password:</label>
        <input value={userRegisterVars.password} onChange={handlePasswordChange} />
        <input type="submit" value="Sign up" />
      </div>
      }

      {userRegisterVars.registerResultMessage && (
        
        ((userRegisterVars.registered) && 
          <div>
            {userRegisterVars.registerResultMessage}
          </div>)
        
        || 
        
        ((!userRegisterVars.registered) && 
          <div>
            {userRegisterVars.registerResultMessage}
          </div>)
              
      )}

    </form>
  </div>
  );
}

 