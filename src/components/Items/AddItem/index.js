import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState} from 'react';
import { addItemToDb } from '../itemFetch';
import ItemImage from '../ItemImage';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  textField:{
    width: '50ch',
  }
}));

export default function AddItem(
    {setItemlistModifyed, 
     setSelectedItemId,
     setItemAction,
     ...props}) {
  
  const [itemName, setItemName] = useState(''); 
  const [itemDescription, setItemDescription] = useState(''); 
  const [localImageFile, setLocalImageFile] = useState(''); 
  const [saveItemResultMessage, setSaveItemResultMessage] = useState(''); 

  const classes = useStyles();  
 
  function handleNameChange(event) {
    setItemName(event.target.value);
  }
  
  function handleDescriptionChange(event) {
    setItemDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    addItemToDb(itemName, itemDescription, localImageFile)
    .then((item)=>{
      setItemlistModifyed((value)=>(!value));
      setSelectedItemId(item._id);
      setItemAction('');
    })
    .catch(error => {
      setSaveItemResultMessage('Save item catch error: '+ error.message);
    })
  }

  return (
    <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          Add Item:
        </Typography>
        <Grid container spacing={3}  direction="column">      

          <Grid item>  
            <TextField
              className={classes.textField}
              id="item-name"
              label="Item name"
              value={itemName}
              placeholder="Enter item name here"
              onChange={handleNameChange}
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
              placeholder="Enter item description here"
              onChange={handleDescriptionChange}
              variant="outlined"
              size="small"
            />            
          </Grid>

          <Grid item>
            <ItemImage itemUploadedImagePath='' setLocalImageFile={setLocalImageFile}/>
          </Grid>      

           <Grid item>
            <Button onClick={handleSubmit} variant="outlined" color="primary">
              Save
            </Button>
          </Grid>

        </Grid>     
        
        {saveItemResultMessage &&  
          <div>
            {saveItemResultMessage}
          </div>
        }



    </div>
  );
  
};


 