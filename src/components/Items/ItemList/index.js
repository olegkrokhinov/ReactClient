import React, { useEffect, useState } from 'react'
import ItemsListElement from './ItemListElement'
import { getItemsList, deleteItemFromDb } from '../itemFetch'

export default function ItemsList(
    {selectedItem, 
     setSelectedItemId, 
     setItemAction, 
     itemListModifyed, 
     setItemlistModifyed, 
     ...props}) {
  
  const [list, setList] = useState(<div> Getting a list of items from server.Please wait ...</div>);
  const [error, setError] = useState('');

  useEffect(()=>{
    getItemsList()
    .then (list => {
      setList(renderListAsArr(list, onEditHandler, onDeleteHandler, props));
    })
    .catch(err => {
      setError(renderErrorMessage(err));
    })     
  }, [itemListModifyed]);
 
  function renderListAsArr (list, props){
    let render = [];
    for (let key in list){
      render.push((      
        <div>
          <ItemsListElement {...props} item = {list[key]} onEditHandler={onEditHandler} onDeleteHandler={onDeleteHandler}/>
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

  function onEditHandler(event){
    setSelectedItemId(event.target.value);
    setItemAction('edit');
  }
  
  function onDeleteHandler(event){
    deleteItemFromDb(event.target.value)
    .then(()=>{
        setItemlistModifyed((value)=>(!value));
        setSelectedItemId('');
        setItemAction('') })
    .catch()
  }

  return  <div> 
            { !error 
                ? <div>{list}</div>
                : <div>{error}</div>
            }
          </div>
  }

