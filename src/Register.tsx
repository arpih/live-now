import React, { Component } from 'react';

type Props = {
  appState: any,
  setView: any,
}

enum Views {
  login = 'LOGIN'
}

export default class Register extends Component<Props> {
  render() {
    const { setView } = this.props;
    const { login } = Views;

    return (
      <div className='login-component'>
        <div className='login'>
          <h1>Register</h1>
          <input className="login-input" type="text" name="name" placeholder="First Name" />
          <input className="login-input" type="text" name="name" placeholder="Last Name" />
          <input className="login-input" type="text" name="name" placeholder="Username" />
          <input className="login-input" type="text" name="name" placeholder="Password" />
          <button
            className="login-button"
            type="button"
            onKeyUp={() => setView(login)}
            onClick={() => setView(login)}
          >Register</button>
          <p>Already registered. Go to back.</p>
          <button
            className="login-button"
            type="button"
            onKeyUp={() => setView(login)}
            onClick={() => setView(login)}
          >Back</button>
        </div>
      </div>
    );
  }
}
