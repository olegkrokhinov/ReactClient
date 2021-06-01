import React, { useEffect, useState } from 'react';
import userAuth from '../userAuth';

export default function Home(props) {
    
  const [currentUser, setCurrentUser] = useState(()=>{
    return userAuth.getCurrentUser();
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
 