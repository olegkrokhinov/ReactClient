import { Avatar, Card, CardHeader, Grid, IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import MoreVert  from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';
import urljoin from 'url-join';
const URL_HOME = "http://localhost:4000/";

const useStyles = makeStyles({
  root: {
    //width: 165,
  },
  media: {
    height: 150,
    width: 150,
  },
  selectedItem: {
    backgroundColor: 'red'
  }
});

const ItemListElement = ({ item, selectedItem, itemOnEditHandler, itemOnDeleteHandler, itemOnViewHandler, ...props}) => {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl)
  function handleMenuOpen(event) {
    setAnchorEl(event.target)
  }

  function handleMenuClose(event){
      setAnchorEl(null);
  }

  function onEditHandler(event){
    setAnchorEl(null);
    itemOnEditHandler(item._id);
  }
  
  function onDeleteHandler(event){
    setAnchorEl(null);
    itemOnDeleteHandler(item._id);
  }

  function handleViewItem(){
    itemOnViewHandler(item._id);
  }

  function handleItemClick(event){
    if (event.target.id==='menu-icon'){
      handleMenuOpen(event)
    }else{  
      handleViewItem();
    }
  } 
   

  return <Grid item>
    
          <Card >  
            <CardHeader
              className={(selectedItem==item._id)&&classes.selectedItem}
              avatar={ 
                <Avatar src={urljoin(URL_HOME, item.imageUploadPath)}> 
                </Avatar>
              }
              action={
                <IconButton aria-label="item actions menu" >
                  <MoreVert id='menu-icon'/>
                </IconButton>
              }
              title={item.name}
              subheader={item.description}
              onClick={handleItemClick}
            />
            
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              id='item-actions-menu'
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={onEditHandler}>Edit</MenuItem>
              <MenuItem onClick={onDeleteHandler}>Delete</MenuItem>
            </Menu>
          </Card>   
            
         </Grid>
};

export default ItemListElement;