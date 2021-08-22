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
    itemsListGridItem: {
      maxWidth:600,
      minWidth:600,
    },
   
    itemsActions: {
      //marginBottom: 8,
      //marginRight:8,
    },
    addButton: {
      marginTop: 8,
      //marginBottom: 8,
      
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
            <Grid container 
                  spacing={1}
                  direction = 'row'
                  alignItems='stretch'
            >
               <Paper>
                <Grid item container 
                        direction='column'
                        className={classes.itemsListGridItem}
                        alignItems='flex-start'
                  > 
                
                    <Grid item 
                          container 
                          direction='column' 
                          alignItems='stretch'
                    >
                        <ItemsList {...props} 
                            selectedItemId ={selectedItemId} 
                            setSelectedItemId={setSelectedItemId} 
                            setItemAction = {setItemAction}
                            itemListModifyed = {itemListModifyed}
                            setItemlistModifyed = {setItemlistModifyed} 
                        />                 
                    </Grid>
      
                    <Grid item>
                      <Button onClick={onAddHandler} variant="outlined" className={classes.addButton}>
                        Add item
                      </Button>
                    </Grid>
      
                </Grid>
              </Paper>

              <Grid item xs>
                <Paper>
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
        </div> 
         )
}