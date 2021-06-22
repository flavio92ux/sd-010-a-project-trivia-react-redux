import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  sort() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    ranking.sort((a, b) => Number(b.score) - Number(a.score));

    return this.renderRanking(ranking);
  }

  renderRanking(ranking) {
    return (
      <div>
        {ranking.map((item, index) => (
          <div key={ index }>
            <img src={ item.picture } alt="gravatar" />
            <br />
            <span>Nome:</span>
            <span data-testid={ `player-name-${index}` }>{ item.name }</span>
            <br />
            <span>Score: </span>
            <span data-testid={ `player-score-${index}` }>{ item.score }</span>
            <hr />
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <section>
        <header
          data-testid="ranking-title"
        >
          Tela de ranking
        </header>
        {this.sort()}
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Início
          </button>
        </Link>
      </section>
    );
  }
}

export default Ranking;
