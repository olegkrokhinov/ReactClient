import React, { useEffect, useState } from 'react'
import ItemsListElement from './ItemListElement'
import { getItemsList, deleteItemFromDb } from '../itemFetch'
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => (
  {
    item: {
      marginLeft: 8
    }
    
    
  }
)); 


export default function ItemsList(
    {selectedItem, 
     setSelectedItemId, 
     setItemAction, 
     itemListModifyed, 
     setItemlistModifyed, 
     ...props}) {
  
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  const classes = useStyles();

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

  return  <div> 
            { !error 
                ? <Grid container spacing={1} >
                    {list.map((item)=>{
                        return (
                          <Grid item className={classes.item}>
                            <ItemsListElement {...props} item = {item} itemOnEditHandler={onEditHandler} itemOnDeleteHandler={onDeleteHandler}/>
                          </Grid>
                        )
                    })} 
                </Grid>
                : <div>{error}</div>
            }
          </div>
  }

