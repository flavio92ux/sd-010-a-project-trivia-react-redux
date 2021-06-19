import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
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

  render() {
    return (
      <form className="g-3">
        <div className="col-auto">
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
        </div>
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
        </div>
        <div className="col-auto">
          <button
            data-testid="btn-play"
            className="btn btn-primary mb-3"
            type="submit"
            disabled={ this.checkInputs() }
          >
            Jogar
          </button>
        </div>
      </form>
    );
  }
}

export default Login;
