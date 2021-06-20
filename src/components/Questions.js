import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clicked } from '../actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getQuestions() {
    const { results } = this.props;
    const { counter } = this.state;
    if (results.length !== 0) {
      const object = results[counter];
      const incorrectAnswers = object.incorrect_answers;
      const correctAnswers = object.correct_answer;
      const answers = [...incorrectAnswers, correctAnswers];
      return this.sortAnsewrs(answers, object);
    }
  }

  sortAnsewrs(answers, object) {
    const PARAM_1 = 0.5;
    const PARAM_2 = -1;
    const newAnswers = answers.sort(() => (Math.random() > PARAM_1 ? 1 : PARAM_2));
    return this.renderElements(newAnswers, object);
  }

  handleClick() {
    const { clickedState } = this.props;
    clickedState(true);
  }

  renderElements(newAnswers, object) {
    if (object.length === 0) return;
    const { click } = this.props;
    const { category, question } = object;
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
                data-testid="correct-answer"
                onClick={ this.handleClick }
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
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.handleClick }
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

  render() {
    return (
      <main>
        { this.getQuestions() }
      </main>
    );
  }
}

Questions.propTypes = {
  results: PropTypes.string.isRequired,
  clickedState: PropTypes.func.isRequired,
  click: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ questions: { results, click } }) => ({
  results,
  click,
});

const mapDispatchToProps = (dispatch) => ({
  clickedState: (bool) => dispatch(clicked(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
