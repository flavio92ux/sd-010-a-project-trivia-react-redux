import React, { Component } from 'react';

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
    const ONE_SECOND = 1000;
    setInterval(() => {
      const { time } = this.state;
      this.setState({
        time: time - 1,
      });
    }, ONE_SECOND);
  }

  render() {
    const { time } = this.state;
    return (
      <div>{time}</div>
    );
  }
}

export default Timer;
