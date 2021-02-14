import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyABSkGgsgSIS2RGO5xsfcm1sdRwkcDXsQY',
  authDomain: 'live-now-db.firebaseapp.com',
  projectId: 'live-now-db',
  storageBucket: 'live-now-db.appspot.com',
  messagingSenderId: '1057130403069',
  appId: '1:1057130403069:web:0bfe8bbea5d50121d1da94',
  measurementId: 'G-03Z28P1QBN',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef; // eslint-disable-line consistent-return
};

export const addPhoto = (collectionKey, objectsToAdd) => {
  const collectonRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectonRef.doc();
    batch.set(newDocRef, obj);
  });

  batch.commit()
    .then((result) => result);
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
