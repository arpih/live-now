import React, { Component } from 'react';
import './styles/App.scss';
import ViewController from './ViewController';

enum Views {
  login = 'LOGIN'
  , account = 'ACCOUNT'
  , register = 'REGISTER'
  , photo = 'PHOTO'
}

type State = {
  view?: Views
}

class App extends Component<State> {

  constructor(props: any) {
    super(props);
    this.state = {
      currentUser: null,
      view: Views.account,
    };
  }

  setView(view: Views) {
    this.setState({ view }, () => {});
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
