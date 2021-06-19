import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import TelaJogo from './pages/TelaJogo';
import Login from './pages/Login';
import Settings from './pages/Settings';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/tela-do-jogo" component={ TelaJogo } />
          <Route exact path="/settings" component={ Settings } />
        </Switch>
      </div>
    );
  }
}

export default App;
