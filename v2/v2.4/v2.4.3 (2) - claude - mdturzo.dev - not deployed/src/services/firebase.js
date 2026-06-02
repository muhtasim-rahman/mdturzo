// ============================================================
// Firebase Service — v2.1.2
// Auth + Realtime DB helpers
// Facebook auth with extended scopes, action URL fix
// Subscriber email RTDB functions
// ============================================================

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
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
  query,
  orderByChild,
  equalTo,
  increment,
} from 'firebase/database'

import { auth, database } from '../config/firebase.config.js'

// ── Auth Action URL ─────────────────────────────────────────
const AUTH_ACTION_URL = 'https://mdturzo.firebaseapp.com/__/auth/action'

// ── Auth Providers ──────────────────────────────────────────
const googleProvider   = new GoogleAuthProvider()
const githubProvider   = new GithubAuthProvider()
const facebookProvider = new FacebookAuthProvider()

googleProvider.addScope('profile')
googleProvider.addScope('email')
githubProvider.addScope('user:email')

// Facebook scopes — user_friends/likes/hometown/link/location need App Review
facebookProvider.addScope('email')
facebookProvider.addScope('public_profile')
facebookProvider.addScope('user_age_range')
facebookProvider.addScope('user_birthday')
facebookProvider.addScope('user_friends')
facebookProvider.addScope('user_gender')
facebookProvider.addScope('user_hometown')
facebookProvider.addScope('user_likes')
facebookProvider.addScope('user_link')
facebookProvider.addScope('user_location')

// ── Auth Functions ──────────────────────────────────────────
export const loginWithEmail    = (email, password) => signInWithEmailAndPassword(auth, email, password)
export const signupWithEmail   = (email, password) => createUserWithEmailAndPassword(auth, email, password)
export const loginWithGoogle   = () => signInWithPopup(auth, googleProvider)
export const loginWithGithub   = () => signInWithPopup(auth, githubProvider)
export const loginWithFacebook = () => signInWithPopup(auth, facebookProvider)
export const logout            = () => signOut(auth)

export const sendPasswordReset = (email) =>
  sendPasswordResetEmail(auth, email, { url: AUTH_ACTION_URL })

export const sendVerificationEmail = (user) =>
  sendEmailVerification(user || auth.currentUser, { url: AUTH_ACTION_URL })

export const updateUserProfile  = (updates) => updateProfile(auth.currentUser, updates)
export const handleVerifyEmail  = (actionCode) => applyActionCode(auth, actionCode)
export const handleResetPassword = (actionCode, newPassword) => confirmPasswordReset(auth, actionCode, newPassword)
export const verifyResetCode    = (actionCode) => verifyPasswordResetCode(auth, actionCode)

// ── Auth state listener ─────────────────────────────────────
export const onAuthChange = (callback) => onAuthStateChanged(auth, callback)

// ── User Presence ───────────────────────────────────────────
export const setUserPresence = (uid) => {
  const presenceRef = ref(database, `presence/${uid}`)
  set(presenceRef, { online: true, lastSeen: serverTimestamp() })
  onDisconnect(presenceRef).update({ online: false, lastSeen: serverTimestamp() })
}

export const removeUserPresence = (uid) => {
  const presenceRef = ref(database, `presence/${uid}`)
  update(presenceRef, { online: false, lastSeen: serverTimestamp() })
}

// ── Admin check ─────────────────────────────────────────────
export const checkIsAdminInRTDB = async (uid) => {
  try {
    const snap = await get(ref(database, `admins/${uid}`))
    return snap.exists() && snap.val() === true
  } catch {
    return false
  }
}

// ── Realtime DB helpers ─────────────────────────────────────
export const dbRef       = (path) => ref(database, path)
export const dbSet       = (path, data) => set(ref(database, path), data)
export const dbGet       = (path) => get(ref(database, path))
export const dbPush      = (path, data) => push(ref(database, path), data)
export const dbUpdate    = (path, data) => update(ref(database, path), data)
export const dbRemove    = (path) => remove(ref(database, path))
export const dbOn        = (path, cb) => onValue(ref(database, path), cb)
export const dbOff       = (path, cb) => off(ref(database, path), cb)
export const dbTimestamp = () => serverTimestamp()

// ── Subscriber Emails (RTDB) ────────────────────────────────
// Path: /subscribers/{emailKey}: { email, subscribedAt, active }
// Path: /subscriberCount: number (auto-maintained)
//
// Rules (add to RTDB rules):
//   "subscribers": { ".read": "auth != null && root.child('admins/'+auth.uid).val() === true",
//                    ".write": true }
//   "subscriberCount": { ".read": true, ".write": true }

const normalizeEmail = (email) =>
  email.trim().toLowerCase().replace(/\./g, ',') // RTDB keys can't have dots

export const subscribeEmail = async (email) => {
  const normalized = email.trim().toLowerCase()
  const key        = normalizeEmail(normalized)
  const subRef     = ref(database, `subscribers/${key}`)
  const countRef   = ref(database, 'subscriberCount')

  // Check duplicate
  const snap = await get(subRef)
  if (snap.exists()) {
    return { success: false, duplicate: true }
  }

  // Write new subscriber
  await set(subRef, {
    email:        normalized,
    subscribedAt: serverTimestamp(),
    active:       true,
  })

  // Increment count atomically
  await update(countRef, { count: increment(1) })

  return { success: true, duplicate: false }
}

// Live subscriber count listener (public-readable)
export const onSubscriberCount = (callback) => {
  const countRef = ref(database, 'subscriberCount')
  onValue(countRef, (snap) => {
    const data = snap.val()
    callback(data?.count ?? 0)
  })
  return () => off(countRef)
}

// Get all subscribers (admin only — enforced by RTDB rules)
export const getAllSubscribers = async () => {
  const snap = await get(ref(database, 'subscribers'))
  if (!snap.exists()) return []
  const result = []
  snap.forEach((child) => {
    result.push({ key: child.key, ...child.val() })
  })
  return result.sort((a, b) => (b.subscribedAt || 0) - (a.subscribedAt || 0))
}

// Remove subscriber (admin only)
export const removeSubscriber = async (key) => {
  await remove(ref(database, `subscribers/${key}`))
  await update(ref(database, 'subscriberCount'), { count: increment(-1) })
}

// ── Notification helpers ────────────────────────────────────
// Path: /notifications/{id}: { title, message, active, expires_at, link }
// Path: /notificationReads/{uid}/{notifId}: true

export const listenToNotifications = (callback) => {
  const notifRef = ref(database, 'notifications')
  onValue(notifRef, (snap) => {
    const result = []
    if (snap.exists()) {
      snap.forEach((child) => {
        result.push({ id: child.key, ...child.val() })
      })
    }
    callback(result)
  })
  return () => off(notifRef)
}

export const listenToNotificationReads = (uid, callback) => {
  const readsRef = ref(database, `notificationReads/${uid}`)
  onValue(readsRef, (snap) => {
    callback(snap.val() || {})
  })
  return () => off(readsRef)
}

export const markNotificationRead = (uid, notifId) =>
  set(ref(database, `notificationReads/${uid}/${notifId}`), true)

export const markAllNotificationsRead = async (uid, notifIds) => {
  const updates = {}
  notifIds.forEach((id) => { updates[`notificationReads/${uid}/${id}`] = true })
  await update(ref(database), updates)
}

// ── Interaction Tracking (RTDB) ─────────────────────────────
// Path: /interactions/{type}/{id}/views: number
//       /interactions/{type}/{id}/likes: number
//       /interactions/{type}/{id}/dislikes: number
//       /interactions/{type}/{id}/comments: number
// Used for real-time tracking + Firebase-side analytics

export const trackInteractionView = (type, id) => {
  if (!type || !id) return Promise.resolve()
  const viewRef = ref(database, `interactions/${type}/${id}/views`)
  return update(ref(database, `interactions/${type}/${id}`), {
    views: increment(1)
  })
}

export const trackInteractionLike = (type, id, delta) => {
  if (!type || !id) return Promise.resolve()
  return update(ref(database, `interactions/${type}/${id}`), {
    likes: increment(delta)
  })
}

export const trackInteractionDislike = (type, id, delta) => {
  if (!type || !id) return Promise.resolve()
  return update(ref(database, `interactions/${type}/${id}`), {
    dislikes: increment(delta)
  })
}

export const trackInteractionComment = (type, id, delta) => {
  if (!type || !id) return Promise.resolve()
  return update(ref(database, `interactions/${type}/${id}`), {
    comments: increment(delta)
  })
}

export const listenToInteractions = (type, id, callback) => {
  if (!type || !id) return () => {}
  const iRef = ref(database, `interactions/${type}/${id}`)
  onValue(iRef, snap => callback(snap.val() || {}))
  return () => off(iRef)
}
