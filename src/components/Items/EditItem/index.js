import { Button, Grid, makeStyles, TextField}from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import urljoin from 'url-join';
import { getItemFromDb, saveItemToDb} from '../itemFetch';
import ItemImage from '../ItemImage';
import SaveIcon from '@material-ui/icons/Save';
import ItemActionHeader from '../ItemActionHeader';

const URL_HOME = "http://localhost:4000/";

const useStyles = makeStyles((theme) => ({
  root: {
      //margin: theme.spacing(1),
  },
  textField:{
    width: '50ch',
  }
}));

export default function EditItem(
    {selectedItemId, 
     setSelectedItemId,  
     setItemlistModifyed, 
     itemAction,
     setItemAction,
     ...props}) {
  
  const classes = useStyles();    

  const [itemName, setItemName] = useState(''); 
  const [itemDescription, setItemDescription] = useState(''); 
  const [itemUploadedImagePath, setItemUploadedImagePath] = useState('');
  const [localImageFile, setLocalImageFile] = useState('');
  const [saveItemResultMessage, setSaveItemResultMessage] = useState(''); 

  useEffect(()=>{
    getItemFromDb(selectedItemId)
    .then (item => {
      setItemName(item.name);
      setItemDescription(item.description);
      setItemUploadedImagePath(urljoin(URL_HOME, item.imageUploadPath));
      //console.log(itemUploadedImagePath)
    })
    .catch(err => {
    
    })  
  }, [selectedItemId]);

  function handleNameChange(event) {
    setItemName(event.target.value);
  }
  
  function handleDescriptionChange(event) {
    setItemDescription(event.target.value);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    saveItemToDb(selectedItemId, itemName, itemDescription, localImageFile)
    .then((item)=>{
      setItemlistModifyed((value)=>(!value));
      setItemAction('view');
    })
    .catch(error => {
      setSaveItemResultMessage('Save item catch error: '+ error.message);
    })
  }

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
              itemName = {itemName}
              itemDescription= {itemDescription}
              itemAction= {itemAction}
              setItemAction={setItemAction}
              selectedItemId={selectedItemId}
              setSelectedItemId={setSelectedItemId}
              setItemlistModifyed={setItemlistModifyed}
            />
          </Grid>
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
              <ItemImage itemUploadedImagePath={itemUploadedImagePath} setLocalImageFile={setLocalImageFile}/>
          </Grid>      

          <Grid item>
            <Button startIcon={<SaveIcon />} onClick={handleSubmit} variant="outlined" >
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


 