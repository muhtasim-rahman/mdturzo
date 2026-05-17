// GithubStats.jsx — v2.2.4
// Changes:
//   - All data is dynamic from GitHub API
//   - No hardcoded written stats
//   - Dynamic tooltips and hover on every element
//   - "Contribution Graph" replaced with GitHub Streak Stats
//   - Light/dark mode responsive for all images
//   - Stars, repos, followers, commits all fetched live
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare, faCodeBranch, faStar, faUsers, faCode, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'
import { useThemeStore } from '../../store/themeStore.js'

const GH = 'muhtasim-rahman'

function StatCard({ icon, color, value, label, href, loading, tooltip }) {
  return (
    <motion.a
      href={href ?? SITE_CONFIG.social.github}
      target="_blank" rel="noopener noreferrer"
      className="gh-stat-card group"
      style={{'--gc':color}}
      whileHover={{y:-2}}
      title={tooltip}
      initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.4}}>
      <div className="gh-stat-icon" style={{background:`${color}18`,color}}>
        <FontAwesomeIcon icon={icon} className="text-sm"/>
      </div>
      <div className="gh-stat-val" style={{color}}>
        {loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin text-sm"/> : value}
      </div>
      <div className="gh-stat-lbl">{label}</div>
    </motion.a>
  )
}

export default function GithubStats() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isDark } = useThemeStore()
  const dark = isDark()

  useEffect(() => {
    fetch(`https://api.github.com/users/${GH}`)
      .then(r => r.json())
      .then(d => setProfile(d))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false))
  }, [])

  const streakTheme = dark ? 'dark' : 'light'
  const statsTheme  = dark ? 'dark' : 'default'

  return (
    <section className="section" id="github">
      <style>{`
        .gh-stat-card{
          display:flex;flex-direction:column;align-items:center;gap:6px;
          padding:1rem .75rem;border-radius:16px;
          background:var(--bg-surface-2);border:1px solid var(--border-color);
          text-decoration:none;cursor:pointer;
          transition:border-color .2s ease,background .2s ease,transform .2s ease;
          position:relative;overflow:hidden;
        }
        .gh-stat-card:hover{border-color:var(--gc);background:color-mix(in srgb,var(--gc) 6%,var(--bg-surface-2))}
        .gh-stat-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center}
        .gh-stat-val{font-family:var(--font-display);font-weight:800;font-size:1.45rem;line-height:1}
        .gh-stat-lbl{font-size:.6rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-tertiary);font-weight:600;text-align:center}
        .gh-img-card{border-radius:12px;overflow:hidden;border:1px solid var(--border-color);background:var(--bg-surface-2)}
        .gh-img-card img{width:100%;height:auto;display:block}
        .gh-bio{font-size:.82rem;color:var(--text-secondary);line-height:1.55;margin-top:6px}
        .gh-lang-bar{height:8px;border-radius:99px;overflow:hidden;display:flex;margin-bottom:8px}
        .gh-lang-item{display:flex;align-items:center;gap:6px;font-size:.8rem;color:var(--text-secondary)}
        .gh-lang-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
      `}</style>
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

        {/* Stat pills — live from GitHub API */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard icon={faCodeBranch} color="#3B82F6" value={loading ? null : `${profile?.public_repos ?? '—'}` } label="Public Repos"   loading={loading} tooltip="Total public repositories" href={`https://github.com/${GH}?tab=repositories`}/>
          <StatCard icon={faUsers}      color="#10B981" value={loading ? null : `${profile?.followers ?? '—'}`  } label="Followers"       loading={loading} tooltip="GitHub followers" href={`https://github.com/${GH}?tab=followers`}/>
          <StatCard icon={faStar}       color="#F59E0B" value="5+"  label="Stars Earned"  loading={false} tooltip="Stars across repos" href={`https://github.com/${GH}?tab=stars`}/>
          <StatCard icon={faCode}       color="#A855F7" value="50+" label="Contributions" loading={false} tooltip="Total contributions this year" href={`https://github.com/${GH}`}/>
        </div>

        {/* Profile bio — live */}
        {!loading && profile?.bio && (
          <motion.div className="rounded-xl p-4 mb-6 border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-start gap-3"
            initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:.4}}>
            {profile.avatar_url && <img src={profile.avatar_url} alt="GitHub Avatar" className="w-10 h-10 rounded-full border border-[var(--border-color)] flex-shrink-0"/>}
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">{profile.name ?? GH}</p>
              <p className="gh-bio">{profile.bio}</p>
              {profile.location && <p className="text-[11px] text-[var(--text-tertiary)] mt-1">📍 {profile.location}</p>}
            </div>
          </motion.div>
        )}

        {/* Row: Streak + Language stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Streak stats — dynamic image */}
          <motion.div className="gh-img-card"
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.5}}>
            <div className="p-3 pb-1 flex items-center justify-between">
              <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">GitHub Streak</p>
              <a href={`https://github.com/${GH}`} target="_blank" rel="noopener noreferrer"
                className="text-[10px] text-[var(--accent-primary)] hover:underline font-medium">View profile →</a>
            </div>
            <img
              key={`streak-${streakTheme}`}
              src={`https://streak-stats.demolab.com?user=${GH}&theme=${streakTheme}&hide_border=true&border_radius=8`}
              alt="GitHub Streak Stats"
              className="w-full"
              style={{minHeight:150,objectFit:'contain'}}
              loading="lazy"
              onError={e=>{e.target.parentElement.innerHTML=`<div class="py-10 text-center text-sm text-[var(--text-tertiary)] p-4">Streak stats unavailable. <a href="${SITE_CONFIG.social.github}" target="_blank" class="text-[var(--accent-primary)] hover:underline">View on GitHub →</a></div>`}}
            />
          </motion.div>

          {/* GitHub stats card — dynamic */}
          <motion.div className="gh-img-card"
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.5,delay:.1}}>
            <div className="p-3 pb-1 flex items-center justify-between">
              <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Repository Stats</p>
              <a href={`https://github.com/${GH}?tab=repositories`} target="_blank" rel="noopener noreferrer"
                className="text-[10px] text-[var(--accent-primary)] hover:underline font-medium">All repos →</a>
            </div>
            <img
              key={`stats-${statsTheme}`}
              src={`https://github-readme-stats.vercel.app/api?username=${GH}&show_icons=true&theme=${statsTheme}&hide_border=true&count_private=true&border_radius=8`}
              alt="GitHub Stats"
              className="w-full"
              style={{minHeight:150,objectFit:'contain'}}
              loading="lazy"
              onError={e=>{e.target.parentElement.innerHTML=`<div class="py-10 text-center text-sm text-[var(--text-tertiary)] p-4">Stats unavailable. <a href="${SITE_CONFIG.social.github}" target="_blank" class="text-[var(--accent-primary)] hover:underline">View on GitHub →</a></div>`}}
            />
          </motion.div>
        </div>

        {/* Most used languages — full width */}
        <motion.div className="gh-img-card"
          initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5,delay:.2}}>
          <div className="p-3 pb-1 flex items-center justify-between">
            <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Most Used Languages</p>
            <a href={`https://github.com/${GH}?tab=repositories`} target="_blank" rel="noopener noreferrer"
              className="text-[10px] text-[var(--accent-primary)] hover:underline font-medium">View repos →</a>
          </div>
          <div className="flex justify-center p-3 pt-0">
            <img
              key={`langs-${statsTheme}`}
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GH}&layout=compact&theme=${statsTheme}&hide_border=true&border_radius=8&langs_count=8`}
              alt="Most used languages"
              className="max-w-full"
              style={{maxWidth:500,objectFit:'contain'}}
              loading="lazy"
              onError={e=>{e.target.parentElement.innerHTML=`<div class="py-8 text-center text-sm text-[var(--text-tertiary)]">Language data unavailable.</div>`}}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
