import './App.css';
import React, { useEffect, useState } from 'react';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js'
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

function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      //const foundUser = JSON.parse(loggedInUser);
      setUser(loggedInUser);
    }
  }, []);

  const handleLogOut = () => {
    setUser('');
    localStorage.clear();
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton color='inherit'><Reddit fontSize='large'/></IconButton>
            <Typography variant='h6' className={classes.title}>Kerrdit</Typography>
            {user ?
              <>
                <Typography>{user} (karma) </Typography>
                <IconButton color='inherit'><Mail /></IconButton>
                <IconButton color='inherit' component={RouterLink} to={'/u/'+user}><AccountCircle/></IconButton>
                <Button color='inherit' component={RouterLink} to='/' onClick={handleLogOut}>Sign Out</Button>
              </>
              :
              <Button color='inherit' component={RouterLink} to='/login'>Log In</Button>
            }
          </Toolbar>
        </AppBar>
        <p>{user ? `Hello, ${user}` : '' }</p>
        <nav>
          <ul>
            <li>
              <RouterLink to='/'>Home</RouterLink>
            </li>
            <li>
              <RouterLink to='/login'>Log In</RouterLink>
            </li>
            <li>
              <RouterLink to='/signup'>Sign Up</RouterLink>
            </li>
            <li>
              <RouterLink to='/users'>Users</RouterLink>
            </li>
            <li>
              <RouterLink to='/' onClick={handleLogOut}>Log Out</RouterLink>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/login'>
            <Login setUser={setUser}/>
          </Route>
          <Route path='/signup'>
            <Signup/>
          </Route>
          <Route path='/users'>
            <Users />
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

function Users() {
  return <h2>Users</h2>;
}

export default App;
