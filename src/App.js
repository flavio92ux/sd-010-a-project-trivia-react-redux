import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import TelaJogo from './pages/TelaJogo';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/tela-do-jogo" component={ TelaJogo } />
          <Route exact path="/settings" component={ Settings } />
          <Route exact path="/feedback" component={ Feedback } />
          <Route exact path="/ranking" component={ Ranking } />
        </Switch>
      </div>
    );
  }
}

export default App;
