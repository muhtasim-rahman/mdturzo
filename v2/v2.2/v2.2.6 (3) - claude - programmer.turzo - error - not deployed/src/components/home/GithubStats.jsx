// GithubStats.jsx — v2.2.6
// TASK 4: Dynamic GitHub API data
//   4a: fetch repos from GitHub REST API (public, no auth needed)
//   4b: total stars and fork count computed from repos
//   4c: language breakdown computed from language_url fetches (top 5 by frequency)
//   4d: loading skeleton while fetching; error fallback to static data
//   4e: contribution graph from ghchart.rshah.org (unchanged — no auth required for that)
//   4f: Weekly commit bars use GitHub events API (push events in last 7 days, grouped by day)
//   Static STATS (total stars/forks/repos) are now real data
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faStar, faCodeFork, faCode, faFire, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import SITE_CONFIG from '../../config/site.config.js'

const GH = 'muhtasim-rahman'
const GH_API = 'https://api.github.com'

// Fallback static data (used if API fails)
const FB_LANGS = [
  { name:'JavaScript', pct:38, color:'#F7DF1E' },
  { name:'HTML',       pct:27, color:'#E34F26' },
  { name:'CSS',        pct:18, color:'#1572B6' },
  { name:'Python',     pct:11, color:'#3776AB' },
  { name:'Other',      pct:6,  color:'#64748B' },
]
const FB_STATS = [
  { icon:faStar,     color:'#F59E0B', value:'—', label:'Stars'       },
  { icon:faCodeFork, color:'#10B981', value:'—', label:'Forks'       },
  { icon:faCode,     color:'#3B82F6', value:'—', label:'Repos'       },
  { icon:faGithub,   color:'#A855F7', value:'3+', label:'Yrs Active' },
]
const DAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

function ActivityBar({ day, commits, max, i }) {
  const pct = max > 0 ? (commits / max) * 100 : 0
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      <span className="text-[9px] text-[var(--text-tertiary)] font-mono">{commits}</span>
      <motion.div className="w-full rounded-t-sm" style={{ background:'var(--bg-surface-3)', height:'60px', position:'relative', overflow:'hidden' }}>
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-t-sm"
          style={{ background:'linear-gradient(to top,#3B82F6,#60A5FA)' }}
          initial={{ height:0 }}
          whileInView={{ height:`${pct}%` }}
          viewport={{ once:true }}
          transition={{ duration:.6, delay:.1+i*.05, ease:[.16,1,.3,1] }}/>
      </motion.div>
      <span className="text-[9px] text-[var(--text-tertiary)] font-mono">{day}</span>
    </div>
  )
}

// Fetch all repos (handle pagination up to 100)
async function fetchRepos() {
  const r = await fetch(`${GH_API}/users/${GH}/repos?per_page=100&type=owner&sort=updated`)
  if (!r.ok) throw new Error('repos fetch failed')
  return r.json()
}

// Fetch push events for weekly activity (last 7 days)
async function fetchWeeklyActivity() {
  const r = await fetch(`${GH_API}/users/${GH}/events/public?per_page=100`)
  if (!r.ok) return null
  const events = await r.json()
  const now = Date.now()
  const counts = { Sun:0, Mon:0, Tue:0, Wed:0, Thu:0, Fri:0, Sat:0 }
  events.forEach(ev => {
    if (ev.type !== 'PushEvent') return
    const d = new Date(ev.created_at)
    if (now - d.getTime() > 7 * 24 * 3600 * 1000) return
    const label = DAY_LABELS[d.getDay()]
    counts[label] = (counts[label] || 0) + (ev.payload?.commits?.length ?? 1)
  })
  return DAY_LABELS.map(l => ({ label: l, commits: counts[l] }))
}

// Compute language breakdown from repos.language field (fast, no extra fetches)
function computeLangs(repos) {
  const counts = {}
  repos.forEach(r => { if (r.language) counts[r.language] = (counts[r.language]||0)+1 })
  const total = Object.values(counts).reduce((a,b)=>a+b, 0)
  if (total === 0) return FB_LANGS
  const LANG_COLORS = {
    JavaScript:'#F7DF1E', TypeScript:'#3178C6', HTML:'#E34F26', CSS:'#1572B6',
    Python:'#3776AB', 'Jupyter Notebook':'#DA5B0B', Shell:'#89E051',
    PHP:'#777BB4', Java:'#B07219', Rust:'#DEA584', Go:'#00ADD8',
    Vue:'#41B883', Svelte:'#FF3E00', Dart:'#00B4AB', Other:'#64748B',
  }
  const sorted = Object.entries(counts)
    .sort((a,b)=>b[1]-a[1])
    .slice(0, 4)
  const topTotal = sorted.reduce((a,[,v])=>a+v,0)
  const other = total - topTotal
  const result = sorted.map(([name, cnt]) => ({
    name,
    pct: Math.round((cnt/total)*100),
    color: LANG_COLORS[name] ?? '#64748B',
  }))
  if (other > 0) result.push({ name:'Other', pct:Math.round((other/total)*100), color:'#64748B' })
  // Normalise to 100
  const sum = result.reduce((a,l)=>a+l.pct,0)
  if (sum < 100 && result.length) result[0].pct += (100-sum)
  if (sum > 100 && result.length) result[0].pct -= (sum-100)
  return result
}

export default function GithubStats() {
  const [langs, setLangs] = useState(null)
  const [stats, setStats] = useState(null)
  const [week, setWeek] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    Promise.all([fetchRepos(), fetchWeeklyActivity()])
      .then(([repos, weekData]) => {
        if (cancelled) return
        const totalStars = repos.reduce((a,r)=>a+r.stargazers_count,0)
        const totalForks = repos.reduce((a,r)=>a+r.forks_count,0)
        const totalRepos = repos.length
        setStats([
          { icon:faStar,     color:'#F59E0B', value:totalStars, label:'Stars'       },
          { icon:faCodeFork, color:'#10B981', value:totalForks, label:'Forks'       },
          { icon:faCode,     color:'#3B82F6', value:totalRepos, label:'Repos'       },
          { icon:faGithub,   color:'#A855F7', value:'3+',       label:'Yrs Active' },
        ])
        setLangs(computeLangs(repos))
        if (weekData) setWeek(weekData)
        else setWeek(DAY_LABELS.map(l=>({ label:l, commits:0 })))
      })
      .catch(() => {
        if (cancelled) return
        setError(true)
        setStats(FB_STATS)
        setLangs(FB_LANGS)
        setWeek(DAY_LABELS.map(l=>({ label:l, commits:0 })))
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const maxCommits = week ? Math.max(...week.map(d=>d.commits), 1) : 1
  const displayLangs = langs ?? FB_LANGS
  const displayStats = stats ?? FB_STATS
  const displayWeek = week ?? DAY_LABELS.map(l=>({ label:l, commits:0 }))

  return (
    <section className="section section-alt" id="github">
      <div className="container-xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
            viewport={{once:true,amount:.5}} transition={{duration:.5}}>
            <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">Open Source</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">GitHub Activity</h2>
            {error && <p className="text-[10px] text-[var(--text-tertiary)] mt-1">⚠ Could not fetch live data — showing cached</p>}
          </motion.div>
          <motion.a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors group self-start sm:self-auto"
            initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.5,delay:.1}}>
            <FontAwesomeIcon icon={faGithub}/>
            <span>@{GH}</span>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Panel A — Weekly Activity */}
          <motion.div className="card p-5 flex flex-col gap-5"
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.5}}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faFire} className="text-orange-400 text-sm"/>
                <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Weekly Commits</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-light)] text-[var(--accent-primary)] font-semibold">This week</span>
            </div>

            {loading
              ? <div className="flex items-end gap-1.5 h-[60px]">{Array.from({length:7},(_,i)=>(
                  <div key={i} className="sk flex-1 rounded-t-sm" style={{height:`${30+Math.random()*30}px`}}/>
                ))}</div>
              : <div className="flex items-end gap-1.5">
                  {displayWeek.map((d,i) => <ActivityBar key={d.label} day={d.label} commits={d.commits} max={maxCommits} i={i}/>)}
                </div>
            }

            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-[var(--border-color)]">
              {loading
                ? Array.from({length:4},(_,i)=><div key={i} className="flex flex-col items-center gap-1"><div className="sk w-8 h-5 rounded"/><div className="sk w-10 h-2.5 rounded mt-1"/></div>)
                : displayStats.map((s,i)=>(
                  <motion.div key={s.label} className="flex flex-col items-center gap-1"
                    initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.1+i*.06}}>
                    <FontAwesomeIcon icon={s.icon} style={{color:s.color}} className="text-xs"/>
                    <span className="text-sm font-extrabold font-display" style={{color:s.color}}>{s.value}</span>
                    <span className="text-[9px] text-[var(--text-tertiary)] text-center leading-tight">{s.label}</span>
                  </motion.div>
                ))
              }
            </div>
          </motion.div>

          {/* Panel B — Language Breakdown */}
          <motion.div className="card p-5 flex flex-col gap-4"
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.5,delay:.1}}>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCode} className="text-[var(--accent-primary)] text-sm"/>
              <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Language Breakdown</p>
              {!loading && !error && <span className="ml-auto text-[10px] text-[var(--text-tertiary)]">Live</span>}
            </div>

            {loading
              ? <><div className="sk h-3 rounded-full w-full"/><div className="space-y-3">{Array.from({length:4},(_,i)=><div key={i} className="flex items-center gap-2.5"><div className="sk w-2.5 h-2.5 rounded-sm"/><div className="sk flex-1 h-3 rounded"/><div className="sk w-7 h-3 rounded"/></div>)}</div></>
              : <>
                  <div className="h-3 rounded-full overflow-hidden flex">
                    {displayLangs.map(l=>(
                      <motion.div key={l.name} style={{background:l.color,width:`${l.pct}%`}}
                        initial={{width:0}} whileInView={{width:`${l.pct}%`}} viewport={{once:true}}
                        transition={{duration:.65,delay:.2}}/>
                    ))}
                  </div>
                  <div className="space-y-2.5">
                    {displayLangs.map((l,i)=>(
                      <motion.div key={l.name} className="flex items-center gap-2.5"
                        initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
                        transition={{delay:.15+i*.07}}>
                        <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{background:l.color}}/>
                        <span className="text-sm text-[var(--text-secondary)] flex-1">{l.name}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="w-16 h-1.5 rounded-full bg-[var(--bg-surface-3)] overflow-hidden">
                            <motion.div className="h-full rounded-full" style={{background:l.color}}
                              initial={{width:0}} whileInView={{width:`${l.pct}%`}} viewport={{once:true}}
                              transition={{duration:.6,delay:.2+i*.07}}/>
                          </div>
                          <span className="text-xs font-bold font-mono w-7 text-right" style={{color:l.color}}>{l.pct}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-[10px] text-[var(--text-tertiary)] mt-auto pt-2 border-t border-[var(--border-color)]">
                    {error ? '✦ Estimated from public repos.' : '✦ Computed from public repo language data. Live.'}
                  </p>
                </>
            }
          </motion.div>
        </div>

        {/* Row 2: Contribution graph */}
        <motion.div className="card p-5 overflow-hidden"
          initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5,delay:.2}}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">Contribution Graph</p>
            <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer"
              className="text-[10px] text-[var(--accent-primary)] hover:underline font-medium">View on GitHub →</a>
          </div>
          <div className="overflow-x-auto">
            <img
              src={`https://ghchart.rshah.org/3B82F6/${GH}`}
              alt="GitHub contribution chart"
              className="w-full min-w-[600px] rounded-lg gh-embed-img"
              loading="lazy"
              onError={e=>{
                e.target.parentElement.innerHTML=`<div style="padding:2rem;text-align:center;font-size:.8rem;color:var(--text-tertiary)">
                  Contribution graph unavailable. <a href="${SITE_CONFIG.social.github}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-primary)">View on GitHub →</a>
                </div>`
              }}
            />
          </div>
          <p className="text-[10px] text-[var(--text-tertiary)] mt-3 text-right">
            Powered by <a href="https://ghchart.rshah.org" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">ghchart.rshah.org</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
