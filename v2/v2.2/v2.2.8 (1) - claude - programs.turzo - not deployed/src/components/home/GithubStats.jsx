// GithubStats.jsx -- v2.2.8
// CHANGES:
//   * GitHub profile section fully redesigned -- richer card with cover-style bg
//   * Below profile: 2-col row -- LEFT = streak img, RIGHT = awesome-github-stats img
//   * Both stat images support light/dark via theme detection
//   * Achievements + languages + repos unchanged

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faStar, faCodeFork, faUsers, faBook, faCodeBranch,
  faArrowUpRightFromSquare, faSpinner, faRotate,
  faTrophy, faFire, faCode, faMedal, faAward, faGlobe,
  faLocationDot, faLink, faCalendarDays,
} from '@fortawesome/free-solid-svg-icons'
import { useThemeStore } from '../../store/themeStore.js'

const GH_USER = 'muhtasim-rahman'
const CARD_ACCENT = '#c084fc'

const LANG_COLORS = {
  JavaScript:'#f7df1e', TypeScript:'#3178c6', Python:'#3776ab',
  HTML:'#e44d26', CSS:'#264de4', Shell:'#89e051',
  PHP:'#777bb4', Java:'#b07219', 'C++':'#f34b7d',
  Go:'#00add8', Rust:'#dea584', Swift:'#ffac45',
  Ruby:'#701516', Kotlin:'#A97BFF', Dart:'#00b4ab',
  Vue:'#41b883', SCSS:'#c6538c', Lua:'#000080',
  'C#':'#178600', R:'#198ce7', default:'#64748b',
}
function getLangColor(lang) { return LANG_COLORS[lang] ?? LANG_COLORS.default }

// -- Repo Card -----------------------------------------------
function RepoCard({ repo, i }) {
  return (
    <motion.a href={repo.html_url} target="_blank" rel="noopener noreferrer"
      className="gh-repo-card"
      initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:.1 }} transition={{ duration:.4, delay: i*.06 }}>
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

// -- Language Bar ---------------------------------------------
function LangBar({ langs }) {
  if (!langs.length) return null
  const total = langs.reduce((a, b) => a + b.bytes, 0)
  return (
    <div className="gh-lang-section">
      <p className="gh-sub-label">Top Languages</p>
      <div className="gh-lang-bar">
        {langs.map((l, i) => (
          <motion.div key={l.lang} className="gh-lang-seg"
            style={{ '--clr': getLangColor(l.lang), flex: l.bytes / total }}
            title={`${l.lang}: ${((l.bytes/total)*100).toFixed(1)}%`}
            initial={{ scaleX:0 }} whileInView={{ scaleX:1 }}
            viewport={{ once:true }}
            transition={{ duration:.7, delay: i*.08, ease:[.16,1,.3,1] }}
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

// -- Achievement Badge -----------------------------------------
function AchievementBadge({ icon, color, title, desc, unlocked }) {
  return (
    <div className={`gh-achieve ${unlocked ? 'gh-achieve--on' : 'gh-achieve--off'}`}
      style={{ '--ac': color }}>
      <div className="gh-achieve-icon"><FontAwesomeIcon icon={icon} /></div>
      <div className="gh-achieve-text">
        <p className="gh-achieve-title">{title}</p>
        <p className="gh-achieve-desc">{desc}</p>
      </div>
      {unlocked && <div className="gh-achieve-glow" />}
    </div>
  )
}

// -- Profile Card (redesigned) ---------------------------------
function ProfileCard({ profile, totalStars }) {
  const joined = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { month:'short', year:'numeric' })
    : null

  const pills = [
    { icon: faBook,     value: profile?.public_repos, label: 'Repos',     color: CARD_ACCENT },
    { icon: faUsers,    value: profile?.followers,    label: 'Followers',  color: '#818cf8'  },
    { icon: faStar,     value: totalStars,             label: 'Stars',      color: '#fbbf24'  },
    { icon: faCodeFork, value: profile?.public_gists, label: 'Gists',      color: '#38bdf8'  },
  ]

  return (
    <motion.div className="ghp-card"
      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.45 }}>
      {/* Cover gradient bg */}
      <div className="ghp-cover" aria-hidden="true">
        <div className="ghp-cover-glow" />
      </div>

      {/* Card body */}
      <div className="ghp-body">
        <div className="ghp-top-row">
          {/* Avatar */}
          <div className="ghp-avatar-wrap">
            <img src={profile?.avatar_url} alt={profile?.name ?? GH_USER}
              className="ghp-avatar" />
            <div className="ghp-avatar-ring" />
          </div>

          {/* Name + handle + meta */}
          <div className="ghp-info">
            <div className="ghp-name-row">
              <a href={profile?.html_url} target="_blank" rel="noopener noreferrer"
                className="ghp-name">
                {profile?.name ?? GH_USER}
              </a>
              <span className="ghp-handle">@{profile?.login}</span>
            </div>
            {profile?.bio && (
              <p className="ghp-bio">{profile.bio}</p>
            )}
            <div className="ghp-meta-row">
              {profile?.location && (
                <span className="ghp-meta-item">
                  <FontAwesomeIcon icon={faLocationDot} className="text-[10px]" />
                  {profile.location}
                </span>
              )}
              {profile?.blog && (
                <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                  target="_blank" rel="noopener noreferrer" className="ghp-meta-item ghp-meta-link">
                  <FontAwesomeIcon icon={faLink} className="text-[10px]" />
                  {profile.blog.replace(/^https?:\/\//, '')}
                </a>
              )}
              {joined && (
                <span className="ghp-meta-item">
                  <FontAwesomeIcon icon={faCalendarDays} className="text-[10px]" />
                  Joined {joined}
                </span>
              )}
            </div>
          </div>

          {/* GitHub link button */}
          <a href={profile?.html_url} target="_blank" rel="noopener noreferrer"
            className="ghp-visit-btn">
            <FontAwesomeIcon icon={faGithub} />
            <span>Profile</span>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
          </a>
        </div>

        {/* Stat pills */}
        <div className="ghp-pills">
          {pills.map(p => (
            <div key={p.label} className="ghp-pill" style={{ '--pc': p.color }}>
              <FontAwesomeIcon icon={p.icon} className="ghp-pill-icon" />
              <span className="ghp-pill-val">{p.value ?? '—'}</span>
              <span className="ghp-pill-lbl">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// -- Stats image pair (streak + awesome-github-stats) ----------
function StatsImageRow({ isDark }) {
  const theme = isDark ? 'dark' : 'light'

  // Streak image -- ghchart or streak-stats, theme-aware
  const streakUrl = `https://streak-stats.demolab.com?user=${GH_USER}&theme=${isDark ? 'dark' : 'default'}&hide_border=true&background=transparent&ring=${CARD_ACCENT.replace('#','')}&fire=${CARD_ACCENT.replace('#','')}&currStreakLabel=${CARD_ACCENT.replace('#','')}`

  // Awesome GitHub Stats
  const awesomeUrl = `https://awesome-github-stats.azurewebsites.net/user-stats/${GH_USER}?cardType=level&fontFamily=42dot%20Sans&preferLogin=false&theme=${isDark ? 'dark' : 'light'}`

  const [streakFailed,  setStreakFailed ] = useState(false)
  const [awesomeFailed, setAwesomeFailed] = useState(false)

  return (
    <div className="gh-stats-row">
      {/* LEFT: Streak */}
      <motion.div className="gh-stats-panel"
        initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:.45, delay:.1 }}>
        {!streakFailed ? (
          <img
            src={streakUrl}
            alt="GitHub streak stats"
            className="gh-stats-img"
            loading="lazy"
            onError={() => setStreakFailed(true)}
          />
        ) : (
          <div className="gh-stats-fallback">
            <FontAwesomeIcon icon={faFire} className="text-3xl opacity-30" style={{ color:'#f97316' }} />
            <p className="text-sm text-[var(--text-tertiary)] mt-2">Streak data unavailable</p>
          </div>
        )}
        <p className="gh-stats-label">Contribution Streak</p>
      </motion.div>

      {/* RIGHT: Awesome GitHub Stats */}
      <motion.div className="gh-stats-panel"
        initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:.45, delay:.18 }}>
        {!awesomeFailed ? (
          <a href={`https://awesome-github-stats.azurewebsites.net/index.html?cardType=level&fontFamily=42dot%20Sans&preferLogin=false`}
            target="_blank" rel="noopener noreferrer" style={{ display:'block' }}>
            <img
              src={awesomeUrl}
              alt="Muhtasim's GitHub Stats"
              className="gh-stats-img"
              loading="lazy"
              onError={() => setAwesomeFailed(true)}
            />
          </a>
        ) : (
          <div className="gh-stats-fallback">
            <FontAwesomeIcon icon={faGithub} className="text-3xl opacity-30" style={{ color: CARD_ACCENT }} />
            <p className="text-sm text-[var(--text-tertiary)] mt-2">Stats image unavailable</p>
          </div>
        )}
        <p className="gh-stats-label">GitHub Overview</p>
      </motion.div>
    </div>
  )
}

// -- Main export -----------------------------------------------
export default function GithubStats() {
  const { isDark } = useThemeStore()
  const dark = isDark()

  const [profile,  setProfile ] = useState(null)
  const [repos,    setRepos   ] = useState([])
  const [langs,    setLangs   ] = useState([])
  const [loading,  setLoading ] = useState(true)
  const [error,    setError   ] = useState(null)

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

      const sorted = reposData
        .filter(r => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
      setRepos(sorted)

      const langMap = {}
      await Promise.all(
        reposData.filter(r => !r.fork).slice(0, 30).map(r =>
          fetch(r.languages_url).then(res => res.ok ? res.json() : {}).then(data => {
            Object.entries(data).forEach(([lang, bytes]) => {
              langMap[lang] = (langMap[lang] || 0) + bytes
            })
          }).catch(() => {})
        )
      )
      setLangs(
        Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .map(([lang, bytes]) => ({ lang, bytes }))
      )
    } catch (e) {
      setError(e.message ?? 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0)

  const achievements = profile ? [
    { icon: faFire,     color: '#f97316', title: 'Active Builder',   desc: `${profile.public_repos}+ public repos`,                        unlocked: profile.public_repos >= 5 },
    { icon: faStar,     color: '#fbbf24', title: 'Star Collector',   desc: `${totalStars} total stars earned`,                             unlocked: totalStars >= 1           },
    { icon: faUsers,    color: '#818cf8', title: 'Community Member', desc: `${profile.followers} developers following`,                    unlocked: profile.followers >= 1    },
    { icon: faTrophy,   color: CARD_ACCENT, title: 'Open Source Dev', desc: `${repos.filter(r=>r.stargazers_count>0).length} starred projects`, unlocked: repos.filter(r=>r.stargazers_count>0).length >= 1 },
    { icon: faGlobe,    color: '#38bdf8', title: 'Web Publisher',    desc: `${repos.filter(r=>r.homepage).length}+ live projects`,         unlocked: repos.filter(r=>r.homepage).length >= 1 },
    { icon: faMedal,    color: '#22c55e', title: 'Code Sharer',      desc: `${profile.public_gists} public gists`,                        unlocked: profile.public_gists >= 1 },
    { icon: faAward,    color: '#ec4899', title: 'Multi-language',   desc: `Code in ${langs.length}+ languages`,                          unlocked: langs.length >= 3         },
    { icon: faCodeFork, color: '#a855f7', title: 'Fork Worthy',      desc: `${repos.reduce((a,r)=>a+r.forks_count,0)} total forks`,       unlocked: repos.reduce((a,r)=>a+r.forks_count,0) >= 1 },
  ] : []

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
            Real-time stats pulled from the GitHub API. Updated on every visit.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-[var(--text-tertiary)]">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl" />
            <span className="text-sm">Fetching GitHub data...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center py-16 gap-4 text-center">
            <p className="text-[var(--text-secondary)] text-sm">
              {error.includes('403') ? 'GitHub API rate-limited. Try again shortly.' : error}
            </p>
            <button onClick={load}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all active:scale-[.97]">
              <FontAwesomeIcon icon={faRotate} /> Retry
            </button>
          </div>
        ) : (
          <>
            {/* Redesigned profile card */}
            {profile && <ProfileCard profile={profile} totalStars={totalStars} />}

            {/* Streak + awesome-github-stats in 2 columns */}
            <StatsImageRow isDark={dark} />

            {/* Achievements */}
            {achievements.length > 0 && (
              <div className="gh-achievements">
                <p className="gh-sub-label mb-4">Achievements &amp; Badges</p>
                <div className="gh-achieve-grid">
                  {achievements.map((a, i) => (
                    <motion.div key={a.title}
                      initial={{ opacity:0, scale:.9 }}
                      whileInView={{ opacity:1, scale:1 }}
                      viewport={{ once:true, amount:.1 }}
                      transition={{ duration:.35, delay: i*.05 }}>
                      <AchievementBadge {...a} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

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

            {/* Footer */}
            <motion.div className="flex justify-center mt-10"
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
        /* ---- Redesigned profile card ----------------------- */
        .ghp-card {
          position: relative;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          overflow: hidden;
          margin-bottom: 1.5rem;
        }
        .ghp-cover {
          height: 72px;
          background: linear-gradient(135deg,
            rgba(99,102,241,.22) 0%,
            rgba(192,132,252,.18) 40%,
            rgba(59,130,246,.14) 100%
          );
          position: relative;
          overflow: hidden;
        }
        [data-theme=light] .ghp-cover {
          background: linear-gradient(135deg,
            rgba(99,102,241,.12) 0%,
            rgba(192,132,252,.10) 40%,
            rgba(59,130,246,.08) 100%
          );
        }
        .ghp-cover-glow {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 120% at 20% 50%, rgba(192,132,252,.3), transparent 60%),
            radial-gradient(ellipse 40% 80% at 80% 30%, rgba(59,130,246,.2), transparent 60%);
          pointer-events: none;
        }
        .ghp-body {
          padding: 0 1.4rem 1.2rem;
        }
        .ghp-top-row {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .ghp-avatar-wrap {
          position: relative;
          flex-shrink: 0;
          margin-top: -28px;
        }
        .ghp-avatar {
          width: 72px; height: 72px;
          border-radius: 16px;
          object-fit: cover;
          border: 3px solid var(--bg-surface);
          display: block;
        }
        .ghp-avatar-ring {
          position: absolute; inset: -3px;
          border-radius: 18px;
          border: 2px solid ${CARD_ACCENT}55;
          pointer-events: none;
        }
        .ghp-info {
          flex: 1; min-width: 0;
          display: flex; flex-direction: column; gap: .25rem;
          padding-top: .25rem;
        }
        .ghp-name-row {
          display: flex; align-items: baseline; gap: .55rem; flex-wrap: wrap;
        }
        .ghp-name {
          font-size: 1.05rem; font-weight: 800;
          color: var(--text-primary); text-decoration: none;
          font-family: var(--font-display);
          transition: color .15s;
        }
        .ghp-name:hover { color: ${CARD_ACCENT}; }
        .ghp-handle {
          font-size: .78rem; color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .ghp-bio {
          font-size: .8rem; color: var(--text-secondary);
          line-height: 1.55; max-width: 440px;
          overflow: hidden; text-overflow: ellipsis;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        }
        .ghp-meta-row {
          display: flex; align-items: center; gap: .8rem; flex-wrap: wrap;
          margin-top: .1rem;
        }
        .ghp-meta-item {
          display: inline-flex; align-items: center; gap: .3rem;
          font-size: .72rem; color: var(--text-tertiary);
        }
        .ghp-meta-link {
          text-decoration: none; transition: color .15s;
        }
        .ghp-meta-link:hover { color: var(--accent-primary); }
        .ghp-visit-btn {
          display: inline-flex; align-items: center; gap: .4rem;
          height: 34px; padding: 0 14px;
          border-radius: 999px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface-2);
          color: var(--text-secondary);
          font-size: .8rem; font-weight: 600;
          text-decoration: none;
          transition: all .18s ease;
          white-space: nowrap;
          flex-shrink: 0;
          align-self: center;
        }
        .ghp-visit-btn:hover {
          border-color: ${CARD_ACCENT};
          color: ${CARD_ACCENT};
          background: ${CARD_ACCENT}11;
          transform: translateY(-1px);
        }
        .ghp-visit-btn:active { transform: scale(.95); }

        /* Pills */
        .ghp-pills {
          display: flex; gap: .6rem; flex-wrap: wrap;
          padding-top: .9rem;
          border-top: 1px solid var(--border-color);
        }
        .ghp-pill {
          display: flex; flex-direction: column; align-items: center;
          padding: .45rem .8rem; border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface-2);
          min-width: 64px;
          transition: transform .18s ease, border-color .18s ease;
        }
        .ghp-pill:hover { transform: translateY(-2px); border-color: var(--pc); }
        .ghp-pill-icon { font-size: 11px; color: var(--pc); margin-bottom: 3px; }
        .ghp-pill-val  { font-size: .95rem; font-weight: 800; font-family: var(--font-display); color: var(--text-primary); line-height: 1; }
        .ghp-pill-lbl  { font-size: .58rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: .05em; margin-top: 2px; }

        /* ---- Stats image 2-col row ------------------------- */
        .gh-stats-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 620px) {
          .gh-stats-row { grid-template-columns: 1fr; }
        }
        .gh-stats-panel {
          border: 1px solid var(--border-color);
          border-radius: 16px;
          background: var(--bg-surface);
          overflow: hidden;
          display: flex; flex-direction: column;
        }
        .gh-stats-img {
          width: 100%; height: auto; display: block;
          min-height: 120px;
        }
        .gh-stats-label {
          font-size: .68rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--text-tertiary);
          text-align: center;
          padding: .5rem .75rem;
          border-top: 1px solid var(--border-color);
        }
        .gh-stats-fallback {
          flex: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 2.5rem;
        }

        /* ---- Achievements ---------------------------------- */
        .gh-achievements { margin-bottom: 1.5rem; }
        .gh-achieve-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: .7rem;
        }
        @media (max-width: 900px) { .gh-achieve-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .gh-achieve-grid { grid-template-columns: 1fr 1fr; } }
        .gh-achieve {
          position: relative; display: flex; align-items: center; gap: .6rem;
          padding: .7rem .8rem; border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface); overflow: hidden;
          transition: transform .18s ease, border-color .18s ease;
        }
        .gh-achieve:hover { transform: translateY(-2px); }
        .gh-achieve--on { border-color: color-mix(in srgb, var(--ac) 25%, var(--border-color)); }
        .gh-achieve--off { opacity: .45; filter: grayscale(.8); }
        .gh-achieve-icon {
          width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          background: color-mix(in srgb, var(--ac) 14%, transparent);
          color: var(--ac);
        }
        .gh-achieve--off .gh-achieve-icon { background: var(--bg-surface-2); color: var(--text-tertiary); }
        .gh-achieve-text { min-width: 0; }
        .gh-achieve-title { font-size: .78rem; font-weight: 700; color: var(--text-primary); line-height: 1.2; }
        .gh-achieve-desc  { font-size: .68rem; color: var(--text-tertiary); margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .gh-achieve-glow {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 60% 50% at 20% 50%, color-mix(in srgb, var(--ac) 8%, transparent), transparent 70%);
        }

        .gh-sub-label {
          font-size: .7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .12em; color: var(--text-tertiary);
        }

        /* Language bar */
        .gh-lang-section { margin-bottom: 1.5rem; }
        .gh-lang-bar { display: flex; height: 10px; border-radius: 9999px; overflow: hidden; gap: 2px; margin-bottom: .75rem; margin-top: .5rem; }
        .gh-lang-seg { height: 100%; background: var(--clr); transform-origin: left; }
        .gh-lang-legend { display: flex; flex-wrap: wrap; gap: .5rem .9rem; }
        .gh-lang-item { display: inline-flex; align-items: center; gap: 5px; font-size: .78rem; color: var(--text-secondary); }
        .gh-lang-dot  { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .gh-lang-name { font-weight: 500; }
        .gh-lang-pct  { color: var(--text-tertiary); font-size: .72rem; font-family: var(--font-mono); }

        /* Repo cards */
        .gh-repo-card {
          display: flex; flex-direction: column; gap: .5rem;
          padding: 1rem 1.1rem; border-radius: 14px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          text-decoration: none; color: inherit;
          transition: border-color .2s ease, transform .2s ease, box-shadow .2s ease;
          min-height: 100px;
        }
        .gh-repo-card:hover { border-color: ${CARD_ACCENT}66; transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,.18); }
        .gh-repo-top { display: flex; align-items: flex-start; gap: .5rem; }
        .gh-repo-name { flex: 1; min-width: 0; font-size: .84rem; font-weight: 700; color: var(--text-primary); font-family: var(--font-mono); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .gh-repo-ext  { font-size: 10px; color: var(--text-tertiary); margin-top: 2px; flex-shrink: 0; opacity: 0; transition: opacity .15s ease; }
        .gh-repo-card:hover .gh-repo-ext { opacity: 1; }
        .gh-repo-desc { font-size: .77rem; color: var(--text-secondary); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; flex: 1; }
        .gh-repo-meta { display: flex; align-items: center; gap: .7rem; margin-top: auto; flex-wrap: wrap; }
        .gh-repo-lang { display: inline-flex; align-items: center; gap: 4px; font-size: .73rem; color: var(--text-secondary); }
        .gh-repo-lang-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
        .gh-repo-stat { display: inline-flex; align-items: center; gap: 4px; font-size: .73rem; color: var(--text-secondary); }
      `}</style>
    </section>
  )
}
