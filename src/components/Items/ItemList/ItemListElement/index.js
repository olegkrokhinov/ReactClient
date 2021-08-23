import { Avatar, Card, CardHeader, Grid, makeStyles} from '@material-ui/core';

import React, { useState } from 'react';
import urljoin from 'url-join';

const URL_HOME = "http://localhost:4000/";

const useStyles = makeStyles({
  root: {
    //width: 165,
  },
  media: {
    //height: 300,
    //width: ,
  },
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

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl)
  
  function handleMenuOpen(event) {
    setAnchorEl(event.target)
  }

  function handleMenuClose(event){
      setAnchorEl(null);
  }
   
  function handleView(event) {
    setSelectedItemId(item._id);
    setItemAction('view');
  }

//className={(selectedItemId==item._id)&&classes.selectedItem}

  return <Grid item>
    
          <Card >  
            <CardHeader
              className={(selectedItemId == item._id) && classes.selectedItem}
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