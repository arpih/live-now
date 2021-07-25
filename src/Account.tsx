import React, { Component } from 'react';
import Modal from 'react-modal';
import { ReactComponent as Photo } from './images/photo.svg';
import { ReactComponent as Close } from './images/fail.svg';
import { ReactComponent as Like } from './images/like.svg';
import { ReactComponent as Dislike } from './images/dislike.svg';
import Header from './Header';
import { allPhotos } from './firebase/firebase.utils';

type Props = {
  appState: any,
  setView: any,
}

type State = {
  showAllPhotos: boolean,
  showPhoto: boolean,
  imgData: string,
  imgDesc: string,
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
  private photos: any = [];

  constructor(props: Props) {
    super(props);
    this.state = {
      showAllPhotos: false,
      showPhoto: false,
      imgData: '',
      imgDesc: '',
    };
  }

  componentDidMount() {
    allPhotos()
      .then((photos: any) => {
        this.photos.push(...photos);
      });
  }

  handleShowPhotos = () => {
    const { showAllPhotos } = this.state;
    this.setState({ showAllPhotos: !showAllPhotos });
  }

  showPhoto = (photo: any) => {
    this.setState({
      showPhoto: true,
      imgData: photo.photoData,
      imgDesc: photo.photoDesc,
    });
  }

  closeModal = () => {
    this.setState({ showPhoto: false });
  };

  render() {
    const { setView, appState } = this.props;
    const { photos } = appState;
    const {
      showAllPhotos,
      showPhoto,
      imgData,
      imgDesc,
    } = this.state;
    const partOfPhotos: string[] = photos.reverse().slice(0, 6);
    const photosNeedToShow = showAllPhotos ? photos : partOfPhotos;

    const photosHTML = photosNeedToShow
      .map((photo: any) => (
        <div
          className="photo"
          role="button"
          tabIndex={0}
          onKeyUp={() => this.showPhoto(photo)}
          onClick={() => this.showPhoto(photo)}
        >
          <img src={photo.photoData} alt="user" />
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

    const data = this.photos.find((photo: any) => photo.photoData === imgData);
    const userReactions = (reaction: string): number => {
      let like = 0;
      let dislike = 0;
      data.reactions.forEach((el: any) => {
        like += el.like;
        dislike += el.dislike;
      });
      const count = (reaction === 'like') ? like : dislike;

      return count;
    };

    return (
      <div className="account-component">
        <Header appState={appState} setView={setView} />
        <div>
          <Modal isOpen={showPhoto} onRequestClose={this.closeModal}>
            <div
              className="close-button"
              role="button"
              tabIndex={0}
              onKeyUp={() => this.closeModal()}
              onClick={() => this.closeModal()}
            >
              <Close />
            </div>
            <div className="image-section">
              <div>{imgDesc}</div>
              <img src={imgData} alt="user" />
              {data && data.reactions && (
                <div className="reactions">
                  <div className="reaction-button">
                    <div className="count">
                      {`${userReactions('like') ? userReactions('like') : ''}`}
                    </div>
                    <Like />
                  </div>
                  <div className="reaction-button">
                    <div className="count">
                      {`${userReactions('dislike') ? userReactions('dislike') : ''}`}
                    </div>
                    <Dislike />
                  </div>
                </div>
              )}
            </div>
          </Modal>
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
          {links}
        </div>
      </div>
    );
  }
}
