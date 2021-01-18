import React, { Component } from 'react';
import { ReactComponent as Logo } from './images/logo.svg';
import { signInWithGoogle } from './firebase/firebase.utils';

type Props = {
  appState: any,
  setView: any,
}

enum Views {
  account = 'ACCOUNT'
  , register = 'REGISTER'
}

export default class Login extends Component<Props> {
  render() {
    const { setView } = this.props;

    return (
      <div className='login-component'>
        <div className="header">
          <Logo />

          <div className="register-section">
            <div
              className="register-button"
              role="button"
              onClick={signInWithGoogle}
            >Register now.</div>
          </div>
        </div>
        <h1>Login</h1>
        <div className="main">
          <input className="login-input" type="text" name="name" placeholder="Username" />
          <input className="login-input" type="text" name="name" placeholder="Password" />
          <div
            className="login-button"
            role="button"
            onKeyUp={() => setView(Views.account)}
            onClick={() => setView(Views.account)}
          >Log In</div>
        </div>
      </div>
    );
  }
}
