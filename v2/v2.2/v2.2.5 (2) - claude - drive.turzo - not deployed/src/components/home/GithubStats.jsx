// GithubStats.jsx — v2.2.5 (redesigned: 3-panel layout)
// Layout: top row = 2 cols (streak + language breakdown), bottom row = full-width graph
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare, faFire, faCodeBranch, faStar, faUsers, faCode, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

const GH = 'muhtasim-rahman'

const STATS = [
  { icon:faCodeBranch, color:'#3B82F6', value:'16+', label:'Repos'        },
  { icon:faCircleDot,  color:'#10B981', value:'50+', label:'Contributions' },
  { icon:faStar,       color:'#F59E0B', value:'5+',  label:'Stars'        },
  { icon:faUsers,      color:'#EC4899', value:'10+', label:'Followers'    },
]

const LANGS = [
  { name:'HTML/CSS', pct:42, color:'#E34C26' },
  { name:'JavaScript', pct:28, color:'#F7DF1E' },
  { name:'Python', pct:14, color:'#3776AB' },
  { name:'React/JSX', pct:11, color:'#61DAFB' },
  { name:'Other', pct:5, color:'#64748B' },
]

const STREAK_DAYS = [
  {label:'Sun',commits:2},{label:'Mon',commits:5},{label:'Tue',commits:3},
  {label:'Wed',commits:8},{label:'Thu',commits:4},{label:'Fri',commits:6},{label:'Sat',commits:1},
]
const MAX_COMMITS = Math.max(...STREAK_DAYS.map(d=>d.commits))

function ActivityBar({ day, commits, max, i }) {
  const pct = max > 0 ? (commits/max)*100 : 0
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      <motion.div className="w-full rounded-t-md relative overflow-hidden"
        style={{height:'64px',background:'var(--bg-surface-3)'}}>
        <motion.div className="absolute bottom-0 left-0 right-0 rounded-t-md"
          style={{background:'linear-gradient(to top,#3B82F6,#60A5FA)'}}
          initial={{height:0}} whileInView={{height:`${pct}%`}} viewport={{once:true}}
          transition={{duration:.6,delay:.05+i*.06,ease:[.16,1,.3,1]}}/>
        {commits > 0 && (
          <motion.span className="absolute top-1 left-0 right-0 text-center text-[10px] font-bold text-white"
            initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.4+i*.06}}>
            {commits}
          </motion.span>
        )}
      </motion.div>
      <span className="text-[10px] text-[var(--text-tertiary)]">{day}</span>
    </div>
  )
}

export default function GithubStats() {
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

        {/* Row 1: 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          {/* Panel A — Weekly Activity + mini stats */}
          <motion.div className="card p-5 flex flex-col gap-5"
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.5}}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faFire} className="text-orange-400 text-sm"/>
                <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Weekly Commits</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-light)] text-[var(--accent-primary)] font-semibold">This week</span>
            </div>
            {/* Bar chart */}
            <div className="flex items-end gap-1.5">
              {STREAK_DAYS.map((d,i)=><ActivityBar key={d.label} day={d.label} commits={d.commits} max={MAX_COMMITS} i={i}/>)}
            </div>
            {/* Mini stat row */}
            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-[var(--border-color)]">
              {STATS.map((s,i)=>(
                <motion.div key={s.label} className="flex flex-col items-center gap-1"
                  initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.1+i*.06}}>
                  <FontAwesomeIcon icon={s.icon} style={{color:s.color}} className="text-xs"/>
                  <span className="text-sm font-extrabold font-display" style={{color:s.color}}>{s.value}</span>
                  <span className="text-[9px] text-[var(--text-tertiary)] text-center leading-tight">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Panel B — Language breakdown */}
          <motion.div className="card p-5 flex flex-col gap-4"
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.5,delay:.1}}>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCode} className="text-[var(--accent-primary)] text-sm"/>
              <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Language Breakdown</p>
            </div>

            {/* Stacked bar */}
            <div className="h-3 rounded-full overflow-hidden flex">
              {LANGS.map(l=>(
                <motion.div key={l.name} style={{background:l.color,width:`${l.pct}%`}}
                  initial={{width:0}} whileInView={{width:`${l.pct}%`}} viewport={{once:true}}
                  transition={{duration:.65,delay:.2}}/>
              ))}
            </div>

            {/* Legend */}
            <div className="space-y-2.5">
              {LANGS.map((l,i)=>(
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
              ✦ Estimated from public repos. Updated manually.
            </p>
          </motion.div>
        </div>

        {/* Row 2: Contribution graph — full width */}
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
              className="w-full min-w-[600px] rounded-lg"
              style={{filter:'var(--gh-chart-filter,none)'}}
              loading="lazy"
              onError={e=>{
                e.target.parentElement.innerHTML=`<div class="py-8 text-center text-sm text-[var(--text-tertiary)]">
                  Contribution graph unavailable. <a href="${SITE_CONFIG.social.github}" target="_blank" rel="noopener noreferrer" class="text-[var(--accent-primary)] hover:underline">View on GitHub →</a>
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
