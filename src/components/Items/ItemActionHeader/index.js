import { Grid, IconButton, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import MoreVert  from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';
import { deleteItemFromDb } from '../itemFetch';

const useStyles = makeStyles((theme) => (
{
  root: {
    //width: 165,
  },
  btn: {
    minWidth: 50,
    maxWidth: 50,
  },
  content: {
    marginLeft: theme.spacing(1),
  }
  ,
  itemActionHeader: {
    height: 70,
    backgroundColor: '#e8eaf6'
  }
}));

export default function ItemActionHeader (
  {  
    itemName,
    itemDescription,
    itemAction,  
    setItemAction,
    selectedItemId,
    setSelectedItemId,
    setItemlistModifyed,
    ...props}) {

    const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl)
  
  function handleMenuOpen(event) {
    setAnchorEl(event.target)
  }

  function handleMenuClose(event){
      setAnchorEl(null);
  }

  function handleEdit(event) {
    setAnchorEl(null);
    setItemAction('edit');
  }

  function handleDelete(event) {
    setAnchorEl(null);
    deleteItemFromDb(selectedItemId)
      .then(() => {
        setItemlistModifyed((value) => (!value));
        setSelectedItemId('');
        setItemAction('')
      })
      .catch()
  }

  return <>
              <Grid container className={classes.itemActionHeader}>
                <Grid item container xs direction='column' alignContent='flex-start' justifyContent='center'>
                  <Grid item className={classes.content}>
                    <Typography variant='h6'>
                      {itemName}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.content}>
                    <Typography >
                      {itemDescription}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item className={classes.btn} container alignContent='center'>
                {((itemAction === 'edit') || (itemAction === 'view')) &&
                  <IconButton aria-label="item actions menu" onClick={handleMenuOpen}>
                    <MoreVert id='menu-icon'/>
                  </IconButton>
                }
                </Grid>
              </Grid>
          
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              id='item-actions-menu'
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
              {(itemAction==='view')&&
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
              }
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>  
           
         </>
};