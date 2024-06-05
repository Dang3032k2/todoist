import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: "AIzaSyBkvpLF9YERLFXf1pjTKxrn8R8GEaSY2Rs",
  authDomain: "todolist-95804.firebaseapp.com",
  projectId: "todolist-95804",
  storageBucket: "todolist-95804.appspot.com",
  messagingSenderId: "1049495841149",
  appId: "1:1049495841149:web:fdc72a171360a93af2c414",
  measurementId: "G-CG259FT7GZ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
