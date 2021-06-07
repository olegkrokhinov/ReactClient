import React from 'react';

export default function Home({currentUser, setCurrentUser},  ...props) {
    
console.log(currentUser);

  return (
    <div>
      <h3>Home</h3>
      {currentUser && 
          <div>
              <div>Hello, {currentUser.userLogin}!</div>
              <div>User roles: </div> 
              {currentUser.userRoles.map((role, index)=>{
                 return <div>{role.name}</div> 
              })}
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
 