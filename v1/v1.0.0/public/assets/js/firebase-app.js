import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh9PtrVo1UWApQw3oLT-Ol2Cu4iA5wawA",
  authDomain: "mdturzo.firebaseapp.com",
  projectId: "mdturzo",
  storageBucket: "mdturzo.firebasestorage.app",
  messagingSenderId: "13751895485",
  appId: "1:13751895485:web:be068cfd6f46f945d3fed4",
  measurementId: "G-SHM2013GKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, analytics, auth, database };
