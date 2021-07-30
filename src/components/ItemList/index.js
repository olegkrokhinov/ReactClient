import React, { useEffect, useRef, useState } from 'react'
import ItemsListElement from '../ItemListElement'

const URL_HOME = "http://localhost:4000/";
const URL_ITEMS = "http://localhost:4000/items/";

export default function ItemsList(
    {currentUser, 
    selectedItem, 
    setSelectedItem, 
    setItemMode, 
    itemListModifyed, 
    setItemlistModifyed, 
    ...props}) {
  
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
  }, [itemListModifyed]);

  function onEditHandler(event){
    setSelectedItem(event.target.value);
    setItemMode('edit');
  }
  
  function onDeleteHandler(event){
    deleteItem(event.target.value)
    .then(()=>{
        setItemlistModifyed((value)=>(!value));
        setSelectedItem('');
        setItemMode('view') })
    .catch()
  }
 
  function deleteItem(itemId){
    const options = { 
      method: 'DELETE', 
      headers: {'Authorization': currentUser.userAccessToken} 
    }
    
    return new Promise((resolve, reject)=>{
      fetch(URL_ITEMS + itemId, options)
      .then(res => checkHtppError(res))
      .then(res => res.json())
      .then(json => resolve(json))        
      .catch(reject); 
    })
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

  function getList(path, userAccessToken){
    return new Promise((resolve, reject)=>{
        fetch(URL_HOME + path, { 
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

  return  <div>
            <div>List of Items:</div>  
            { !error 
                ? <div>{list}</div>
                : <div>{error}</div>
            }
          </div>
  }

