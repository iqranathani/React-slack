import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

 var firebaseConfig = {
    apiKey: "AIzaSyDs6WCBMOXHw0l50Uf7WAlzI77psv8F-Vw",
    authDomain: "react-slack-clone-867ef.firebaseapp.com",
    databaseURL: "https://react-slack-clone-867ef.firebaseio.com",
    projectId: "react-slack-clone-867ef",
    storageBucket: "react-slack-clone-867ef.appspot.com",
    messagingSenderId: "1042100451562",
    appId: "1:1042100451562:web:d790c291a64541e4d83f93"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase; 