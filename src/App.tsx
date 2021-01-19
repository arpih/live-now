import React, { Component } from 'react';
import './styles/App.scss';
import ViewController from './ViewController';

type State = {
  view?: Views,
  photos?: any,
}

/* eslint-disable no-unused-vars */

enum Views {
  login = 'LOGIN'
  , account = 'ACCOUNT'
  , register = 'REGISTER'
  , photo = 'PHOTO'
}

/* eslint-enable no-unused-vars */

class App extends Component<State> {
  constructor(props: any) {
    super(props);
    this.state = {
      view: Views.login, // eslint-disable-line react/no-unused-state
      photos: [], // eslint-disable-line react/no-unused-state
    };
  }

  setView(view: Views) {
    this.setState({ view }, () => {}); // eslint-disable-line react/no-unused-state
  }

  render() {
    return (
      <ViewController
        appState={this.state}
        setView={(view: Views) => {
          this.setView(view);
        }}
      />
    );
  }
}

export default App;
