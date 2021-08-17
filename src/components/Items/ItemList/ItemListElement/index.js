import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import urljoin from 'url-join';
const URL_HOME = "http://localhost:4000/";

const useStyles = makeStyles({
  root: {
    width: 240,
  },
  media: {
    height: 240,
  },
});

const ItemListElement = ({item, itemOnEditHandler, itemOnDeleteHandler, ...props}) => {

  const classes = useStyles();


  function onEditHandler(event){
    itemOnEditHandler(item._id);
  }
  
  function onDeleteHandler(event){
    itemOnDeleteHandler(item._id);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {item.imageUploadPath &&
          <CardMedia
            className={classes.media}
            image={urljoin(URL_HOME, item.imageUploadPath)}
            title="Item image"
          />
        }
        <CardContent>
          <Typography variant="h5">
            {item.name}
          </Typography>
          <Typography color="textSecondary">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={onEditHandler} size="small" color="primary">
          Edit
        </Button>
       
        <Button onClick={onDeleteHandler} size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
    
};

export default ItemListElement;