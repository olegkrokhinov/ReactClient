import { Avatar, Grid, makeStyles, Typography} from '@material-ui/core';

import React from 'react';
import urljoin from 'url-join';

const URL_HOME = "http://localhost:4000/";

const useStyles = makeStyles((theme)=>({
  selectedItem: {
    backgroundColor: '#e8eaf6'
  },
  content: {
    marginLeft: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: theme.spacing(1),
  }
}));

export default function ItemListElement(
  { item, 
    selectedItemId, 
    setSelectedItemId, 
    setItemAction, 
    ...props}){

  const classes = useStyles();
   
  function handleView(event) {
    setSelectedItemId(item._id);
    setItemAction('view');
  }

  function handleEdit(event) {
    setSelectedItemId(item._id);
    setItemAction('edit');
  }

  return <Grid item container 
               onDoubleClick={handleEdit} 
               onClick={handleView}  
               className={(selectedItemId === item._id)? classes.selectedItem : ''}>
    
            <Grid item>
              <Avatar
                className={classes.avatar}
                variant='rounded'
                alt= ''
                src={urljoin(URL_HOME, item.imageUploadPath)} >
                  Empty
              </Avatar>
            </Grid>
            <Grid item container xs direction='column' alignContent='flex-start' justifyContent='center'>
              <Grid item className={classes.content}>
                <Typography variant='h6'>
                  {item.name}
                </Typography>
              </Grid>
              <Grid item className={classes.content}>
                <Typography >
                  {item.description}
                </Typography>
              </Grid>
            </Grid>
            
        </Grid>
            
  
};