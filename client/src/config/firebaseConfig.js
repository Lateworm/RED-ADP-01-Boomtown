import * as firebase from "firebase";
import "firebase/auth";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBL4fXA3Xdr96eFPxQNwkLLX_BHYNEWT2Q",
  authDomain: "boomtown-8c56c.firebaseapp.com",
  databaseURL: "https://boomtown-8c56c.firebaseio.com",
  projectId: "boomtown-8c56c",
  storageBucket: "boomtown-8c56c.appspot.com",
  messagingSenderId: "704806820261"
};

const firebaseApp = firebase.initializeApp(config);
const firebaseAuth = firebaseApp.auth();

export { firebaseApp, firebaseAuth };

// import this into other files
// import {firebaseApp, firebaseAuth} from "./config/firebaseConfig";

// TODO: in router, set default path to login component
// TODO: store data submitted in forms somehow - probably setState
// TODO: pass that data into https://firebase.google.com/docs/auth/web/password-auth - sign in with email and password
