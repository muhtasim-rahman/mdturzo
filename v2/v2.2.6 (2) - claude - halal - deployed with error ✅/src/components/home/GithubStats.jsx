// GithubStats.jsx — v2.2.6
// Full rebuild: GitHub REST API (no auth), contribution streak embed, readme stats,
// top 6 repos by stars, language bar breakdown, profile stats row.
// All data fetched client-side. Graceful fallback on API rate-limit (403).
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faStar, faCodeFork, faFire, faUsers, faBook, faCodeBranch,
  faArrowUpRightFromSquare, faSpinner, faRotate,
  faCircleDot,
} from '@fortawesome/free-solid-svg-icons'

const GH_USER = 'muhtasim-rahman'
const CARD_ACCENT = '#c084fc'

// Language color map (fallback for common langs)
const LANG_COLORS = {
  JavaScript:'#f7df1e', TypeScript:'#3178c6', Python:'#3776ab',
  HTML:'#e44d26',       CSS:'#264de4',        Shell:'#89e051',
  PHP:'#777bb4',        Java:'#b07219',       'C++':'#f34b7d',
  Go:'#00add8',         Rust:'#dea584',       Swift:'#ffac45',
  Ruby:'#701516',       Kotlin:'#A97BFF',     Dart:'#00b4ab',
  Vue:'#41b883',        SCSS:'#c6538c',       Lua:'#000080',
  'C#':'#178600',       R:'#198ce7',          'default':'#64748b',
}

function getLangColor(lang) { return LANG_COLORS[lang] ?? LANG_COLORS.default }

// ── Repo Card ───────────────────────────────────────────────
function RepoCard({ repo, i }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
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
      {repo.description && (
        <p className="gh-repo-desc">{repo.description}</p>
      )}
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

// ── Language breakdown bar ───────────────────────────────────
function LangBar({ langs }) {
  if (!langs.length) return null
  const total = langs.reduce((a, b) => a + b.bytes, 0)
  return (
    <div className="gh-lang-section">
      <p className="gh-sub-label">Top Languages</p>
      {/* Color bar */}
      <div className="gh-lang-bar">
        {langs.map((l, i) => (
          <motion.div
            key={l.lang}
            className="gh-lang-seg"
            style={{ '--clr': getLangColor(l.lang) }}
            title={`${l.lang}: ${((l.bytes/total)*100).toFixed(1)}%`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once:true }}
            transition={{ duration:.7, delay: i*.08, ease:[.16,1,.3,1] }}
          />
        ))}
      </div>
      {/* Legend */}
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

// ── Profile stat pill ────────────────────────────────────────
function StatPill({ icon, value, label, color }) {
  return (
    <div className="gh-stat-pill" style={{ '--c': color }}>
      <FontAwesomeIcon icon={icon} className="gh-stat-icon" />
      <span className="gh-stat-val">{value ?? '–'}</span>
      <span className="gh-stat-lbl">{label}</span>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────
export default function GithubStats() {
  const [profile, setProfile]       = useState(null)
  const [repos,   setRepos  ]       = useState([])
  const [langs,   setLangs  ]       = useState([])
  const [loading, setLoading]       = useState(true)
  const [error,   setError  ]       = useState(null)
  const [imgFailed, setImgFailed]   = useState({streak:false, readme:false})

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

      // Top 6 repos by stars (exclude forks)
      const sorted = reposData
        .filter(r => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
      setRepos(sorted)

      // Aggregate languages across all repos
      const langMap = {}
      const langFetches = reposData.filter(r => !r.fork).slice(0, 30).map(r =>
        fetch(r.languages_url).then(res => res.ok ? res.json() : {}).then(data => {
          Object.entries(data).forEach(([lang, bytes]) => {
            langMap[lang] = (langMap[lang] || 0) + bytes
          })
        }).catch(() => {})
      )
      await Promise.all(langFetches)
      const sorted_langs = Object.entries(langMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([lang, bytes]) => ({ lang, bytes }))
      setLangs(sorted_langs)

    } catch (e) {
      setError(e.message ?? 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  // GitHub readme-stats image sources
  const statsImgUrl   = `https://github-readme-stats.vercel.app/api?username=${GH_USER}&show_icons=true&hide_border=true&theme=transparent&title_color=c084fc&text_color=94a3b8&icon_color=818cf8&hide_title=false&count_private=true`
  const streakImgUrl  = `https://github-readme-streak-stats.herokuapp.com/?user=${GH_USER}&hide_border=true&theme=transparent&stroke=c084fc&ring=c084fc&fire=f97316&sideLabels=94a3b8&currStreakLabel=c084fc&dates=64748b`

  return (
    <section className="section section-alt" id="github">
      <div className="container-xl">
        {/* Heading */}
        <motion.div className="text-center mb-10"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.5 }} transition={{ duration:.5 }}>
          <p className="text-xs uppercase tracking-widest font-semibold mb-2"
            style={{ color: CARD_ACCENT }}>Open Source</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
            GitHub Activity
          </h2>
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
            {/* Profile row */}
            {profile && (
              <motion.div className="gh-profile-row"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.4 }}>
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="gh-avatar-wrap">
                  <img src={profile.avatar_url} alt={profile.name ?? GH_USER} className="gh-avatar" />
                  <div>
                    <p className="gh-profile-name">{profile.name ?? GH_USER}</p>
                    <p className="gh-profile-user">@{profile.login}</p>
                    {profile.bio && <p className="gh-profile-bio">{profile.bio}</p>}
                  </div>
                </a>
                <div className="gh-stat-pills">
                  <StatPill icon={faBook}       value={profile.public_repos}  label="Repos"     color="#c084fc" />
                  <StatPill icon={faUsers}       value={profile.followers}     label="Followers" color="#818cf8" />
                  <StatPill icon={faCodeFork}    value={profile.public_gists}  label="Gists"     color="#38bdf8" />
                  <StatPill icon={faCircleDot}   value={repos.reduce((a,r)=>a+r.stargazers_count,0)} label="Total Stars" color="#fbbf24" />
                </div>
              </motion.div>
            )}

            {/* Streak + Stats cards side by side */}
            <div className="gh-img-grid">
              {!imgFailed.streak && (
                <motion.div className="gh-img-card"
                  initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.45, delay:.1 }}>
                  <img
                    src={streakImgUrl}
                    alt="GitHub streak stats"
                    className="w-full h-auto block"
                    loading="lazy"
                    onError={() => setImgFailed(p => ({...p, streak:true}))}
                  />
                </motion.div>
              )}
              {!imgFailed.readme && (
                <motion.div className="gh-img-card"
                  initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.45, delay:.18 }}>
                  <img
                    src={statsImgUrl}
                    alt="GitHub overview stats"
                    className="w-full h-auto block"
                    loading="lazy"
                    onError={() => setImgFailed(p => ({...p, readme:true}))}
                  />
                </motion.div>
              )}
            </div>

            {/* Language breakdown */}
            {langs.length > 0 && <LangBar langs={langs} />}

            {/* Top Repos */}
            {repos.length > 0 && (
              <div className="mt-8">
                <p className="gh-sub-label mb-4">Top Repositories</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {repos.map((r, i) => <RepoCard key={r.id} repo={r} i={i} />)}
                </div>
              </div>
            )}

            {/* Footer link */}
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
        .gh-profile-row {
          display: flex; align-items: flex-start; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 1.2rem 1.4rem;
          margin-bottom: 1.5rem;
        }
        .gh-avatar-wrap {
          display: flex; align-items: center; gap: 1rem;
          text-decoration: none; color: inherit;
          flex: 1; min-width: 0;
        }
        .gh-avatar {
          width: 60px; height: 60px; border-radius: 14px;
          object-fit: cover; flex-shrink: 0;
          border: 2px solid ${CARD_ACCENT}44;
        }
        .gh-profile-name {
          font-size: .95rem; font-weight: 700;
          color: var(--text-primary); line-height: 1.2;
        }
        .gh-profile-user {
          font-size: .78rem; color: var(--text-tertiary); font-family: var(--font-mono);
          margin-top: 1px;
        }
        .gh-profile-bio {
          font-size: .78rem; color: var(--text-secondary); margin-top: 4px;
          max-width: 340px; line-height: 1.5;
        }
        .gh-stat-pills {
          display: flex; gap: .6rem; flex-wrap: wrap; align-items: center;
        }
        .gh-stat-pill {
          display: flex; flex-direction: column; align-items: center;
          padding: .5rem .8rem; border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface-2);
          min-width: 68px;
          transition: transform .18s ease, border-color .18s ease;
        }
        .gh-stat-pill:hover {
          transform: translateY(-2px);
          border-color: var(--c, ${CARD_ACCENT});
        }
        .gh-stat-icon { font-size: 12px; color: var(--c, ${CARD_ACCENT}); margin-bottom: 3px; }
        .gh-stat-val  { font-size: 1rem; font-weight: 800; font-family: var(--font-display); color: var(--text-primary); line-height: 1; }
        .gh-stat-lbl  { font-size: .6rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: .05em; margin-top: 2px; }

        .gh-img-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 640px) { .gh-img-grid { grid-template-columns: 1fr; } }
        .gh-img-card {
          border: 1px solid var(--border-color);
          border-radius: 16px; overflow: hidden;
          background: var(--bg-surface);
          display: flex; align-items: center; justify-content: center;
        }

        .gh-sub-label {
          font-size: .7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .12em; color: var(--text-tertiary); margin-bottom: .75rem;
        }

        /* Language bar */
        .gh-lang-section { margin-bottom: 1.5rem; }
        .gh-lang-bar {
          display: flex; height: 10px; border-radius: 9999px; overflow: hidden; gap: 2px;
          margin-bottom: .75rem;
        }
        .gh-lang-seg {
          flex: 1 0 auto; height: 100%;
          background: var(--clr);
          transform-origin: left;
        }
        .gh-lang-legend {
          display: flex; flex-wrap: wrap; gap: .5rem .9rem;
        }
        .gh-lang-item {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: .78rem; color: var(--text-secondary);
        }
        .gh-lang-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
        }
        .gh-lang-name { font-weight: 500; }
        .gh-lang-pct  { color: var(--text-tertiary); font-size: .72rem; font-family: var(--font-mono); }

        /* Repo cards */
        .gh-repo-card {
          display: flex; flex-direction: column; gap: .5rem;
          padding: 1rem 1.1rem;
          border-radius: 14px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          text-decoration: none; color: inherit;
          transition: border-color .2s ease, transform .2s ease, box-shadow .2s ease;
          min-height: 100px;
        }
        .gh-repo-card:hover {
          border-color: ${CARD_ACCENT}66;
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(0,0,0,.18);
        }
        .gh-repo-top {
          display: flex; align-items: flex-start; gap: .5rem;
        }
        .gh-repo-name {
          flex: 1; min-width: 0;
          font-size: .84rem; font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-mono);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .gh-repo-ext {
          font-size: 10px; color: var(--text-tertiary); margin-top: 2px; flex-shrink: 0;
          opacity: 0; transition: opacity .15s ease;
        }
        .gh-repo-card:hover .gh-repo-ext { opacity: 1; }
        .gh-repo-desc {
          font-size: .77rem; color: var(--text-secondary); line-height: 1.5;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden; flex: 1;
        }
        .gh-repo-meta {
          display: flex; align-items: center; gap: .7rem; margin-top: auto; flex-wrap: wrap;
        }
        .gh-repo-lang {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: .73rem; color: var(--text-secondary);
        }
        .gh-repo-lang-dot {
          width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0;
        }
        .gh-repo-stat {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: .73rem; color: var(--text-secondary);
        }
      `}</style>
    </section>
  )
}
