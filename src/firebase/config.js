import firebase from "firebase/app";
import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaG_OLuX6_bkc6dCBVxYW1T6nJMvYITfM",
  authDomain: "cs308group39.firebaseapp.com",
  projectId: "cs308group39",
  storageBucket: "cs308group39.appspot.com",
  messagingSenderId: "886850757668",
  appId: "1:886850757668:web:19c513f027e341d81c24b1",
  measurementId: "G-RZS36L9L9B",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
