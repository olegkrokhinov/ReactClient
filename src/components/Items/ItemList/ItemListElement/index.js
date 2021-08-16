import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import urljoin from 'url-join';
const URL_HOME = "http://localhost:4000/";

const useStyles = makeStyles({
  root: {
    maxWidth: 240,
  },
  media: {
    height: 240,
  },
});

const ItemListElement = ({item, onEditHandler, onDeleteHandler, ...props}) => {

  const classes = useStyles();

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
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button value={item._id} onClick={onEditHandler} size="small" color="primary">
          Edit
        </Button>
        <Button value={item._id} onClick={onDeleteHandler} size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
    
};

export default ItemListElement;