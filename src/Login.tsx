import React, { Component } from 'react';
// @ts-ignore
import Translate from 'react-translate-component';
import { ReactComponent as Like } from './images/like.svg';
import { ReactComponent as Dislike } from './images/dislike.svg';
import { allPhotos } from './firebase/firebase.utils';
import Header from './Header';

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
        const firstPhotos = photos.reverse().slice(0, n);
        this.photos.push(...firstPhotos);
      })
      .then(() => this.setState({ isReady: true }));
  }

  like = () => {
    console.log('hiii');
  }

  render() {
    const { appState, setView } = this.props;
    const { currentUser } = appState;
    const { isReady } = this.state;

    const photosHTML = this.photos
      .map((photo: any) => (
        <div className="photo">
          <div className="photo-info" style={{ backgroundImage: `url(${photo.photoData})` }}>
            <div className="photo-desc">{photo.photoDesc}</div>
            <div className="photo-user">{photo.userName}</div>
          </div>
          <div className="reactions">
            <div
              className="reaction-button"
              role="button"
              tabIndex={0}
              onKeyUp={() => {}}
              onClick={() => this.like()}
            >
              {photo.reactions ? `${photo.reactions.like ? photo.reactions.like : ''}` : ''}
              <Like />
            </div>
            <div
              className="reaction-button"
              role="button"
              tabIndex={0}
              onKeyUp={() => {}}
              onClick={() => this.like()}
            >
              {photo.reactions ? `${photo.reactions.dislike ? photo.reactions.dislike : ''}` : ''}
              <Dislike />
            </div>
          </div>
        </div>
      ));

    return (
      <div className="login-component">
        <Header currentUser={currentUser} setView={setView} />
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
