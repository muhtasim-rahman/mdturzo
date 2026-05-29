// GithubStats.jsx -- v2.2.9
// REDESIGN:
//   1. Profile card: left = avatar+name+username+joinDate+bio (column); right = 5 compact stat cards (4 data + 1 redirect)
//   2. Two cards below: streak (left) + profile grade/awesome-stats (right) — theme-aware bg, no border on images
//   3. Trophy section REMOVED
//   4. Top Languages bar (kept)
//   5. Top 6 repos (4 tablet, 3 mobile)
//   6. API retry logic: skeleton + 5s intervals x3, then hourly retry
//   * Light mode: white bg for image cards; dark mode: bg-surface (theme match)

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faStar, faCodeFork, faUsers, faBook, faCodeBranch,
  faArrowUpRightFromSquare, faSpinner, faRotate,
  faLocationDot, faCalendar, faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'
import { useThemeStore } from '../../store/themeStore.js'

const GH_USER = 'muhtasim-rahman'
const CARD_ACCENT = '#c084fc'
const MAX_RETRIES = 3
const RETRY_INTERVAL = 5000
// GitHub rate limit resets every 3600s
const RATE_LIMIT_RETRY = 3600000

const LANG_COLORS = {
  JavaScript:'#f7df1e', TypeScript:'#3178c6', Python:'#3776ab',
  HTML:'#e44d26', CSS:'#264de4', Shell:'#89e051',
  PHP:'#777bb4', Java:'#b07219',
  Go:'#00add8', Rust:'#dea584', Swift:'#ffac45',
  Ruby:'#701516', Kotlin:'#A97BFF', Dart:'#00b4ab',
  Vue:'#41b883', SCSS:'#c6538c', 'C#':'#178600',
  'default':'#64748b',
}
const getLangColor = (l) => LANG_COLORS[l] ?? LANG_COLORS.default

// -- Repo Card ------------------------------------------------
function RepoCard({ repo, i }) {
  return (
    <motion.a href={repo.html_url} target="_blank" rel="noopener noreferrer"
      className="gh-repo-card"
      initial={{ opacity:0, y:16 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:.1 }}
      transition={{ duration:.38, delay: i*.05 }}>
      <div className="gh-repo-top">
        <FontAwesomeIcon icon={faBook} className="gh-repo-book" />
        <span className="gh-repo-name">{repo.name}</span>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="gh-repo-ext" />
      </div>
      {repo.description && <p className="gh-repo-desc">{repo.description}</p>}
      <div className="gh-repo-meta">
        {repo.language && (
          <span className="gh-repo-lang">
            <span className="gh-repo-lang-dot" style={{ background: getLangColor(repo.language) }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="gh-repo-stat">
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-[10px]" />
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="gh-repo-stat">
            <FontAwesomeIcon icon={faCodeBranch} className="text-[var(--text-tertiary)] text-[10px]" />
            {repo.forks_count}
          </span>
        )}
      </div>
    </motion.a>
  )
}

// -- Language Bar ---------------------------------------------
function LangBar({ langs }) {
  if (!langs.length) return null
  const total = langs.reduce((a, b) => a + b.bytes, 0)
  return (
    <div className="gh-section-block">
      <p className="gh-sub-label">Language Distribution</p>
      <div className="gh-lang-bar">
        {langs.map((l, i) => (
          <motion.div key={l.lang} className="gh-lang-seg"
            style={{ '--clr': getLangColor(l.lang), flex: l.bytes / total }}
            title={`${l.lang}: ${((l.bytes/total)*100).toFixed(1)}%`}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once:true }}
            transition={{ duration:.65, delay: i*.07, ease:[.16,1,.3,1] }}
          />
        ))}
      </div>
      <div className="gh-lang-legend">
        {langs.slice(0, 8).map(l => (
          <span key={l.lang} className="gh-lang-item">
            <span className="gh-lang-dot" style={{ background: getLangColor(l.lang) }} />
            <span className="gh-lang-name">{l.lang}</span>
            <span className="gh-lang-pct">{((l.bytes/total)*100).toFixed(0)}%</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// -- Compact Stat Card ----------------------------------------
function StatCard({ icon, value, label, color }) {
  return (
    <div className="gh-stat-card" style={{ '--sc': color }}>
      <div className="gh-stat-card-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="gh-stat-card-body">
        <span className="gh-stat-card-val">{value ?? 0}</span>
        <span className="gh-stat-card-lbl">{label}</span>
      </div>
    </div>
  )
}

// -- Redirect Card (5th) --------------------------------------
function RedirectCard({ url }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="gh-redirect-card">
      <FontAwesomeIcon icon={faGithub} className="gh-redirect-icon" />
      <div className="gh-redirect-body">
        <span className="gh-redirect-label">View on GitHub</span>
        <span className="gh-redirect-sub">Open full profile</span>
      </div>
      <FontAwesomeIcon icon={faExternalLinkAlt} className="gh-redirect-arrow" />
    </a>
  )
}

// -- Profile Card (v2.2.9 redesign) ---------------------------
function ProfileCard({ profile, totalStars, repos }) {
  const joinYear = profile.created_at ? new Date(profile.created_at).getFullYear() : null
  const totalForks = repos.reduce((a,r)=>a+r.forks_count,0)

  return (
    <motion.div className="gh-profile-card"
      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.4 }}>

      {/* LEFT: avatar + info column */}
      <div className="gh-profile-left">
        {/* Avatar */}
        <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="gh-avatar-link">
          <img src={profile.avatar_url} alt={profile.name ?? GH_USER} className="gh-avatar" />
          <div className="gh-avatar-online" title="GitHub active" />
        </a>

        {/* Info column */}
        <div className="gh-profile-info">
          {/* Name */}
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="gh-profile-name">
            {profile.name ?? GH_USER}
          </a>
          {/* Username + join date row */}
          <div className="gh-profile-row2">
            <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="gh-profile-login">
              @{profile.login}
            </a>
            {joinYear && (
              <>
                <span className="gh-row2-dot">&bull;</span>
                <span className="gh-profile-since">
                  <FontAwesomeIcon icon={faCalendar} className="text-[9px]" />
                  Joined {joinYear}
                </span>
              </>
            )}
            {profile.location && (
              <>
                <span className="gh-row2-dot">&bull;</span>
                <span className="gh-profile-since">
                  <FontAwesomeIcon icon={faLocationDot} className="text-[9px]" />
                  {profile.location}
                </span>
              </>
            )}
          </div>
          {/* Bio */}
          {profile.bio && <p className="gh-profile-bio">{profile.bio}</p>}
        </div>
      </div>

      {/* RIGHT: 5 compact stat cards */}
      <div className="gh-profile-right">
        <StatCard icon={faBook}     value={profile.public_repos}  label="Repos"     color="#c084fc" />
        <StatCard icon={faStar}     value={totalStars}             label="Stars"     color="#fbbf24" />
        <StatCard icon={faUsers}    value={profile.followers}      label="Followers" color="#818cf8" />
        <StatCard icon={faCodeFork} value={totalForks}             label="Forks"     color="#38bdf8" />
        <RedirectCard url={profile.html_url} />
      </div>
    </motion.div>
  )
}

// -- Skeleton for loading state ---------------------------------
function GhSkeleton() {
  return (
    <div className="gh-skeleton-wrap">
      <div className="gh-sk-profile">
        <div className="gh-sk-avatar sk" />
        <div className="gh-sk-lines">
          <div className="sk gh-sk-line-a" />
          <div className="sk gh-sk-line-b" />
          <div className="sk gh-sk-line-c" />
        </div>
        <div className="gh-sk-stats">
          {[0,1,2,3,4].map(i=><div key={i} className="sk gh-sk-stat"/>)}
        </div>
      </div>
      <div className="gh-sk-two-col">
        <div className="sk gh-sk-img" />
        <div className="sk gh-sk-img" />
      </div>
      <div className="sk gh-sk-lang" />
      <div className="gh-sk-repos">
        {[0,1,2,3,4,5].map(i=><div key={i} className="sk gh-sk-repo" />)}
      </div>
    </div>
  )
}

// -- Main export ----------------------------------------------
export default function GithubStats() {
  const [profile, setProfile] = useState(null)
  const [repos,   setRepos  ] = useState([])
  const [langs,   setLangs  ] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError  ] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const { isDark } = useThemeStore()
  const dark = isDark()

  // v2.2.9: theme-matched colors for image APIs
  // Streak — custom color params to match our theme
  const streakUrl = dark
    ? `https://github-readme-streak-stats.herokuapp.com/?user=${GH_USER}&hide_border=true&background=0F172A&border=1E293B&stroke=1E293B&ring=c084fc&fire=f97316&sideLabels=94a3b8&currStreakLabel=c084fc&dates=64748b&sideNums=f8fafc&currStreakNum=f8fafc`
    : `https://github-readme-streak-stats.herokuapp.com/?user=${GH_USER}&hide_border=true&background=FFFFFF&border=E2E8F0&stroke=E2E8F0&ring=2563EB&fire=f97316&sideLabels=6B7280&currStreakLabel=2563EB&dates=6B7280&sideNums=0F172A&currStreakNum=0F172A`

  const awesomeUrl = dark
    ? `https://awesome-github-stats.azurewebsites.net/user-stats/${GH_USER}?cardType=level&fontFamily=42dot%20Sans&preferLogin=false&theme=nightowl`
    : `https://awesome-github-stats.azurewebsites.net/user-stats/${GH_USER}?cardType=level&fontFamily=42dot%20Sans&preferLogin=false&theme=default`

  const load = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const [profRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GH_USER}`),
        fetch(`https://api.github.com/users/${GH_USER}/repos?sort=stars&per_page=100&type=owner`),
      ])
      if (!profRes.ok) {
        if (profRes.status === 403) throw new Error('rate_limited')
        throw new Error(`GitHub API ${profRes.status}`)
      }
      const profData  = await profRes.json()
      const reposData = reposRes.ok ? await reposRes.json() : []
      setProfile(profData)

      const sorted = reposData.filter(r => !r.fork).sort((a,b)=>b.stargazers_count-a.stargazers_count).slice(0,6)
      setRepos(sorted)

      const langMap = {}
      await Promise.all(
        reposData.filter(r => !r.fork).slice(0,30).map(r =>
          fetch(r.languages_url).then(res=>res.ok?res.json():{}).then(d=>{
            Object.entries(d).forEach(([lang,bytes])=>{ langMap[lang]=(langMap[lang]||0)+bytes })
          }).catch(()=>{})
        )
      )
      setLangs(Object.entries(langMap).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([lang,bytes])=>({lang,bytes})))
      setRetryCount(0)
      return true
    } catch(e) {
      setError(e.message ?? 'Failed to load')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  // v2.2.9: retry logic — 3 retries at 5s intervals, then hourly
  useEffect(() => {
    let timer
    const attempt = async (count) => {
      const success = await load()
      if (!success) {
        if (count < MAX_RETRIES) {
          setRetryCount(count + 1)
          timer = setTimeout(() => attempt(count + 1), RETRY_INTERVAL)
        } else {
          // After 3 failures, try again after rate limit reset (1 hour)
          timer = setTimeout(() => attempt(0), RATE_LIMIT_RETRY)
        }
      }
    }
    attempt(0)
    return () => clearTimeout(timer)
  }, [load])

  const totalStars = repos.reduce((a,r)=>a+r.stargazers_count,0)

  return (
    <section className="section section-alt" id="github">
      <div className="container-xl">

        {/* Heading */}
        <motion.div className="text-center mb-10"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.5 }} transition={{ duration:.5 }}>
          <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: CARD_ACCENT }}>Open Source</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">GitHub Activity</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">
            Real-time stats pulled from the GitHub API.
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {loading && <GhSkeleton />}

        {/* Error state */}
        {!loading && error && (
          <div className="flex flex-col items-center py-16 gap-4 text-center">
            <p className="text-[var(--text-secondary)] text-sm">
              {error === 'rate_limited'
                ? `GitHub API rate-limited. Auto-retrying${retryCount < MAX_RETRIES ? ` (${retryCount}/${MAX_RETRIES})` : ' in 1 hour'}...`
                : error}
            </p>
            <button onClick={() => load()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all active:scale-[.97]">
              <FontAwesomeIcon icon={faRotate} /> Retry Now
            </button>
          </div>
        )}

        {/* Main content */}
        {!loading && !error && profile && (
          <>
            {/* 1. Profile card */}
            <ProfileCard profile={profile} totalStars={totalStars} repos={repos} />

            {/* 2. Two-col: streak | awesome-stats */}
            <motion.div className="gh-two-col"
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.45, delay:.1 }}>
              {/* LEFT: streak */}
              <div className="gh-img-panel" data-dark={dark ? "true" : "false"}>
                <p className="gh-panel-label">Contribution Streak</p>
                <div className="gh-img-wrap">
                  <img
                    src={streakUrl}
                    alt="GitHub streak stats"
                    className="gh-stat-img"
                    loading="lazy"
                    key={dark ? 'streak-dark' : 'streak-light'}
                  />
                </div>
              </div>
              {/* RIGHT: awesome-github-stats */}
              <div className="gh-img-panel" data-dark={dark ? "true" : "false"}>
                <p className="gh-panel-label">Profile Grade</p>
                <div className="gh-img-wrap">
                  <img
                    src={awesomeUrl}
                    alt="GitHub profile grade"
                    className="gh-stat-img"
                    loading="lazy"
                    key={`awesome-${dark}`}
                  />
                </div>
              </div>
            </motion.div>

            {/* 3. Language bar */}
            {langs.length > 0 && <LangBar langs={langs} />}

            {/* 4. Top repos */}
            {repos.length > 0 && (
              <div className="gh-section-block">
                <p className="gh-sub-label">Top Repositories</p>
                <div className="gh-repos-grid">
                  {repos.map((r,i) => <RepoCard key={r.id} repo={r} i={i} />)}
                </div>
              </div>
            )}

            {/* Footer link */}
            <motion.div className="flex justify-center mt-8"
              initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true }} transition={{ duration:.5 }}>
              <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all active:scale-[.97] group">
                <FontAwesomeIcon icon={faGithub} />
                View Full Profile on GitHub
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </>
        )}
      </div>

      <style>{`
        /* =====================================================
           PROFILE CARD (v2.2.9 redesign)
           ===================================================== */
        .gh-profile-card {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-top: 2px solid ${CARD_ACCENT};
          border-radius: 18px;
          padding: 1.4rem 1.6rem;
          margin-bottom: 1.25rem;
        }
        @media (max-width: 768px) {
          .gh-profile-card { flex-direction: column; }
        }

        /* Left: avatar + info */
        .gh-profile-left {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          flex: 1;
          min-width: 0;
        }
        .gh-avatar-link {
          position: relative;
          flex-shrink: 0;
          display: block;
        }
        .gh-avatar {
          width: 72px; height: 72px;
          border-radius: 16px;
          object-fit: cover;
          border: 2px solid ${CARD_ACCENT}44;
          display: block;
        }
        .gh-avatar-online {
          position: absolute;
          bottom: 2px; right: 2px;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: #22c55e;
          border: 2px solid var(--bg-surface);
          box-shadow: 0 0 6px #22c55e88;
        }

        /* Info column (name, username/date, bio) */
        .gh-profile-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          min-width: 0;
        }
        .gh-profile-name {
          font-size: 1.02rem;
          font-weight: 800;
          color: var(--text-primary);
          font-family: var(--font-display);
          text-decoration: none;
          line-height: 1.2;
          transition: color .15s;
        }
        .gh-profile-name:hover { color: ${CARD_ACCENT}; }

        /* Username · join date row */
        .gh-profile-row2 {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: .3rem .5rem;
          font-size: .76rem;
        }
        .gh-profile-login {
          color: ${CARD_ACCENT};
          font-family: var(--font-mono);
          font-weight: 600;
          text-decoration: none;
        }
        .gh-profile-login:hover { text-decoration: underline; }
        .gh-row2-dot { color: var(--text-tertiary); opacity: .5; font-size: .7rem; }
        .gh-profile-since {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          color: var(--text-tertiary);
          font-size: .72rem;
        }
        .gh-profile-bio {
          font-size: .82rem;
          color: var(--text-secondary);
          line-height: 1.55;
          max-width: 380px;
          margin-top: 2px;
        }

        /* Right: 5 compact stat cards */
        .gh-profile-right {
          display: flex;
          flex-direction: column;
          gap: .45rem;
          flex-shrink: 0;
          min-width: 160px;
        }
        @media (max-width: 768px) {
          .gh-profile-right {
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            min-width: unset;
          }
        }

        /* Compact stat card */
        .gh-stat-card {
          display: flex;
          align-items: center;
          gap: .55rem;
          padding: .42rem .7rem;
          border-radius: 10px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          transition: border-color .18s, transform .18s;
        }
        .gh-stat-card:hover { border-color: var(--sc); transform: translateX(-2px); }
        @media (max-width: 768px) {
          .gh-stat-card { flex: 1; min-width: 100px; }
          .gh-stat-card:hover { transform: translateY(-2px); }
        }
        .gh-stat-card-icon {
          width: 26px; height: 26px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--sc) 15%, transparent);
          color: var(--sc);
          font-size: 11px;
          flex-shrink: 0;
        }
        .gh-stat-card-body {
          display: flex; flex-direction: column; gap: 1px;
        }
        .gh-stat-card-val {
          font-size: .95rem; font-weight: 800;
          font-family: var(--font-display);
          color: var(--text-primary); line-height: 1;
        }
        .gh-stat-card-lbl {
          font-size: .62rem; color: var(--text-tertiary);
          text-transform: uppercase; letter-spacing: .06em;
        }

        /* Redirect card (5th — different design) */
        .gh-redirect-card {
          display: flex;
          align-items: center;
          gap: .55rem;
          padding: .48rem .7rem;
          border-radius: 10px;
          background: color-mix(in srgb, ${CARD_ACCENT} 10%, transparent);
          border: 1px solid color-mix(in srgb, ${CARD_ACCENT} 30%, transparent);
          text-decoration: none;
          transition: background .18s, border-color .18s, transform .18s;
          cursor: pointer;
        }
        .gh-redirect-card:hover {
          background: color-mix(in srgb, ${CARD_ACCENT} 18%, transparent);
          border-color: ${CARD_ACCENT};
          transform: translateX(-2px);
        }
        .gh-redirect-card:active { transform: scale(.96); }
        @media (max-width: 768px) {
          .gh-redirect-card { flex: 1; min-width: 100px; }
          .gh-redirect-card:hover { transform: translateY(-2px); }
        }
        .gh-redirect-icon {
          font-size: 16px;
          color: ${CARD_ACCENT};
          flex-shrink: 0;
        }
        .gh-redirect-body { display: flex; flex-direction: column; gap: 1px; flex: 1; }
        .gh-redirect-label {
          font-size: .82rem; font-weight: 700;
          color: ${CARD_ACCENT};
          line-height: 1.2;
        }
        .gh-redirect-sub {
          font-size: .62rem; color: var(--text-tertiary);
          text-transform: uppercase; letter-spacing: .05em;
        }
        .gh-redirect-arrow {
          font-size: 10px;
          color: ${CARD_ACCENT};
          opacity: .6;
          flex-shrink: 0;
        }

        /* =====================================================
           TWO-COL IMAGE PANELS (streak + grade)
           ===================================================== */
        .gh-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        @media (max-width: 640px) {
          .gh-two-col { grid-template-columns: 1fr; }
        }
        .gh-img-panel {
          border-radius: 14px;
          padding: .9rem 1rem;
          display: flex;
          flex-direction: column;
          gap: .6rem;
          overflow: hidden;
          /* v2.2.9: no border, background matches image API */
          border: none;
          /* Light mode: white; Dark mode: bg-surface to match API dark bg */
          background: #FFFFFF;
        }
        [data-theme="dark"] .gh-img-panel {
          background: #0F172A;
        }
        .gh-panel-label {
          font-size: .68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--text-tertiary);
        }
        .gh-img-wrap {
          display: flex; align-items: center; justify-content: center;
          min-height: 80px;
        }
        .gh-stat-img {
          width: 100%; height: auto; display: block;
          /* v2.2.9: no border */
          border: none;
          border-radius: 0;
        }

        /* =====================================================
           LANGUAGE BAR
           ===================================================== */
        .gh-section-block { margin-bottom: 1.25rem; }
        .gh-sub-label {
          font-size: .7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .12em;
          color: var(--text-tertiary); margin-bottom: .5rem;
        }
        .gh-lang-bar {
          display: flex; height: 8px; border-radius: 9999px; overflow: hidden; gap: 2px;
          margin-bottom: .65rem;
        }
        .gh-lang-seg { height: 100%; background: var(--clr); }
        .gh-lang-legend { display: flex; flex-wrap: wrap; gap: .4rem .8rem; }
        .gh-lang-item  { display: inline-flex; align-items: center; gap: 5px; font-size: .77rem; color: var(--text-secondary); }
        .gh-lang-dot   { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .gh-lang-name  { font-weight: 500; }
        .gh-lang-pct   { color: var(--text-tertiary); font-size: .7rem; font-family: var(--font-mono); }

        /* =====================================================
           REPO GRID (6 desktop, 4 tablet, 3 mobile)
           ===================================================== */
        .gh-repos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: .75rem;
          margin-top: .5rem;
        }
        @media (max-width: 900px) { .gh-repos-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 900px) { .gh-repos-grid > *:nth-child(n+5) { display: none; } }
        @media (max-width: 480px) { .gh-repos-grid { grid-template-columns: 1fr; } }
        @media (max-width: 480px) { .gh-repos-grid > *:nth-child(n+4) { display: none; } }

        .gh-repo-card {
          display: flex; flex-direction: column; gap: .45rem;
          padding: .85rem 1rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          text-decoration: none; color: inherit;
          transition: border-color .18s ease, transform .18s ease;
          min-height: 90px;
        }
        .gh-repo-card:hover {
          border-color: ${CARD_ACCENT}55;
          transform: translateY(-2px);
        }
        .gh-repo-card:active { transform: scale(.97); }
        .gh-repo-top  { display: flex; align-items: flex-start; gap: .45rem; }
        .gh-repo-book { font-size: 10px; color: var(--text-tertiary); margin-top: 2px; flex-shrink: 0; }
        .gh-repo-name {
          flex: 1; min-width: 0;
          font-size: .82rem; font-weight: 700; color: var(--text-primary);
          font-family: var(--font-mono);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .gh-repo-ext  { font-size: 10px; color: var(--text-tertiary); margin-top: 2px; flex-shrink: 0; opacity: 0; transition: opacity .15s; }
        .gh-repo-card:hover .gh-repo-ext { opacity: 1; }
        .gh-repo-desc {
          font-size: .74rem; color: var(--text-secondary); line-height: 1.5; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .gh-repo-meta { display: flex; align-items: center; gap: .6rem; margin-top: auto; flex-wrap: wrap; }
        .gh-repo-lang { display: inline-flex; align-items: center; gap: 4px; font-size: .72rem; color: var(--text-secondary); }
        .gh-repo-lang-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .gh-repo-stat { display: inline-flex; align-items: center; gap: 3px; font-size: .72rem; color: var(--text-secondary); }

        /* =====================================================
           SKELETON LOADING
           ===================================================== */
        .gh-skeleton-wrap { display: flex; flex-direction: column; gap: 1rem; }
        .gh-sk-profile {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.4rem 1.6rem;
          border-radius: 18px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
        }
        .gh-sk-avatar { width: 72px; height: 72px; border-radius: 16px; flex-shrink: 0; }
        .gh-sk-lines { flex: 1; display: flex; flex-direction: column; gap: .5rem; padding-top: 4px; }
        .gh-sk-line-a { height: 16px; border-radius: 6px; width: 60%; }
        .gh-sk-line-b { height: 12px; border-radius: 6px; width: 80%; }
        .gh-sk-line-c { height: 12px; border-radius: 6px; width: 50%; }
        .gh-sk-stats { display: flex; flex-direction: column; gap: .45rem; width: 160px; flex-shrink: 0; }
        .gh-sk-stat { height: 38px; border-radius: 10px; }
        .gh-sk-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 640px) { .gh-sk-two-col { grid-template-columns: 1fr; } }
        .gh-sk-img { height: 140px; border-radius: 14px; }
        .gh-sk-lang { height: 32px; border-radius: 8px; }
        .gh-sk-repos { display: grid; grid-template-columns: repeat(3,1fr); gap: .75rem; }
        @media (max-width: 900px) { .gh-sk-repos { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 480px) { .gh-sk-repos { grid-template-columns: 1fr; } }
        .gh-sk-repo { height: 90px; border-radius: 12px; }
      `}</style>
    </section>
  )
}
