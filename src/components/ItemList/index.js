import React, { useEffect, useRef, useState } from 'react'
import ItemsListElement from '../ItemListElement'


const URL = "http://localhost:4000/";

export default function ItemsList({currentUser, ...props}) {
  
  const [list, setList] = useState(<div> Getting a list of items from server.Please wait ...</div>);
  const [error, setError] = useState('');

  useEffect(()=>{
    getList('items', (currentUser && currentUser.userAccessToken) || 'no token')
    .then (list => {
      setList(renderListAsArr(list, onEditHandler, onDeleteHandler, props));
    })
    .catch(err => {
      setError(renderErrorMessage(err));
    })     
  }, []);

  function onEditHandler(event){
    props.history.push('/editItem/'+event.target.value)
  }
  
  function onDeleteHandler(event){
    props.history.push('/deleteItem/'+event.target.value)  
  }
 
  function renderListAsArr (list, props){
    let render = [];
    for (let key in list){
      render.push((      
        <div>
          <ItemsListElement {...props} item = {list[key]} />
          <button value={list[key]._id} onClick={onEditHandler}> Edit </button>
          <button value={list[key]._id} onClick={onDeleteHandler}> Delete </button>
        </div>
      ));
    };  
    return render;       
  }
  
  function renderErrorMessage (err) {
    return (
      <div> {err.message} </div>
    );
  }

  return  <div>
            <div>List of Items:</div>  
            { !error 
                ? <div>{list}</div>
                : <div>{error}</div>
            }
          </div>
  }

function getList(path, userAccessToken){
  return new Promise((resolve, reject)=>{
      fetch(URL + path, { 
          method: 'GET',   
          headers: { Authorization: userAccessToken }
      })
      .then(res => checkHtppError(res))
      .then(res => resolve(res.json()))
      .catch(reject);
  });
}
  
function checkHtppError(res){
  if (res.ok) {
    return res;
  } else {
    let message = `Error ${res.status}: ${res.statusText}`;
    throw new Error(message)
  }; 
};

