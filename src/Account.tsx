import React, { Component } from 'react';
import { ReactComponent as Photo } from './images/photo.svg';
import Header from './Header';
import PhotoShowingModal from './PhotoShowingModal';
import { allPhotos, deletePrivatePhoto, deletePublicPhoto } from './firebase/firebase.utils';

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

  deletePhoto = () => {
    const { appState } = this.props;
    const { currentUser, photos } = appState;
    const { imgData } = this.state;
    const privatePhoto = photos.find((photo: any) => photo.photoData === imgData);
    const publicPhoto = this.photos.find((photo: any) => photo.photoData === imgData);
    deletePrivatePhoto(currentUser.uid, privatePhoto);
    deletePublicPhoto(publicPhoto);
    this.closeModal();
  }

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

    const userImage = this.photos.find((photo: any) => photo.photoData === imgData);

    return (
      <div className="account-component">
        <Header appState={appState} setView={setView} />
        <PhotoShowingModal
          showPhoto={showPhoto}
          imgData={imgData}
          imgDesc={imgDesc}
          userImage={userImage}
          closeModal={this.closeModal}
          deletePhoto={this.deletePhoto}
        />
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
          {photos.length > 6 && links}
        </div>
      </div>
    );
  }
}
