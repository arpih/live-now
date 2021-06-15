import React, { Component } from 'react';
import { ReactComponent as Logo } from './images/logo.svg';
import { ReactComponent as Photo } from './images/photo.svg';
import { auth } from './firebase/firebase.utils';

type Props = {
  appState: any,
  setView: any,
}

type State = {}

/* eslint-disable no-unused-vars */

enum Views {
  login = 'LOGIN'
  , account = 'ACCOUNT'
  , register = 'REGISTER'
  , photo = 'PHOTO'
}

/* eslint-enable no-unused-vars */

export default class Account extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  signOut = () => {
    const { setView } = this.props;
    auth.signOut()
      .then(() => {
        setView(Views.login);
      });
  }

  render() {
    const { setView, appState } = this.props;
    const { photos, currentUser } = appState;

    const photosHTML = photos
      .map((photo: any) => (
        <div className="photo">
          <img src={photo.photoData} alt="user" />
          <div>{photo.photoDesc}</div>
        </div>
      ));

    let imgSrc = '';
    let userName = '';
    if (currentUser) {
      imgSrc = currentUser.photoURL;
      userName = currentUser.displayName;
    }

    return (
      <div className="account-component">
        <div className="header">
          <Logo />

          <div className="header-info">
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
                <div>{userName}</div>
              </div>
              <div
                className="register-button"
                role="button"
                tabIndex={0}
                onKeyUp={() => {}}
                onClick={() => this.signOut()}
              >
                Sign out
              </div>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="new-photo-section">
            <div
              className="new-photo-button"
              role="button"
              tabIndex={0}
              onKeyUp={() => setView(Views.photo)}
              onClick={() => setView(Views.photo)}
            >
              <Photo />
            </div>
            <div>Would you like to share your moment?</div>
          </div>
          <div className="photos-section">
            {photosHTML}
          </div>
        </div>
      </div>
    );
  }
}
