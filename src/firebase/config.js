// Import the functions you need from the SDKs you need
// v9 compat packages are API compatible with v8 code
// import * as firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import { getStorage } from "firebase/storage";

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD2z2SKIN02BrJql-BcbL8ohE_wLPbbTA",
  authDomain: "react-native-project-63957.firebaseapp.com",
  projectId: "react-native-project-63957",
  storageBucket: "react-native-project-63957.appspot.com",
  messagingSenderId: "473259069770",
  appId: "1:473259069770:web:feb4a6f26370995e1b31b3",
};

// Initialize Firebase
export const db = initializeApp(firebaseConfig);
// export const storage = getStorage(db);
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// export default db;
