import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyCXjK0h3DuJMlsQqAZmmQl86VshjLkFXak",
    authDomain: "web-intensivemindx.firebaseapp.com",
    projectId: "web-intensivemindx",
    storageBucket: "web-intensivemindx.appspot.com",
    messagingSenderId: "910338674369",
    appId: "1:910338674369:web:fee28e67c6017348080e40",
    measurementId: "G-K90QNE9JBX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth, db}