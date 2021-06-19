import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';
import Timer from '../components/Timer';

class TelaJogo extends Component {
  render() {
    return (
      <div>
        <Header />
        <Timer />
        <Questions />
      </div>
    );
  }
}

export default TelaJogo;
