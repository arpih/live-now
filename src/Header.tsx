import React, { Component } from 'react';
// @ts-ignore
import Translate from 'react-translate-component';
import { ReactComponent as Logo } from './images/logo.svg';
import { signInWithGoogle, auth } from './firebase/firebase.utils';

type Props = {
  currentUser: any,
  setView: any,
}

/* eslint-disable no-unused-vars */

enum Views {
  login = 'LOGIN'
  , account = 'ACCOUNT'
  , register = 'REGISTER'
  , photo = 'PHOTO'
}

/* eslint-enable no-unused-vars */

export default class Header extends Component<Props> {
  goToUserProfile = () => {
    const { setView } = this.props;
    setView(Views.account);
  }

  signOut = () => {
    const { setView } = this.props;
    auth.signOut()
      .then(() => {
        setView(Views.login);
      });
  }

  render() {
    const { currentUser } = this.props;
    let imgSrc = '';
    let userName = '';
    if (currentUser) {
      imgSrc = currentUser.photoURL;
      userName = currentUser.displayName;
    }
    const links = (currentUser) ? (
      <div
        className="login-button"
        role="button"
        tabIndex={0}
        onKeyUp={() => {}}
        onClick={() => this.signOut()}
      >
        <Translate content="loginSignOut" />
      </div>
    ) : (
      <div
        className="login-button"
        role="button"
        tabIndex={0}
        onKeyUp={signInWithGoogle}
        onClick={signInWithGoogle}
      >
        <Translate content="loginSignIn" />
      </div>
    );

    return (
      <div className="header">
        <Logo />
        <div className="info-section">
          <div className="user-info">
            <div className="user">
              <div className="user-photo">
                {imgSrc
                  && (
                    <img
                      src={imgSrc}
                      alt="userPhoto"
                    />
                  )}
              </div>
              <div
                className="login-button"
                role="button"
                tabIndex={0}
                onKeyUp={() => {}}
                onClick={() => this.goToUserProfile()}
              >
                {userName}
              </div>
            </div>
            {links}
          </div>
        </div>
      </div>
    );
  }
}
