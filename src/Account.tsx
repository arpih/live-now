import React, { Component } from 'react';
import { ReactComponent as Photo } from './images/photo.svg';
import Header from './Header';

type Props = {
  appState: any,
  setView: any,
}

type State = {
  showAllPhotos: boolean,
}

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
    this.state = {
      showAllPhotos: false,
    };
  }

  handleShowPhotos = () => {
    const { showAllPhotos } = this.state;
    this.setState({ showAllPhotos: !showAllPhotos });
  }

  render() {
    const { setView, appState } = this.props;
    const { photos, currentUser } = appState;
    const { showAllPhotos } = this.state;
    const partOfPhotos: string[] = photos.reverse().slice(0, 6);
    const photosNeedToShow = showAllPhotos ? photos : partOfPhotos;

    const photosHTML = photosNeedToShow
      .map((photo: any) => (
        <div className="photo">
          <img src={photo.photoData} alt="user" />
          <div>{photo.photoDesc}</div>
        </div>
      ));

    const links = (showAllPhotos) ? (
      <div
        className="link"
        role="button"
        tabIndex={0}
        onKeyUp={() => {}}
        onClick={() => this.handleShowPhotos()}
      >
        Show less
      </div>
    ) : (
      <div
        className="link"
        role="button"
        tabIndex={0}
        onKeyUp={() => {}}
        onClick={() => this.handleShowPhotos()}
      >
        Show more
      </div>
    );

    return (
      <div className="account-component">
        <Header currentUser={currentUser} setView={setView} />
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
          {links}
        </div>
      </div>
    );
  }
}
