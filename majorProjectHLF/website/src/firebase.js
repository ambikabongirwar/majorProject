// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfMS3g8YtBNTvuaA3JNdpbvcpHH9SABsY",
  authDomain: "major-project-b43f6.firebaseapp.com",
  projectId: "major-project-b43f6",
  storageBucket: "major-project-b43f6.appspot.com",
  messagingSenderId: "777670932711",
  appId: "1:777670932711:web:5ffd0cad8d50bef35d8a42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {auth, app};