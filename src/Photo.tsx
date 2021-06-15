import React, { Component } from 'react';
import { ReactComponent as Logo } from './images/logo.svg';
import { ReactComponent as Success } from './images/success.svg';
import { ReactComponent as Fail } from './images/fail.svg';
import { auth, addPhoto } from './firebase/firebase.utils';

const videoResolution = { width: 300, height: 300 };

type Props = {
  appState: any,
  setView: any,
}

type State = {
  photoDesc: string
  photoStatus?: string,
}

type PhotoType = {
  photoData: string,
  photoDesc: string,
  photoDate: Date,
}

/* eslint-disable no-unused-vars */

enum Views {
  account = 'ACCOUNT'
  , register = 'REGISTER'
  , photo = 'PHOTO'
}

enum PhotoStatus {
  capture = 'capture'
  , finish = 'finish'
}

/* eslint-enable no-unused-vars */

export default class Photo extends Component<Props, State> {
  private videoRef = React.createRef<HTMLVideoElement>();

  private videoCanvasRef = React.createRef<HTMLCanvasElement>();

  private video: any;

  private streams: any[] = [];

  private photo: PhotoType = {
    photoData: '',
    photoDesc: '',
    photoDate: new Date(),
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      photoDesc: '',
    };
  }

  componentDidMount() {
    this.video = this.videoRef.current as any;

    this.showVideo();
  }

  showVideo = () => {
    const video: any = {
      width: videoResolution.width,
      height: videoResolution.height,
    };
    window.navigator.mediaDevices.getUserMedia({
      video,
      audio: false,
    }).then((stream) => {
      if (stream === null) return;
      this.video.srcObject = stream;
      this.streams.push(stream);
      try {
        this.video.play()
          .then(() => {
            this.setState({ photoStatus: PhotoStatus.capture });
          });
      } catch (err) {
        // console.log(err);
      }
    }).catch(() => {
      // console.log(err);
    });
  }

  takePhoto = () => {
    const videoWidth = videoResolution.width;
    const videoHeight = videoResolution.height;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    canvas.width = videoHeight;
    canvas.height = videoWidth;
    if (ctx) {
      ctx.drawImage(this.video, 0, 0, videoHeight, videoWidth, 0, 0, videoHeight, videoWidth);
    }
    this.setState({ photoStatus: PhotoStatus.finish });
    this.stopVideo();

    const data = canvas.toDataURL('image/jpeg');
    this.photo.photoData = data;
    return data;
  }

  stopVideo = (): void => {
    try {
      this.streams.forEach((stream: any) => {
        stream.getTracks().forEach((a: any) => {
          a.stop();
        });
      });
      this.streams = [];
    } catch (err) {
      // console.log('stopVideo error', err);
    }
  }

  failHandler = () => {
    this.setState({ photoStatus: PhotoStatus.capture }, () => {
      this.showVideo();
    });
  }

  inputHandler = (e: any) => {
    this.setState({ photoDesc: e.target.value });
  }

  successHandler = () => {
    const { setView, appState } = this.props;
    const { currentUser } = appState;
    const { photoDesc } = this.state;
    this.photo.photoDesc = photoDesc;
    this.photo.photoDate = new Date();
    const photo = JSON.parse(JSON.stringify(this.photo));
    photo.userName = currentUser.displayName;

    setView(Views.account);

    addPhoto(currentUser.uid, this.photo, photo);
  }

  render() {
    const { photoStatus } = this.state;
    let photoButtons: any;
    const videoStyle: any = {};
    const canvasStyle: any = {};

    switch (photoStatus) {
      case PhotoStatus.capture:
        canvasStyle.display = 'none';
        videoStyle.display = 'inline';
        photoButtons = (
          <div className="capture-button">
            <div
              className="button"
              role="button"
              tabIndex={0}
              aria-label="Mute volume"
              onKeyUp={() => this.takePhoto()}
              onClick={() => this.takePhoto()}
            />
          </div>
        );
        break;
      case PhotoStatus.finish:
        videoStyle.display = 'none';
        photoButtons = (
          <div className="result-buttons">
            <div
              className="fail-button"
              role="button"
              tabIndex={0}
              onKeyUp={() => this.failHandler()}
              onClick={() => this.failHandler()}
            >
              <Fail className="fail-icon" />
            </div>
            <div
              className="success-button"
              role="button"
              tabIndex={0}
              onKeyUp={() => this.successHandler()}
              onClick={() => this.successHandler()}
            >
              <Success />
            </div>
          </div>
        );
        break;
      default:
        break;
    }

    return (
      <div className="photo-component">
        <div className="header">
          <Logo />

          <div className="header-info">
            <div className="user-info">
              <div
                className="register-button"
                role="button"
                tabIndex={0}
                onKeyUp={() => auth.signOut()}
                onClick={() => auth.signOut()}
              >
                Sign out
              </div>
            </div>
          </div>
        </div>
        <div className="main">
          <canvas id="canvas" ref={this.videoCanvasRef} style={canvasStyle} />
          <video className="" ref={this.videoRef} style={videoStyle} muted playsInline />
          <div>
            {
              photoStatus === PhotoStatus.finish
              && (
                <div>
                  <input
                    className="photo-description"
                    placeholder="Photo description"
                    onChange={(e) => this.inputHandler(e)}
                  />
                </div>
              )
            }
            {photoButtons}
          </div>
        </div>
      </div>
    );
  }
}
