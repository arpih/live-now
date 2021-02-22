import React from 'react';
import './styles/App.scss';
import ViewController from './ViewController';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

type State = {
  view?: Views,
  photos?: any,
  currentUser?: any,
}

/* eslint-disable no-unused-vars */

enum Views {
  login = 'LOGIN'
  , account = 'ACCOUNT'
  , register = 'REGISTER'
  , photo = 'PHOTO'
}

/* eslint-enable no-unused-vars */

class App extends React.Component<{}, State> {
  private unsubscriveFromAuth: any = null;

  constructor(props: any) {
    super(props);
    this.state = {
      view: Views.login, // eslint-disable-line react/no-unused-state
      photos: [], // eslint-disable-line react/no-unused-state
      currentUser: null,
    };
  }

  componentDidMount() {
    this.unsubscriveFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        createUserProfileDocument(userAuth)
          .then((userRef: any) => {
            userRef.onSnapshot((snapShot: any) => {
              this.setState({
                id: snapShot.id, // eslint-disable-line react/no-unused-state
                ...snapShot.data(),
              }, () => {
                this.setView(Views.account);
              });
            });
          });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscriveFromAuth();
  }

  setView(view: Views) {
    this.setState({ view }, () => {}); // eslint-disable-line react/no-unused-state
  }

  render() {
    const { currentUser } = this.state;

    return (
      <ViewController
        appState={this.state}
        setView={(view: Views) => {
          this.setView(view);
        }}
        currentUser={currentUser}
      />
    );
  }
}

export default App;
