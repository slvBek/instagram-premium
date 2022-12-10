import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBt-BX05Q0SKg1ngx5_DGl6-SGII8wqzuo",
    authDomain: "instagram-premium.firebaseapp.com",
    projectId: "instagram-premium",
    storageBucket: "instagram-premium.appspot.com",
    messagingSenderId: "336776052099",
    appId: "1:336776052099:web:13c8384ee931e80a99cab6",
    measurementId: "G-N32759JMMR"
};

const app = firebase.initializeApp(firebaseConfig);
const auth =firebase.auth();
const storage = firebase.storage();
const db = app.firestore();

export { auth, db, storage } 