import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from '../components/Login';
import Logup from '../components/Logup';
import Main from '../components/Main';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/logup" component={Logup} />
          <Route path="/main" component={Main} />
        </Switch>
      </div>
    );
  }
}

export default App;
