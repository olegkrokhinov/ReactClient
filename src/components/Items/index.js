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
    button: {
      marginTop: theme.spacing(1),
    }
  }
)); 

export default function Items({...props}) {
  const [itemListModifyed, setItemlistModifyed] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState('');
	const [itemAction, setItemAction] = useState('');

  const classes = useStyles();

  const handleAddItem = (event)=>{
    setSelectedItemId('');
    setItemAction('add');
  };
  const handleRefreshItemsList = (event)=>{
    setItemlistModifyed((value)=>!value);
  };

  return (
      <>
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
                      itemAction={itemAction}
                      setItemAction = {setItemAction}
                      itemListModifyed = {itemListModifyed}
                      setItemlistModifyed={setItemlistModifyed}
                    />                 
                </Grid>
    
                <Grid item container spacing={1}>
                  <Grid item>
                    <Button onClick={handleAddItem} variant="outlined" className={classes.button}>
                      Add item
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={handleRefreshItemsList} variant="outlined" className={classes.button}>
                      Refresh
                    </Button>
                  </Grid>
                </Grid>
    
              </Grid>
            
              <Grid item xs>
                <ItemActionSwitch {...props}
                  selectedItemId={selectedItemId}
                  setSelectedItemId={setSelectedItemId}
                  setItemlistModifyed={setItemlistModifyed}
                  itemAction={itemAction}            
                  setItemAction={setItemAction}
                /> 
              </Grid>

          </Grid>
      </div> 
    </>
  )
}