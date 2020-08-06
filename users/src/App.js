import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {  Route, NavLink } from "react-router-dom";
import UserList from './components/UserList';
import{Axios} from './utils/Axios';



const App = () => {
  const [usersList, setUsersList ] = useState([]);
  useEffect(() => {
    Axios()
    .get("/users")
    .then(res => setUsersList(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">

      {/* <UserList /> */}
      <nav>
        <h1 className="app-header"> Sarah's User List App </h1>
        <div className="nav-link">
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/user-list">User List</NavLink>
          <NavLink to="/user-form">Add User</NavLink>
        </div>
      </nav>

      <Route exact path="/" />
      <Route
      exact 
      path="/user-list"
      render={props => <UserList {...props} usersList={usersList} />}
      />
      <Route
      exact
      path="/user-form">Users</Route>
    </div>
  );
}

export default App;
