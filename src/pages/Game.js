import React from 'react';
import { Link } from 'react-router-dom';
import Questions from '../components/Questions';
import Header from '../components/Header';

class Game extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <section>
        <Link to="/feedback">Teste</Link>
        <Header />
        <Questions />
      </section>
    );
  }
}

export default Game;
