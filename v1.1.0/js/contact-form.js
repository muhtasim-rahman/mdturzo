// ================================================
// js/contact-form.js
// ================================================
import { ref, push } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';
import { db, trackEvent } from './firebase-config.js';
import { getUser } from './auth.js';

export function initContactForm() {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submit = document.getElementById('form-submit');
  if (!form) return;

  // Rate-limit: 60s cooldown
  const CD_KEY = 'mt-contact-cd';
  const remaining = (parseInt(localStorage.getItem(CD_KEY) || '0') + 60000) - Date.now();
  if (remaining > 0) startCooldown(submit, Math.ceil(remaining / 1000));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = getUser();
    if (!user) return;

    const name    = form.querySelector('#f-name')?.value.trim()    || '';
    const email   = form.querySelector('#f-email')?.value.trim()   || '';
    const message = form.querySelector('#f-msg')?.value.trim()     || '';

    // Validate
    if (!name || name.length > 100)        return setStatus(status, 'err', '❌ Name must be 1–100 characters.');
    if (!email || !email.includes('@'))    return setStatus(status, 'err', '❌ Enter a valid email address.');
    if (!message || message.length < 10)   return setStatus(status, 'err', '❌ Message must be at least 10 characters.');
    if (message.length > 2000)             return setStatus(status, 'err', '❌ Message too long (max 2000 chars).');

    submit.disabled = true;
    submit.innerHTML = '<i class="ri-loader-4-line"></i> Sending…';
    setStatus(status, '', '');

    try {
      await push(ref(db, 'contact_messages'), {
        name, email, message,
        uid:      user.uid,
        provider: user.providerData?.[0]?.providerId || 'unknown',
        timestamp: Date.now(),
      });
      trackEvent('contact_form_submit');
      setStatus(status, 'ok', '✅ Message sent! In sha Allah, I\'ll reply soon.');
      form.reset();
      localStorage.setItem(CD_KEY, Date.now().toString());
      startCooldown(submit, 60);
    } catch (err) {
      setStatus(status, 'err', '❌ ' + (err.message || 'Something went wrong. Try again.'));
      submit.disabled = false;
      submit.innerHTML = '<i class="ri-send-plane-fill"></i> Send Message';
    }
  });
}

function startCooldown(btn, secs) {
  let s = secs;
  btn.disabled = true;
  btn.textContent = `Wait ${s}s`;
  const t = setInterval(() => {
    s--;
    btn.textContent = `Wait ${s}s`;
    if (s <= 0) {
      clearInterval(t);
      btn.disabled = false;
      btn.innerHTML = '<i class="ri-send-plane-fill"></i> Send Message';
    }
  }, 1000);
}

function setStatus(el, type, msg) {
  if (!el) return;
  el.className = 'form-status' + (type ? ' ' + type : '');
  el.textContent = msg;
}
