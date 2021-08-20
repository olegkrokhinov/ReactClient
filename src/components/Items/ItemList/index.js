import React, { useEffect, useState } from 'react'
import ItemsListElement from './ItemListElement'
import { getItemsList, deleteItemFromDb } from '../itemFetch'
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => (
  {
    root: {
      margin: theme.spacing(1),
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

  return  <div className={classes.root}> 
            { !error 
                ? <Grid container spacing={1} >
                    {list.map((item, index)=>{
                        return (
                          <Grid item >
                            <ItemsListElement {...props} key={index} item = {item} itemOnViewHandler={onViewHandler} itemOnEditHandler={onEditHandler} itemOnDeleteHandler={onDeleteHandler}/>
                          </Grid>
                        )
                    })} 
                </Grid>
                : <div>{error}</div>
            }
          </div>
  }

