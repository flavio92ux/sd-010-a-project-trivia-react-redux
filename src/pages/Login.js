import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInfo, getTokenThunk } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.requestToken();
  }

  async requestToken() {
    const { getToken } = this.props;
    getToken();
  }

  handleClick() {
    const { token, sendInfoRedux } = this.props;
    const { name, email } = this.state;
    localStorage.setItem('token', token);
    sendInfoRedux(name, email);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  validateEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  checkInputs() {
    const { name, email } = this.state;

    return !(name.length > 0 && this.validateEmail(email));
  }

  renderButtons() {
    return (
      <div className="col-xs-3">
        <Link to="/tela-do-jogo">
          <button
            data-testid="btn-play"
            className="btn btn-outline-primary mr-3"
            type="button"
            disabled={ this.checkInputs() }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button
            data-testid="btn-settings"
            className="btn btn-outline-primary btn-block"
            type="button"
          >
            Configs
          </button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <form className="g-3">
        <label
          className="form-label"
          htmlFor="email"
        >
          E-mail
          <input
            data-testid="input-gravatar-email"
            className="form-control"
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={ this.handleChange }
          />
        </label>
        <div className="col-auto">
          <label
            className="form-label"
            htmlFor="name"
          >
            Nome
            <input
              data-testid="input-player-name"
              className="form-control"
              type="text"
              name="name"
              placeholder="Digite seu nome"
              onChange={ this.handleChange }
            />
          </label>
          {this.renderButtons()}
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  token: PropTypes.string.isRequired,
  getToken: PropTypes.func.isRequired,
  sendInfoRedux: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.login.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(getTokenThunk()),
  sendInfoRedux: (name, email) => dispatch(getInfo(name, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
