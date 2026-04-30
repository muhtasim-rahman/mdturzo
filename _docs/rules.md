# 🔐 Firebase Security Rules

> ⚠️ এই ফোল্ডার Firebase Hosting এ upload হবে না (firebase.json এ ignore করা আছে)।

## Realtime Database Rules

Firebase Console → Realtime Database → Rules → paste করো:

```json
{
  "rules": {
    "contact_messages": {
      ".read": false,
      ".write": "auth != null",
      "$id": {
        ".validate": "newData.hasChildren(['name','email','message','timestamp','uid']) && newData.child('uid').val() === auth.uid && newData.child('message').val().length <= 2000 && newData.child('name').val().length <= 100"
      }
    },
    "visitors": {
      "$uid": {
        ".read":     "auth != null && auth.uid === $uid",
        ".write":    "auth != null && auth.uid === $uid",
        ".validate": "newData.hasChildren(['displayName','email','lastSeen'])"
      }
    }
  }
}
```

## GitHub OAuth Setup

1. https://github.com/settings/developers → OAuth Apps → New OAuth App
2. Homepage URL: `https://mdturzo.web.app`
3. Callback URL: `https://mdturzo.firebaseapp.com/__/auth/handler`
4. Client ID + Secret → Firebase Console → Auth → GitHub provider

## Authorized Domains

Firebase Console → Auth → Settings → Authorized domains:
- `mdturzo.web.app` ✅ (add this)
- `mdturzo.firebaseapp.com` ✅ (already there)
- `localhost` ✅ (for local dev)

## Contact Messages পড়া (as owner)

Firebase Console → Realtime Database → `contact_messages` — directly browse করো।

## Deploy Commands

```bash
npm install -g firebase-tools   # one time
firebase login
firebase deploy --only hosting
firebase deploy --only database  # for rules
```

## .gitignore এ রাখো

```
serviceAccountKey.json
.env
.env.local
.firebase/
node_modules/
```
