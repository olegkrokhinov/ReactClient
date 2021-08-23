import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import urljoin from 'url-join';
import ItemActionHeader from '../ItemActionHeader';
import { getItemFromDb } from '../itemFetch';

const URL_HOME = "http://localhost:4000/";

const useStyles = makeStyles((theme) => ({
  root:{
    //margin: theme.spacing(1),
  },
  textField:{
    width: '50ch',
  },
  img:{
    width: 450,
    height: 450
  }
}));

export default function ViewItem(
    { selectedItemId, 
      setSelectedItemId,
      setItemAction,
      itemAction, 

     ...props}) {
  
  const [itemName, setItemName] = useState(''); 
  const [itemDescription, setItemDescription] = useState(''); 
  const [itemUploadedImagePath, setItemUploadedImagePath] = useState('');

  const classes = useStyles();

  useEffect(()=>{
    getItemFromDb(selectedItemId)
    .then (item => {
      setItemName(item.name);
      setItemDescription(item.description);
      setItemUploadedImagePath(urljoin(URL_HOME, item.imageUploadPath));

    })
    .catch(err => {
    })  
  }, [selectedItemId]);

  return (
    <div className={classes.root}>    
        <Grid container 
          spacing={3}  
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
        >
        <Grid item>
          <ItemActionHeader
            itemName={itemName}
            itemDescription={itemDescription}
            itemAction={itemAction}
            setItemAction={setItemAction}
            selectedItemId={selectedItemId}
          />
        </Grid>
          <Grid item>  
            <TextField
              className={classes.textField}
              id="item-name"
              label="Item name"
              value={itemName}
              variant="outlined"
              size="small"
            />            
          </Grid>

          <Grid item>
            <TextField
              className={classes.textField}
              id="item-description"
              label="Item description"
              multiline
              rows={10}
              value={itemDescription}
              variant="outlined"
              size="small"
            />            
          </Grid>

          <Grid item>
            <img src={itemUploadedImagePath} alt={itemUploadedImagePath} className={classes.img}></img>
          </Grid>      

        </Grid>     
    </div>
  );
  
};


 