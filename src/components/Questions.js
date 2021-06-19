import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
    this.getQuestions = this.getQuestions.bind(this);
  }

  getQuestions() {
    const { results } = this.props;
    const { counter } = this.state;
    if (results.length !== 0) {
      const object = results[counter];
      const incorrectAnswers = object.incorrect_answers;
      const correctAnswers = object.correct_answer;
      const answers = [...incorrectAnswers, correctAnswers];
      console.log(answers);
    }
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
  results: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = ({ questions: { results } }) => ({
  results,
});

export default connect(mapStateToProps)(Questions);
