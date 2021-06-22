import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.scoreOfPerson = this.scoreOfPerson.bind(this);
  }

  feedbackMensage() {
    const { assertions } = this.props;
    const CUT_MATCHES = 3;

    if (assertions < CUT_MATCHES) {
      return (
        <h4 data-testid="feedback-text">Podia ser melhor...</h4>
      );
    }
    return (
      <h4 data-testid="feedback-text">Mandou bem!</h4>
    );
  }

  scoreOfPerson() {
    const { assertions, score } = this.props;

    return (
      <div>
        <span>Placar Final: </span>
        <span data-testid="feedback-total-score">{score}</span>
        <br />
        <span>Total de acertos: </span>
        <span data-testid="feedback-total-question">{assertions}</span>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">Feedback</h3>
        {this.feedbackMensage()}
        {this.scoreOfPerson()}
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Jogar Novamente
          </button>
        </Link>
        <Link to="ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.questions.matches,
  score: state.questions.score,
});

export default connect(mapStateToProps)(Feedback);
