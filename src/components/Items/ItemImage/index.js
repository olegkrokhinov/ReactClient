
import { IconButton, ImageList, ImageListItem, ImageListItemBar, makeStyles } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import React, { useState, useEffect} from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  imageList: {
    width: 900,
  },
  imageBar: {
     background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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
    <div>
      <ImageList rowHeight={400}  className={classes.imageList}>
        <ImageListItem key={itemImagePreviewUrl}>
          <img src={itemImagePreviewUrl} alt={itemImagePreviewUrl} ></img>
          <ImageListItemBar
            className={classes.imageBar}
            actionIcon={
              <>
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleItemImageChange}/>
                <label htmlFor="icon-button-file">
                <IconButton aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
                </label>
              </>
            }
          />
        </ImageListItem>      
      </ImageList>
    </div>
  );
  
};
