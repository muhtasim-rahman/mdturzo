// ============================================================
// FIREBASE CONFIG — Auth + Realtime DB + Hosting + Analytics
// Firebase Storage ব্যবহার হচ্ছে না — সব image ImgBB তে
// ============================================================

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL:       import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebasestorage.app`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Singleton — multiple init prevent করে
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export const auth     = getAuth(app)
export const database = getDatabase(app)

// Analytics — browser environment এ only, graceful
let analytics = null
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app)
  }
}).catch(() => {
  // Analytics unavailable (localhost or blocked)
})

export { analytics }
export default app
