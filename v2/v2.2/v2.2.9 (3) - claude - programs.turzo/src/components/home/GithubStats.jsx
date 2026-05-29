// GithubStats.jsx -- v2.2.9
// REDESIGN:
//   1. Profile card: avatar LEFT, name/username/bio CENTER column, 5 compact cards RIGHT
//      (4 stat cards + 1 special profile-redirect card)
//   2. Trophies section REMOVED
//   3. Streak + profile grade cards: transparent bg if API supports it,
//      light mode = white, dark mode = theme-matched dark
//      no image border; same card design for both
//   4. Top repos: 6 desktop, 4 tablet, 3 mobile
//   5. API retry: skeleton loading, auto-retry 3x at 5s intervals,
//      then retry at GitHub's rate-limit reset time
//   6. Repo grid updated breakpoints

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faStar, faCodeFork, faUsers, faBook, faCodeBranch,
  faArrowUpRightFromSquare, faRotate, faLocationDot,
  faCalendar, faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'
import { useThemeStore } from '../../store/themeStore.js'

const GH_USER = 'muhtasim-rahman'
const ACCENT   = '#c084fc'
// How many repos to show per breakpoint handled via CSS
// We always fetch 6 but hide extras via CSS

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

// ---------- Skeleton components ----------
function SkeletonBlock({ h = 16, w = '100%', rounded = 8 }) {
  return (
    <div className="gh-sk" style={{ height: h, width: w, borderRadius: rounded }} />
  )
}

function ProfileCardSkeleton() {
  return (
    <div className="gh-profile-card">
      <div className="gh-sk" style={{ width:72, height:72, borderRadius:16, flexShrink:0 }} />
      <div className="gh-profile-center" style={{ flex:1 }}>
        <SkeletonBlock h={18} w="55%" />
        <SkeletonBlock h={12} w="40%" />
        <SkeletonBlock h={12} w="80%" />
      </div>
      <div className="gh-profile-cards-col">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="gh-pstat-card">
            <SkeletonBlock h={14} w="60%" rounded={6} />
            <SkeletonBlock h={20} w="40%" rounded={6} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------- Profile Card ----------
function ProfileCard({ profile, totalStars, repos }) {
  const joinYear = profile.created_at ? new Date(profile.created_at).getFullYear() : null
  const joinMonth = profile.created_at
    ? new Date(profile.created_at).toLocaleString('en-US', { month: 'short' })
    : null

  const stats = [
    { label: 'Repos',    value: profile.public_repos ?? 0, icon: faBook,     color: '#c084fc' },
    { label: 'Stars',    value: totalStars,                 icon: faStar,     color: '#fbbf24' },
    { label: 'Followers',value: profile.followers ?? 0,    icon: faUsers,    color: '#818cf8' },
    { label: 'Forks',    value: repos.reduce((a,r)=>a+r.forks_count,0), icon: faCodeFork, color: '#38bdf8' },
  ]

  return (
    <motion.div className="gh-profile-card"
      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.4 }}>

      {/* Avatar */}
      <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="gh-avatar-link">
        <img src={profile.avatar_url} alt={profile.name ?? GH_USER} className="gh-avatar" />
        <div className="gh-avatar-online" />
      </a>

      {/* Center: name / username / bio */}
      <div className="gh-profile-center">
        <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="gh-profile-name">
          {profile.name ?? GH_USER}
        </a>
        <div className="gh-profile-sub-row">
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="gh-profile-login">
            @{profile.login}
          </a>
          {joinYear && (
            <>
              <span className="gh-sub-bull">&bull;</span>
              <span className="gh-profile-joined">
                <FontAwesomeIcon icon={faCalendar} style={{fontSize:9}} /> {joinMonth} {joinYear}
              </span>
            </>
          )}
          {profile.location && (
            <>
              <span className="gh-sub-bull">&bull;</span>
              <span className="gh-profile-joined">
                <FontAwesomeIcon icon={faLocationDot} style={{fontSize:9}} /> {profile.location}
              </span>
            </>
          )}
        </div>
        {profile.bio && <p className="gh-profile-bio">{profile.bio}</p>}
      </div>

      {/* Right: 5 compact cards */}
      <div className="gh-profile-cards-col">
        {stats.map(s => (
          <div key={s.label} className="gh-pstat-card" style={{'--c': s.color}}>
            <span className="gh-pstat-card-label">
              <FontAwesomeIcon icon={s.icon} className="gh-pstat-card-icon" />
              {s.label}
            </span>
            <span className="gh-pstat-card-val">{s.value}</span>
          </div>
        ))}
        {/* 5th: special redirect card */}
        <a href={profile.html_url} target="_blank" rel="noopener noreferrer"
          className="gh-pstat-card gh-pstat-redirect">
          <span className="gh-pstat-card-label">
            <FontAwesomeIcon icon={faGithub} className="gh-pstat-card-icon" />
            Profile
          </span>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="gh-redirect-arrow" />
        </a>
      </div>
    </motion.div>
  )
}

// ---------- Lang Bar ----------
function LangBar({ langs }) {
  if (!langs.length) return null
  const total = langs.reduce((a, b) => a + b.bytes, 0)
  return (
    <div className="gh-section-block">
      <p className="gh-sub-label">Top Languages</p>
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

// ---------- Repo Card ----------
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
            <FontAwesomeIcon icon={faStar} className="gh-star-icon" />
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="gh-repo-stat">
            <FontAwesomeIcon icon={faCodeBranch} className="gh-fork-icon" />
            {repo.forks_count}
          </span>
        )}
      </div>
    </motion.a>
  )
}

// ---------- Stats image panel ----------
function StatImagePanel({ label, src, imgKey, alt }) {
  const [loaded, setLoaded] = useState(false)
  const [error,  setError ] = useState(false)
  return (
    <div className="gh-img-panel">
      <p className="gh-panel-label">{label}</p>
      <div className="gh-img-wrap">
        {!error ? (
          <>
            {!loaded && <div className="gh-sk" style={{ width:'100%', height:80, borderRadius:8 }} />}
            <img
              src={src}
              alt={alt}
              className="gh-stat-img"
              style={{ display: loaded ? 'block' : 'none' }}
              loading="lazy"
              key={imgKey}
              onLoad={()=>setLoaded(true)}
              onError={()=>{ setError(true); setLoaded(true) }}
            />
          </>
        ) : (
          <p className="gh-img-error">Image unavailable</p>
        )}
      </div>
    </div>
  )
}

// ---------- Main export ----------
export default function GithubStats() {
  const [profile,    setProfile   ] = useState(null)
  const [repos,      setRepos     ] = useState([])
  const [langs,      setLangs     ] = useState([])
  const [loading,    setLoading   ] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const [retryAt,    setRetryAt   ] = useState(null) // epoch ms when to retry
  const [countdown,  setCountdown ] = useState(null) // seconds left
  const retryTimer = useRef(null)
  const countdownTimer = useRef(null)
  const { isDark } = useThemeStore()
  const dark = isDark()

  // Streak: transparent background via hide_border + background=00000000
  const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${GH_USER}&hide_border=true&background=00000000&stroke=c084fc&ring=c084fc&fire=f97316&sideLabels=94a3b8&currStreakLabel=c084fc&dates=64748b&theme=${dark ? 'transparent' : 'transparent'}`

  // Awesome-github-stats: transparent background attempt
  const awesomeUrl = `https://awesome-github-stats.azurewebsites.net/user-stats/${GH_USER}?cardType=level&fontFamily=42dot%20Sans&preferLogin=false&Background=00000000&Border=00000000&Text=${dark ? 'c084fc' : '6d28d9'}&Title=${dark ? 'f8fafc' : '0f172a'}&theme=${dark ? 'tokyonight' : 'default'}`

  const load = async (attempt = 0) => {
    setLoading(true)
    try {
      const [profRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GH_USER}`),
        fetch(`https://api.github.com/users/${GH_USER}/repos?sort=stars&per_page=100&type=owner`),
      ])

      // Handle rate limit
      if (profRes.status === 403 || profRes.status === 429) {
        const resetHeader = profRes.headers.get('X-RateLimit-Reset')
        const retryAfter  = profRes.headers.get('Retry-After')
        let waitMs

        if (retryAfter) {
          waitMs = parseInt(retryAfter, 10) * 1000
        } else if (resetHeader) {
          waitMs = Math.max(0, parseInt(resetHeader, 10) * 1000 - Date.now())
        } else {
          waitMs = 60 * 1000 // fallback 60s
        }

        if (attempt < 3) {
          // First 3 attempts: retry every 5 seconds
          setRetryCount(attempt + 1)
          retryTimer.current = setTimeout(() => load(attempt + 1), 5000)
        } else {
          // After 3 attempts: wait for rate-limit reset
          const resetTime = Date.now() + waitMs
          setRetryAt(resetTime)
          setLoading(false)
          scheduleAutoRetry(resetTime)
        }
        return
      }

      if (!profRes.ok) throw new Error(`GitHub API error ${profRes.status}`)

      const profData  = await profRes.json()
      const reposData = reposRes.ok ? await reposRes.json() : []

      setProfile(profData)
      setRetryCount(0)
      setRetryAt(null)
      clearCountdown()

      const sorted = reposData.filter(r => !r.fork)
        .sort((a,b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
      setRepos(sorted)

      const langMap = {}
      await Promise.all(
        reposData.filter(r => !r.fork).slice(0, 30).map(r =>
          fetch(r.languages_url).then(res=>res.ok?res.json():{}).then(d=>{
            Object.entries(d).forEach(([lang,bytes])=>{ langMap[lang]=(langMap[lang]||0)+bytes })
          }).catch(()=>{})
        )
      )
      setLangs(Object.entries(langMap).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([lang,bytes])=>({lang,bytes})))
    } catch(e) {
      if (attempt < 3) {
        setRetryCount(attempt + 1)
        retryTimer.current = setTimeout(() => load(attempt + 1), 5000)
      } else {
        const resetTime = Date.now() + 60000
        setRetryAt(resetTime)
        scheduleAutoRetry(resetTime)
      }
    } finally {
      setLoading(false)
    }
  }

  const scheduleAutoRetry = (resetTime) => {
    clearCountdown()
    const update = () => {
      const left = Math.ceil((resetTime - Date.now()) / 1000)
      if (left <= 0) {
        clearCountdown()
        load(0)
      } else {
        setCountdown(left)
        countdownTimer.current = setTimeout(update, 1000)
      }
    }
    update()
  }

  const clearCountdown = () => {
    if (countdownTimer.current) clearTimeout(countdownTimer.current)
    setCountdown(null)
  }

  useEffect(() => {
    load(0)
    return () => {
      if (retryTimer.current) clearTimeout(retryTimer.current)
      clearCountdown()
    }
  }, [])

  const totalStars = repos.reduce((a,r)=>a+r.stargazers_count, 0)
  const isRateLimited = retryAt !== null && !loading

  return (
    <section className="section section-alt" id="github">
      <div className="container-xl">

        {/* Heading */}
        <motion.div className="text-center mb-10"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.5 }} transition={{ duration:.5 }}>
          <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: ACCENT }}>Open Source</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">GitHub Activity</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">
            Real-time stats pulled from the GitHub API.
          </p>
        </motion.div>

        {/* Rate limit message */}
        {isRateLimited && (
          <div className="gh-rate-limit-banner">
            <FontAwesomeIcon icon={faRotate} className="gh-rate-icon" />
            <p className="gh-rate-text">
              GitHub API rate limit reached.
              {countdown !== null
                ? <> Auto-retrying in <strong>{countdown}s</strong>.</>
                : ' Retrying soon.'}
            </p>
            <button onClick={() => { clearCountdown(); load(0) }} className="gh-retry-btn">
              Retry now
            </button>
          </div>
        )}

        {/* Profile card */}
        {loading && !profile
          ? <ProfileCardSkeleton />
          : profile && (
            <ProfileCard profile={profile} totalStars={totalStars} repos={repos} />
          )
        }
        {retryCount > 0 && retryCount <= 3 && loading && !profile && (
          <p className="gh-retry-note">Retrying... (attempt {retryCount}/3)</p>
        )}

        {/* Streak + Profile Grade images */}
        {(profile || loading) && (
          <motion.div className="gh-two-col"
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.45, delay:.1 }}>
            <StatImagePanel
              label="Contribution Streak"
              src={streakUrl}
              imgKey={`streak-${dark}`}
              alt="GitHub streak stats"
            />
            <StatImagePanel
              label="Profile Grade"
              src={awesomeUrl}
              imgKey={`awesome-${dark}`}
              alt="GitHub profile grade"
            />
          </motion.div>
        )}

        {/* Language bar */}
        {langs.length > 0 && <LangBar langs={langs} />}
        {loading && langs.length === 0 && (
          <div className="gh-section-block">
            <div className="gh-sk" style={{ height:8, borderRadius:9999, marginBottom:'.65rem' }} />
            <div style={{ display:'flex', gap:'.4rem', flexWrap:'wrap' }}>
              {[80,60,50,70,45].map(w=>(
                <div key={w} className="gh-sk" style={{ height:16, width:w, borderRadius:9999 }} />
              ))}
            </div>
          </div>
        )}

        {/* Top repos */}
        {repos.length > 0 && (
          <div className="gh-section-block">
            <p className="gh-sub-label">Top Repositories</p>
            <div className="gh-repos-grid">
              {repos.map((r,i) => <RepoCard key={r.id} repo={r} i={i} />)}
            </div>
          </div>
        )}
        {loading && repos.length === 0 && (
          <div className="gh-section-block">
            <div className="gh-sk" style={{ height:14, width:120, marginBottom:'.5rem', borderRadius:6 }} />
            <div className="gh-repos-grid">
              {[1,2,3,4,5,6].map(i=>(
                <div key={i} className="gh-repo-card" style={{ minHeight:90 }}>
                  <div className="gh-sk" style={{ height:12, width:'60%', borderRadius:4, marginBottom:'.4rem' }} />
                  <div className="gh-sk" style={{ height:10, width:'80%', borderRadius:4, marginBottom:'.3rem' }} />
                  <div className="gh-sk" style={{ height:10, width:'40%', borderRadius:4 }} />
                </div>
              ))}
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
      </div>

      <style>{`
        /* ── Skeleton ─────────────────────────────────── */
        .gh-sk {
          background: var(--sk-base);
          background-image: linear-gradient(90deg, var(--sk-base) 25%, var(--sk-shine) 50%, var(--sk-base) 75%);
          background-size: 200% 100%;
          animation: gh-sk-shimmer 1.4s ease infinite;
          display: block;
        }
        @keyframes gh-sk-shimmer { to { background-position: -200% 0; } }

        /* ── Profile card ──────────────────────────────── */
        .gh-profile-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.2rem 1.4rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        @media(max-width:640px){
          .gh-profile-card { flex-direction: column; align-items: flex-start; }
          .gh-profile-cards-col { flex-direction: row; flex-wrap: wrap; width: 100%; }
          .gh-pstat-card { flex: 1 1 calc(50% - .25rem); min-width: 0; }
        }

        /* Avatar */
        .gh-avatar-link { position: relative; flex-shrink: 0; display: block; }
        .gh-avatar {
          width: 68px; height: 68px;
          border-radius: 14px;
          object-fit: cover;
          border: 2px solid ${ACCENT}44;
          display: block;
        }
        .gh-avatar-online {
          position: absolute; bottom: 2px; right: 2px;
          width: 11px; height: 11px; border-radius: 50%;
          background: #22c55e; border: 2px solid var(--bg-surface);
          box-shadow: 0 0 6px #22c55e88;
        }

        /* Center column */
        .gh-profile-center {
          flex: 1; min-width: 0;
          display: flex; flex-direction: column; gap: 4px;
        }
        .gh-profile-name {
          font-size: .98rem; font-weight: 800;
          color: var(--text-primary); font-family: var(--font-display);
          text-decoration: none; line-height: 1.2; transition: color .15s;
        }
        .gh-profile-name:hover { color: ${ACCENT}; }
        .gh-profile-sub-row {
          display: flex; align-items: center; flex-wrap: wrap; gap: .3rem .5rem;
        }
        .gh-profile-login {
          font-size: .76rem; color: var(--text-tertiary); font-family: var(--font-mono);
          text-decoration: none; transition: color .14s;
        }
        .gh-profile-login:hover { color: var(--accent-primary); }
        .gh-sub-bull { color: var(--text-tertiary); font-size: .7rem; }
        .gh-profile-joined {
          display: inline-flex; align-items: center; gap: 3px;
          font-size: .7rem; color: var(--text-tertiary);
        }
        .gh-profile-bio {
          font-size: .78rem; color: var(--text-secondary); line-height: 1.5;
          margin-top: 4px; max-width: 360px;
        }

        /* Right compact stat cards column */
        .gh-profile-cards-col {
          display: flex; flex-direction: column; gap: .35rem;
          flex-shrink: 0; min-width: 110px;
        }
        .gh-pstat-card {
          display: flex; align-items: center; justify-content: space-between;
          padding: .38rem .6rem;
          border-radius: 8px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          gap: .5rem;
          transition: border-color .16s, background .16s;
          text-decoration: none;
          color: inherit;
          cursor: default;
        }
        .gh-pstat-redirect {
          cursor: pointer;
          background: color-mix(in srgb, ${ACCENT} 8%, transparent);
          border-color: ${ACCENT}33;
        }
        .gh-pstat-redirect:hover {
          background: color-mix(in srgb, ${ACCENT} 14%, transparent);
          border-color: ${ACCENT}66;
        }
        .gh-pstat-redirect:active { transform: scale(.97); }
        .gh-pstat-card-label {
          display: flex; align-items: center; gap: 4px;
          font-size: .68rem; color: var(--text-tertiary);
          text-transform: uppercase; letter-spacing: .06em; font-weight: 600;
        }
        .gh-pstat-card-icon { color: var(--c, ${ACCENT}); font-size: 9px; }
        .gh-pstat-card-val {
          font-size: .85rem; font-weight: 800; font-family: var(--font-display);
          color: var(--text-primary); line-height: 1;
        }
        .gh-redirect-arrow { font-size: 10px; color: ${ACCENT}; flex-shrink: 0; }

        /* ── Rate limit banner ─────────────────────────── */
        .gh-rate-limit-banner {
          display: flex; align-items: center; gap: .75rem;
          padding: .75rem 1rem; border-radius: 10px;
          background: var(--bg-surface);
          border: 1px solid rgba(245,158,11,.3);
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .gh-rate-icon { color: #F59E0B; font-size: 1rem; flex-shrink: 0; }
        .gh-rate-text { font-size: .82rem; color: var(--text-secondary); flex: 1; }
        .gh-retry-btn {
          font-size: .78rem; font-weight: 600; padding: .3rem .75rem;
          border-radius: 8px; border: 1px solid var(--border-color);
          color: var(--text-secondary); background: var(--bg-surface-2);
          cursor: pointer; transition: all .15s; flex-shrink: 0;
        }
        .gh-retry-btn:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
        .gh-retry-btn:active { transform: scale(.96); }
        .gh-retry-note {
          text-align: center; font-size: .78rem; color: var(--text-tertiary);
          margin-bottom: .75rem;
        }

        /* ── Two-col stats images ──────────────────────── */
        .gh-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: .75rem;
          margin-bottom: 1rem;
        }
        @media(max-width:600px){ .gh-two-col { grid-template-columns: 1fr; } }

        .gh-img-panel {
          border-radius: 12px;
          padding: .85rem 1rem;
          display: flex; flex-direction: column; gap: .5rem;
          overflow: hidden;
          /* v2.2.9: no border on image panels */
          border: none;
          /* Light mode: white; dark mode: theme-matched surface */
          background: var(--gh-panel-bg);
        }
        /* Light mode: white bg */
        [data-theme="light"] { --gh-panel-bg: #FFFFFF; }
        /* Dark mode: theme-matched dark (bg-surface-2) */
        [data-theme="dark"]  { --gh-panel-bg: var(--bg-surface-2); }

        .gh-panel-label {
          font-size: .65rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--text-tertiary);
        }
        .gh-img-wrap {
          display: flex; align-items: center; justify-content: center;
          min-height: 80px;
        }
        .gh-stat-img {
          width: 100%; height: auto; display: block;
          /* v2.2.9: no border on images */
          border: none; border-radius: 0;
        }
        .gh-img-error {
          font-size: .75rem; color: var(--text-tertiary);
          padding: 1rem; text-align: center;
        }

        /* ── Section blocks ─────────────────────────────── */
        .gh-section-block { margin-bottom: 1rem; }
        .gh-sub-label {
          font-size: .66rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .12em;
          color: var(--text-tertiary); margin-bottom: .5rem;
        }

        /* ── Language bar ───────────────────────────────── */
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

        /* ── Repo grid ──────────────────────────────────── */
        /* Desktop: 3 col (6 repos visible)
           Tablet (<=900): 2 col, only 4 shown
           Mobile (<=540): 1 col, only 3 shown */
        .gh-repos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: .7rem;
          margin-top: .5rem;
        }
        @media(max-width:900px){
          .gh-repos-grid { grid-template-columns: repeat(2, 1fr); }
          .gh-repos-grid > *:nth-child(n+5){ display: none; }
        }
        @media(max-width:540px){
          .gh-repos-grid { grid-template-columns: 1fr; }
          .gh-repos-grid > *:nth-child(n+4){ display: none; }
        }

        .gh-repo-card {
          display: flex; flex-direction: column; gap: .4rem;
          padding: .75rem .9rem;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          text-decoration: none; color: inherit;
          transition: border-color .18s, transform .18s, box-shadow .18s;
          min-height: 90px;
        }
        .gh-repo-card:hover {
          border-color: ${ACCENT}55;
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .gh-repo-card:active { transform: scale(.97)!important; }
        .gh-repo-top  { display: flex; align-items: flex-start; gap: .4rem; }
        .gh-repo-book { font-size: 9px; color: var(--text-tertiary); margin-top: 2px; flex-shrink: 0; }
        .gh-repo-name {
          flex: 1; min-width: 0;
          font-size: .8rem; font-weight: 700; color: var(--text-primary);
          font-family: var(--font-mono);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .gh-repo-ext { font-size: 9px; color: var(--text-tertiary); margin-top: 2px; flex-shrink: 0; opacity: 0; transition: opacity .14s; }
        .gh-repo-card:hover .gh-repo-ext { opacity: 1; }
        .gh-repo-desc {
          font-size: .72rem; color: var(--text-secondary); line-height: 1.5; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .gh-repo-meta { display: flex; align-items: center; gap: .5rem; margin-top: auto; flex-wrap: wrap; }
        .gh-repo-lang { display: inline-flex; align-items: center; gap: 4px; font-size: .7rem; color: var(--text-secondary); }
        .gh-repo-lang-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .gh-repo-stat { display: inline-flex; align-items: center; gap: 3px; font-size: .7rem; color: var(--text-secondary); }
        .gh-star-icon { color: #fbbf24; font-size: 9px; }
        .gh-fork-icon { color: var(--text-tertiary); font-size: 9px; }
      `}</style>
    </section>
  )
}
