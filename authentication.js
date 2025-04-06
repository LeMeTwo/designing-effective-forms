// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDNPcJeAAKWVbaGK5kwlLwpNxDQOcBrN7w",

  authDomain: "testproject-3bd96.firebaseapp.com",

  projectId: "testproject-3bd96",

  storageBucket: "testproject-3bd96.firebasestorage.app",

  messagingSenderId: "790967533750",

  appId: "1:790967533750:web:840e95746a57a5e1e86617",

  measurementId: "G-KDE372PVZJ"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
//const analytics = getAnalytics(app);
const auth = getAuth(app);

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      console.log("Zalogowano użytkownika:", user);
  
      document.querySelector("#exampleInputEmail1").value = user.email || ''; 
      document.querySelector("#exampleInputPassword1").value = '********'; 
  
      const fullName = user.displayName || '';
      const nameParts = fullName.split(' ');
      if (nameParts.length > 0) {
        document.querySelector("#firstName").value = nameParts[0]; // Imię
      }
      if (nameParts.length > 1) {
        document.querySelector("#lastName").value = nameParts[1]; // Nazwisko
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Błąd logowania: ", errorCode, errorMessage);
    });
  };

const userSignOut = async () => {
    signOut(auth).then(() => {
    alert("You have been signed out!")
    }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
      alert("Jesteś zalogowany przez Google");
      console.log("Zalogowany użytkownik:", user);
  
      document.querySelector("#exampleInputEmail1").value = user.email || ''; 
      document.querySelector("#exampleInputPassword1").value = '********'; 
  
      const fullName = user.displayName || '';
      const nameParts = fullName.split(' ');
      if (nameParts.length > 0) {
        document.querySelector("#firstName").value = nameParts[0]; // Imię
      }
      if (nameParts.length > 1) {
        document.querySelector("#lastName").value = nameParts[1]; // Nazwisko
      }
    }
  });

signInButton.addEventListener("click",
    userSignIn);
    signOutButton.addEventListener("click",
    userSignOut);
