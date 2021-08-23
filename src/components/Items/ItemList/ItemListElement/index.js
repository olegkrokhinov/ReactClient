import { Avatar, Card, CardHeader, Grid, makeStyles} from '@material-ui/core';

import React from 'react';
import urljoin from 'url-join';

const URL_HOME = "http://localhost:4000/";

const useStyles = makeStyles({
  selectedItem: {
    backgroundColor: '#e8eaf6'
  }
});

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

  return <Grid item>
    
          <Card >  
            <CardHeader
              className={(selectedItemId === item._id) ? classes.selectedItem : ''}
              avatar={ 
                <Avatar src={urljoin(URL_HOME, item.imageUploadPath)}> 
                </Avatar>
              }
              title={item.name}
              subheader={item.description}
              onClick={handleView}
            />
            
          </Card>   
            
         </Grid>
};