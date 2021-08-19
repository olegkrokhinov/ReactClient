import React, { useState } from 'react';

import { authenticatedUser } from '../userAuth';
import { addUserIsAuthentificatedListener } from '../userAuth';

export default function Home(...props) {

  const [userIsAuthenticated, setUserIsAuthenticated] = useState(!(authenticatedUser.userAccessToken==''));
  addUserIsAuthentificatedListener(setUserIsAuthenticated);

  return (
    <div>
      <h3>Home page</h3>
      {userIsAuthenticated && 
          <div>
              <div>Hello, {authenticatedUser.userLogin}!</div>
              <div>User roles: </div> 
              {authenticatedUser.userRoles.map((role, index)=>{
                 return <div>{role.name}</div> 
              })}
          </div>
      }
      {!userIsAuthenticated && 
          <div>
              Hello Guest!
              To have acces to items please login.
          </div>

      }
    </div>
  );
};
 