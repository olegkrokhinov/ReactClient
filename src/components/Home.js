import React from 'react';
import { authenticatedUser } from '../userAuth';

export default function Home(...props) {
    
  return (
    <div>
      <h3>Home page</h3>
      {authenticatedUser && 
          <div>
              <div>Hello, {authenticatedUser.userLogin}!</div>
              <div>User roles: </div> 
              {authenticatedUser.userRoles.map((role, index)=>{
                 return <div>{role.name}</div> 
              })}
          </div>
      }
      {!authenticatedUser && 
          <div>
              Hello Guest!
          </div>

      }
    </div>
  );
};
 