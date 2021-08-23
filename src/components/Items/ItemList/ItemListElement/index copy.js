import { Avatar, Card, CardHeader, Grid, IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import MoreVert  from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';
import urljoin from 'url-join';
import { deleteItemFromDb } from '../../itemFetch';
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
    setItemlistModifyed, 
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

  function handleItemClick(event){
    if (event.target.id==='menu-icon'){
      handleMenuOpen(event)
    }else{  
      handleView(event);
    }
  } 
   
  function handleView(event) {
    setSelectedItemId(item._id);
    setItemAction('view');
  }

  function handleEdit(event) {
    setAnchorEl(null);
    setSelectedItemId(item._id);
    setItemAction('edit');
  }

  function handleDelete(event) {
    setAnchorEl(null);
    deleteItemFromDb(item._id)
      .then(() => {
        setItemlistModifyed((value) => (!value));
        setSelectedItemId('');
        setItemAction('')
      })
      .catch()
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
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </Card>   
            
         </Grid>
};