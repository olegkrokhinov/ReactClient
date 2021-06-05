import React, { useState } from 'react';
import userAuth from '../userAuth.js';
 
export default function UserLogin(props) {
  
  const [login, setLogin] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [loginResultMessage, setLoginResultMessage] = useState(''); 
  
  function handleLoginChange(event) {
    setLogin(event.target.value);
  }
  
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    userAuth.login(login, password)
    .then((user)=>{
      props.setCurrentUser(user);
      props.history.push("/");
      window.location.reload();
    })
    .catch(error => {
      setLoginResultMessage('UserLogin catch error: '+ error.message);
    })
  }

  return (
    <div>
      <div><h3>UserLogin</h3></div>
      <form onSubmit={handleSubmit}>
        <label>Login:</label>
        <input value={login} onChange={handleLoginChange} />
        <label>Password:</label>
        <input value={password} onChange={handlePasswordChange} />
        <input type="submit" value="Sign in" />

        {loginResultMessage && ( 
            <div>
              {loginResultMessage}
            </div>
        )}

      </form>
    </div>
  );
  
};


 