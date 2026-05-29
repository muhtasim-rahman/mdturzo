// ============================================================
// Firebase Service — Auth + Realtime DB helpers
// ============================================================

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
  confirmPasswordReset,
  verifyPasswordResetCode,
  applyActionCode,
} from 'firebase/auth'

import {
  ref,
  set,
  get,
  onValue,
  off,
  push,
  update,
  remove,
  serverTimestamp,
  onDisconnect,
} from 'firebase/database'

import { auth, database } from '../config/firebase.config.js'

// ── Auth Providers ─────────────────────────────────────────
const googleProvider   = new GoogleAuthProvider()
const githubProvider   = new GithubAuthProvider()
const microsoftProvider = new OAuthProvider('microsoft.com')

googleProvider.addScope('profile')
googleProvider.addScope('email')
githubProvider.addScope('user:email')
microsoftProvider.addScope('User.Read')

// ── Auth Functions ─────────────────────────────────────────

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const signupWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

export const loginWithGoogle    = () => signInWithPopup(auth, googleProvider)
export const loginWithGithub    = () => signInWithPopup(auth, githubProvider)
export const loginWithMicrosoft = () => signInWithPopup(auth, microsoftProvider)

export const logout = () => signOut(auth)

export const sendPasswordReset = (email) =>
  sendPasswordResetEmail(auth, email, {
    url: 'https://mdturzo.web.app/auth/action',
  })

export const sendVerificationEmail = (user) =>
  sendEmailVerification(user || auth.currentUser, {
    url: 'https://mdturzo.web.app/auth/action',
  })

export const updateUserProfile = (updates) =>
  updateProfile(auth.currentUser, updates)

export const handleVerifyEmail = (actionCode) =>
  applyActionCode(auth, actionCode)

export const handleResetPassword = (actionCode, newPassword) =>
  confirmPasswordReset(auth, actionCode, newPassword)

export const verifyResetCode = (actionCode) =>
  verifyPasswordResetCode(auth, actionCode)

export const onAuthChange = (callback) =>
  onAuthStateChanged(auth, callback)

export const getCurrentUser = () => auth.currentUser

// ── Realtime DB — Presence ─────────────────────────────────

export function setUserPresence(uid) {
  if (!uid) return
  const presenceRef  = ref(database, `presence/${uid}`)
  const connectedRef = ref(database, '.info/connected')

  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      // User online হলে set করো, disconnect এ offline
      onDisconnect(presenceRef).set({
        online:    false,
        lastSeen:  serverTimestamp(),
      })
      set(presenceRef, {
        online:    true,
        lastSeen:  serverTimestamp(),
      })
    }
  })
}

export function removeUserPresence(uid) {
  if (!uid) return
  const presenceRef = ref(database, `presence/${uid}`)
  set(presenceRef, { online: false, lastSeen: serverTimestamp() })
}

// ── Realtime DB — Notifications ───────────────────────────

export function listenToNotifications(callback) {
  const notifRef = ref(database, 'notifications')
  onValue(notifRef, (snap) => {
    const data = snap.val()
    const list = data
      ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
      : []
    callback(list)
  })
  return () => off(notifRef)
}

export function markNotificationRead(uid, notifId) {
  if (!uid || !notifId) return
  const readRef = ref(database, `notification_reads/${uid}/${notifId}`)
  return set(readRef, { readAt: serverTimestamp() })
}

export function listenToNotificationReads(uid, callback) {
  if (!uid) return () => {}
  const readsRef = ref(database, `notification_reads/${uid}`)
  onValue(readsRef, (snap) => callback(snap.val() || {}))
  return () => off(readsRef)
}

// ── Realtime DB — Admin Notifications (write) ─────────────
// ⚠️  শুধু admin করতে পারবে — Firebase rules এ /admins/ check হয়

export function createAdminNotification(data) {
  const notifRef = ref(database, 'notifications')
  return push(notifRef, {
    ...data,
    createdAt: serverTimestamp(),
    active: true,
  })
}

export function updateAdminNotification(notifId, data) {
  const notifRef = ref(database, `notifications/${notifId}`)
  return update(notifRef, data)
}

export function deleteAdminNotification(notifId) {
  const notifRef = ref(database, `notifications/${notifId}`)
  return remove(notifRef)
}

// ── Realtime DB — Site Status ──────────────────────────────

export function listenToSiteStatus(callback) {
  const statusRef = ref(database, 'site_status')
  onValue(statusRef, (snap) => callback(snap.val() || {}))
  return () => off(statusRef)
}

// ── Admin helpers ─────────────────────────────────────────
// Admin UID Firebase RTDB /admins/ এ manually set করতে হবে
// Firebase Console → Realtime Database → Data → admins → {uid}: true

export function checkIsAdminInRTDB(uid) {
  if (!uid) return Promise.resolve(false)
  return get(ref(database, `admins/${uid}`))
    .then((snap) => snap.exists() && snap.val() === true)
    .catch(() => false)
}
