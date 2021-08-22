import './App.css';
import React, { useEffect, useState } from 'react';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import User from './pages/User.js';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@material-ui/core'
import { AccountCircle, Mail, Reddit } from '@material-ui/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import Subkerrdit from './pages/Subkerrdit';
import Thread from './pages/Thread';
import SubmitThread from './pages/SubmitThread'

function App() {

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    const loggedInUserID = localStorage.getItem('userID');
    if (loggedInUser) {
      setUserInfo({
        username: loggedInUser,
        userID: loggedInUserID
      });
    }
  }, []);

  const handleLogOut = () => {
    setUserInfo(null);
    localStorage.clear();
  }

  // theme argument is currently unused - that may or may not change (TODO)
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  const username = userInfo ? userInfo.username: '';
  return (

    <Router>
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton color='inherit' component={RouterLink} to={'/'}><Reddit fontSize='large'/></IconButton>
            <Typography variant='h6' className={classes.title}>Kerrdit</Typography>
            {userInfo ?
              <>
                <Typography>{username} (karma) </Typography>
                <IconButton color='inherit'><Mail /></IconButton>
                <IconButton color='inherit' component={RouterLink} to={'/u/'+username}><AccountCircle/></IconButton>
                <Button color='inherit' component={RouterLink} to='/' onClick={handleLogOut}>Sign Out</Button>
              </>
              :
              <Button color='inherit' component={RouterLink} to='/login'>Log In</Button>
            }
          </Toolbar>
        </AppBar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/login'>
            <Login setUserInfo={setUserInfo}/>
          </Route>
          <Route path='/signup'>
            <Signup/>
          </Route>
          <Route path='/u/:username'>
            <User />
          </Route>
          <Route path='/r/:subkerrdit/comments/:id'>
            <Thread />
          </Route>
          <Route path='/r/:subkerrdit/submit'>
            <SubmitThread userID={userInfo ? userInfo.userID : null}/>
          </Route>
          <Route path='/r/:subkerrdit'>
            <Subkerrdit />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}


export default App;
