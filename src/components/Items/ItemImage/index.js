
import { Button, makeStyles } from '@material-ui/core';
import React, { useState, useEffect} from 'react';
import urljoin from 'url-join';

const URL_HOME = "http://localhost:4000/";
const URL_ITEMS = "http://localhost:4000/items/";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function ItemImage(
    {itemUploadedImagePath,
     setLocalImageFile, 
     ...props}) {
  
  const classes = useStyles();
  const [itemImagePreviewUrl, setItemImagePreviewUrl] = useState(); 
  
  function handleItemImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      setLocalImageFile(file);
      setItemImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(()=>{
    setItemImagePreviewUrl(itemUploadedImagePath);
  },[itemUploadedImagePath]);

  return (
    <div>
       <img src={itemImagePreviewUrl} height='150' weight='150' alt={itemImagePreviewUrl}>
       
       </img>
       
       <label htmlFor="contained-button-file">
        <Button  variant="outlined" color="primary"  component="span">
          Select image
        </Button>
      </label>  

     
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleItemImageChange}
      />
    </div>
  );
  
};
