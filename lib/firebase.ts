// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBgnkvRiKFnseHDI2lIQICqnj6x-82dju4",
  authDomain: "turkey-trivia-4e241.firebaseapp.com",
  databaseURL: "https://turkey-trivia-4e241-default-rtdb.firebaseio.com",
  projectId: "turkey-trivia-4e241",
  storageBucket: "turkey-trivia-4e241.firebasestorage.app",
  messagingSenderId: "1087572621696",
  appId: "1:1087572621696:web:01eace943cdd9dc066e965"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);