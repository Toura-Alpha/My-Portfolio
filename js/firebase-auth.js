// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGAAaI5ezJlPPzVTS4Rl6oFzH6f4NVAZI",
  authDomain: "portfoliowebsite-af0c4.firebaseapp.com",
  projectId: "portfoliowebsite-af0c4",
  storageBucket: "portfoliowebsite-af0c4.firebasestorage.app",
  messagingSenderId: "648013489888",
  appId: "1:648013489888:web:669b20c7fdff0377929285",
  measurementId: "G-028FF4G4TV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);