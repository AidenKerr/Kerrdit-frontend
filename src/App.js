import './App.css';
import React, { useEffect, useState } from 'react';
import Login from './pages/Login.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
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

  return (
    <Router>
      <div>
        <p>{user ? `Hello, ${user}` : '' }</p>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to='/' onClick={handleLogOut}>Log Out</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login setUser={setUser}/>
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
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
