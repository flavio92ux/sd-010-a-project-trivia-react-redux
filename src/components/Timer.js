import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clicked, timer } from '../actions';

class Timer extends Component {
  constructor() {
    super();

    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  timer() {
    const ONE_SECOND = 1000;

    const timeInterval = setInterval(() => {
      const { clickedState, dispatchTime, time } = this.props;
      if (time > 0) {
        dispatchTime(time - 1);
      } else {
        clickedState(true);
        clearInterval(timeInterval);
      }
    }, ONE_SECOND);
  }

  render() {
    const { time } = this.props;
    return (
      <p>{time}</p>
    );
  }
}

Timer.propTypes = {
  clickedState: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  dispatchTime: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  time: state.questions.time,
});

const mapDispatchToProps = (dispatch) => ({
  clickedState: (bool) => dispatch(clicked(bool)),
  dispatchTime: (time) => dispatch(timer(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
