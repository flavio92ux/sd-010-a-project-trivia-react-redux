import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  verifyAssertions() {
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

  render() {
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">Feedback</h3>
        {this.verifyAssertions()}
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.questions.matches,
});

export default connect(mapStateToProps)(Feedback);
