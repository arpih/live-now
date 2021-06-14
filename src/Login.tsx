import React, { Component } from 'react';
// @ts-ignore
import Translate from 'react-translate-component';
import { ReactComponent as Logo } from './images/logo.svg';
// import { ReactComponent as Photo } from './images/photo.svg';
import { signInWithGoogle, auth, allPhotos } from './firebase/firebase.utils';

type Props = {
  appState: any,
  setView: any,
}

type State = {
  isReady: boolean,
}

/* eslint-disable no-unused-vars */

enum Views {
  account = 'ACCOUNT'
  , register = 'REGISTER'
}

/* eslint-enable no-unused-vars */

export default class Login extends Component<Props, State> {
  private photos: any = [];

  constructor(props: Props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  componentDidMount() {
    allPhotos()
      .then((photos: any) => {
        const n = 5;
        const firstPhotos = photos.slice(0, n);
        this.photos.push(...firstPhotos);
      })
      .then(() => this.setState({ isReady: true }));
  }

  render() {
    const { appState } = this.props;
    const { currentUser } = appState;
    const { isReady } = this.state;
    const links = (currentUser) ? (
      <div
        className="register-button"
        role="button"
        tabIndex={0}
        onKeyUp={() => {}}
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

    const photosHTML = this.photos
      .map((photo: any) => (
        <div className="photo">
          <img src={photo.photoData} alt="user" />
          <div>{photo.userName}</div>
        </div>
      ));

    return (
      <div className="login-component">
        <div className="header">
          <Logo />

          <div className="register-section">
            {links}
          </div>
        </div>
        <Translate content="loginWelcome" component="h1" />
        <div className="main">
          <div className="photos-section">
            {isReady && photosHTML}
          </div>
        </div>
      </div>
    );
  }
}
