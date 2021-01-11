import React, { Component } from 'react';
import { ReactComponent as Logo } from './images/logo.svg';
import { ReactComponent as Lines } from './images/three-horizontal-lines.svg';
import { ReactComponent as Photo } from './images/photo.svg';

type Props = {
  appState: any,
  setView: any,
}

enum Views {
  account = 'ACCOUNT'
  , register = 'REGISTER'
  , photo = 'PHOTO'
}

export default class Account extends Component<Props> {

  render() {
    const { setView } = this.props;
    const photos: string[] = [];

    const photosHTML = (
      photos.map((photo: string) => {
        return (
          <div className="photo">
            <img src={photo} />
            <div>hi I am Arpi</div>
          </div>
        );
      })
    );

    return (
      <div className='account-component'>
        <div className="header">
          <Logo />

          <div
            className="lines"
            role="button"
            onKeyUp={() => setView(Views.register)}
            onClick={() => setView(Views.register)}
          ><Lines /></div>
        </div>
        <div className="main">
          <div className="new-photo-section">
            <div
              role="button"
              onKeyUp={() => setView(Views.photo)}
              onClick={() => setView(Views.photo)}
            ><Photo />
            </div>
            <div>Would you like to share your moment?</div>
          </div>
          <div className="photos-section">
            <div className="photo">
              <img src={photos[0]} />
              <div>hi I am Arpi</div>
            </div>
            <div className="photo">
              <img src={photos[0]} />
              <div>hi I am Arpi</div>
            </div>
            <div className="photo">
              <img src={photos[0]} />
              <div>hi I am Arpi</div>
            </div>
            {/* {photosHTML} */}
          </div>
        </div>
      </div>
    );
  }
}
