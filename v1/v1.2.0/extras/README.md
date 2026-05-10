# mdturzo.web.app — v1.2.0 Setup Guide

## Deploy Checklist

### 1. Firebase Hosting (main project ZIP)
```bash
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```

### 2. Firebase Realtime DB Rules
- Firebase Console → Realtime Database → Rules tab
- Paste contents of `firebase-rules.json` → Publish

### 3. Firebase Realtime DB — Admin setup
In Firebase Console → Realtime Database → Data tab, manually add:
```json
{
  "admins": {
    "YOUR_FIREBASE_UID_HERE": true
  }
}
```
Up to 4 UIDs supported. Find your UID in Firebase Console → Authentication → Users.

### 4. Cloudflare Worker
- https://dash.cloudflare.com → Workers & Pages → Create Worker
- Paste `cloudflare-worker.js` contents → Save and Deploy
- Settings → Variables and Secrets → Add Secret:
  - Name: `imgbb_api`
  - Value: your ImgBB API key (from https://api.imgbb.com)

### 5. Local Development
```bash
firebase serve --only hosting
# Opens at http://localhost:5000
```

---

## Version Plan
| Version | Focus |
|---------|-------|
| v1.2.0 | Foundation & Architecture (current) |
| v1.3.0 | Navbar + Footer |
| v1.4.0 | Hero + Home Part 1 |
| v1.5.0 | Home Part 2 |
| v1.6.0 | About Page |
| v1.7.0 | Projects Page |
| v1.8.0 | Blogs Page |
| v1.9.0 | Firebase Backend |
| v1.10.0 | Gallery Page |
| v1.11.0 | Contact Page |
| v1.12.0 | Auth System |
| v1.13.0 | User Profile |
| v1.14.0 | Search + Notifications |
| v1.15.0 | Admin Panel Part 1 |
| v1.16.0 | Admin Panel Part 2 |
| v1.17.0 | SEO + Tracking + Reviews |
| v1.18.0 | Polish + Final |
