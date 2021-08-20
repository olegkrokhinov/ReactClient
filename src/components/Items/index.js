import React, { useState } from 'react'
import AddItem from './AddItem';
import EditItem from './EditItem';
import ViewItem from './ViewItem'
import ItemsList from './ItemList';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => (
  {
    root: {
      flexGrow: 1,
      margin: theme.spacing(1),
      
    },
    itemsListGrid: {
      maxWidth:180,
      minWidth:180,
    },
   
    itemsActions: {
      marginBottom: 8,
      marginRight:8,
    },
    addButton: {
      marginTop: 8,
      marginBottom: 8,
      marginLeft: 8,
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
          <Paper elevation={3}>
            <Grid container spacing={1}>
              <Grid item  className={classes.itemsListGrid}>
                  <Button onClick={onAddHandler} variant="outlined" className={classes.addButton}>
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


              <Grid item>
                <Paper elevation={0} variant="outlined" className={classes.itemsActions}>                        
                  {(itemAction==='add')&&
                    <AddItem { ...props}  
                      setSelectedItemId={setSelectedItemId} 
                      setItemlistModifyed = {setItemlistModifyed}
                      setItemAction = {setItemAction}
                    />
                  }
                  {(itemAction==='edit')&&
                    <EditItem { ...props}  
                      selectedItemId = {selectedItemId}
                      setSelectedItemId = {setSelectedItemId} 
                      setItemlistModifyed = {setItemlistModifyed}
                      setItemAction = {setItemAction}
                    />
                  }
                  {(itemAction==='view')&&
                    <ViewItem { ...props}  
                      selectedItemId = {selectedItemId}
                      setItemAction = {setItemAction}
                    />
                  }
                </Paper>
              </Grid>  
            </Grid>
          </Paper>
        </div> 
         )
}