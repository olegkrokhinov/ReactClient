import React, { useEffect, useState } from 'react'
import ItemsListElement from './ItemListElement'
import { getItemsList } from '../itemFetch'
import { Grid } from '@material-ui/core';

export default function ItemsList(
    {selectedItemId, 
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

  return <>
          { (!error)&& 
              list.map( (item, index)=>
                <ItemsListElement {...props} key={index} 
                  item={item}
                  selectedItemId={selectedItemId} 
                  setSelectedItemId={setSelectedItemId}
                  setItemlistModifyed={setItemlistModifyed}
                  setItemAction={setItemAction}
                  setItemlistModifyed={setItemlistModifyed}
                />
              )
          } 
          {error}
        </>
          
  }

