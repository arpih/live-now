import React, { Component } from 'react';
// @ts-ignore
import Translate from 'react-translate-component';
import { ReactComponent as Logo } from './images/logo.svg';
import { signInWithGoogle, auth } from './firebase/firebase.utils';

type Props = {
  appState: any,
  setView: any,
}

/* eslint-disable no-unused-vars */

enum Views {
  account = 'ACCOUNT'
  , register = 'REGISTER'
}

/* eslint-enable no-unused-vars */

export default class Login extends Component<Props> {
  // signIn = () => {
  //   signInWithGoogle
  //     .then(() => {

  //     })
  // }

  render() {
    const { appState } = this.props;
    const { currentUser } = appState;
    const links = (currentUser) ? (
      <div
        className="register-button"
        role="button"
        tabIndex={0}
        onKeyUp={() => auth.signOut()}
        onClick={() => auth.signOut()}
      >
        <Translate content="loginSignOut" />
      </div>
    ) : (
      <div
        className="register-button"
        role="button"
        tabIndex={0}
        onKeyUp={signInWithGoogle}
        onClick={signInWithGoogle}
      >
        <Translate content="loginSignIn" />
      </div>
    );

    return (
      <div className="login-component">
        <div className="header">
          <Logo />

          <div className="register-section">
            {links}
            {/* <div className="langs">
              <div
                className="register-button"
                role="button"
                tabIndex={0}
                onKeyUp={() => changeLanguage('en')}
                onClick={() => changeLanguage('en')}
              >
                EN
              </div>
              <div
                className="register-button"
                role="button"
                tabIndex={0}
                onKeyUp={() => changeLanguage('am')}
                onClick={() => changeLanguage('am')}
              >
                AM
              </div>
            </div> */}
          </div>
        </div>
        {/* <h1>{t('start.welcome')}</h1> */}
        <div className="main">
          {/* <input className="login-input" type="text" name="name" placeholder="Username" />
          <input className="login-input" type="text" name="name" placeholder="Password" />
          <div
            className="login-button"
            role="button"
            tabIndex={0}
            onKeyUp={signInWithGoogle}
            onClick={signInWithGoogle}
          >
            Log In
          </div> */}
        </div>
      </div>
    );
  }
}
