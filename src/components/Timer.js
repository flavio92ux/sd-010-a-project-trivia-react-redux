import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      time: 5,
    };
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  timer() {
    const ONE_SECOND = 1000;
    const timer = setInterval(() => {
      const { time } = this.state;
      if (time > 0) {
        this.setState({
          time: time - 1,
        });
      } else {
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

export default Timer;
