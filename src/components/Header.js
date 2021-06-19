import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    return (
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${MD5(email).toString()}` }
          alt="profile"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = ({ login: { name, email } }) => ({
  name,
  email,
});

export default connect(mapStateToProps)(Header);
