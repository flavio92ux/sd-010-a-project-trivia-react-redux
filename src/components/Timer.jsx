import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { timeOut } from '../actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      time: 30,
    };
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    const { time } = this.state;
    const ONE_SECOND = 1000;
    const currTime = setInterval(() => {
      const { timesUp } = this.props;
      if (time > 1) {
        this.timer();
      }
      if (time === 1 || timesUp) clearInterval(currTime);
    }, ONE_SECOND);
  }

  timer() {
    const { time } = this.state;
    const { currentTime } = this.props;
    if (time === 0) {
      return currentTime();
    }
    this.setState((previousState) => ({ time: previousState.time - 1 }));
  }

  render() {
    const { time } = this.state;
    return (
      <p id="timer">{ time }</p>
    );
  }
}

const mapStateToProps = (state) => ({
  timesUp: state.player.timeOut,
});

const mapDispatchToProps = (dispatch) => ({
  currentTime: () => dispatch(timeOut()),
});

Timer.propTypes = {
  currentTime: Proptypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
