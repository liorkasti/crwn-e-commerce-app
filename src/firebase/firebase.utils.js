import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyBraxoDJTQZMOmkwnCNmKs2wlM9HBSEcRk",
  authDomain: "urban-bnb-db.firebaseapp.com",
  databaseURL: "https://urban-bnb-db.firebaseio.com",
  projectId: "urban-bnb-db",
  storageBucket: "urban-bnb-db.appspot.com",
  messagingSenderId: "639196195083",
  appId: "1:639196195083:web:bbd4e368b31ee3154b1a0e",
  measurementId: "G-TFQPV7WD05"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
