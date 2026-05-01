// ================================================
// js/auth.js — Firebase Auth (Google + GitHub)
// ================================================
import {
  signInWithPopup, signOut, onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';
import { auth, db, googleProvider, githubProvider, trackEvent } from './firebase-config.js';
import { updateNavAuth } from '../components/navbar.js';

let _user = null;
const _listeners = [];

export const getUser = () => _user;

export function onUser(cb) {
  _listeners.push(cb);
  cb(_user); // fire immediately
}

export async function signInGoogle() {
  try {
    const r = await signInWithPopup(auth, googleProvider);
    trackEvent('login', { method: 'google' });
    return r.user;
  } catch (e) {
    if (e.code === 'auth/popup-closed-by-user') return null;
    throw e;
  }
}

export async function signInGitHub() {
  try {
    const r = await signInWithPopup(auth, githubProvider);
    trackEvent('login', { method: 'github' });
    return r.user;
  } catch (e) {
    if (e.code === 'auth/popup-closed-by-user') return null;
    if (e.code === 'auth/account-exists-with-different-credential')
      throw new Error('This email is linked to a different provider. Please use Google sign-in.');
    throw e;
  }
}

export const signOutUser = () => signOut(auth).then(() => trackEvent('logout'));

async function saveVisitor(user) {
  try {
    await set(ref(db, `visitors/${user.uid}`), {
      displayName: user.displayName || 'Anonymous',
      email:       user.email || '',
      photoURL:    user.photoURL || '',
      provider:    user.providerData?.[0]?.providerId || 'unknown',
      lastSeen:    Date.now(),
    });
  } catch (_) {}
}

export function initAuth() {
  onAuthStateChanged(auth, async (user) => {
    _user = user;
    _listeners.forEach(cb => cb(user));
    updateNavAuth(user);
    if (user) await saveVisitor(user);
  });

  // Global auth button delegation
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-auth-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-auth-action');

    if (action === 'google') {
      btn.disabled = true;
      const orig = btn.innerHTML;
      btn.textContent = 'Signing in…';
      try { await signInGoogle(); }
      catch (err) { alert(err.message); btn.innerHTML = orig; }
      finally { btn.disabled = false; }
    }
    if (action === 'github') {
      btn.disabled = true;
      const orig = btn.innerHTML;
      btn.textContent = 'Signing in…';
      try { await signInGitHub(); }
      catch (err) { alert(err.message); btn.innerHTML = orig; }
      finally { btn.disabled = false; }
    }
    if (action === 'signout') await signOutUser();
    if (action === 'open-auth') {
      // Trigger sign-in modal from anywhere on the page
      const gate = document.getElementById('auth-gate');
      if (gate) gate.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
