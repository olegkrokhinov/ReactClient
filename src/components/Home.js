import React, { useEffect, useState } from 'react';
import userAuth from '../userAuth';
import { setObjectState } from '../utils.js'

export default function Home(props) {
  
  const [homeVars, setHomeVars] = useState(
    {
      currentUser: ''
    }); 

  useEffect(()=>{
    const user = userAuth.getCurrentUser();  
    if (user) { 
      setObjectState(setHomeVars, { currentUser: user });
    }
  });

  return (
    <div>
      <h3>Home</h3>
      {homeVars.currentUser && 
          <div>
              Hello, {homeVars.currentUser.userLogin}
          </div>
      }
      {!homeVars.currentUser && 
          <div>
              Hello Guest!
          </div>
      }
    </div>
  );
  };
 