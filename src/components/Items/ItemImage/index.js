
import { Button, makeStyles } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import React, { useState, useEffect} from 'react';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  input: {
    display: 'none',
  },
  img: {
    width: 450,
    height: 450,
    borderRadius: 5,
  },
  btn:{
    position: 'absolute',
    top: '45%',
    left: '20%',
    cursor: 'pointer',
  }
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
    <div className={classes.root}>
      <img src={itemImagePreviewUrl} alt = '' className={classes.img}></img>
    
      <input accept="image/*" className={classes.input} id="button-file" type="file" onChange={handleItemImageChange}/>
      <label htmlFor="button-file">
        <Button startIcon={<PhotoCamera />} 
                size="small" 
                variant="contained"
                aria-label="button-file" 
                className={classes.btn}
                component="span"
        >
          Upload image
        </Button>
       </label>
    </div>
           
       
    
  );
  
};
