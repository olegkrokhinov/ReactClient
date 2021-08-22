import React, { useEffect, useState } from 'react'
import ItemsListElement from './ItemListElement'
import { getItemsList, deleteItemFromDb } from '../itemFetch'
import { Grid } from '@material-ui/core';

export default function ItemsList(
    {selectedItem, 
     setSelectedItemId, 
     setItemAction, 
     itemListModifyed, 
     setItemlistModifyed, 
     ...props}) {
  
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(()=>{
    getItemsList()
    .then (list => {
      setList(list);
    })
    .catch(err => {
      setError(renderErrorMessage(err));
    })     
  }, [itemListModifyed]);
 
   
  function renderErrorMessage (err) {
    return (
      <div> {err.message} </div>
    );
  }

  function onViewHandler(id){
    setSelectedItemId(id);
    setItemAction('view');
  }

  function onEditHandler(id){
    setSelectedItemId(id);
    setItemAction('edit');
  }
  
  function onDeleteHandler(id){
    deleteItemFromDb(id)
    .then(()=>{
        setItemlistModifyed((value)=>(!value));
        setSelectedItemId('');
        setItemAction('') })
    .catch()
  }

  return <>
          { (!error)&& 
              list.map( (item, index)=>
                <ItemsListElement {...props} key={index} selectedItem={selectedItem} item = {item} itemOnViewHandler={onViewHandler} itemOnEditHandler={onEditHandler} itemOnDeleteHandler={onDeleteHandler}/>
              )
          } 
          {error}
        </>
          
  }

