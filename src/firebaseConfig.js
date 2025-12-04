// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCk3GhvPc3Ztdhb06F3mokU5RdPd0lumqI",
  authDomain: "grchsite-2025.firebaseapp.com",
  databaseURL: "https://grchsite-2025-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "grchsite-2025",
  storageBucket: "grchsite-2025.firebasestorage.app",
  messagingSenderId: "650067524512",
  appId: "1:650067524512:web:6dd60abff6de08b23802c5"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };