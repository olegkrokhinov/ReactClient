
import { AppBar, Button, Container, IconButton, ListItem, ListItemText, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { ListItemIcon } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import { makeStyles } from '@material-ui/core/styles';

import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import Home from './components/Home.js';
import Items from './components/Items';
import UserLogin from './components/UserLogin.js';
import UserRegister from './components/UserRegister.js';
import { logOut, userAccessToken } from './userAuth.js';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function App() {

  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const [updateComponentSwitch, setUpdateComponentSwitch] = useState(true); 
  const [appBarTitle, setAppBarTitle] = useState('Game');

  useEffect(()=>{
    setUpdateComponentSwitch(!updateComponentSwitch);
  }, [userAccessToken]);
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawer(open);
  };

  return (
    <>
        <AppBar  position="static">
          <Toolbar>
            <IconButton  onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
             <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} >
              {appBarTitle}
            </Typography>
          
            {!userAccessToken && 
              <>
              <Button color="inherit"  component={Link} to="/register">Register</Button>
              <Button color="inherit"  component={Link} to="/login">Login</Button>
              </>
            }
            {userAccessToken &&
              <Button color="inherit"  component={Link} to="/" onClick={logOut}>LogOut</Button>
            } 
          </Toolbar>
        </AppBar>
        
        <SwipeableDrawer
            anchor = 'left'
            open = {drawer}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
          <ListItem button key={Home} component={Link} to="/" onClick={()=>setDrawer(false)}>
            <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          {userAccessToken && 
            <ListItem button key={Items} component={Link} to="/items"  onClick={()=>setDrawer(false)}>
              <ListItemIcon><ListRoundedIcon /></ListItemIcon>
              <ListItemText primary='Items' />
            </ListItem> 
          }
        </SwipeableDrawer>
      
        <Container maxWidth="xl">
          <Switch>
            <Route exact path="/"
              render={ (props) => <Home setAppBarTitle = {setAppBarTitle} {...props} />}>
            </Route>
            <Route exact path="/login"
                render={ (props) => <UserLogin {...props} />}>
            </Route>
            <Route exact path="/register"
              render={ (props) => <UserRegister {...props} />}>
            </Route>
            <Route exact path="/Items"
              render={ (props) => <Items setAppBarTitle = {setAppBarTitle} {...props} />}>
            </Route>
          </Switch>
        </Container>    

    </>

  );

}
