import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clicked } from '../actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      time: 30,
    };
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  timer() {
    const { clickedState } = this.props;
    const ONE_SECOND = 1000;
    const timer = setInterval(() => {
      const { time } = this.state;
      if (time > 0) {
        this.setState({
          time: time - 1,
        });
      } else {
        clickedState(true);
        clearInterval(timer);
      }
    }, ONE_SECOND);
  }

  render() {
    const { time } = this.state;
    return (
      <p>{time}</p>
    );
  }
}

Timer.propTypes = {
  clickedState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clickedState: (bool) => dispatch(clicked(bool)),
});

export default connect(null, mapDispatchToProps)(Timer);
