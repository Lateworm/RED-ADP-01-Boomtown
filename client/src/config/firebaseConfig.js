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
// elsewhere: import {firebaseApp, firebaseAuth} from "./config/firebaseConfig";

// https://firebase.google.com/docs/auth/web/password-auth
