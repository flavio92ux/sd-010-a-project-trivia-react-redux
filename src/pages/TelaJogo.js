import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Questions from '../components/Questions';
import Timer from '../components/Timer';

class TelaJogo extends Component {
  render() {
    const { name } = this.props;
    return (
      <div>
        { !name && <Redirect to="/" /> }
        <Header />
        <Timer />
        <Questions />
      </div>
    );
  }
}

TelaJogo.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
});

export default connect(mapStateToProps)(TelaJogo);
