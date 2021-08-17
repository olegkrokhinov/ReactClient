import { Dialog, FormControl, Grid, InputBase, InputLabel, makeStyles, Slide, withStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import urljoin from 'url-join';
import { getItemFromDb, saveItemToDb} from '../itemFetch';
import ItemImage from '../ItemImage';

const URL_HOME = "http://localhost:4000/";

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));


export default function EditItem(
    {selectedItemId, 
     setSelectedItemId,  
     setItemlistModifyed, 
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
      setItemAction('');
    })
    .catch(error => {
      setSaveItemResultMessage('Save item catch error: '+ error.message);
    })
  }

  return (
    
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>      
          <Grid item>  
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="item-name">Name</InputLabel>
              <BootstrapInput id="item-name"  value={itemName} onChange={handleNameChange}  />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="item-description">Description</InputLabel>
              <BootstrapInput id="item-description"  value={itemDescription} onChange={handleDescriptionChange}/>
            </FormControl>
          </Grid>
          <Grid item>
            <ItemImage itemUploadedImagePath={itemUploadedImagePath} setLocalImageFile={setLocalImageFile}/>
          </Grid>         
        </Grid>     
        <input type="submit" value="Save" />
        
        {saveItemResultMessage &&  
          <div>
            {saveItemResultMessage}
          </div>
        }
      </form>
  
  );
  
};


 