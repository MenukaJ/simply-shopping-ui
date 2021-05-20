import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyAMqrAzxNLUL43V-xdRTYhaKUhWRPLZj4M",
    authDomain: "simply-shopping.firebaseapp.com",
    projectId: "simply-shopping",
    storageBucket: "simply-shopping.appspot.com",
    messagingSenderId: "815746985268",
    appId: "1:815746985268:web:5d89649a30acb0a82a0961",
    measurementId: "G-0CSML0CPYG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}