import React, { useEffect, useState } from 'react'
import AddItem from './AddItem';
import EditItem from './EditItem';
import ViewItem from './ViewItem'
import ItemsList from './ItemList';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => (
  {
    root: {
      flexGrow: 1,
      marginLeft:16
    }
  }
)); 

export default function Items({...props}) {
  const [itemListModifyed, setItemlistModifyed] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState('');
	const [itemAction, setItemAction] = useState('');

  const classes = useStyles();

  const onAddHandler = (event)=>{
    setSelectedItemId('');
    setItemAction('add');
  };

  return ( 
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
         
              <Button onClick={onAddHandler} size="small" color="primary">
                 Add item
              </Button>
                
              <ItemsList {...props}
                selectedItemId ={selectedItemId} 
                setSelectedItemId={setSelectedItemId} 
                setItemAction = {setItemAction}
                itemListModifyed = {itemListModifyed}
                setItemlistModifyed = {setItemlistModifyed}
              />  	
	          </Grid>
	          <Grid item xs={9}>
              {(itemAction=='add')&&
                <AddItem { ...props}  
                  setSelectedItemId={setSelectedItemId} 
                  setItemlistModifyed = {setItemlistModifyed}
                  setItemAction = {setItemAction}
                />
              }
              {(itemAction=='edit')&&
                <EditItem { ...props}  
                  selectedItemId = {selectedItemId}
                  setSelectedItemId = {setSelectedItemId} 
                  setItemlistModifyed = {setItemlistModifyed}
                  setItemAction = {setItemAction}
                />
              }
               {(itemAction=='view')&&
                <ViewItem { ...props}  
                  selectedItemId = {selectedItemId}
                  setItemAction = {setItemAction}
                />
              }
	          </Grid>  
          </Grid>
        </div> 
         )
}