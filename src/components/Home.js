import React from 'react';

export default function Home({currentUser, setCurrentUser},  ...props) {
    
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
 