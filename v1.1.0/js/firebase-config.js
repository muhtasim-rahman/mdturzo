// ================================================
// js/firebase-config.js
// ================================================
import { initializeApp }              from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getDatabase }                from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';
import { getAnalytics, logEvent }     from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js';

const firebaseConfig = {
  apiKey:            "AIzaSyAh9PtrVo1UWApQw3oLT-Ol2Cu4iA5wawA",
  authDomain:        "mdturzo.firebaseapp.com",
  projectId:         "mdturzo",
  storageBucket:     "mdturzo.firebasestorage.app",
  messagingSenderId: "13751895485",
  appId:             "1:13751895485:web:be068cfd6f46f945d3fed4",
  measurementId:     "G-SHM2013GKK",
  // Add your Realtime DB URL here after checking Firebase Console
  databaseURL:       "https://mdturzo-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export const auth      = getAuth(app);
export const db        = getDatabase(app);
export const analytics = getAnalytics(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
githubProvider.addScope('user:email');

export function trackEvent(name, params = {}) {
  try { logEvent(analytics, name, params); } catch (_) {}
}

export default app;
