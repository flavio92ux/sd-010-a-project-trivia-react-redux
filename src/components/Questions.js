import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { clicked, setScore, stopInterval, stopTime, timer } from '../actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      sorted: false,
      newAnswers: [],
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sortAnsewrs = this.sortAnsewrs.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    this.setLocalStorage();
  }

  componentDidUpdate() {
    this.setLocalStorage();
  }

  setLocalStorage() {
    const { name, matches, score, email } = this.props;

    localStorage.state = JSON.stringify({
      player: {
        name,
        assertions: matches,
        score,
        gravatarEmail: email,
      },
    });
  }

  setScore(difficulty) {
    const { time, dispatchScore } = this.props;
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;
    const CONSTANT = 10;
    let score = 0;

    switch (difficulty) {
    case 'easy':
      score = CONSTANT + (EASY * time);
      break;
    case 'medium':
      score = CONSTANT + (MEDIUM * time);
      break;
    default:
      score = CONSTANT + (HARD * time);
    }
    dispatchScore(score);
  }

  getQuestions() {
    const { results, sendStopInterval } = this.props;
    const { counter } = this.state;
    if (results.length !== 0) {
      if (results.length === counter) {
        sendStopInterval(true);
        return (
          <Redirect to="/feedback" />
        );
      }
      const object = results[counter];
      const incorrectAnswers = object.incorrect_answers;
      const correctAnswers = object.correct_answer;
      const answers = [...incorrectAnswers, correctAnswers];
      return this.sortAnsewrs(answers, object);
    }
  }

  sortAnsewrs(answers, object) {
    const { sorted, newAnswers } = this.state;
    const PARAM_1 = 0.5;
    const PARAM_2 = -1;
    const arraySorted = answers.sort(() => (Math.random() > PARAM_1 ? 1 : PARAM_2));
    if (!sorted) {
      this.setState({
        sorted: true,
        newAnswers: arraySorted,
      });
    }

    if (newAnswers) return this.renderElements(newAnswers, object);
    return this.renderElements(arraySorted, object);
  }

  handleClick({ target }, difficulty) {
    const { clickedState, timerStop } = this.props;
    timerStop(true);
    clickedState(true);
    if (target.name === 'correct') {
      this.setScore(difficulty);
    }
  }

  handleNext() {
    const { counter } = this.state;
    const { clickedState, timerStop, dispatchTime } = this.props;
    const INITIAL_TIME = 30;

    this.setState({
      counter: counter + 1,
      sorted: false,
    });

    clickedState(false);
    dispatchTime(INITIAL_TIME);
    timerStop(false);
  }

  renderElements(newAnswers, object) {
    if (object.length === 0) return;
    const { click } = this.props;
    const { category, question, difficulty } = object;
    const { time } = this.state;
    return (
      <div>
        <p>{time}</p>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        {newAnswers.map((answer, index) => {
          if (answer === object.correct_answer) {
            return (
              <button
                type="button"
                name="correct"
                data-testid="correct-answer"
                onClick={ (e) => this.handleClick(e, difficulty) }
                className={ click && 'correct-answer' }
                disabled={ click }
              >
                {answer}
              </button>
            );
          }
          return (
            <button
              key={ index }
              type="button"
              name="incorrect"
              data-testid={ `wrong-answer-${index}` }
              onClick={ (e) => this.handleClick(e, difficulty) }
              className={ click && 'wrong-answer' }
              disabled={ click }
            >
              {answer}
            </button>
          );
        })}
      </div>
    );
  }

  renderButton() {
    const { click } = this.props;
    if (!click) return;
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.handleNext }
      >
        Próxima
      </button>
    );
  }

  render() {
    return (
      <main>
        { this.getQuestions() }
        { this.renderButton() }
      </main>
    );
  }
}

Questions.propTypes = {
  results: PropTypes.string.isRequired,
  clickedState: PropTypes.func.isRequired,
  click: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  timerStop: PropTypes.func.isRequired,
  dispatchScore: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  matches: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  dispatchTime: PropTypes.func.isRequired,
  sendStopInterval: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  results: state.questions.results,
  click: state.questions.click,
  time: state.questions.time,
  name: state.login.name,
  email: state.login.email,
  score: state.questions.score,
  matches: state.questions.matches,
  stopInterval: state.questions.stopInterval,
});

const mapDispatchToProps = (dispatch) => ({
  clickedState: (bool) => dispatch(clicked(bool)),
  timerStop: (bool) => dispatch(stopTime(bool)),
  dispatchScore: (score) => dispatch(setScore(score)),
  dispatchTime: (time) => dispatch(timer(time)),
  sendStopInterval: (bool) => dispatch(stopInterval(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
