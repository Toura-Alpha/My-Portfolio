<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  
  // my-portfolio/js/firebase-auth.js
  import { initializeApp } from 'firebase/app';
  import {
      getAuth,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
      onAuthStateChanged,
      GoogleAuthProvider,
      signInWithPopup // For social logins
  } from 'firebase/auth';


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
  /**
  * Signs up a new user with email and password.
  * @param {string} email
  * @param {string} password
  * @returns {Promise<Object>} User credential object or error.
  */
  export async function signUp(email, password) {
      try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log('User signed up:', userCredential.user.email);
          return { success: true, user: userCredential.user };
      } catch (error) {
          console.error('Error signing up:', error.code, error.message);
          return { success: false, error: error.message, code: error.code };
      }
  }

  /**
  * Signs in an existing user with email and password.
  * @param {string} email
  * @param {string} password
  * @returns {Promise<Object>} User credential object or error.
  */
  export async function signIn(email, password) {
      try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in:', userCredential.user.email);
          return { success: true, user: userCredential.user };
      } catch (error) {
          console.error('Error signing in:', error.code, error.message);
          return { success: false, error: error.message, code: error.code };
      }
  }

  /**
  * Signs in with Google.
  * @returns {Promise<Object>} User credential object or error.
  */
  export async function signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
          const result = await signInWithPopup(auth, provider);
          console.log('Signed in with Google:', result.user.email);
          return { success: true, user: result.user };
      } catch (error) {
          console.error('Error signing in with Google:', error.code, error.message);
          return { success: false, error: error.message, code: error.code };
      }
  }

  /**
  * Signs out the current user.
  * @returns {Promise<Object>} Success status or error.
  */
  export async function signOutUser() {
      try {
          await signOut(auth);
          console.log('User signed out successfully.');
          return { success: true };
      } catch (error) {
          console.error('Error signing out:', error.code, error.message);
          return { success: false, error: error.message, code: error.code };
      }
  }

  /**
  * Observes changes in the user's authentication state.
  * @param {function} callback - Function to call when auth state changes. Receives the user object (or null).
  * @returns {function} An unsubscribe function.
  */
  export function observeAuthState(callback) {
      return onAuthStateChanged(auth, callback);
  }

  // Export the auth instance if needed for other Firebase services or direct access
  export { auth };


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

