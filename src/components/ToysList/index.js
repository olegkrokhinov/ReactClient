import React, { useEffect, useRef, useState } from 'react'
import ToysListElement from '../ToyListElement'


const URL = "http://localhost:4000/";

export default function ToysList({currentUser, selectedToy, setSelectedToy, ...props}) {
  
  const [list, setList] = useState(<div> Getting a list of toys from server.Please wait ...</div>);
  const [error, setError] = useState('');

  useEffect(()=>{
    getList('toys', (currentUser && currentUser.userAccessToken) || 'no token')
    .then (list => {
      setList(renderListAsArr(list, selectedToy, setSelectedToy, props));
    })
    .catch(err => {
      setError(renderErrorMessage(err));
    })     
  }, []);
 
  return  <div>
            <div>List of Toys:</div>  
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

function renderListAsArr (list, selectedToy, setSelectedToy, props){
  let render = [];
  for (let key in list){
    render.push(<ToysListElement {...props} toy = {list[key]} selectedToy = {selectedToy} setSelectedToy = {setSelectedToy} />);
  };  
  return render;       
}

function renderErrorMessage (err) {
  return (
    <div> {err.message} </div>
  );
}
