import React, { useEffect, useRef, useState } from 'react';

const URL = "http://localhost:4000/";


 export default function UserList({currentUser, setCurrentUser},  ...props) {
   let contentInit = (
     <div>
       Getting a list of users from server.Please wait ...
     </div>
   );
  
   const [content, setContent] = useState(contentInit);
   const [userListRendered, setUserListRendered] = useState(false);
  
   useEffect(()=>{
     getUsers('users', (currentUser && currentUser.userAccessToken) || 'no token')
     .then (users => {
       setContent(renderUsersList(users))
       setUserListRendered(true);
     })
     .catch(err => {
       setContent(renderErrorMessage(err))
       setUserListRendered(true);
     })
   }, [userListRendered]);
      
   return <div>
           <div>List of DB users:</div>    
            <div>{content}</div>
          </div>
 }

function getUsers(path, userAccessToken){
    return new Promise((resolve, reject)=>{
        fetch(URL + path, { 
            method: 'GET',   
            headers: { Authorization: userAccessToken }
        })
        .then(res => checkHtppError(res))
        .then(res => resolve(res.json()) )
        .catch(reject);
    });
}

function checkHtppError(res){
    if (res.ok) {
      return res;
    } else {
      let message;
      switch (res.status){
        case '401':
          message = 'Error 401. Unauthorized'  
          break;
        default:
          message = `Error ${res.status}`;
      }
      throw new Error(message)
    } 
}

function renderUsersList (users){
  let render = [];
  for (let key in users){
    render.push(<div>{users[key].login}</div>);
  }  
  return render;       
}

function renderErrorMessage (err) {
    return (
        <div> {err.message} </div>
    )
}