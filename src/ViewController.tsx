import React, { Component } from 'react';
import Login from './Login';
import Account from './Account';
import Register from './Register';
import Photo from './Photo';
// import { ReactComponent as Logo } from './logo.svg';

type ViewControllerProps = {
  appState: any,
  setView: any,
}

enum Views {
  login = 'LOGIN'
  , account = 'ACCOUNT'
  , register = 'REGISTER'
  , photo = 'PHOTO'
}

export default class ViewController extends Component<ViewControllerProps> {
  render() {
    let viewDiv = (<div />);
    const { appState, setView } = this.props;
    const { view } = appState;

    switch (view) {
      case Views.login:
        viewDiv = (
          <Login
            setView={setView}
            appState={appState}
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
    }

    return (
      <div className="App">
        {/* <Logo /> */}
        {viewDiv}
      </div>
    );
  }
}
