import React, { useEffect, useState } from 'react';
import userAuth from '../userAuth';
import { setObjectState } from '../utils.js'

export default function Home(props) {
  
  
  const [currentUser, setCurrentUser] = useState(''); 

  useEffect(()=>{
    const user = userAuth.getCurrentUser();  
    if (user) {
      setCurrentUser(user);
    }
  });

  return (
    <div>
      <h3>Home</h3>
      {currentUser && 
          <div>
              Hello, {currentUser.userLogin}
          </div>
      }
      {!currentUser && 
          <div>
              Hello Guest!
          </div>
      }
    </div>
  );
  };
 