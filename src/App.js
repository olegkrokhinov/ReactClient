


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


import { refreshAccessTokenFromServer, logOut, authenticatedUser,  addUserIsAuthentificatedListener} from './userAuth.js';


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
  const [appBarTitle, setAppBarTitle] = useState('Game');
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(!(authenticatedUser.userAccessToken==''));

  addUserIsAuthentificatedListener(setUserIsAuthenticated);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(open);
  };

  const TESTconsoleLog= () => {
    refreshAccessTokenFromServer()
    .then(()=>console.log(authenticatedUser.userAccessToken))
    
  }
//<IconButton  onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
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
          
            {!userIsAuthenticated && 
              <>
              <Button color="inherit"  component={Link} to="/register">Register</Button>
              <Button color="inherit"  component={Link} to="/login">Login</Button>
              </>
            }
            {userIsAuthenticated &&
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
          {userIsAuthenticated && 
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
