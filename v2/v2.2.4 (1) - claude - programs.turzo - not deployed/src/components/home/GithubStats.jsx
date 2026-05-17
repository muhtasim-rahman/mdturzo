// GithubStats.jsx — v2.2.4
// All data now dynamic via GitHub public API (no auth required).
// Shows: repos, stars, followers, following, public gists, latest repos with descriptions.
// Tooltips and hover functions on all interactive elements.
// Contribution graph: streak-stats.demolab.com embed (dynamic, live).
// Light + dark mode aware.
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare, faCodeBranch, faStar, faUsers, faUserPlus,
  faCode, faCalendarDays, faSpinner, faExternalLink
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

const GH = 'muhtasim-rahman'
const GH_API = `https://api.github.com/users/${GH}`
const GH_REPOS_API = `https://api.github.com/users/${GH}/repos?sort=updated&per_page=6`

function useGitHubData() {
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    const headers = { Accept: 'application/vnd.github.v3+json' }
    Promise.all([
      fetch(GH_API, { headers }).then(r => r.json()),
      fetch(GH_REPOS_API, { headers }).then(r => r.json()),
    ])
      .then(([u, r]) => {
        if (cancelled) return
        if (u.login) setUser(u)
        if (Array.isArray(r)) setRepos(r.filter(repo => !repo.fork).slice(0, 6))
      })
      .catch(() => { if (!cancelled) setError(true) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { user, repos, loading, error }
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr)
  const d = Math.floor(diff / 86400000)
  if (d < 1) return 'Today'
  if (d < 7) return `${d}d ago`
  if (d < 30) return `${Math.floor(d/7)}w ago`
  if (d < 365) return `${Math.floor(d/30)}mo ago`
  return `${Math.floor(d/365)}y ago`
}

const LANG_COLORS = {
  JavaScript:'#F7DF1E', TypeScript:'#3178C6', Python:'#3776AB',
  HTML:'#E34C26', CSS:'#563D7C', 'Jupyter Notebook':'#F37626',
  Java:'#B07219', Shell:'#89E051', Vue:'#41B883', React:'#61DAFB',
  default:'#64748B',
}

function StatCard({ icon, value, label, color, loading, tooltip }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 p-4 rounded-xl border bg-[var(--bg-surface)] relative group cursor-default"
      style={{borderColor:`${color}28`}}
      title={tooltip}
      initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.4}}
      transition={{duration:.4}}>
      <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-xl opacity-60" style={{background:`linear-gradient(90deg,transparent,${color},transparent)`}}/>
      <FontAwesomeIcon icon={icon} style={{color}} className="text-sm mb-0.5"/>
      {loading
        ? <div className="w-12 h-5 rounded bg-[var(--bg-surface-3)] animate-pulse"/>
        : <span className="text-xl font-extrabold font-display leading-none" style={{color}}>{value}</span>
      }
      <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider font-semibold text-center leading-tight">{label}</span>
    </motion.div>
  )
}

function RepoCard({ repo, i }) {
  const lang = repo.language
  const color = LANG_COLORS[lang] ?? LANG_COLORS.default
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-2 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-2)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-surface)] transition-all duration-200 group"
      title={`Open ${repo.name} on GitHub`}
      initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
      viewport={{once:true,amount:.1}} transition={{duration:.4,delay:i*.06}}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors truncate">
          {repo.name}
        </span>
        <FontAwesomeIcon icon={faExternalLink} className="text-[10px] text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] flex-shrink-0 mt-0.5 transition-colors"/>
      </div>
      {repo.description && (
        <p className="text-[11px] text-[var(--text-tertiary)] leading-relaxed line-clamp-2">{repo.description}</p>
      )}
      <div className="flex items-center gap-3 mt-auto pt-1 flex-wrap">
        {lang && (
          <span className="flex items-center gap-1 text-[10px] text-[var(--text-tertiary)]" title={`Written in ${lang}`}>
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{background:color}}/>
            {lang}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1 text-[10px] text-[var(--text-tertiary)]" title={`${repo.stargazers_count} stars`}>
            <FontAwesomeIcon icon={faStar} className="text-[9px] text-amber-400"/>
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1 text-[10px] text-[var(--text-tertiary)]" title={`${repo.forks_count} forks`}>
            <FontAwesomeIcon icon={faCodeBranch} className="text-[9px]"/>
            {repo.forks_count}
          </span>
        )}
        <span className="flex items-center gap-1 text-[10px] text-[var(--text-tertiary)] ml-auto" title={`Last updated ${new Date(repo.updated_at).toLocaleDateString()}`}>
          <FontAwesomeIcon icon={faCalendarDays} className="text-[9px]"/>
          {timeAgo(repo.updated_at)}
        </span>
      </div>
    </motion.a>
  )
}

export default function GithubStats() {
  const { user, repos, loading, error } = useGitHubData()

  const stats = [
    { icon:faCodeBranch, color:'#3B82F6', value: user ? `${user.public_repos}` : '—', label:'Public Repos', tooltip:'Total public repositories on GitHub' },
    { icon:faStar,       color:'#F59E0B', value: user ? `${repos.reduce((s,r)=>s+r.stargazers_count,0)}+` : '—', label:'Stars Earned', tooltip:'Total stars across public repos shown' },
    { icon:faUsers,      color:'#10B981', value: user ? `${user.followers}` : '—', label:'Followers', tooltip:'GitHub followers count' },
    { icon:faUserPlus,   color:'#A855F7', value: user ? `${user.following}` : '—', label:'Following', tooltip:'Accounts being followed on GitHub' },
  ]

  return (
    <section className="section section-alt" id="github">
      <style>{`
        [data-theme=light] img.gh-streak { filter: invert(1) hue-rotate(180deg); }
      `}</style>
      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={{duration:.5}}>
            <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">Open Source</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">GitHub Activity</h2>
            {user?.bio && <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-md">{user.bio}</p>}
          </motion.div>
          <motion.a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors group self-start sm:self-auto"
            title="Visit GitHub profile"
            initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.5,delay:.1}}>
            <FontAwesomeIcon icon={faGithub}/>
            <span>@{GH}</span>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
          </motion.a>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {stats.map((s,i) => (
            <StatCard key={s.label} {...s} loading={loading}/>
          ))}
        </div>

        {/* Recent repos grid */}
        <motion.div className="mb-6"
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5}}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCode} className="text-[var(--accent-primary)] text-sm"/>
              <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Recent Repositories</p>
            </div>
            <a href={`${SITE_CONFIG.social.github}?tab=repositories`} target="_blank" rel="noopener noreferrer"
              className="text-[10px] text-[var(--accent-primary)] hover:underline font-semibold">
              View all →
            </a>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({length:6},(_,i)=>(
                <div key={i} className="h-28 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] animate-pulse"/>
              ))}
            </div>
          ) : error || repos.length === 0 ? (
            <div className="py-8 text-center text-sm text-[var(--text-tertiary)]">
              Could not load repositories.{' '}
              <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer"
                className="text-[var(--accent-primary)] hover:underline">View on GitHub →</a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {repos.map((repo,i) => <RepoCard key={repo.id} repo={repo} i={i}/>)}
            </div>
          )}
        </motion.div>

        {/* Contribution streak embed */}
        <motion.div className="card p-5 overflow-hidden"
          initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5,delay:.1}}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendarDays} className="text-[var(--accent-primary)] text-sm"/>
              <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Contribution Streak</p>
            </div>
            <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer"
              title="View GitHub profile"
              className="text-[10px] text-[var(--accent-primary)] hover:underline font-medium">
              View on GitHub →
            </a>
          </div>
          <div className="overflow-x-auto rounded-lg">
            <img
              src={`https://streak-stats.demolab.com?user=${GH}&theme=dark&hide_border=true&background=0F172A&ring=3B82F6&fire=F59E0B&currStreakLabel=94A3B8&sideNums=F8FAFC&currStreakNum=60A5FA&sideLabels=64748B&dates=475569`}
              alt={`${GH}'s GitHub streak stats`}
              className="gh-streak w-full min-w-[300px] max-w-[640px] mx-auto block"
              style={{borderRadius:8}}
              loading="lazy"
              title="GitHub contribution streak statistics"
              onError={e=>{
                e.target.style.display='none'
                const wrap = e.target.parentElement
                wrap.innerHTML=`<div style="padding:2rem;text-align:center;font-size:.8rem;color:var(--text-tertiary)">Streak stats unavailable. <a href="${SITE_CONFIG.social.github}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-primary)">View on GitHub →</a></div>`
              }}
            />
          </div>
          <p className="text-[10px] text-[var(--text-tertiary)] mt-3 text-right">
            Powered by <a href="https://streak-stats.demolab.com" target="_blank" rel="noopener noreferrer"
              className="text-[var(--accent-primary)] hover:underline">streak-stats.demolab.com</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
