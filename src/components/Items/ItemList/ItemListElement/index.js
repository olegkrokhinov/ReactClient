import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import urljoin from 'url-join';
const URL_HOME = "http://localhost:4000/";

const useStyles = makeStyles({
  root: {
    width: 165,
  },
  media: {
    height: 150,
  },
});

const ItemListElement = ({item, itemOnEditHandler, itemOnDeleteHandler, itemOnViewHandler, ...props}) => {

  const classes = useStyles();


  function onEditHandler(event){
    itemOnEditHandler(item._id);
  }
  
  function onDeleteHandler(event){
    itemOnDeleteHandler(item._id);
  }

  function onViewHadnler(event){
    itemOnViewHandler(item._id);
  } 
   
  return (
    <Card className={classes.root} >
      <CardActionArea>
        {item.imageUploadPath &&
          <CardMedia
            className={classes.media}
            image={urljoin(URL_HOME, item.imageUploadPath)}
            title="Item image"
            onClick={onViewHadnler}
          />
        }
        <CardContent>
          <Typography variant="h5">
            {item.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={onEditHandler} size="small" variant="outlined">
          Edit
        </Button>
       
        <Button onClick={onDeleteHandler} size="small" variant="outlined">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
    
};

export default ItemListElement;