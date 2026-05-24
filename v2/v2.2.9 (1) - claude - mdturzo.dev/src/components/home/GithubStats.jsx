// GithubStats.jsx -- v2.2.9
// CHANGES:
//   * Profile card redesigned: left column (avatar, name, clickable username, join date, bio)
//     + right side: 5 compact vertical stat cards (repos, stars, followers, forks) + 1 redirect card
//   * Streak / profile grade cards: light/dark bg fix, no border, transparent bg if API supports it
//   * Trophies section REMOVED
//   * Top repos: 6 desktop, 4 tablet, 3 mobile
//   * API limit handling: skeleton during load, 3 auto-retries (5s each), then wait & retry on ideal interval
//   * Footer redirect button unchanged

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faStar, faCodeFork, faUsers, faBook, faCodeBranch,
  faArrowUpRightFromSquare, faRotate, faLocationDot, faLink, faCalendar,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'
import { useThemeStore } from '../../store/themeStore.js'

const GH_USER = 'muhtasim-rahman'

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

// -- Skeleton components --------------------------------------
function SkLine({ w = '100%', h = 14, mb = 0 }) {
  return <div className="sk" style={{ width: w, height: h, marginBottom: mb, borderRadius: 6 }} />
}

function ProfileSkeleton() {
  return (
    <div className="gh-profile-card-v2" style={{ opacity: 0.7 }}>
      <div className="gh-profile-left-v2">
        <div className="sk" style={{ width: 72, height: 72, borderRadius: 14, flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SkLine w="55%" h={18} />
          <SkLine w="35%" h={12} />
          <SkLine w="80%" h={12} />
          <SkLine w="65%" h={12} />
        </div>
      </div>
      <div className="gh-profile-cards-v2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="sk" style={{ height: 68, borderRadius: 12 }} />
        ))}
      </div>
    </div>
  )
}

// -- Repo Card -----------------------------------------------
function RepoCard({ repo, i }) {
  return (
    <motion.a href={repo.html_url} target="_blank" rel="noopener noreferrer"
      className="gh-repo-card"
      initial={{ opacity:0, y:16 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:.1 }}
      transition={{ duration:.38, delay: i*.05 }}>
      <div className="gh-repo-top">
        <FontAwesomeIcon icon={faBook} className="text-[var(--text-tertiary)] text-[10px] mt-0.5 flex-shrink-0" />
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

// -- Language Bar --------------------------------------------
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

// -- Redesigned Profile Card ---------------------------------
function ProfileCard({ profile, totalStars, repos }) {
  const joinDate = profile.created_at ? new Date(profile.created_at) : null
  const joinStr = joinDate ? `${joinDate.toLocaleString('default',{month:'short'})} ${joinDate.getFullYear()}` : null
  const totalForks = repos.reduce((a, r) => a + r.forks_count, 0)

  const STAT_CARDS = [
    { icon: faBook,     value: profile.public_repos ?? 0, label: 'Repos',     color: '#c084fc' },
    { icon: faStar,     value: totalStars,                label: 'Stars',     color: '#fbbf24' },
    { icon: faUsers,    value: profile.followers ?? 0,    label: 'Followers', color: '#818cf8' },
    { icon: faCodeFork, value: totalForks,                label: 'Forks',     color: '#38bdf8' },
  ]

  return (
    <motion.div className="gh-profile-card-v2"
      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.4 }}>

      {/* Left column: avatar + meta */}
      <div className="gh-profile-left-v2">
        <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="gh-avatar-link">
          <img src={profile.avatar_url} alt={profile.name ?? GH_USER} className="gh-avatar" />
          <div className="gh-avatar-online" />
        </a>
        <div className="gh-profile-meta">
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="gh-profile-name-v2">
            {profile.name ?? GH_USER}
          </a>
          <div className="gh-profile-row2">
            <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="gh-profile-username">
              @{profile.login}
            </a>
            {joinStr && (
              <>
                <span className="gh-profile-sep">•</span>
                <span className="gh-profile-joindate">
                  <FontAwesomeIcon icon={faCalendar} style={{ fontSize: 10 }} />
                  {joinStr}
                </span>
              </>
            )}
          </div>
          {profile.bio && <p className="gh-profile-bio-v2">{profile.bio}</p>}
          {profile.location && (
            <span className="gh-detail-item">
              <FontAwesomeIcon icon={faLocationDot} className="text-[10px]" />
              {profile.location}
            </span>
          )}
        </div>
      </div>

      {/* Right: 5 compact cards: 4 stats + 1 redirect */}
      <div className="gh-profile-cards-v2">
        {STAT_CARDS.map(s => (
          <div key={s.label} className="gh-pcard" style={{ '--c': s.color }}>
            <FontAwesomeIcon icon={s.icon} className="gh-pcard-icon" />
            <span className="gh-pcard-val">{s.value}</span>
            <span className="gh-pcard-lbl">{s.label}</span>
          </div>
        ))}
        {/* 5th card: redirect to GitHub profile */}
        <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="gh-pcard gh-pcard-redirect">
          <FontAwesomeIcon icon={faGithub} className="gh-pcard-icon" />
          <span className="gh-pcard-val" style={{ fontSize: '0.65rem' }}>View</span>
          <span className="gh-pcard-lbl">Profile</span>
          <FontAwesomeIcon icon={faExternalLinkAlt} style={{ fontSize: 8, marginTop: 2, opacity: 0.6 }} />
        </a>
      </div>
    </motion.div>
  )
}

// -- Stats image panel (streak / grade) ----------------------
function StatImagePanel({ label, src, alt, dark }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  return (
    <div className="gh-img-panel">
      <p className="gh-panel-label">{label}</p>
      <div className="gh-img-wrap">
        {!loaded && !failed && <div className="sk" style={{ width: '100%', height: 100, borderRadius: 8 }} />}
        {!failed && (
          <img
            src={src}
            alt={alt}
            className="gh-stat-img"
            loading="lazy"
            key={`${dark}-${label}`}
            style={{ display: loaded ? 'block' : 'none' }}
            onLoad={() => setLoaded(true)}
            onError={() => { setFailed(true); setLoaded(true) }}
          />
        )}
        {failed && (
          <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            Stats unavailable
          </div>
        )}
      </div>
    </div>
  )
}

// -- Main export ---------------------------------------------
export default function GithubStats() {
  const [profile, setProfile] = useState(null)
  const [repos,   setRepos  ] = useState([])
  const [langs,   setLangs  ] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError  ] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const retryRef = useRef(null)
  const { isDark } = useThemeStore()
  const dark = isDark()

  const GH_THEME    = dark ? 'tokyonight' : 'default'
  const STREAK_THEME = dark ? 'tokyonight' : 'default'
  // v2.2.9: use transparent=true for bg transparency if supported
  const streakUrl  = `https://github-readme-streak-stats.herokuapp.com/?user=${GH_USER}&hide_border=true&theme=${STREAK_THEME}&stroke=c084fc&ring=c084fc&fire=f97316&sideLabels=94a3b8&currStreakLabel=c084fc&dates=64748b&background=transparent`
  const awesomeUrl = `https://awesome-github-stats.azurewebsites.net/user-stats/${GH_USER}?cardType=level&fontFamily=42dot%20Sans&preferLogin=false&theme=${GH_THEME}`

  const load = async () => {
    setLoading(true); setError(null)
    try {
      const [profRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GH_USER}`),
        fetch(`https://api.github.com/users/${GH_USER}/repos?sort=stars&per_page=100&type=owner`),
      ])
      if (!profRes.ok) {
        if (profRes.status === 403 || profRes.status === 429) {
          throw new Error(`rate_limited`)
        }
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
    } catch(e) {
      setError(e.message ?? 'Failed to load')
      // v2.2.9: auto-retry up to 3 times every 5s, then wait longer
      const rc = retryCount + 1
      setRetryCount(rc)
      if (rc <= 3) {
        retryRef.current = setTimeout(() => load(), 5000)
      } else {
        // After 3 failures, retry after 60s (ideal time when rate limit resets)
        retryRef.current = setTimeout(() => { setRetryCount(0); load() }, 60000)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    return () => { if (retryRef.current) clearTimeout(retryRef.current) }
  }, [])

  const totalStars = repos.reduce((a,r)=>a+r.stargazers_count,0)

  return (
    <section className="section section-alt" id="github">
      <div className="container-xl">

        {/* Heading */}
        <motion.div className="text-center mb-10"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.5 }} transition={{ duration:.5 }}>
          <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: '#c084fc' }}>Open Source</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">GitHub Activity</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">
            Real-time stats pulled from the GitHub API.
          </p>
        </motion.div>

        {loading && !profile ? (
          <>
            <ProfileSkeleton />
            <div className="gh-two-col" style={{ marginBottom: '1.25rem' }}>
              <div className="sk" style={{ height: 130, borderRadius: 14 }} />
              <div className="sk" style={{ height: 130, borderRadius: 14 }} />
            </div>
            <div className="gh-section-block">
              <div className="sk" style={{ height: 12, width: 120, marginBottom: 10, borderRadius: 6 }} />
              <div className="sk" style={{ height: 8, borderRadius: 99, marginBottom: 10 }} />
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[...Array(6)].map((_, i) => <div key={i} className="sk" style={{ height: 14, width: 60, borderRadius: 6 }} />)}
              </div>
            </div>
            <div className="gh-section-block">
              <div className="sk" style={{ height: 12, width: 140, marginBottom: 10, borderRadius: 6 }} />
              <div className="gh-repos-grid">
                {[...Array(6)].map((_, i) => <div key={i} className="sk" style={{ height: 90, borderRadius: 12 }} />)}
              </div>
            </div>
          </>
        ) : error && !profile ? (
          <div className="flex flex-col items-center py-16 gap-4 text-center">
            <p className="text-[var(--text-secondary)] text-sm">
              {error.includes('rate_limited') || error.includes('403')
                ? `GitHub API rate-limited. Auto-retrying... (attempt ${Math.min(retryCount, 3)}/3)`
                : error}
            </p>
            <button onClick={() => { clearTimeout(retryRef.current); setRetryCount(0); load() }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all active:scale-[.97]">
              <FontAwesomeIcon icon={faRotate} /> Retry Now
            </button>
          </div>
        ) : (
          <>
            {/* 1. Profile card */}
            {profile && <ProfileCard profile={profile} totalStars={totalStars} repos={repos} />}

            {/* 2. Two-col: streak | awesome-stats */}
            <motion.div className="gh-two-col"
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.45, delay:.1 }}>
              <StatImagePanel
                label="Contribution Streak"
                src={streakUrl}
                alt="GitHub streak stats"
                dark={dark}
              />
              <StatImagePanel
                label="Profile Grade"
                src={awesomeUrl}
                alt="GitHub profile stats"
                dark={dark}
              />
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
                View Full Profile
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </>
        )}
      </div>

      <style>{`
        /* -- Redesigned Profile Card v2 ----------------------- */
        .gh-profile-card-v2 {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 1.4rem 1.6rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .gh-profile-left-v2 {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          flex: 1;
          min-width: 0;
        }
        .gh-avatar-link { position: relative; flex-shrink: 0; display: block; }
        .gh-avatar {
          width: 72px; height: 72px;
          border-radius: 16px;
          object-fit: cover;
          border: 2px solid rgba(192,132,252,0.3);
          display: block;
        }
        .gh-avatar-online {
          position: absolute; bottom: 2px; right: 2px;
          width: 11px; height: 11px; border-radius: 50%;
          background: #22c55e; border: 2px solid var(--bg-surface);
          box-shadow: 0 0 6px #22c55e88;
        }
        .gh-profile-meta { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
        .gh-profile-name-v2 {
          font-size: 1rem; font-weight: 800;
          color: var(--text-primary);
          font-family: var(--font-display);
          text-decoration: none; line-height: 1.2;
          transition: color .15s;
        }
        .gh-profile-name-v2:hover { color: #c084fc; }
        .gh-profile-row2 { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .gh-profile-username {
          font-size: .78rem; color: var(--accent-primary);
          font-family: var(--font-mono);
          text-decoration: none;
          transition: color .15s, text-decoration .15s;
        }
        .gh-profile-username:hover { text-decoration: underline; }
        .gh-profile-sep { color: var(--text-tertiary); font-size: .8rem; }
        .gh-profile-joindate {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: .72rem; color: var(--text-tertiary);
        }
        .gh-profile-bio-v2 {
          font-size: .8rem; color: var(--text-secondary);
          line-height: 1.55; max-width: 380px; margin-top: 2px;
        }
        .gh-detail-item {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: .73rem; color: var(--text-tertiary);
        }

        /* -- 5 compact cards on right side -------------------- */
        .gh-profile-cards-v2 {
          display: flex;
          flex-direction: column;
          gap: .5rem;
          flex-shrink: 0;
          width: 90px;
        }
        @media (max-width: 640px) {
          .gh-profile-cards-v2 {
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            justify-content: flex-start;
          }
          .gh-pcard { flex: 1; min-width: 70px; }
        }
        .gh-pcard {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: .5rem .4rem;
          border-radius: 10px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          gap: 2px;
          transition: border-color .18s, transform .15s;
          text-decoration: none; color: inherit;
        }
        .gh-pcard:hover { border-color: var(--c, var(--accent-primary)); transform: translateY(-1px); }
        .gh-pcard:active { transform: scale(0.95); }
        .gh-pcard-redirect {
          background: linear-gradient(135deg, rgba(192,132,252,.12), rgba(99,102,241,.08));
          border-color: rgba(192,132,252,.25);
          --c: #c084fc;
          cursor: pointer;
        }
        .gh-pcard-redirect:hover { background: linear-gradient(135deg, rgba(192,132,252,.2), rgba(99,102,241,.14)); }
        .gh-pcard-icon { font-size: 12px; color: var(--c, var(--text-secondary)); }
        .gh-pcard-val  { font-size: .9rem; font-weight: 800; font-family: var(--font-display); color: var(--text-primary); line-height: 1; }
        .gh-pcard-lbl  { font-size: .58rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: .05em; }

        /* -- Two-col row: streak + grade ----------------------- */
        .gh-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        @media (max-width: 640px) { .gh-two-col { grid-template-columns: 1fr; } }

        /* v2.2.9: light/dark bg fix, no border */
        .gh-img-panel {
          border-radius: 14px;
          padding: 1rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: .6rem;
          overflow: hidden;
        }
        [data-theme=dark] .gh-img-panel {
          background: var(--bg-surface-2);
          border: none;
        }
        [data-theme=light] .gh-img-panel {
          background: #ffffff;
          border: none;
        }
        .gh-panel-label {
          font-size: .7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--text-tertiary);
        }
        .gh-img-wrap {
          display: flex; align-items: center; justify-content: center;
          min-height: 80px;
        }
        .gh-stat-img {
          width: 100%; height: auto; display: block;
          border-radius: 6px;
          border: none !important;
          box-shadow: none !important;
        }
        [data-theme=light] .gh-stat-img { filter: none; }

        /* -- Language bar -------------------------------------- */
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

        /* -- Repo grid: 3 cols desktop, 2 tablet, 1 mobile ---- */
        .gh-repos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: .75rem;
          margin-top: .5rem;
        }
        @media (max-width: 900px) { .gh-repos-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .gh-repos-grid { grid-template-columns: 1fr; } }

        /* v2.2.9: tablet shows 4 repos, mobile 3 */
        @media (max-width: 900px) {
          .gh-repos-grid > *:nth-child(n+5) { display: none; }
        }
        @media (max-width: 480px) {
          .gh-repos-grid > *:nth-child(n+4) { display: none; }
        }

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
        .gh-repo-card:hover { border-color: rgba(192,132,252,.4); transform: translateY(-2px); }
        .gh-repo-card:active { transform: scale(0.97); }
        .gh-repo-top  { display: flex; align-items: flex-start; gap: .45rem; }
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
      `}</style>
    </section>
  )
}
