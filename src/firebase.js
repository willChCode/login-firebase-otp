// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA9u6jZHF_6b3TnPtc0y6_-aaPkxFMUZXw',
  authDomain: 'login-auth-ed75d.firebaseapp.com',
  projectId: 'login-auth-ed75d',
  storageBucket: 'login-auth-ed75d.appspot.com',
  messagingSenderId: '483706096277',
  appId: '1:483706096277:web:e8b592e1adb04b4d59699c'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
