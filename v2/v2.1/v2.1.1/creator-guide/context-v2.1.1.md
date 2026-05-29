# context.md — mdturzo.web.app Portfolio Project

---

## ⚠️ AI INSTRUCTION — এই file কীভাবে maintain করতে হবে

এই file টা project এর সব version এর accumulated context।
**নতুন chat শুরু করার সময়:** এই file + master-prompt-v2.md + latest ZIP → একসাথে দাও।

### Update rules (প্রতিটি AI এই rules মেনে চলবে):
1. **পুরানো sections কখনো edit করবে না** — শুধু নিচে নতুন section add করবে
2. **প্রতিটি version complete হলে** নিচের template অনুযায়ী একটা নতুন section লিখবে
3. **Discussion notes** — user এর সাথে গুরুত্বপূর্ণ সিদ্ধান্ত, design choices, constraints এখানে লিখবে
4. **Setup changes** — কোনো key/config পরিবর্তন হলে সেটা note করবে
5. **কোনো information বাদ দেবে না** — future AI যাতে পুরো history বুঝতে পারে

### Template for new version:

#### vX.X.X — [Short title]
**Date:** YYYY-MM-DD
**Files changed:** [list]
**Summary:** [what was built]
**Discussions/Decisions:** [any important notes]
**Pending:** [anything left for next version]

---

## Project Identity

| Item | Value |
|------|-------|
| Site | https://mdturzo.web.app |
| Owner | Muhtasim Rahman (Turzo) |
| Nickname | Turzo |
| Email | mdturzo.dev@gmail.com |
| Location | Nilphamari, Bangladesh |
| Stack | React 18 + Vite + Tailwind CSS + Zustand + Framer Motion |
| Auth | Firebase Auth |
| Realtime | Firebase RTDB |
| Database | Supabase (PostgreSQL) |
| Hosting | Firebase Hosting |
| Image Upload | ImgBB via Cloudflare Worker |
| Email | Resend via Cloudflare Worker |

---

## Services & Keys Status

| Service | Status | Notes |
|---------|--------|-------|
| Firebase | ✅ Configured | `.env` এ config |
| Supabase | ✅ Configured | URL + Anon key `.env` এ |
| Supabase SQL schema | ✅ Run হয়েছে | 18 tables + RLS |
| Firebase RTDB rules | ✅ Set হয়েছে | Advanced rules |
| Firebase Auth action URL | ✅ Set | `https://mdturzo.web.app/auth/action` |
| Cloudflare Worker | ⏳ Deploy বাকি | Script ready |
| ImgBB | ⏳ | `imgbb_api` Worker secret এ add করতে হবে |
| Resend | ⏳ | `resend_api` Worker secret এ add করতে হবে |
| reCAPTCHA | ⏳ | v2.7.0 তে |
| Hotjar | ⏳ | ContentSquare script আছে (`a4b49fe204eec`), site ID later |

### Cloudflare Worker Secrets (Dashboard এ add করতে হবে):
- `imgbb_api` — ImgBB API key
- `resend_api` — Resend API key
- `recaptcha_secret` — reCAPTCHA v3 secret key
- `admin_email` — mdturzo.dev@gmail.com
- `supabase_url` — https://kddyucerqiwvjmuwebjv.supabase.co
- `supabase_service` — service role JWT

### Supabase Keys:
- Anon key: eyJhbGci...hKz4BGIz...c3y8 (JWT — `.env` এ)
- Service role key: eyJhbGci...ml3Wwp...fyZ8 (JWT — Worker dashboard এ only)

---

## Architecture Decisions

- **Feed system:** blogs + posts → একটাই `feed` table, `type: 'blog' | 'post'` (previously separate tables)
- **Auth:** Firebase Auth only — Supabase Auth disabled. `users.id = Firebase UID`
- **Admin verify:** Firebase RTDB `/admins/{uid}: true` + Supabase `admins` table — double check
- **Image hosting:** ImgBB via Cloudflare Worker (Firebase Storage ব্যবহার হচ্ছে না)
- **Notifications:** Firebase RTDB primary (realtime), Supabase `notifications` table backup/history
- **Navbar scroll:** Top navbar `position: relative` (scrolls away) + Floating pill fixed navbar (appears at 450px)
- **Mega menu:** 4 column design — Portfolio | Content | Account | Legal

---

## Version Completion Status

| Version | Status | Summary |
|---------|--------|---------|
| v2.0.0  | ✅ DONE | Foundation — React setup, Firebase, Supabase, stores, routing, skeleton, toast |
| v2.0.1  | ✅ DONE | Polish — Router flags, page transitions, font system, favicon, 404 redesign |
| v2.1.0  | ✅ DONE | Navbar + Footer + Layout + AdminQuickActions (basic) |
| v2.1.1  | ✅ DONE | Navbar + Footer full redesign, ripple, skeleton advanced, 404 redesign, tooltip fix |
| v2.2.0  | ⏳ Next | Home page full |
| v2.3.0  | — | About page |
| v2.4.0  | — | Projects |
| v2.5.0  | — | Feed (blogs + posts combined) |
| v2.6.0  | — | Contact page |
| v2.7.0  | — | Auth system (login/signup/forgot/verify) |
| v2.8.0  | — | User Profile |
| v2.9.0  | — | Search + Notifications + Activity Log |
| v2.10.0 | — | Admin Panel Part 1 |
| v2.11.0 | — | Admin Panel Part 2 + SEO + Final polish |

---

## Detailed Version History

---
## v2.0.0 — Foundation & Architecture
**Summary:**
React 18 + Vite + Tailwind + Zustand + Framer Motion সম্পূর্ণ setup। Firebase Auth, Realtime DB, Supabase PostgreSQL, Cloudflare Worker configure। Zustand stores (auth, theme, toast, notification, search), hooks, services, utility modules। 19 pages lazy-load সহ define। Supabase SQL schema (18 tables + RLS), Firebase RTDB advanced rules, Cloudflare Worker script (4 routes) complete।

**Files created:**
`src/main.jsx`, `App.jsx`, `index.css`, `config/site.config.js`, `config/firebase.config.js`, `config/supabase.config.js`, `store/*` (5 stores), `hooks/*`, `services/*`, `utils/*`, `components/layout/Layout.jsx` (placeholder), `components/ui/*`, `components/shared/*`, `pages/*` (19 pages placeholder), root config files, `cloudflare-worker.js`, `firebase-rtdb-rules.json`, `supabase-schema-v2.0.0.sql`

---
## v2.0.1 — Polish & Fixes
**Summary:**
React Router future flags যোগ → console warnings বন্ধ। AnimatePresence page fade transition। v1.4.5 থেকে font system port (Plus Jakarta Sans + DM Sans + DM Mono) + CSS design tokens। Favicon সব size সহ। 404 page redesign। `creator-guide/` folder organize।

---
## v2.1.0 — Navbar + Footer + Layout + AdminQuickActions
**Summary:**
Full Navbar (glass pill scroll at 80px, mega menu 4-cat, notification panel, user dropdown, mobile sidebar with social links, Ctrl+K search). Full Footer (4-column, 9 social icons, scroll-to-top). Layout integrated. AdminQuickActions FAB (6 actions, admin only). /feed placeholder + /logout route।

**Bug in this version:** `faCookie` import ভুলে বাদ পড়েছিল → v2.1.0 ZIP এ fixed করা হয়েছে।

---
## v2.1.1 — Complete Navbar + Footer Redesign + Polish
**Summary:**
User একটা AI-generated HTML design (DeepSeek) দিয়েছিল navbar + footer এর জন্য। সেটা analyze করে prompt এর সাথে মিলিয়ে React এ implement করা হয়েছে।

**Key changes:**

**Navbar redesign:**
- Top navbar: `position: relative` (scrolls away naturally) — আর fixed না
- Floating pill navbar: `position: fixed`, appears at scrollY > 450px (spring animation)
- Layout.jsx থেকে `pt-[navbar-h]` সরানো হয়েছে
- Mega menu: 4 column redesign — color-coded (blue/purple/green/amber), card-style items with icon + description
- Mobile sidebar: improved — user card, search button, contact button at bottom, social marquee (drag/touch support)
- Tooltip: `bottom: calc(100%+8px)` → `top: calc(100%+8px)` fix (viewport overflow সমস্যা)
- `data-tooltip-up` class added for items near screen bottom

**Footer redesign:**
- Grid: `1.2fr 0.8fr 0.8fr 1.2fr` (30%+20%+20%+30%)
- Col 1: Logo (T avatar + green active dot on corner) + description + social pills
  - Desktop: transparent pills, Tablet: bg pills, Mobile: icon-only circles
- Col 2/3: Navigate + Resources — arrow animation on hover (slide-in chevron)
  - Footer nav title + styled underline gradient
  - Desktop: vertical list, Tablet: 3-col grid, Mobile: 2-col grid
- Col 4: Stay Connected (faInbox icon) + subscribe input + animated counter (2847)
  + Let's Connect card (links to /contact) + location line + email outside card
- Footer orb glow effects (blue left, purple right)
- Top gradient line (blue→purple)
- Bottom bar: copyright + version badge (green dot) + scroll-to-top
  - Mobile: scroll-to-top button straddles the border (absolute -22px)

**Universal Ripple:**
- `src/components/ui/Ripple.jsx` — `useRipple()` hook + `RippleLayer` component
- Applied to: Button.jsx (all variants), IconBtn, SignInBtn, SubBtn, BackToTop
- `@keyframes ripple-expand` added to index.css

**Advanced Skeleton:**
- `PageSkeleton` component: layout prop = 'hero'|'list'|'grid'|'detail'|'profile'|'admin'|'form'|'blank'
- Auto-generates appropriate skeleton based on page type
- All primitives use `animationDelay` for staggered feel

**404 page redesign:**
- "4 😢 4" — large numbers with sad face icon (animated bounce/wobble) in the middle
- Muted "If you think it's our mistake..." line with /contact link
- Quick links row: About, Projects, Feed, Contact

**Other:**
- `sidebar-scroll` class: thin scrollbar for sidebar
- `marquee-scroll` keyframe: social marquee animation
- Button.jsx: ripple on all variants, color-matched ripple per variant

**Discussions/Decisions:**
- Context file format change: single `context.md` (this file) instead of per-version files
- Old `v2.0-context.md` এবং `v2.1-context.md` deprecated, এই file replace করেছে
- User চেয়েছিলেন footer এ `faMailbox` icon — কিন্তু free-solid এ নেই, `faInbox` দিয়ে replace

**Pending for next version:**
- Home page (v2.2.0) — hero section + skills + stats + about-mini
- Navbar এ notification এখনো placeholder data — real RTDB listener আছে কিন্তু real data v2.9.0 তে
- Cloudflare Worker এখনো deploy হয়নি
- Subscribe input কাজ করে না (worker API call নেই) — v2.6.0 বা v2.9.0 তে

---

