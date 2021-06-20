import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      clicked: false,
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
    this.setState({
      clicked: true,
      disabled: true,
    });
  }

  renderElements(newAnswers, object) {
    if (object.length === 0) return;
    const { category, question } = object;
    const { clicked, time, disabled } = this.state;
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
                className={ clicked && 'correct-answer' }
                disabled={ disabled }
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
              className={ clicked && 'wrong-answer' }
              disabled={ disabled }
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
};

const mapStateToProps = ({ questions: { results } }) => ({
  results,
});

export default connect(mapStateToProps)(Questions);
