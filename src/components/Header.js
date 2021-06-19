import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    return (
      <div>
        <p>{name}</p>
        <p>{email}</p>
      </div>
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
