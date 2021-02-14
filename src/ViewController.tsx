import React, { Component } from 'react';
import Login from './Login';
import Account from './Account';
import Register from './Register';
import Photo from './Photo';

type ViewControllerProps = {
  appState: any,
  setView: any,
  currentUser: any,
}

/* eslint-disable no-unused-vars */

enum Views {
  login = 'LOGIN'
  , account = 'ACCOUNT'
  , register = 'REGISTER'
  , photo = 'PHOTO'
}

/* eslint-enable no-unused-vars */

export default class ViewController extends Component<ViewControllerProps> {
  render() {
    let viewDiv = (<div />);
    const { appState, setView, currentUser } = this.props;
    const { view } = appState;

    switch (view) {
      case Views.login:
        viewDiv = (
          <Login
            setView={setView}
            appState={appState}
            currentUser={currentUser}
          />
        );
        break;

      case Views.account:
        viewDiv = (
          <Account
            setView={setView}
            appState={appState}
          />
        );
        break;

      case Views.register:
        viewDiv = (
          <Register
            setView={setView}
            appState={appState}
          />
        );
        break;

      case Views.photo:
        viewDiv = (
          <Photo
            setView={setView}
            appState={appState}
          />
        );
        break;

      default:
        break;
    }

    return (
      <div className="App">
        {viewDiv}
      </div>
    );
  }
}
