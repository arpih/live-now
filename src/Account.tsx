import React, { Component } from 'react';
import { ReactComponent as Logo } from './images/logo.svg';
import { ReactComponent as Lines } from './images/three-horizontal-lines.svg';
import { ReactComponent as Photo } from './images/photo.svg';

type Props = {
  appState: any,
  setView: any,
}

type State = {
  showLines: boolean,
}

enum Views {
  account = 'ACCOUNT'
  , register = 'REGISTER'
  , photo = 'PHOTO'
}

export default class Account extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showLines: false,
    };
  }

  linesHandler = () => {
    const { showLines } = this.state;
    this.setState({ showLines: !showLines });
  }

  render() {
    const { setView, appState } = this.props;
    const { photos } = appState;
    const { showLines } = this.state;
    // const photos: string[] = [];

    const photosHTML = (
      photos.map((photo: any) => {
        return (
          <div className="photo">
            <img src={photo.photoData} alt="user" />
            <div>{photo.photoDesc}</div>
          </div>
        );
      })
    );

    return (
      <div className='account-component'>
        <div className="header">
          <Logo />

          <div>
            <div
              className="lines"
              role="button"
              onKeyUp={() => this.linesHandler()}
              onClick={() => this.linesHandler()}
            ><Lines /></div>
            {showLines &&
              <div>
                <div>Username</div>
                <div>Sign Up</div>
              </div>
            }
          </div>
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
            {photosHTML}
          </div>
        </div>
      </div>
    );
  }
}
