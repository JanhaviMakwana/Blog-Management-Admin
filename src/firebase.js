import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCVJXTUE8_ifQdyhGlHa40cjiz5oWZC3kM",
    authDomain: "blog-management-ea4c4.firebaseapp.com",
    databaseURL: "https://blog-management-ea4c4-default-rtdb.firebaseio.com",
    projectId: "blog-management-ea4c4",
    storageBucket: "blog-management-ea4c4.appspot.com",
    messagingSenderId: "652023012645",
    appId: "1:652023012645:web:32c74c9ba167c657260ecc",
    measurementId: "G-HTJD41TSJ2"
};

var fire = firebase.initializeApp(firebaseConfig);

export default fire;