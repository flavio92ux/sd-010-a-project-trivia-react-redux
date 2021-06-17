import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import Header from '../components/Header';
import { calculateScore, fetchAPIThunk, timein, timeOut } from '../actions/index';
import Timer from '../components/Timer';
import RenderQuestions from '../components/RenderQuestions';
import { getItemFromLocalStorage, setToLocalStorage } from '../services/storage';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      shouldRedirect: false,
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  nextQuestion() {
    const { apiResult: { results }, next } = this.props;
    const { questionNumber } = this.state;
    console.log(results.length - 1);
    console.log(questionNumber);
    if (results.length - 1 === questionNumber) {
      this.setState(({ shouldRedirect: true }));
      return;
    }
    this.setState({ questionNumber: questionNumber + 1 });
    next();
  }

  checkAnswer(event, questionLevel) {
    const { addScore, timesUp } = this.props;
    const DEFAULT_POINTS = 10;
    const getTime = Number(document.getElementById('timer').innerHTML);
    const attribute = event.target.getAttribute('data-testid');
    const state = getItemFromLocalStorage('state');
    if (attribute !== 'correct-answer') return timesUp();
    const points = DEFAULT_POINTS + (getTime * questionLevel);
    state.player.score = points;
    setToLocalStorage('state', state);
    timesUp();
    return addScore(points);
  }

  render() {
    const { isLoading, questionAnswered } = this.props;
    const { questionNumber, shouldRedirect } = this.state;
    if (isLoading) return <h2>Loading...</h2>;
    if (shouldRedirect) return <Redirect to="/feedback" />;
    return (
      <div>
        <Header />
        <span>
          Tempo:
          <Timer />
          segundos
        </span>
        <RenderQuestions
          checkAnswer={ this.checkAnswer }
          question={ questionNumber }
        />
        {questionAnswered
          ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.nextQuestion }
            >
              PRÓXIMA
            </button>) : ''}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchAPIThunk()),
  timesUp: () => dispatch(timeOut()),
  addScore: (score) => dispatch(calculateScore(score)),
  next: () => dispatch(timein()),
});

const mapStateToProps = ({ apiResponse: { isLoading, apiResult }, player }) => ({
  isLoading,
  questionAnswered: player.timeOut,
  apiResult,
});

Game.propTypes = {
  fetchAPI: Proptypes.func,
  isLoading: Proptypes.bool,
  timesUp: Proptypes.func,
  addScore: Proptypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
