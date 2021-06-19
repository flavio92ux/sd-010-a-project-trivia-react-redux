import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <form className="g-3">
        <label
          className="form-label"
          htmlFor="email"
        >
          E-mail
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="E-mail"
          />
        </label>
        <label
          className="form-label"
          htmlFor="name"
        >
          Nome
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Digite seu nome"
          />
        </label>
        <div className="col-auto">
          <button
            className="btn btn-primary mb-3"
            type="submit"
          >
            Jogar
          </button>
        </div>
      </form>
    );
  }
}

export default Login;
