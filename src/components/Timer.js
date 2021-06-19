import React, { Component } from 'react';

class Timer extends Component {
  timer() {
    const ONE_SECOND = 1000;
    const timer = setInterval(() => {
      const time = 30;
      return time - 1;
    }, ONE_SECOND);

    return timer;
  }

  render() {
    return (
      <div>{this.timer()}</div>
    );
  }
}

export default Timer;
