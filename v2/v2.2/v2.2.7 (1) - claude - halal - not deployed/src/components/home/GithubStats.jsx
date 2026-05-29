// GithubStats.jsx — v2.2.7
// FIX: Streak section was empty (herokuapp URL deprecated)
//      Now uses streak-stats.demolab.com (DenverCoder1) + GitHub Trophies
//      Left panel: GitHub streak stats (working URL)
//      Right panel: GitHub Profile Trophies with custom styled fallback
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faStar, faCodeFork, faUsers, faBook, faCodeBranch,
  faArrowUpRightFromSquare, faSpinner, faRotate,
  faCircleDot, faTrophy, faFire, faCode, faMedal,
} from '@fortawesome/free-solid-svg-icons'

const GH_USER = 'muhtasim-rahman'
const ACCENT  = '#c084fc'

const LANG_COLORS = {
  JavaScript:'#f7df1e',TypeScript:'#3178c6',Python:'#3776ab',HTML:'#e44d26',
  CSS:'#264de4',Shell:'#89e051',PHP:'#777bb4','C++':'#f34b7d',Go:'#00add8',
  Rust:'#dea584',Vue:'#41b883',SCSS:'#c6538c',Dart:'#00b4ab','default':'#64748b',
}
function langColor(l){return LANG_COLORS[l]??LANG_COLORS.default}

function RepoCard({repo,i}){
  return(
    <motion.a href={repo.html_url} target="_blank" rel="noopener noreferrer"
      className="gh-repo-card"
      initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}}
      viewport={{once:true,amount:.1}} transition={{duration:.38,delay:i*.06}}>
      <div className="flex items-start gap-2 mb-1.5">
        <FontAwesomeIcon icon={faBook} className="text-[var(--text-tertiary)] text-xs mt-0.5 flex-shrink-0"/>
        <span className="gh-repo-name flex-1 min-w-0">{repo.name}</span>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="gh-repo-ext"/>
      </div>
      {repo.description&&<p className="gh-repo-desc">{repo.description}</p>}
      <div className="gh-repo-meta">
        {repo.language&&<span className="gh-repo-lang"><span className="gh-lang-dot" style={{background:langColor(repo.language)}}/>{repo.language}</span>}
        {repo.stargazers_count>0&&<span className="gh-stat-badge"><FontAwesomeIcon icon={faStar} className="text-yellow-400 text-[10px]"/>{repo.stargazers_count}</span>}
        {repo.forks_count>0&&<span className="gh-stat-badge"><FontAwesomeIcon icon={faCodeBranch} className="text-[var(--text-tertiary)] text-[10px]"/>{repo.forks_count}</span>}
      </div>
    </motion.a>
  )
}

function LangBar({langs}){
  if(!langs.length)return null
  const total=langs.reduce((a,b)=>a+b.bytes,0)
  return(
    <div className="mb-8">
      <p className="gh-sub-label mb-3">Top Languages</p>
      <div className="flex h-2.5 rounded-full overflow-hidden gap-[2px] mb-3">
        {langs.map((l,i)=>(
          <motion.div key={l.lang} className="h-full rounded-full"
            style={{flex:l.bytes,background:langColor(l.lang)}}
            title={`${l.lang}: ${((l.bytes/total)*100).toFixed(1)}%`}
            initial={{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true}}
            transition={{duration:.65,delay:i*.07,ease:[.16,1,.3,1]}}/>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {langs.slice(0,8).map(l=>(
          <span key={l.lang} className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{background:langColor(l.lang)}}/>
            <span className="font-medium">{l.lang}</span>
            <span className="text-[var(--text-tertiary)] font-mono">{((l.bytes/total)*100).toFixed(0)}%</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function StatPill({icon,value,label,color}){
  return(
    <div className="gh-stat-pill" style={{'--c':color}}>
      <FontAwesomeIcon icon={icon} className="gh-stat-icon"/>
      <span className="gh-stat-val">{value??'–'}</span>
      <span className="gh-stat-lbl">{label}</span>
    </div>
  )
}

// v2.2.7: Achievement badges — built from live repo data + hardcoded milestones
function AchievementBadge({icon,label,desc,color,unlocked=true}){
  return(
    <div className={`gh-badge ${unlocked?'gh-badge--on':''}`} style={{'--c':color}}>
      <div className="gh-badge-icon"><FontAwesomeIcon icon={icon}/></div>
      <div className="gh-badge-text">
        <span className="gh-badge-label">{label}</span>
        <span className="gh-badge-desc">{desc}</span>
      </div>
      {unlocked&&<span className="gh-badge-glow"/>}
    </div>
  )
}

export default function GithubStats(){
  const [profile, setProfile] = useState(null)
  const [repos,   setRepos  ] = useState([])
  const [langs,   setLangs  ] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError  ] = useState(null)
  // v2.2.7: separate image fail states
  const [streakFailed,  setStreakFailed ] = useState(false)
  const [trophyFailed,  setTrophyFailed ] = useState(false)
  const [readmeFailed,  setReadmeFailed ] = useState(false)

  const load = async () => {
    setLoading(true); setError(null)
    try {
      const [pRes, rRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GH_USER}`),
        fetch(`https://api.github.com/users/${GH_USER}/repos?sort=stars&per_page=100&type=owner`),
      ])
      if(!pRes.ok) throw new Error(`GitHub API ${pRes.status}`)
      const pd = await pRes.json()
      const rd = rRes.ok ? await rRes.json() : []
      setProfile(pd)

      const top6 = rd.filter(r=>!r.fork).sort((a,b)=>b.stargazers_count-a.stargazers_count).slice(0,6)
      setRepos(top6)

      // Aggregate languages
      const lm = {}
      await Promise.all(rd.filter(r=>!r.fork).slice(0,30).map(r=>
        fetch(r.languages_url).then(res=>res.ok?res.json():{}).then(d=>{
          Object.entries(d).forEach(([l,b])=>{lm[l]=(lm[l]||0)+b})
        }).catch(()=>{})
      ))
      setLangs(Object.entries(lm).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([lang,bytes])=>({lang,bytes})))
    } catch(e){
      setError(e.message??'Failed to load')
    } finally {
      setLoading(false)
    }
  }
  useEffect(()=>{ load() },[])

  // v2.2.7 FIX: Use streak-stats.demolab.com (DenverCoder1) — replaces defunct herokuapp
  const streakUrl = `https://streak-stats.demolab.com/?user=${GH_USER}&hide_border=true&theme=transparent&stroke=${ACCENT.replace('#','')}&ring=${ACCENT.replace('#','')}&fire=f97316&sideLabels=94a3b8&currStreakLabel=${ACCENT.replace('#','')}&dates=64748b&background=00000000`
  // GitHub readme stats — still reliable
  const statsUrl  = `https://github-readme-stats.vercel.app/api?username=${GH_USER}&show_icons=true&hide_border=true&theme=transparent&title_color=${ACCENT.replace('#','')}&text_color=94a3b8&icon_color=818cf8&count_private=true&hide_title=false`
  // GitHub Profile Trophies
  const trophyUrl = `https://github-profile-trophy.vercel.app/?username=${GH_USER}&theme=darkhub&no-frame=true&no-bg=true&margin-w=4&row=1&column=6`

  // Dynamic achievements from repo data
  const totalStars = repos.reduce((a,r)=>a+r.stargazers_count,0)
  const achievements = [
    {icon:faFire,   label:'Early Bird',   desc:'Started coding journey 2019',       color:'#f97316', unlocked:true},
    {icon:faTrophy, label:'Milestone 10+',desc:`${repos.length} public repos`,       color:'#fbbf24', unlocked:repos.length>=10},
    {icon:faStar,   label:'Star Gazer',   desc:`${totalStars} total stars earned`,   color:'#a855f7', unlocked:totalStars>0},
    {icon:faCode,   label:'Polyglot',     desc:`${langs.length} languages used`,     color:'#3b82f6', unlocked:langs.length>=3},
    {icon:faMedal,  label:'Shipped 16+',  desc:'16 complete projects delivered',     color:'#10b981', unlocked:true},
    {icon:faUsers,  label:'Open Source',  desc:'Building for the community',         color:'#ec4899', unlocked:true},
  ]

  return(
    <section className="section section-alt" id="github">
      <div className="container-xl">
        {/* Heading */}
        <motion.div className="text-center mb-10"
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={{duration:.5}}>
          <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{color:ACCENT}}>Open Source</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">GitHub Activity</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto">
            Real-time stats from the GitHub API. Updated on every visit.
          </p>
        </motion.div>

        {loading?(
          <div className="flex items-center justify-center py-20 gap-3 text-[var(--text-tertiary)]">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl"/>
            <span className="text-sm">Fetching GitHub data…</span>
          </div>
        ):error?(
          <div className="flex flex-col items-center py-16 gap-4 text-center">
            <p className="text-sm text-[var(--text-secondary)]">{error.includes('403')?'GitHub API rate-limited. Try again shortly.':error}</p>
            <button onClick={load} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all active:scale-[.97]">
              <FontAwesomeIcon icon={faRotate}/>Retry
            </button>
          </div>
        ):(
          <>
            {/* Profile row */}
            {profile&&(
              <motion.div className="gh-profile-row"
                initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.4}}>
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 flex-1 min-w-0 no-underline">
                  <img src={profile.avatar_url} alt={profile.name??GH_USER}
                    className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" style={{border:`2px solid ${ACCENT}44`}}/>
                  <div className="min-w-0">
                    <p className="font-bold text-[var(--text-primary)] text-base truncate">{profile.name??GH_USER}</p>
                    <p className="text-xs text-[var(--text-tertiary)] font-mono">@{profile.login}</p>
                    {profile.bio&&<p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-1 max-w-xs">{profile.bio}</p>}
                  </div>
                </a>
                <div className="gh-stat-pills">
                  <StatPill icon={faBook}     value={profile.public_repos}  label="Repos"     color={ACCENT}/>
                  <StatPill icon={faUsers}     value={profile.followers}     label="Followers" color="#818cf8"/>
                  <StatPill icon={faStar}      value={totalStars}            label="Stars"     color="#fbbf24"/>
                  <StatPill icon={faCircleDot} value={profile.public_gists}  label="Gists"     color="#38bdf8"/>
                </div>
              </motion.div>
            )}

            {/* v2.2.7 FIX: Two stat images — streak (demolab, fixed) + readme stats */}
            <div className="gh-img-grid mb-6">
              <motion.div className="gh-img-card" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.42,delay:.1}}>
                {!streakFailed?(
                  <img src={streakUrl} alt="GitHub contribution streak"
                    className="w-full h-auto block" loading="lazy"
                    onError={()=>setStreakFailed(true)}/>
                ):(
                  /* Fallback if streak image fails */
                  <div className="gh-img-fallback">
                    <FontAwesomeIcon icon={faFire} style={{color:'#f97316',fontSize:28}}/>
                    <p className="text-sm font-semibold text-[var(--text-primary)] mt-2">Contribution Streak</p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">Active on GitHub daily</p>
                    <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noopener noreferrer"
                      className="mt-3 text-xs text-[var(--accent-primary)] hover:underline">View on GitHub ↗</a>
                  </div>
                )}
              </motion.div>
              <motion.div className="gh-img-card" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.42,delay:.18}}>
                {!readmeFailed?(
                  <img src={statsUrl} alt="GitHub stats overview"
                    className="w-full h-auto block" loading="lazy"
                    onError={()=>setReadmeFailed(true)}/>
                ):(
                  <div className="gh-img-fallback">
                    <FontAwesomeIcon icon={faCode} style={{color:ACCENT,fontSize:28}}/>
                    <p className="text-sm font-semibold text-[var(--text-primary)] mt-2">GitHub Stats</p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">{profile?.public_repos??0} repos · {totalStars} stars</p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* v2.2.7: GitHub Trophies (replaces empty streak slot) */}
            {!trophyFailed&&(
              <motion.div className="gh-img-card mb-6 p-2"
                initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.42,delay:.24}}>
                <p className="gh-sub-label px-2 pt-1 mb-2">GitHub Trophies</p>
                <img src={trophyUrl} alt="GitHub profile trophies"
                  className="w-full h-auto block" loading="lazy"
                  onError={()=>setTrophyFailed(true)}/>
              </motion.div>
            )}

            {/* Achievements */}
            <div className="mb-8">
              <p className="gh-sub-label mb-3">Achievements</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {achievements.map((a,i)=>(
                  <motion.div key={a.label}
                    initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
                    viewport={{once:true}} transition={{duration:.35,delay:i*.05}}>
                    <AchievementBadge {...a}/>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Language bar */}
            {langs.length>0&&<LangBar langs={langs}/>}

            {/* Top repos */}
            {repos.length>0&&(
              <div className="mb-8">
                <p className="gh-sub-label mb-3">Top Repositories</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {repos.map((r,i)=><RepoCard key={r.id} repo={r} i={i}/>)}
                </div>
              </div>
            )}

            {/* Footer link */}
            <div className="flex justify-center">
              <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all active:scale-[.97] group">
                <FontAwesomeIcon icon={faGithub}/>View Full Profile
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs transition-transform group-hover:translate-x-0.5"/>
              </a>
            </div>
          </>
        )}
      </div>

      <style>{`
        .gh-profile-row{display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:1rem;background:var(--bg-surface);border:1px solid var(--border-color);border-radius:18px;padding:1.2rem 1.4rem;margin-bottom:1.5rem}
        .gh-stat-pills{display:flex;gap:.5rem;flex-wrap:wrap;align-items:center}
        .gh-stat-pill{display:flex;flex-direction:column;align-items:center;padding:.5rem .75rem;border-radius:12px;border:1px solid var(--border-color);background:var(--bg-surface-2);min-width:64px;transition:transform .18s ease,border-color .18s ease;cursor:default}
        .gh-stat-pill:hover{transform:translateY(-2px);border-color:var(--c)}
        .gh-stat-icon{font-size:12px;color:var(--c);margin-bottom:3px}
        .gh-stat-val{font-size:1rem;font-weight:800;font-family:var(--font-display);color:var(--text-primary);line-height:1}
        .gh-stat-lbl{font-size:.58rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.05em;margin-top:2px}
        .gh-img-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
        @media(max-width:640px){.gh-img-grid{grid-template-columns:1fr}}
        .gh-img-card{border:1px solid var(--border-color);border-radius:16px;overflow:hidden;background:var(--bg-surface);display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100px}
        .gh-img-fallback{display:flex;flex-direction:column;align-items:center;padding:2rem;text-align:center}
        .gh-sub-label{font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--text-tertiary)}
        /* Achievements */
        .gh-badge{display:flex;align-items:center;gap:.75rem;padding:.8rem 1rem;border-radius:14px;border:1px solid var(--border-color);background:var(--bg-surface);position:relative;overflow:hidden;opacity:.5;filter:grayscale(1);transition:all .2s ease}
        .gh-badge--on{opacity:1;filter:none;border-color:color-mix(in srgb,var(--c) 30%,transparent)}
        .gh-badge--on:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.14)}
        .gh-badge-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--c) 16%,transparent);color:var(--c);font-size:14px;flex-shrink:0}
        .gh-badge-text{display:flex;flex-direction:column;gap:1px;min-width:0}
        .gh-badge-label{font-size:.8rem;font-weight:700;color:var(--text-primary);line-height:1.2}
        .gh-badge-desc{font-size:.68rem;color:var(--text-tertiary);line-height:1.3}
        .gh-badge-glow{position:absolute;top:0;right:0;width:48px;height:48px;border-radius:0 14px 0 48px;background:var(--c);opacity:.07;pointer-events:none}
        /* Repo cards */
        .gh-repo-card{display:flex;flex-direction:column;gap:.4rem;padding:.9rem 1rem;border-radius:14px;border:1px solid var(--border-color);background:var(--bg-surface);text-decoration:none;color:inherit;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;min-height:90px}
        .gh-repo-card:hover{border-color:${ACCENT}55;transform:translateY(-2px);box-shadow:0 6px 22px rgba(0,0,0,.15)}
        .gh-repo-name{font-size:.83rem;font-weight:700;color:var(--text-primary);font-family:var(--font-mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .gh-repo-ext{font-size:10px;color:var(--text-tertiary);margin-top:2px;flex-shrink:0;opacity:0;transition:opacity .15s ease}
        .gh-repo-card:hover .gh-repo-ext{opacity:1}
        .gh-repo-desc{font-size:.76rem;color:var(--text-secondary);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;flex:1}
        .gh-repo-meta{display:flex;align-items:center;gap:.65rem;margin-top:auto;flex-wrap:wrap}
        .gh-repo-lang,.gh-stat-badge{display:inline-flex;align-items:center;gap:4px;font-size:.72rem;color:var(--text-secondary)}
        .gh-lang-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
      `}</style>
    </section>
  )
}
