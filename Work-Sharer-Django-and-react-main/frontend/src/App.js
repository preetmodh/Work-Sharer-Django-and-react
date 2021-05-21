import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Register from "./components/register"
import Login from "./components/login"
import Home from "./components/home"
import Profile from './components/profile';
import Logout from './components/logout';

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={ Login }></Route>
      <Route exact path="/login" component={ Login }></Route>
      <Route exact path="/profile" component={ Profile }></Route>
        <Route exact path="/register" component={ Register }></Route>
        <Route exact path="/home" component={ Home }></Route>
        <Route exact path="/logout" component={ Logout }></Route>
      </Switch>
    </Router>
  );
}

export default App;
