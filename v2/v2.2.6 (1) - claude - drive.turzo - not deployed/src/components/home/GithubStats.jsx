// ============================================================
// GithubStats.jsx — v2.2.6
// Fully dynamic: fetches real data from GitHub REST API
// Sections:
//   - Profile stats row (followers, following, public_repos, total stars)
//   - GitHub Readme Stats card (fast mirror)
//   - GitHub Streak Stats (demolab.com)
//   - Top 6 repos by stars
//   - Language breakdown from top repos
// ============================================================
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar, faCodeFork, faEye, faUsers, faBook,
  faCode, faFire, faCircle, faChartBar, faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import SITE_CONFIG from '../../config/site.config.js'

const GH_USER   = 'muhtasim-rahman'
const GH_API    = 'https://api.github.com'
const STATS_IMG = `https://github-readme-stats.vercel.app/api?username=${GH_USER}&show_icons=true&hide_border=true&count_private=true&include_all_commits=true`
const STREAK_IMG= `https://streak-stats.demolab.com/?user=${GH_USER}&hide_border=true`

// Language colours (subset used on GitHub)
const LANG_COLORS = {
  JavaScript:'#F7DF1E', TypeScript:'#3178C6', Python:'#3776AB',
  HTML:'#E34F26', CSS:'#264DE4', 'Vue':'#4FC08D',
  'Shell':'#89E051', 'Rust':'#DEA584', 'Go':'#00ADD8',
  'C++':'#F34B7D', 'Java':'#B07219', 'Kotlin':'#A97BFF',
  'Dart':'#00B4AB', 'Swift':'#FA7343', 'PHP':'#4F5D95',
  default:'#8B949E',
}

function langColor(name) { return LANG_COLORS[name] ?? LANG_COLORS.default }

/* ── Skeleton helpers ──────────────────────────────────────── */
function Sk({ w = 'w-full', h = 'h-4', className = '' }) {
  return <div className={`sk rounded ${w} ${h} ${className}`} />
}

/* ── Stat pill ─────────────────────────────────────────────── */
function StatPill({ icon, value, label, color }) {
  return (
    <div className="gh-stat-pill">
      <span className="gh-stat-icon" style={{ color }}>
        <FontAwesomeIcon icon={icon} />
      </span>
      <div>
        <div className="gh-stat-val">{value ?? '—'}</div>
        <div className="gh-stat-label">{label}</div>
      </div>
    </div>
  )
}

/* ── Repo card ─────────────────────────────────────────────── */
function RepoCard({ repo, i }) {
  const lang = repo.language
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="gh-repo-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.38, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="gh-repo-header">
        <FontAwesomeIcon icon={faBook} className="text-[var(--text-tertiary)] text-xs flex-shrink-0" />
        <span className="gh-repo-name">{repo.name}</span>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="gh-repo-ext text-[var(--text-tertiary)] text-[10px] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      {repo.description && (
        <p className="gh-repo-desc">{repo.description}</p>
      )}
      <div className="gh-repo-meta">
        {lang && (
          <span className="gh-repo-lang">
            <span className="gh-repo-lang-dot" style={{ background: langColor(lang) }} />
            {lang}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="gh-repo-stat">
            <FontAwesomeIcon icon={faStar} className="text-amber-400" />{repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="gh-repo-stat">
            <FontAwesomeIcon icon={faCodeFork} />{repo.forks_count}
          </span>
        )}
      </div>
    </motion.a>
  )
}

/* ── Language bar ──────────────────────────────────────────── */
function LangBar({ langs }) {
  if (!langs.length) return null
  const total = langs.reduce((s, l) => s + l.count, 0)
  return (
    <div className="gh-lang-wrap">
      <div className="gh-lang-bar">
        {langs.map(l => (
          <div
            key={l.name}
            className="gh-lang-segment"
            style={{ width: `${(l.count / total * 100).toFixed(1)}%`, background: langColor(l.name) }}
            title={`${l.name}: ${(l.count / total * 100).toFixed(1)}%`}
          />
        ))}
      </div>
      <div className="gh-lang-legend">
        {langs.slice(0, 6).map(l => (
          <span key={l.name} className="gh-lang-item">
            <span className="gh-lang-dot" style={{ background: langColor(l.name) }} />
            {l.name}
            <span className="gh-lang-pct">{(l.count / total * 100).toFixed(0)}%</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Error state ───────────────────────────────────────────── */
function GhError({ onRetry }) {
  return (
    <div className="gh-error">
      <FontAwesomeIcon icon={faGithub} className="text-4xl opacity-20 mb-3" />
      <p className="text-sm text-[var(--text-secondary)] mb-4">
        Couldn't load GitHub data right now.
      </p>
      <button onClick={onRetry}
        className="px-4 py-1.5 rounded-lg border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors">
        Try again
      </button>
    </div>
  )
}

/* ── Main component ────────────────────────────────────────── */
export default function GithubStats() {
  const [profile,   setProfile  ] = useState(null)
  const [repos,     setRepos    ] = useState([])
  const [langs,     setLangs    ] = useState([])
  const [loading,   setLoading  ] = useState(true)
  const [error,     setError    ] = useState(false)
  const [imgTheme,  setImgTheme ] = useState('dark')
  const [imgKeys,   setImgKeys  ] = useState(0)   // forces img reload on retry

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0)

  useEffect(() => {
    // Detect theme for stats images
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
    setImgTheme(isDark ? 'dark' : 'light')
    const mo = new MutationObserver(() => {
      const d = document.documentElement.getAttribute('data-theme') !== 'light'
      setImgTheme(d ? 'dark' : 'light')
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])

  const fetchData = async () => {
    setLoading(true); setError(false)
    try {
      const [profileRes, reposRes] = await Promise.all([
        fetch(`${GH_API}/users/${GH_USER}`),
        fetch(`${GH_API}/users/${GH_USER}/repos?per_page=100&sort=updated`),
      ])
      if (!profileRes.ok || !reposRes.ok) throw new Error('GitHub API error')

      const profileData = await profileRes.json()
      const reposData   = await reposRes.json()

      // Sort repos by stars, take top 6
      const sorted = [...reposData]
        .filter(r => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)

      // Tally languages
      const langMap = {}
      reposData.forEach(r => {
        if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1
      })
      const langArr = Object.entries(langMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8)

      setProfile(profileData)
      setRepos(sorted)
      setLangs(langArr)
    } catch (e) {
      console.error('GitHub fetch error:', e)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleRetry = () => { setImgKeys(k => k + 1); fetchData() }

  const bgParam   = imgTheme === 'dark' ? '0d1117' : 'f8fafc'
  const textParam = imgTheme === 'dark' ? 'e2e8f0' : '0f172a'
  const iconParam = imgTheme === 'dark' ? '60a5fa' : '2563eb'
  const titleParam= imgTheme === 'dark' ? '93c5fd' : '1d4ed8'

  const statsUrl  = `${STATS_IMG}&bg_color=${bgParam}&text_color=${textParam}&icon_color=${iconParam}&title_color=${titleParam}`
  const streakUrl = `${STREAK_IMG}&background=${bgParam}&currStreakLabel=${iconParam}&dates=${textParam}&currStreakNum=${titleParam}&sideLabels=${textParam}&ring=${iconParam}&fire=${iconParam}&sideNums=${titleParam}`

  return (
    <section className="section" id="github">
      <div className="container-xl">
        {/* Section header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>
          <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">Open Source</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">GitHub Activity</h2>
          <p className="text-[var(--text-secondary)] mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            Live data pulled directly from the GitHub API — commits, streaks, and top repositories.
          </p>
        </motion.div>

        {error ? (
          <GhError onRetry={handleRetry} />
        ) : (
          <div className="gh-layout">
            {/* ── Profile stats row ── */}
            <motion.div className="gh-pills"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45 }}>
              {loading ? (
                <>
                  {[...Array(4)].map((_,i) => <Sk key={i} w="w-28" h="h-14" className="rounded-xl" />)}
                </>
              ) : (
                <>
                  <StatPill icon={faUsers}  value={profile?.followers}     label="Followers"  color="#3B82F6" />
                  <StatPill icon={faUsers}  value={profile?.following}     label="Following"  color="#10B981" />
                  <StatPill icon={faBook}   value={profile?.public_repos}  label="Repos"      color="#A855F7" />
                  <StatPill icon={faStar}   value={totalStars}             label="Total Stars" color="#F59E0B" />
                </>
              )}
            </motion.div>

            {/* ── Stats image + Streak image ── */}
            <div className="gh-images-row">
              <motion.div className="gh-img-card"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                {loading ? (
                  <Sk h="h-40" className="rounded-xl" />
                ) : (
                  <img key={`stats-${imgTheme}-${imgKeys}`}
                    src={statsUrl}
                    alt="GitHub Stats"
                    className="w-full rounded-xl border border-[var(--border-color)]"
                    loading="lazy"
                  />
                )}
              </motion.div>
              <motion.div className="gh-img-card"
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.18 }}>
                {loading ? (
                  <Sk h="h-40" className="rounded-xl" />
                ) : (
                  <img key={`streak-${imgTheme}-${imgKeys}`}
                    src={streakUrl}
                    alt="GitHub Streak"
                    className="w-full rounded-xl border border-[var(--border-color)]"
                    loading="lazy"
                  />
                )}
              </motion.div>
            </div>

            {/* ── Language bar ── */}
            {!loading && langs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }}>
                <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCode} />Languages used
                </p>
                <LangBar langs={langs} />
              </motion.div>
            )}
            {loading && <Sk h="h-10" className="rounded-full" />}

            {/* ── Top repos ── */}
            <div>
              <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-widest mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faStar} className="text-amber-400" />Top repositories
              </p>
              <div className="gh-repos-grid">
                {loading
                  ? [...Array(6)].map((_,i) => <Sk key={i} h="h-28" className="rounded-xl" />)
                  : repos.map((r,i) => <RepoCard key={r.id} repo={r} i={i} />)
                }
              </div>
            </div>

            {/* Profile link */}
            {!loading && profile && (
              <motion.div className="text-center mt-4"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.2 }}>
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[var(--border-strong)] text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all duration-200 group">
                  <FontAwesomeIcon icon={faGithub} />
                  View full GitHub profile
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .gh-layout { display: flex; flex-direction: column; gap: 2rem; }

        /* Profile stats pills */
        .gh-pills {
          display: flex; gap: 0.75rem; flex-wrap: wrap;
        }
        .gh-stat-pill {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 16px; border-radius: 14px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          flex: 1 1 120px; min-width: 110px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .gh-stat-pill:hover {
          border-color: var(--border-strong);
          box-shadow: var(--shadow-sm);
        }
        .gh-stat-icon { font-size: 1.1rem; flex-shrink: 0; }
        .gh-stat-val {
          font-family: var(--font-display); font-size: 1.2rem;
          font-weight: 800; line-height: 1; color: var(--text-primary);
        }
        .gh-stat-label {
          font-size: 0.63rem; text-transform: uppercase;
          letter-spacing: 0.07em; color: var(--text-tertiary); margin-top: 2px;
        }

        /* Stats & streak images */
        .gh-images-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
        }
        @media (max-width: 600px) {
          .gh-images-row { grid-template-columns: 1fr; }
        }
        .gh-img-card img { display: block; max-width: 100%; }

        /* Language bar */
        .gh-lang-wrap { }
        .gh-lang-bar {
          display: flex; height: 8px; border-radius: 99px; overflow: hidden;
          gap: 1px; margin-bottom: 0.75rem;
        }
        .gh-lang-segment { height: 100%; transition: width 0.8s ease; }
        .gh-lang-legend { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; }
        .gh-lang-item {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.75rem; color: var(--text-secondary);
        }
        .gh-lang-dot {
          width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0;
        }
        .gh-lang-pct {
          color: var(--text-tertiary); font-size: 0.68rem; font-family: var(--font-mono);
        }

        /* Repos grid */
        .gh-repos-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 0.875rem;
        }
        @media (max-width: 480px) { .gh-repos-grid { grid-template-columns: 1fr; } }

        /* Repo card */
        .gh-repo-card {
          display: flex; flex-direction: column; gap: 6px;
          padding: 14px 16px;
          border-radius: 14px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          text-decoration: none;
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
        }
        .gh-repo-card:hover {
          border-color: var(--accent-primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .gh-repo-header {
          display: flex; align-items: center; gap: 7px;
        }
        .gh-repo-name {
          font-size: 0.825rem; font-weight: 700; color: var(--text-primary);
          flex: 1; min-width: 0;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .gh-repo-desc {
          font-size: 0.75rem; color: var(--text-secondary); line-height: 1.5;
          overflow: hidden; text-overflow: ellipsis;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        }
        .gh-repo-meta { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-top: 2px; }
        .gh-repo-lang {
          display: flex; align-items: center; gap: 4px;
          font-size: 0.7rem; color: var(--text-tertiary);
        }
        .gh-repo-lang-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
        .gh-repo-stat {
          display: flex; align-items: center; gap: 3px;
          font-size: 0.7rem; color: var(--text-tertiary);
          font-family: var(--font-mono);
        }

        /* Error state */
        .gh-error {
          display: flex; flex-direction: column; align-items: center;
          padding: 3rem; text-align: center;
          border-radius: 16px; border: 1px dashed var(--border-color);
          color: var(--text-tertiary);
        }
      `}</style>
    </section>
  )
}
