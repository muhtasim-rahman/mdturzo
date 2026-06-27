// GithubActivity.jsx -- v2.3.4
// CHANGES:
//   * API: No retry loop — loads ONCE on mount. Manual "Retry" button if rate-limited.
//     Future plan: cache via Firebase/Cloudflare function, serve cached data on load.
//   * All auto-retry timers removed — no setTimeout loop.
//   * Profile card, stats, repos, language bar: unchanged from v2.2.9.

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faStar, faCodeFork, faUsers, faBook, faCodeBranch,
  faArrowUpRightFromSquare, faRotate,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons'
import { useThemeStore } from '../../store/themeStore.js'
import { SkeletonCard } from '../ui/Skeleton.jsx'

const GH_USER = 'muhtasim-rahman'
const CARD_ACCENT = '#3B82F6'

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

// -- Language Bar
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

// -- Compact Stat Card
function StatCard({ icon, value, label, color, href }) {
  const inner = (
    <div className="gh-scard" style={{ '--sc': color }}>
      <FontAwesomeIcon icon={icon} className="gh-scard-icon" />
      <span className="gh-scard-val">{value ?? 0}</span>
      <span className="gh-scard-lbl">{label}</span>
    </div>
  )
  if (href) return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="gh-scard-link">
      {inner}
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="gh-scard-ext" />
    </a>
  )
  return inner
}

// -- Skeleton Profile Card
function SkeletonProfile() {
  return (
    <div className="gh-profile-card">
      <div className="gh-profile-left">
        <div className="sk" style={{width:68,height:68,borderRadius:16,flexShrink:0}} />
        <div className="flex flex-col gap-2 flex-1">
          <div className="sk" style={{height:16,width:'55%',borderRadius:6}} />
          <div className="sk" style={{height:12,width:'35%',borderRadius:6}} />
          <div className="sk" style={{height:11,width:'80%',borderRadius:6}} />
          <div className="sk" style={{height:11,width:'70%',borderRadius:6}} />
        </div>
      </div>
      <div className="gh-profile-right">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="sk gh-scard-sk" />
        ))}
      </div>
    </div>
  )
}

// -- Profile Card
function ProfileCard({ profile, totalStars, repos }) {
  const joinYear = profile.created_at ? new Date(profile.created_at).getFullYear() : null
  return (
    <motion.div className="gh-profile-card"
      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.4 }}>

      {/* Left: avatar + meta column */}
      <div className="gh-profile-left">
        <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="gh-avatar-link">
          <img src={profile.avatar_url} alt={profile.name ?? GH_USER} className="gh-avatar" />
          <div className="gh-avatar-online" title="GitHub active" />
        </a>
        <div className="gh-profile-meta">
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="gh-profile-name">
            {profile.name ?? GH_USER}
          </a>
          <div className="gh-profile-sub-row">
            <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="gh-profile-login">
              @{profile.login}
            </a>
            {joinYear && (
              <>
                <span className="gh-dot-sep">·</span>
                <span className="gh-detail-item">
                  <FontAwesomeIcon icon={faCalendar} className="text-[10px]" />
                  Since {joinYear}
                </span>
              </>
            )}
          </div>
          {profile.bio && <p className="gh-profile-bio">{profile.bio}</p>}
        </div>
      </div>

      {/* Right: 5 compact stat cards */}
      <div className="gh-profile-right">
        <StatCard icon={faBook}     value={profile.public_repos} label="Repos"     color="#3B82F6" />
        <StatCard icon={faStar}     value={totalStars}            label="Stars"     color="#f59e0b" />
        <StatCard icon={faUsers}    value={profile.followers}     label="Followers" color="#818cf8" />
        <StatCard icon={faCodeFork} value={repos.reduce((a,r)=>a+r.forks_count,0)} label="Forks" color="#38bdf8" />
        {/* 5th card: profile redirect */}
        <StatCard icon={faGithub}   value="View" label="Profile"   color={CARD_ACCENT} href={profile.html_url} />
      </div>
    </motion.div>
  )
}

// -- Repo Card
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

// -- Main
export default function GithubActivity() {
  const [profile, setProfile] = useState(null)
  const [repos,   setRepos  ] = useState([])
  const [langs,   setLangs  ] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError  ] = useState(null)
  const { isDark } = useThemeStore()
  const dark = isDark()

  const GH_THEME     = dark ? 'tokyonight' : 'default'
  const STREAK_THEME = dark ? 'tokyonight' : 'default'

  // Streak text colors: dark mode uses near-white text; light mode uses dark text
  const streakNumColor    = dark ? 'F8FAFC' : '0F172A'
  const streakLabelColor  = dark ? '94a3b8'  : '374151'
  const streakDateColor   = dark ? '64748b'  : '4B5563'
  const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${GH_USER}&hide_border=true&theme=${STREAK_THEME}&stroke=3B82F6&ring=3B82F6&fire=f97316&sideLabels=${streakLabelColor}&currStreakLabel=3B82F6&dates=${streakDateColor}&background=${dark ? '0F172A' : 'F7F9FC'}&border=1E293B&sideNums=${streakNumColor}&currStreakNum=${streakNumColor}`
  const awesomeUrl  = `https://awesome-github-stats.azurewebsites.net/user-stats/${GH_USER}?cardType=level&fontFamily=42dot%20Sans&preferLogin=false&theme=${GH_THEME}&Background=${dark ? '0F172A' : 'F7F9FC'}&Border=${dark ? '1E293B' : 'D1D9E0'}&Title=${dark ? 'F8FAFC' : '0F172A'}&Text=${dark ? '94A3B8' : '374151'}&Icon=${dark ? '3B82F6' : '2563EB'}`

  // Load once — no retry loop
  // Future: cache data in Firebase/Cloudflare, load cached version here
  const load = async () => {
    setLoading(true); setError(null)
    try {
      const [profRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GH_USER}`),
        fetch(`https://api.github.com/users/${GH_USER}/repos?sort=stars&per_page=100&type=owner`),
      ])

      if (profRes.status === 403 || profRes.status === 429) {
        setError('rate_limited')
        setLoading(false)
        return
      }

      if (!profRes.ok) throw new Error(`GitHub API ${profRes.status}`)
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
      setError(null)
    } catch(e) {
      setError(e.message ?? 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const totalStars = repos.reduce((a,r)=>a+r.stargazers_count,0)
  const isRateLimited = error === 'rate_limited'

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
            Real-time stats pulled directly from the GitHub API.
          </p>
        </motion.div>

        {/* Loading state */}
        {loading && !profile && (
          <>
            <SkeletonProfile />
            <div className="gh-two-col" style={{marginBottom:'1.25rem'}}>
              <div className="sk" style={{height:160,borderRadius:14}} />
              <div className="sk" style={{height:160,borderRadius:14}} />
            </div>
            <div className="gh-repos-grid" style={{marginTop:'.5rem'}}>
              {Array.from({length:6}).map((_,i) => (
                <div key={i} className="sk" style={{height:100,borderRadius:12}} />
              ))}
            </div>
          </>
        )}

        {/* Error: show compact placeholder card instead of blank section */}
        {!loading && error && !profile && (
          <div className="gh-error-card">
            <FontAwesomeIcon icon={faGithub} className="gh-error-icon" />
            <p className="gh-error-text">
              {error === 'rate_limited'
                ? 'GitHub API rate limit reached. Resets every hour.'
                : 'Could not load GitHub data right now.'}
            </p>
            <div className="gh-error-actions">
              <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noopener noreferrer"
                className="gh-error-link">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                View on GitHub
              </a>
              <button onClick={load} className="gh-error-retry">
                <FontAwesomeIcon icon={faRotate} /> Retry
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {profile && (
          <>
            {/* 1. Profile card */}
            <ProfileCard profile={profile} totalStars={totalStars} repos={repos} />

            {/* 2. Two-col: streak | profile grade — each image isolated */}
            <motion.div className="gh-two-col"
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.45, delay:.1 }}>
              <div className="gh-img-panel">
                <p className="gh-panel-label">Contribution Streak</p>
                <div className="gh-img-wrap">
                  <img
                    src={streakUrl}
                    alt="GitHub streak stats"
                    className="gh-stat-img"
                    loading="lazy"
                    key={`streak-${dark}`}
                    onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling?.style && (e.currentTarget.nextSibling.style.display='flex') }}
                  />
                  <div className="gh-img-fallback" style={{display:'none'}}>
                    <FontAwesomeIcon icon={faCalendar} className="opacity-30 text-2xl" />
                    <span className="text-xs text-[var(--text-tertiary)] mt-1">Streak data unavailable</span>
                  </div>
                </div>
              </div>
              <div className="gh-img-panel">
                <p className="gh-panel-label">Profile Grade</p>
                <div className="gh-img-wrap">
                  <img
                    src={awesomeUrl}
                    alt="GitHub profile grade"
                    className="gh-stat-img"
                    loading="lazy"
                    key={`awesome-${dark}`}
                    onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling?.style && (e.currentTarget.nextSibling.style.display='flex') }}
                  />
                  <div className="gh-img-fallback" style={{display:'none'}}>
                    <FontAwesomeIcon icon={faGithub} className="opacity-30 text-2xl" />
                    <span className="text-xs text-[var(--text-tertiary)] mt-1">Grade data unavailable</span>
                  </div>
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
                View Full GitHub Profile
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </>
        )}
      </div>

      <style>{`
        /* -- Profile card --------------------------------------- */
        .gh-profile-card {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .gh-profile-left {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          flex: 1;
          min-width: 0;
        }
        .gh-avatar-link {
          position: relative; flex-shrink: 0; display: block;
        }
        .gh-avatar {
          width: 68px; height: 68px;
          border-radius: 16px;
          object-fit: cover;
          border: 2px solid ${CARD_ACCENT}44;
          display: block;
        }
        .gh-avatar-online {
          position: absolute; bottom: 2px; right: 2px;
          width: 11px; height: 11px;
          border-radius: 50%;
          background: #22c55e;
          border: 2px solid var(--bg-surface);
          box-shadow: 0 0 6px #22c55e88;
        }
        .gh-profile-meta {
          flex: 1; min-width: 0;
          display: flex; flex-direction: column; gap: 3px;
        }
        .gh-profile-name {
          font-size: 1rem; font-weight: 800;
          color: var(--text-primary);
          font-family: var(--font-display);
          text-decoration: none;
          line-height: 1.2;
          transition: color .15s;
        }
        .gh-profile-name:hover { color: ${CARD_ACCENT}; }
        .gh-profile-sub-row {
          display: flex; align-items: center; flex-wrap: wrap; gap: .35rem;
          margin-top: 1px;
        }
        .gh-profile-login {
          font-size: .78rem; color: var(--accent-primary); font-family: var(--font-mono);
          text-decoration: none; font-weight: 600;
          transition: opacity .15s;
        }
        .gh-profile-login:hover { opacity: .75; }
        .gh-dot-sep {
          color: var(--text-tertiary); font-size: .75rem; line-height: 1;
        }
        .gh-profile-bio {
          font-size: .8rem; color: var(--text-secondary); line-height: 1.55;
          max-width: 400px; margin-top: 4px;
        }
        .gh-detail-item {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: .72rem; color: var(--text-tertiary);
        }

        /* -- Right: 5 compact stat cards ---------------------- */
        .gh-profile-right {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: .5rem;
          align-self: center;
          flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .gh-profile-right { grid-template-columns: repeat(3, 1fr); width: 100%; }
        }
        @media (max-width: 500px) {
          .gh-profile-right { grid-template-columns: repeat(3, 1fr); }
        }

        .gh-scard {
          display: flex; flex-direction: column; align-items: center;
          padding: .5rem .55rem;
          border-radius: 10px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          gap: 3px;
          transition: border-color .18s, transform .18s;
          text-align: center;
        }
        .gh-scard:hover { border-color: var(--sc); }
        .gh-scard-link {
          position: relative;
          text-decoration: none; color: inherit;
          display: flex; flex-direction: column;
          border-radius: 10px;
          transition: transform .18s;
        }
        .gh-scard-link:hover .gh-scard { border-color: var(--sc); }
        .gh-scard-link:hover { transform: translateY(-2px); }
        .gh-scard-link:active { transform: scale(.94); }
        .gh-scard-ext {
          position: absolute; top: 4px; right: 5px;
          font-size: 8px; color: var(--text-tertiary); opacity: 0;
          transition: opacity .15s;
        }
        .gh-scard-link:hover .gh-scard-ext { opacity: 1; }
        .gh-scard-icon { font-size: 12px; color: var(--sc, ${CARD_ACCENT}); }
        .gh-scard-val  { font-size: .92rem; font-weight: 800; font-family: var(--font-display); color: var(--text-primary); line-height: 1; }
        .gh-scard-lbl  { font-size: .58rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: .05em; }
        .gh-scard-sk   { height: 70px; border-radius: 10px; }

        /* -- Two-col row --------------------------------------- */
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
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 1rem 1.1rem;
          display: flex; flex-direction: column; gap: .6rem;
          overflow: hidden;
        }
        .gh-panel-label {
          font-size: .7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--text-tertiary);
        }
        .gh-img-wrap {
          display: flex; align-items: center; justify-content: center;
          min-height: 80px; border-radius: 8px; overflow: hidden;
          position: relative;
        }
        .gh-stat-img {
          width: 100%; height: auto; display: block;
          border-radius: 0;
          border: none;
        }
        .gh-img-fallback {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          min-height: 80px; width: 100%;
          color: var(--text-tertiary);
        }
        /* Error placeholder card */
        .gh-error-card {
          display: flex; flex-direction: column; align-items: center;
          gap: .75rem; padding: 2.5rem 1rem; text-align: center;
          border: 1px dashed var(--border-color); border-radius: 16px;
          background: var(--bg-surface-2);
        }
        .gh-error-icon { font-size: 2rem; opacity: .3; color: var(--text-tertiary); }
        .gh-error-text { font-size: .875rem; color: var(--text-secondary); max-width: 28rem; }
        .gh-error-actions { display: flex; gap: .75rem; flex-wrap: wrap; justify-content: center; margin-top: .25rem; }
        .gh-error-link, .gh-error-retry {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .45rem 1.1rem; border-radius: .75rem; font-size: .8rem; font-weight: 600;
          border: 1px solid var(--border-color); color: var(--text-secondary);
          transition: color .15s, border-color .15s; cursor: pointer; background: transparent;
        }
        .gh-error-link:hover, .gh-error-retry:hover { color: var(--text-primary); border-color: var(--accent-primary); }

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

        /* -- Repo grid ----------------------------------------- */
        .gh-repos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: .75rem;
          margin-top: .5rem;
        }
        @media (max-width: 900px) {
          .gh-repos-grid { grid-template-columns: repeat(2, 1fr); }
          .gh-repos-grid > *:nth-child(n+5) { display: none; }
        }
        @media (max-width: 480px) {
          .gh-repos-grid { grid-template-columns: 1fr; }
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
        .gh-repo-card:hover {
          border-color: ${CARD_ACCENT}55;
          transform: translateY(-2px);
        }
        .gh-repo-card:active { transform: scale(.96); }
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
