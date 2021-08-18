import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import urljoin from 'url-join';
import { getItemFromDb } from '../itemFetch';

const URL_HOME = "http://localhost:4000/";

const useStyles = makeStyles((theme) => ({
  root:{
    margin: theme.spacing(1),
  },
  textField:{
    width: '50ch',
  }
}));

export default function ViewItem(
    { selectedItemId, 
      setItemAction,
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
        <Typography variant="h5" gutterBottom>
        View Item:
        </Typography>
        <Grid 
          container 
          spacing={3}  
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
      
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
            <img src={itemUploadedImagePath} alt={itemUploadedImagePath} width={450} ></img>
          </Grid>      

        </Grid>     
    </div>
  );
  
};


 