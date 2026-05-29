// GithubStats.jsx -- v2.2.8
// REDESIGN per spec:
//   1. GitHub Profile section - properly redesigned (avatar, stats, bio, link)
//   2. Two cards in same row: left = streak (awesome-github-stats), right = readme-stats
//   3. Both support light/dark mode via theme param in URL
//   4. GitHub Trophies section (github-profile-trophy)
//   5. Top Languages section
//   6. Top Repositories section

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faStar, faCodeFork, faUsers, faBook, faCodeBranch,
  faArrowUpRightFromSquare, faSpinner, faRotate,
  faLocationDot, faLink, faCalendarDays,
} from '@fortawesome/free-solid-svg-icons'
import { useThemeStore } from '../../store/themeStore.js'

const GH_USER   = 'muhtasim-rahman'
const ACC_COLOR = '#c084fc'

const LANG_COLORS = {
  JavaScript:'#f7df1e', TypeScript:'#3178c6', Python:'#3776ab',
  HTML:'#e44d26', CSS:'#264de4', Shell:'#89e051',
  PHP:'#777bb4', Java:'#b07219', 'C++':'#f34b7d',
  Go:'#00add8', Rust:'#dea584', Swift:'#ffac45',
  Ruby:'#701516', Kotlin:'#A97BFF', Dart:'#00b4ab',
  Vue:'#41b883', SCSS:'#c6538c', 'default':'#64748b',
}
const getLangColor = (l) => LANG_COLORS[l] ?? LANG_COLORS.default

// ── Repo Card ──────────────────────────────────────────────
function RepoCard({ repo, i }) {
  return (
    <motion.a href={repo.html_url} target="_blank" rel="noopener noreferrer"
      className="gh-repo-card"
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:.1 }}
      transition={{ duration:.4, delay: i*.06 }}>
      <div className="gh-repo-top">
        <FontAwesomeIcon icon={faBook} className="text-[var(--text-tertiary)] text-xs mt-0.5 flex-shrink-0" />
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

// ── Language Bar ───────────────────────────────────────────
function LangBar({ langs }) {
  if (!langs.length) return null
  const total = langs.reduce((a,b) => a+b.bytes, 0)
  return (
    <div className="gh-lang-section">
      <p className="gh-sub-label mb-3">Top Languages</p>
      <div className="gh-lang-bar">
        {langs.map((l,i) => (
          <motion.div key={l.lang} className="gh-lang-seg"
            style={{ '--clr': getLangColor(l.lang), flex: l.bytes/total }}
            title={`${l.lang}: ${((l.bytes/total)*100).toFixed(1)}%`}
            initial={{ scaleX:0 }}
            whileInView={{ scaleX:1 }}
            viewport={{ once:true }}
            transition={{ duration:.7, delay: i*.08, ease:[.16,1,.3,1] }}
          />
        ))}
      </div>
      <div className="gh-lang-legend">
        {langs.slice(0,8).map(l => (
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

// ── Profile stat pill ──────────────────────────────────────
function StatPill({ icon, value, label, color }) {
  return (
    <div className="gh-stat-pill" style={{ '--c': color }}>
      <FontAwesomeIcon icon={icon} className="gh-stat-icon" />
      <span className="gh-stat-val">{value ?? '–'}</span>
      <span className="gh-stat-lbl">{label}</span>
    </div>
  )
}

// ── Main export ────────────────────────────────────────────
export default function GithubStats() {
  const [profile,   setProfile ] = useState(null)
  const [repos,     setRepos   ] = useState([])
  const [langs,     setLangs   ] = useState([])
  const [loading,   setLoading ] = useState(true)
  const [error,     setError   ] = useState(null)
  const { isDark } = useThemeStore()
  const dark = isDark()

  const load = async () => {
    setLoading(true); setError(null)
    try {
      const [profRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GH_USER}`),
        fetch(`https://api.github.com/users/${GH_USER}/repos?sort=stars&per_page=100&type=owner`),
      ])
      if (!profRes.ok) throw new Error(`GitHub API ${profRes.status}`)
      const profData  = await profRes.json()
      const reposData = reposRes.ok ? await reposRes.json() : []
      setProfile(profData)

      const sorted = reposData.filter(r => !r.fork)
        .sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0,6)
      setRepos(sorted)

      const langMap = {}
      await Promise.all(
        reposData.filter(r => !r.fork).slice(0,30).map(r =>
          fetch(r.languages_url).then(res => res.ok ? res.json() : {})
            .then(d => { Object.entries(d).forEach(([lang,bytes]) => { langMap[lang] = (langMap[lang]||0)+bytes }) })
            .catch(() => {})
        )
      )
      setLangs(Object.entries(langMap).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([lang,bytes])=>({lang,bytes})))
    } catch(e) {
      setError(e.message ?? 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const totalStars = repos.reduce((a,r) => a+r.stargazers_count, 0)

  // Image URLs — theme-aware
  const ghTheme = dark ? 'dark' : 'light'

  // Streak: awesome-github-stats (from provided code + README)
  const streakUrl = `https://awesome-github-stats.azurewebsites.net/user-stats/${GH_USER}?cardType=level&fontFamily=42dot%20Sans&preferLogin=false&theme=${dark ? 'dark' : 'default'}`

  // Stats: github-readme-stats vercel
  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${GH_USER}&show_icons=true&hide_border=true&theme=transparent&title_color=c084fc&text_color=${dark ? '94a3b8' : '475569'}&icon_color=818cf8&count_private=true`

  // Trophies
  const trophyUrl = `https://github-profile-trophy.vercel.app/?username=${GH_USER}&theme=${dark ? 'darkhub' : 'flat'}&no-frame=true&row=2&column=6&margin-w=4&margin-h=4`

  const joinedYear = profile?.created_at ? new Date(profile.created_at).getFullYear() : null

  return (
    <section className="section section-alt" id="github">
      <div className="container-xl">

        {/* Heading */}
        <motion.div className="text-center mb-10"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.5 }} transition={{ duration:.5 }}>
          <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: ACC_COLOR }}>Open Source</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">GitHub Activity</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">
            Real-time stats pulled from the GitHub API. Updated on every visit.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-[var(--text-tertiary)]">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl" />
            <span className="text-sm">Fetching GitHub data…</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center py-16 gap-4 text-center">
            <p className="text-[var(--text-secondary)] text-sm">{error.includes('403') ? 'GitHub API rate-limited. Try again shortly.' : error}</p>
            <button onClick={load}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all active:scale-[.97]">
              <FontAwesomeIcon icon={faRotate} /> Retry
            </button>
          </div>
        ) : (
          <>
            {/* ── 1. PROFILE ─────────────────────────────────────── */}
            {profile && (
              <motion.div className="gh-profile-card"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.45 }}>

                {/* Left: avatar + name */}
                <div className="gh-profile-identity">
                  <div className="gh-avatar-ring">
                    <img src={profile.avatar_url} alt={profile.name ?? GH_USER} className="gh-avatar" />
                  </div>
                  <div className="gh-profile-info">
                    <h3 className="gh-profile-name">{profile.name ?? GH_USER}</h3>
                    <p className="gh-profile-login">
                      <FontAwesomeIcon icon={faGithub} className="text-xs mr-1 opacity-60" />
                      @{profile.login}
                    </p>
                    {profile.bio && <p className="gh-profile-bio">{profile.bio}</p>}
                    <div className="gh-profile-meta">
                      {profile.location && (
                        <span className="gh-meta-item">
                          <FontAwesomeIcon icon={faLocationDot} className="text-[10px]" />
                          {profile.location}
                        </span>
                      )}
                      {profile.blog && (
                        <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                           target="_blank" rel="noopener noreferrer"
                           className="gh-meta-item gh-meta-link">
                          <FontAwesomeIcon icon={faLink} className="text-[10px]" />
                          {profile.blog.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                      {joinedYear && (
                        <span className="gh-meta-item">
                          <FontAwesomeIcon icon={faCalendarDays} className="text-[10px]" />
                          Joined {joinedYear}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: stats */}
                <div className="gh-profile-stats">
                  <StatPill icon={faBook}     value={profile.public_repos} label="Repos"     color="#c084fc" />
                  <StatPill icon={faUsers}    value={profile.followers}    label="Followers"  color="#818cf8" />
                  <StatPill icon={faStar}     value={totalStars}           label="Stars"      color="#fbbf24" />
                  <StatPill icon={faCodeFork} value={profile.public_gists} label="Gists"      color="#38bdf8" />
                </div>

                {/* GitHub button */}
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer"
                   className="gh-profile-link">
                  <FontAwesomeIcon icon={faGithub} />
                  View Profile
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
                </a>
              </motion.div>
            )}

            {/* ── 2. STREAK + STATS (same row) ───────────────────── */}
            <div className="gh-img-grid">
              {/* Left: Streak / level card */}
              <motion.div className="gh-img-card"
                initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.45, delay:.1 }}>
                <a href={`https://awesome-github-stats.azurewebsites.net/index.html??cardType=level&fontFamily=42dot%20Sans&preferLogin=false`}
                   target="_blank" rel="noopener noreferrer" className="block w-full">
                  <img
                    src={streakUrl}
                    alt="Muhtasim's GitHub Stats"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </a>
              </motion.div>

              {/* Right: Readme stats */}
              <motion.div className="gh-img-card"
                initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.45, delay:.18 }}>
                <img
                  src={statsUrl}
                  alt="GitHub overview stats"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </motion.div>
            </div>

            {/* ── 3. TROPHIES ────────────────────────────────────── */}
            <div className="gh-trophies">
              <p className="gh-sub-label mb-3">GitHub Trophies</p>
              <div className="gh-trophy-wrap">
                <img
                  src={trophyUrl}
                  alt="GitHub Trophies"
                  className="w-full h-auto block mx-auto"
                  loading="lazy"
                  style={{ maxWidth: 760 }}
                />
              </div>
            </div>

            {/* ── 4. TOP LANGUAGES ───────────────────────────────── */}
            {langs.length > 0 && <LangBar langs={langs} />}

            {/* ── 5. TOP REPOSITORIES ────────────────────────────── */}
            {repos.length > 0 && (
              <div className="mt-6">
                <p className="gh-sub-label mb-4">Top Repositories</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {repos.map((r,i) => <RepoCard key={r.id} repo={r} i={i} />)}
                </div>
              </div>
            )}

            {/* Footer */}
            <motion.div className="flex justify-center mt-10"
              initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:.5 }}>
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
        /* ── PROFILE CARD ────────────────────────────────── */
        .gh-profile-card {
          display: flex; align-items: center; flex-wrap: wrap; gap: 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 20px; padding: 1.4rem 1.6rem;
          margin-bottom: 1.5rem;
          position: relative; overflow: hidden;
        }
        .gh-profile-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, ${ACC_COLOR}66 30%, #818cf866 70%, transparent);
          pointer-events: none;
        }
        .gh-profile-identity {
          display: flex; align-items: flex-start; gap: 1.1rem;
          flex: 1; min-width: 0;
        }
        .gh-avatar-ring {
          position: relative; flex-shrink: 0;
          width: 72px; height: 72px; border-radius: 18px;
          padding: 2px;
          background: linear-gradient(135deg, ${ACC_COLOR}66, #818cf866);
        }
        .gh-avatar {
          width: 100%; height: 100%; border-radius: 16px;
          object-fit: cover; display: block;
          border: 2px solid var(--bg-surface);
        }
        .gh-profile-info { min-width: 0; flex: 1; }
        .gh-profile-name {
          font-size: 1.05rem; font-weight: 800;
          color: var(--text-primary); line-height: 1.2;
        }
        .gh-profile-login {
          font-size: .78rem; color: ${ACC_COLOR};
          font-family: var(--font-mono); margin-top: 2px;
        }
        .gh-profile-bio {
          font-size: .8rem; color: var(--text-secondary);
          margin-top: 5px; line-height: 1.5; max-width: 380px;
        }
        .gh-profile-meta {
          display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 6px;
        }
        .gh-meta-item {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: .72rem; color: var(--text-tertiary);
        }
        .gh-meta-link {
          text-decoration: none; transition: color .15s;
        }
        .gh-meta-link:hover { color: var(--accent-primary); }

        .gh-profile-stats {
          display: flex; gap: .6rem; flex-wrap: wrap;
          align-items: center; flex-shrink: 0;
        }
        .gh-stat-pill {
          display: flex; flex-direction: column; align-items: center;
          padding: .55rem .85rem; border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface-2); min-width: 68px;
          transition: transform .18s, border-color .18s;
        }
        .gh-stat-pill:hover { transform: translateY(-2px); border-color: var(--c, ${ACC_COLOR}); }
        .gh-stat-icon { font-size: 12px; color: var(--c); margin-bottom: 3px; }
        .gh-stat-val  { font-size: 1rem; font-weight: 800; font-family:var(--font-display); color:var(--text-primary); line-height:1; }
        .gh-stat-lbl  { font-size: .6rem; color:var(--text-tertiary); text-transform:uppercase; letter-spacing:.05em; margin-top:2px; }

        .gh-profile-link {
          flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 6px;
          padding: .52rem 1.1rem; border-radius: 999px;
          font-size: .82rem; font-weight: 600;
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          background: var(--bg-surface-2);
          text-decoration: none;
          transition: all .18s ease;
        }
        .gh-profile-link:hover {
          color: var(--text-primary);
          border-color: var(--accent-primary);
          background: var(--accent-light);
        }
        .gh-profile-link:active { transform: scale(.96); }

        /* ── STATS IMAGES ROW ───────────────────────────── */
        .gh-img-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1rem; margin-bottom: 1.5rem; align-items: stretch;
        }
        @media (max-width: 640px) { .gh-img-grid { grid-template-columns: 1fr; } }
        .gh-img-card {
          border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden;
          background: var(--bg-surface);
          display: flex; align-items: center; justify-content: center;
          padding: .5rem;
        }

        /* ── TROPHIES ───────────────────────────────────── */
        .gh-trophies { margin-bottom: 1.5rem; }
        .gh-trophy-wrap {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 16px; padding: 1rem;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }

        /* ── LANGUAGE BAR ───────────────────────────────── */
        .gh-lang-section { margin-bottom: 1.5rem; }
        .gh-lang-bar {
          display:flex; height:10px; border-radius:9999px; overflow:hidden; gap:2px;
          margin-bottom:.75rem; margin-top:.5rem;
        }
        .gh-lang-seg { height:100%; background:var(--clr); transform-origin:left; }
        .gh-lang-legend { display:flex; flex-wrap:wrap; gap:.5rem .9rem; }
        .gh-lang-item { display:inline-flex; align-items:center; gap:5px; font-size:.78rem; color:var(--text-secondary); }
        .gh-lang-dot  { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .gh-lang-name { font-weight:500; }
        .gh-lang-pct  { color:var(--text-tertiary); font-size:.72rem; font-family:var(--font-mono); }

        /* ── REPO CARDS ─────────────────────────────────── */
        .gh-repo-card {
          display:flex; flex-direction:column; gap:.5rem;
          padding:1rem 1.1rem; border-radius:14px;
          border:1px solid var(--border-color); background:var(--bg-surface);
          text-decoration:none; color:inherit; min-height:100px;
          transition:border-color .2s, transform .2s, box-shadow .2s;
        }
        .gh-repo-card:hover {
          border-color:${ACC_COLOR}66; transform:translateY(-3px);
          box-shadow:0 8px 28px rgba(0,0,0,.18);
        }
        .gh-repo-top { display:flex; align-items:flex-start; gap:.5rem; }
        .gh-repo-name {
          flex:1; min-width:0; font-size:.84rem; font-weight:700;
          color:var(--text-primary); font-family:var(--font-mono);
          overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
        }
        .gh-repo-ext { font-size:10px; color:var(--text-tertiary); margin-top:2px; flex-shrink:0; opacity:0; transition:opacity .15s; }
        .gh-repo-card:hover .gh-repo-ext { opacity:1; }
        .gh-repo-desc {
          font-size:.77rem; color:var(--text-secondary); line-height:1.5; flex:1;
          display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
        }
        .gh-repo-meta { display:flex; align-items:center; gap:.7rem; margin-top:auto; flex-wrap:wrap; }
        .gh-repo-lang { display:inline-flex; align-items:center; gap:4px; font-size:.73rem; color:var(--text-secondary); }
        .gh-repo-lang-dot { width:9px; height:9px; border-radius:50%; flex-shrink:0; }
        .gh-repo-stat { display:inline-flex; align-items:center; gap:4px; font-size:.73rem; color:var(--text-secondary); }

        /* ── COMMON ─────────────────────────────────────── */
        .gh-sub-label {
          font-size:.7rem; font-weight:700; text-transform:uppercase;
          letter-spacing:.12em; color:var(--text-tertiary);
        }
      `}</style>
    </section>
  )
}
