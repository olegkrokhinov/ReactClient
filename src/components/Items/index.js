import React, { useState } from 'react'
import ItemsList from './ItemList';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ItemActionSwitch from './ItemActionSwitch';

const useStyles = makeStyles((theme) => (
  {
    root: {
      flexGrow: 1,
      margin: theme.spacing(1),
    },
    itemsListGridItem: {
      maxWidth:400,
      minWidth:400,
    },
    addButton: {
      marginTop: theme.spacing(1),
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

  return <>
    <div className={classes.root}>
        <Grid container 
              spacing={1}
              direction = 'row'
              alignItems= 'stretch'
        >
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
                      setItemlistModifyed={setItemlistModifyed}
                  />                 
              </Grid>
  
              <Grid item>
                <Button onClick={onAddHandler} variant="outlined" className={classes.addButton}>
                  Add item
                </Button>
              </Grid>
  
            </Grid>
          
            <Grid item xs>
              <ItemActionSwitch
                itemAction={itemAction}            
                selectedItemId={selectedItemId}
                setSelectedItemId={setSelectedItemId}
                setItemlistModifyed={setItemlistModifyed}
                setItemAction={setItemAction}
              /> 
            </Grid>

        </Grid>
    </div> 
  </>
}