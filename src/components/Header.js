import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    return (
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${MD5(email).toString()}` }
          alt="profile"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
  score: state.questions.score,
});

export default connect(mapStateToProps)(Header);
