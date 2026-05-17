// GithubStats.jsx — v2.2.4
// Fully dynamic: GitHub API for user stats + repos, streak-stats embed for streak,
// github-readme-stats for top languages. Tooltips + hover on all data.
// Contribution graph replaced with: Pinned Repos + Streak Stats image
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare, faCodeBranch, faStar, faUsers,
         faEye, faCode, faCircleDot, faCalendar, faLocationDot, faLink } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

const GH = 'muhtasim-rahman'

// Fetch GitHub user + repos
function useGitHubData() {
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function fetchData() {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GH}`),
          fetch(`https://api.github.com/users/${GH}/repos?sort=updated&per_page=100`)
        ])
        if (!uRes.ok || !rRes.ok) throw new Error('GitHub API error')
        const [userData, reposData] = await Promise.all([uRes.json(), rRes.json()])
        if (!cancelled) {
          setUser(userData)
          setRepos(Array.isArray(reposData) ? reposData : [])
          setLoading(false)
        }
      } catch(e) {
        if (!cancelled) { setError(e.message); setLoading(false) }
      }
    }
    fetchData()
    return () => { cancelled = true }
  }, [])

  return { user, repos, loading, error }
}

// Stat card with tooltip
function StatCard({ icon, label, value, color, tooltip, i }) {
  const [tip, setTip] = useState(false)
  return (
    <div className="relative flex flex-col items-center gap-1 cursor-default select-none"
      onMouseEnter={()=>setTip(true)} onMouseLeave={()=>setTip(false)}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-1"
        style={{background:`${color}18`, color}}>
        <FontAwesomeIcon icon={icon} className="text-sm"/>
      </div>
      <motion.span className="text-lg font-extrabold font-display" style={{color}}
        initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*.08}}>
        {value ?? '—'}
      </motion.span>
      <span className="text-[10px] text-[var(--text-tertiary)] text-center leading-tight">{label}</span>
      {tip && tooltip && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50
          bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-lg shadow-[var(--shadow-xl)]
          px-3 py-1.5 text-[11px] text-[var(--text-primary)] whitespace-nowrap font-medium pointer-events-none">
          {tooltip}
        </div>
      )}
    </div>
  )
}

// Repo card
function RepoCard({ repo, i }) {
  const [tip, setTip] = useState(false)
  const lang = repo.language
  const langColors = {
    JavaScript:'#F7DF1E', Python:'#3776AB', HTML:'#E34C26', CSS:'#563D7C',
    TypeScript:'#3178C6', Vue:'#41b883', React:'#61DAFB', 'Jupyter Notebook':'#DA5B0B'
  }
  const lc = langColors[lang] ?? '#64748B'
  return (
    <motion.div className="relative p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-primary)] transition-colors duration-200 group"
      initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.1}}
      transition={{duration:.4,delay:i*.07}}
      onMouseEnter={()=>setTip(true)} onMouseLeave={()=>setTip(false)}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
          className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-1 hover:underline flex items-center gap-1.5">
          <FontAwesomeIcon icon={faCodeBranch} className="text-xs opacity-60 flex-shrink-0"/>
          {repo.name}
        </a>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
          className="text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors flex-shrink-0">
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]"/>
        </a>
      </div>
      {repo.description && (
        <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-2">{repo.description}</p>
      )}
      <div className="flex items-center gap-3 text-[10px] text-[var(--text-tertiary)] flex-wrap">
        {lang && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full flex-shrink-0" style={{background:lc}}/>{lang}</span>}
        <span className="flex items-center gap-1"><FontAwesomeIcon icon={faStar} className="text-amber-400"/>{repo.stargazers_count}</span>
        <span className="flex items-center gap-1"><FontAwesomeIcon icon={faEye} className="opacity-70"/>{repo.watchers_count}</span>
        {repo.fork && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)]">Fork</span>}
      </div>
      {/* Tooltip: show full description */}
      {tip && repo.description && repo.description.length > 60 && (
        <div className="absolute bottom-full mb-2 left-0 right-0 z-50
          bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl shadow-[var(--shadow-xl)]
          px-3 py-2 text-[11px] text-[var(--text-secondary)] leading-relaxed pointer-events-none">
          {repo.description}
        </div>
      )}
    </motion.div>
  )
}

// Calculate most-used language across repos
function calcTopLangs(repos) {
  const cnt = {}
  repos.forEach(r => { if(r.language) cnt[r.language] = (cnt[r.language]||0) + 1 })
  const total = Object.values(cnt).reduce((a,b)=>a+b,0) || 1
  return Object.entries(cnt)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,5)
    .map(([name,n])=>({name, pct:Math.round(n/total*100)}))
}

const LANG_COLORS = {
  JavaScript:'#F7DF1E', Python:'#3776AB', HTML:'#E34C26', CSS:'#563D7C',
  TypeScript:'#3178C6', Vue:'#41b883', 'Jupyter Notebook':'#DA5B0B', default:'#64748B'
}

export default function GithubStats() {
  const { user, repos, loading, error } = useGitHubData()
  const [imgMode] = useState(()=>document.documentElement.getAttribute('data-theme')||'dark')

  const topRepos = [...repos].sort((a,b)=>b.stargazers_count-a.stargazers_count).filter(r=>!r.fork).slice(0,6)
  const topLangs = calcTopLangs(repos)

  const totalStars = repos.reduce((a,r)=>a+r.stargazers_count,0)

  const isDark = document.documentElement.getAttribute('data-theme') !== 'light'

  return (
    <section className="section section-alt" id="github">
      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={{duration:.5}}>
            <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">Open Source</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">GitHub Activity</h2>
          </motion.div>
          <motion.a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors group self-start sm:self-auto"
            initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.5,delay:.1}}>
            <FontAwesomeIcon icon={faGithub}/>
            <span>@{GH}</span>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
          </motion.a>
        </div>

        {/* Row 1: User stats + language breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          {/* Panel A — Live user stats */}
          <motion.div className="card p-5 flex flex-col gap-5"
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.5}}>

            {/* User info */}
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full sk"/>
                <div className="flex-1 space-y-2"><div className="h-4 sk rounded w-3/4"/><div className="h-3 sk rounded w-1/2"/></div>
              </div>
            ) : error ? (
              <p className="text-sm text-[var(--text-tertiary)] text-center py-4">Could not load GitHub data.</p>
            ) : user && (
              <div className="flex items-center gap-3">
                <img src={user.avatar_url} alt={user.name} className="w-14 h-14 rounded-full border-2 border-[var(--border-color)] flex-shrink-0"/>
                <div className="min-w-0">
                  <p className="font-bold text-[var(--text-primary)] text-sm">{user.name || user.login}</p>
                  {user.bio && <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2">{user.bio}</p>}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {user.location && <span className="flex items-center gap-1 text-[10px] text-[var(--text-tertiary)]"><FontAwesomeIcon icon={faLocationDot} className="text-[9px]"/>{user.location}</span>}
                    {user.blog && <a href={user.blog.startsWith('http')?user.blog:'https://'+user.blog} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-[var(--accent-primary)] hover:underline"><FontAwesomeIcon icon={faLink} className="text-[9px]"/>Website</a>}
                  </div>
                </div>
              </div>
            )}

            {/* Stat row */}
            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-[var(--border-color)]">
              <StatCard icon={faCodeBranch} label="Repos" color="#3B82F6"
                value={loading?'…':user?.public_repos??'—'}
                tooltip={`${user?.public_repos??0} public repositories`} i={0}/>
              <StatCard icon={faUsers} label="Followers" color="#10B981"
                value={loading?'…':user?.followers??'—'}
                tooltip={`${user?.followers??0} people follow @${GH}`} i={1}/>
              <StatCard icon={faEye} label="Following" color="#A855F7"
                value={loading?'…':user?.following??'—'}
                tooltip={`Following ${user?.following??0} users`} i={2}/>
              <StatCard icon={faStar} label="Stars" color="#F59E0B"
                value={loading?'…':totalStars||'—'}
                tooltip={`${totalStars} total stars across all repos`} i={3}/>
            </div>

            {/* Member since */}
            {user?.created_at && (
              <p className="text-[10px] text-[var(--text-tertiary)] flex items-center gap-1 border-t border-[var(--border-color)] pt-3">
                <FontAwesomeIcon icon={faCalendar} className="text-[9px]"/>
                Member since {new Date(user.created_at).toLocaleDateString('en-GB',{month:'long',year:'numeric'})}
              </p>
            )}
          </motion.div>

          {/* Panel B — Language breakdown (dynamic) */}
          <motion.div className="card p-5 flex flex-col gap-4"
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.5,delay:.1}}>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCode} className="text-[var(--accent-primary)] text-sm"/>
              <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Top Languages</p>
              <span className="ml-auto text-[10px] text-[var(--text-tertiary)]">from {repos.length} repos</span>
            </div>

            {loading ? (
              <div className="space-y-3">{[1,2,3,4,5].map(k=><div key={k} className="h-8 sk rounded-lg"/>)}</div>
            ) : topLangs.length === 0 ? (
              <p className="text-xs text-[var(--text-tertiary)] text-center py-6">No language data available</p>
            ) : (
              <>
                {/* Stacked bar */}
                <div className="h-3 rounded-full overflow-hidden flex" title="Language distribution">
                  {topLangs.map(l=>{
                    const c = LANG_COLORS[l.name]??LANG_COLORS.default
                    return (
                      <motion.div key={l.name} style={{background:c,width:`${l.pct}%`}}
                        title={`${l.name}: ${l.pct}%`}
                        initial={{width:0}} whileInView={{width:`${l.pct}%`}} viewport={{once:true}}
                        transition={{duration:.65,delay:.2}}/>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="space-y-2.5">
                  {topLangs.map((l,i)=>{
                    const c=LANG_COLORS[l.name]??LANG_COLORS.default
                    return (
                      <motion.div key={l.name} className="flex items-center gap-2.5"
                        title={`${l.name}: ${l.pct}% of repos`}
                        initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
                        transition={{delay:.15+i*.07}}>
                        <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{background:c}}/>
                        <span className="text-sm text-[var(--text-secondary)] flex-1">{l.name}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="w-16 h-1.5 rounded-full bg-[var(--bg-surface-3)] overflow-hidden">
                            <motion.div className="h-full rounded-full" style={{background:c}}
                              initial={{width:0}} whileInView={{width:`${l.pct}%`}} viewport={{once:true}}
                              transition={{duration:.6,delay:.2+i*.07}}/>
                          </div>
                          <span className="text-xs font-bold font-mono w-7 text-right" style={{color:c}}>{l.pct}%</span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
                <p className="text-[10px] text-[var(--text-tertiary)] mt-auto pt-2 border-t border-[var(--border-color)]">
                  ✦ Calculated from public repo primary languages
                </p>
              </>
            )}
          </motion.div>
        </div>

        {/* Row 2: GitHub Streak Stats (live image embed) */}
        <motion.div className="card p-5 mb-5 overflow-hidden"
          initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5,delay:.15}}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">Contribution Streak</p>
            <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer"
              className="text-[10px] text-[var(--accent-primary)] hover:underline font-medium">View on GitHub →</a>
          </div>
          <div className="flex justify-center overflow-x-auto">
            <img
              src={`https://streak-stats.demolab.com?user=${GH}&theme=${isDark?'dark':'default'}&hide_border=true&date_format=j%20M%5B%20Y%5D&background=${isDark?'0D1117':'ffffff'}&stroke=${isDark?'1E293B':'e2e8f0'}&ring=3B82F6&fire=F59E0B&currStreakLabel=3B82F6`}
              alt="GitHub contribution streak"
              className="rounded-lg max-w-full"
              loading="lazy"
              onError={e=>{e.target.parentElement.innerHTML='<p class="py-6 text-center text-sm text-[color:var(--text-tertiary)]">Streak stats temporarily unavailable.</p>'}}
            />
          </div>
        </motion.div>

        {/* Row 3: Top repos (dynamic) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
              Top Repositories {!loading && <span className="text-[var(--accent-primary)]">({topRepos.length})</span>}
            </p>
            <a href={`${SITE_CONFIG.social.github}?tab=repositories`} target="_blank" rel="noopener noreferrer"
              className="text-[10px] text-[var(--accent-primary)] hover:underline font-medium">View all →</a>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[1,2,3].map(k=><div key={k} className="h-28 sk rounded-xl"/>)}
            </div>
          ) : topRepos.length === 0 ? (
            <p className="text-sm text-[var(--text-tertiary)] text-center py-6">No repos found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {topRepos.map((r,i)=><RepoCard key={r.id} repo={r} i={i}/>)}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
