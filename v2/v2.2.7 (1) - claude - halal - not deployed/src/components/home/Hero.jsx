// Hero.jsx — v2.2.7
// CHANGES from v2.2.6:
//   • ResizeObserver removed (caused infinite height feedback loop)
//   • Floating tech icons REMOVED entirely
//   • 12+ CSS breakpoints for precise responsive sizing/positioning
//   • Minimal design: subtle dot-grid texture, rising particles, bottom gradient
//   • Image sizing via pure CSS — never grows infinitely
//   • image container: fixed aspect-ratio column, height bound to viewport

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faFacebook, faInstagram, faYoutube, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faDownload, faFolderOpen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

const ROLES = ['Web Developer','UI/UX Designer','Graphic Designer','Video Editor']
function useTyping() {
  const [text, setText] = useState('')
  const r=useRef(0), c=useRef(0), del=useRef(false)
  useEffect(()=>{
    let t
    const tick=()=>{
      const cur=ROLES[r.current]
      if(!del.current){setText(cur.slice(0,++c.current));if(c.current===cur.length){del.current=true;t=setTimeout(tick,2200)}else t=setTimeout(tick,110)}
      else{setText(cur.slice(0,--c.current));if(c.current===0){del.current=false;r.current=(r.current+1)%ROLES.length;t=setTimeout(tick,320)}else t=setTimeout(tick,44)}
    }
    t=setTimeout(tick,900)
    return()=>clearTimeout(t)
  },[])
  return text
}

function useCountUp(target,inView){
  const [n,setN]=useState(0)
  useEffect(()=>{
    if(!inView)return
    const num=parseInt(target,10),start=performance.now(),dur=1100
    const frame=now=>{const t=Math.min((now-start)/dur,1),e=t<.5?2*t*t:-1+(4-2*t)*t;setN(Math.round(e*num));if(t<1)requestAnimationFrame(frame);else setN(num)}
    requestAnimationFrame(frame)
  },[inView,target])
  return n
}

const SOCIALS=[
  {icon:faGithub,    href:SITE_CONFIG.social.github,    label:'GitHub',    h:'muhtasim-rahman'},
  {icon:faLinkedin,  href:SITE_CONFIG.social.linkedin,  label:'LinkedIn',  h:'mdturzo999'},
  {icon:faFacebook,  href:SITE_CONFIG.social.facebook,  label:'Facebook',  h:'mdturzo999'},
  {icon:faInstagram, href:SITE_CONFIG.social.instagram, label:'Instagram', h:'@mdturzo999'},
  {icon:faYoutube,   href:SITE_CONFIG.social.youtube,   label:'YouTube',   h:'@mdturzo999'},
  {icon:faTelegram,  href:SITE_CONFIG.social.telegram,  label:'Telegram',  h:'@mdturzo16'},
]

// Rising particles — minimal count, subtle
const PARTS = Array.from({length:36},(_,i)=>{
  const chars='·✦✧⋆◦⊹'
  const ch=chars[i%chars.length]
  const op=(0.15+Math.random()*.28).toFixed(2)
  return {key:i,ch,style:{
    left:`${(3+Math.random()*94).toFixed(1)}%`,
    '--pd':`${(9+Math.random()*14).toFixed(1)}s`,
    '--pp':`${(Math.random()*22).toFixed(1)}s`,
    '--po':op,
    '--ps':`${(.45+Math.random()*.3).toFixed(2)}rem`,
    '--px':`${((Math.random()-.5)*60).toFixed(0)}px`,
  }}
})

// Subtle stars
const STARS=Array.from({length:44},(_,i)=>{
  const sz=Math.random()<.6?1:2
  return {key:i,style:{width:sz,height:sz,left:`${(Math.random()*100).toFixed(1)}%`,top:`${(Math.random()*100).toFixed(1)}%`,'--dur':`${(2+Math.random()*5).toFixed(1)}s`,'--del':`${(Math.random()*8).toFixed(1)}s`,'--op-lo':(.03+Math.random()*.08).toFixed(2),'--op-hi':(.15+Math.random()*.3).toFixed(2)}}
})

function StatItem({value,label,sep,inView}){
  const count=useCountUp(parseInt(value,10),inView)
  return(<>{sep&&<div className="h-sep"/>}<div className="h-stat"><div className="h-stat-n"><span>{count}</span><FontAwesomeIcon icon={faPlus} className="h-stat-p"/></div><span className="h-stat-l">{label}</span></div></>)
}

export default function Hero({settings,settingsLoading}){
  const typed=useTyping()
  const sRef=useRef(null)
  const [inView,setInView]=useState(false)
  const cvEnabled=settings?.cvEnabled??false
  const cvUrl=settings?.cvUrl??'#'
  const yDev=settings?.statsYearsDev??3
  const yDes=settings?.statsYearsDesign??6
  const proj=settings?.statsProjects??16

  useEffect(()=>{
    if(!sRef.current)return
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setInView(true)},{threshold:.2})
    obs.observe(sRef.current)
    return()=>obs.disconnect()
  },[])

  return(<>
<style>{`
/* ─── Hero wrapper ─────────────────────────────────────────── */
.hero{
  position:relative;
  /* v2.2.7: height is 100dvh with no min causing infinite growth */
  height:100dvh;
  min-height:600px;
  max-height:1000px;
  display:flex;align-items:center;
  overflow:hidden;
}

/* ─── Backgrounds ──────────────────────────────────────────── */
.h-bg-grid{
  position:absolute;inset:0;z-index:0;pointer-events:none;
  background-image:radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px);
  background-size:24px 24px;
  mask-image:radial-gradient(ellipse 90% 80% at 50% 30%,black 10%,transparent 85%);
  animation:hbg 36s linear infinite;
}
[data-theme=light] .h-bg-grid{background-image:radial-gradient(rgba(37,99,235,.06) 1px,transparent 1px)}
@keyframes hbg{to{background-position:24px 24px}}
.h-orb{position:absolute;z-index:0;pointer-events:none;border-radius:50%;filter:blur(70px);animation:horb var(--dur,20s) ease-in-out var(--del,0s) infinite alternate}
.h-orb-1{width:480px;height:480px;background:radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%);top:-100px;left:-80px;--dur:22s;--del:0s}
.h-orb-2{width:320px;height:320px;background:radial-gradient(circle,rgba(99,102,241,.12) 0%,transparent 70%);bottom:-60px;right:5%;--dur:17s;--del:5s}
[data-theme=light] .h-orb-1{background:radial-gradient(circle,rgba(37,99,235,.07) 0%,transparent 70%)}
[data-theme=light] .h-orb-2{background:radial-gradient(circle,rgba(99,102,241,.05) 0%,transparent 70%)}
@keyframes horb{0%{transform:translate(0,0) scale(1)}50%{transform:translate(24px,-18px) scale(1.08)}100%{transform:translate(-16px,20px) scale(.94)}}
.h-stars{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.h-star{position:absolute;border-radius:50%;background:rgba(255,255,255,.7);animation:hstar var(--dur,3s) ease-in-out var(--del,0s) infinite}
[data-theme=light] .h-star{background:#3B82F6;opacity:.12}
@keyframes hstar{0%,100%{opacity:var(--op-lo,.08);transform:scale(1)}50%{opacity:var(--op-hi,.35);transform:scale(1.8)}}
.h-parts{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.h-part{position:absolute;bottom:-10px;font-size:var(--ps,.6rem);color:rgba(99,102,241,var(--po,.3));line-height:1;user-select:none;animation:hpart var(--pd,10s) ease-in var(--pp,0s) infinite;opacity:0}
[data-theme=light] .h-part{color:rgba(37,99,235,var(--po,.2))}
@keyframes hpart{0%{opacity:0;transform:translateY(0) translateX(0) scale(1)}8%{opacity:var(--po,.3)}85%{opacity:calc(var(--po,.3)*.1)}100%{opacity:0;transform:translateY(-90vh) translateX(var(--px,20px)) scale(.3)}}

/* Bottom gradient — dark to page bg */
.h-grad{
  position:absolute;bottom:0;left:0;right:0;
  height:40%;pointer-events:none;z-index:3;
  background:linear-gradient(to top,var(--bg-page) 0%,rgba(2,6,23,.85) 28%,rgba(2,6,23,.35) 55%,transparent 100%);
}
[data-theme=light] .h-grad{background:linear-gradient(to top,var(--bg-page) 0%,rgba(248,250,252,.85) 28%,rgba(248,250,252,.3) 55%,transparent 100%)}

/* ─── Inner layout ─────────────────────────────────────────── */
.h-inner{
  position:relative;z-index:5;
  display:grid;
  /* Two-col: left content wider, right image narrower */
  grid-template-columns:1.15fr 0.85fr;
  gap:clamp(.75rem,2.5vw,2rem);
  align-items:center;
  width:100%;
  height:100%;
  max-width:1280px;margin-inline:auto;
  padding-inline:clamp(1rem,4vw,2rem);
  padding-block:clamp(1.5rem,4vh,3rem);
}

/* ─── LEFT CONTENT ──────────────────────────────────────────── */
.h-content{
  display:flex;flex-direction:column;justify-content:center;
  gap:clamp(.55rem,1.4vh,1rem);
  position:relative;z-index:6;
  min-width:0;
}

.h-greet{display:inline-flex;align-items:center;gap:.4rem;width:fit-content;font-size:.82rem}
.h-greet-salam{font-family:'Georgia',serif;font-style:italic;color:#F59E0B;font-weight:600}
.h-greet-rest{color:var(--text-primary);font-family:var(--font-mono);font-weight:500;opacity:.85}

.h-name{
  font-size:clamp(2rem,4.5vw,4.2rem);
  font-weight:800;line-height:1.03;letter-spacing:-.03em;
  font-family:var(--font-display);color:var(--text-primary);
}
.h-name-line{display:block;overflow:hidden;line-height:1.18}
.h-name-in{display:inline-block;transform:translateY(106%);animation:hname .72s cubic-bezier(.16,1,.3,1) var(--d,0ms) forwards}
@keyframes hname{to{transform:translateY(0)}}
.h-name-acc{color:var(--accent-primary)}
.h-name-nick{font-size:.28em;font-weight:500;color:var(--text-tertiary);font-family:var(--font-mono);letter-spacing:.03em;vertical-align:middle;margin-left:.5em;opacity:0;animation:hfade .5s ease 1.1s forwards}
@keyframes hfade{to{opacity:1}}

.h-role{font-size:clamp(.84rem,1.3vw,1.05rem);color:var(--text-secondary);font-weight:500;min-height:1.6em;display:flex;align-items:center;gap:2px}
.h-role-t{color:var(--text-primary);font-weight:600}
.h-cursor{color:var(--accent-primary);animation:hblink .7s step-end infinite}
@keyframes hblink{0%,100%{opacity:1}50%{opacity:0}}

.h-bio{font-size:clamp(.8rem,1.05vw,.92rem);color:var(--text-secondary);line-height:1.72;max-width:430px}

.h-cta{display:flex;gap:.65rem;flex-wrap:wrap}
.h-btn{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;padding:.55rem 1.2rem;font-size:.84rem;font-weight:600;border-radius:.75rem;border:2px solid transparent;cursor:pointer;transition:all .2s ease;white-space:nowrap;text-decoration:none;position:relative;overflow:hidden}
.h-btn-p{background:var(--accent-primary);color:#fff;border-color:var(--accent-primary);box-shadow:0 2px 10px rgba(37,99,235,.26)}
.h-btn-p:hover{background:var(--accent-hover);box-shadow:0 5px 18px rgba(37,99,235,.36);transform:translateY(-1px)}
.h-btn-o{background:transparent;color:var(--accent-primary);border-color:var(--accent-primary)}
.h-btn-o:hover{background:var(--accent-light);transform:translateY(-1px)}
.h-btn-p:active,.h-btn-o:active{transform:scale(.96)!important}

.h-socials{display:flex;align-items:center;gap:.4rem;flex-wrap:wrap}
.h-social{width:32px;height:32px;border-radius:.5rem;background:rgba(255,255,255,.05);border:1px solid rgba(148,163,184,.16);display:flex;align-items:center;justify-content:center;color:var(--text-tertiary);font-size:.8rem;text-decoration:none;transition:all .18s ease;backdrop-filter:blur(6px)}
[data-theme=light] .h-social{background:var(--bg-surface);border-color:var(--border-color);color:var(--text-secondary)}
.h-social:hover{background:var(--accent-primary);border-color:var(--accent-primary);color:#fff;transform:translateY(-3px) scale(1.08);box-shadow:0 5px 14px rgba(37,99,235,.28)}

.h-stats{display:flex;align-items:center;gap:1rem;flex-wrap:wrap}
.h-sep{width:1px;height:26px;background:var(--border-color);flex-shrink:0}
.h-stat{display:flex;flex-direction:column;gap:1px}
.h-stat-n{display:flex;align-items:baseline;gap:2px;font-size:clamp(1.1rem,1.9vw,1.4rem);font-weight:800;font-family:var(--font-display);color:var(--text-primary);line-height:1}
.h-stat-p{color:var(--accent-primary);font-size:.62em}
.h-stat-l{font-size:.6rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.06em}

.h-up{opacity:0;animation:hup .6s cubic-bezier(.16,1,.3,1) var(--d,0ms) forwards}
@keyframes hup{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

/* ─── RIGHT IMAGE ───────────────────────────────────────────── */
.h-visual{
  position:relative;z-index:5;
  display:flex;align-items:center;justify-content:flex-end;
  /* v2.2.7: height 100% of grid row, bounded by hero height */
  height:100%;
  min-height:0;
  opacity:0;animation:hvis .85s cubic-bezier(.16,1,.3,1) .15s forwards;
}
@keyframes hvis{from{opacity:0;transform:translateX(18px) scale(.95)}to{opacity:1;transform:none}}

/* v2.2.7: Image container
   - No ResizeObserver — pure CSS sizing
   - height is clamped: never exceeds (100dvh - navbar - padding)
   - width is auto so no distortion */
.h-img-wrap{
  position:relative;
  /* width auto so no squeezing */
  width:auto;
  /* height: fills column up to 76% of viewport, respects its own content */
  height:clamp(340px, calc(100dvh - var(--navbar-h) - 4rem), 680px);
  max-height:100%;
  flex-shrink:0;
  align-self:flex-end;
}
.h-photo{
  height:100%;
  width:auto;
  max-width:100%;
  object-fit:contain;
  object-position:bottom center;
  display:block;
  filter:drop-shadow(0 12px 40px rgba(0,0,0,.22));
}
[data-theme=dark] .h-photo{filter:drop-shadow(0 12px 44px rgba(0,0,0,.5))}

/* ─── SCROLL HINT ──────────────────────────────────────────── */
.h-scroll{
  position:absolute;bottom:1.4rem;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:4px;
  background:none;border:none;color:var(--text-tertiary);
  cursor:pointer;z-index:8;transition:color .18s ease;padding:6px 10px;
}
.h-scroll:hover{color:var(--accent-primary)}
.h-scroll-t{width:20px;height:32px;border:1.5px solid currentColor;border-radius:10px;display:flex;align-items:flex-start;justify-content:center;padding:3px;opacity:.6}
.h-scroll-d{width:3px;height:7px;background:currentColor;border-radius:3px;animation:hscroll 2s cubic-bezier(.42,0,.58,1) infinite}
@keyframes hscroll{0%{transform:translateY(0);opacity:1}60%{transform:translateY(10px);opacity:.2}61%{transform:translateY(0);opacity:0}66%{opacity:0}67%{opacity:1}}
.h-scroll-lbl{font-size:.52rem;font-family:var(--font-mono);letter-spacing:.14em;text-transform:uppercase;opacity:.5}

/* ═══════════════════════════════════════════════════════════
   v2.2.7: 12+ BREAKPOINTS — precise responsive control
   Goal: image + content always fit viewport, never overflow
═══════════════════════════════════════════════════════════ */

/* 1920px+ — extra wide */
@media(min-width:1920px){
  .h-inner{max-width:1440px}
  .h-img-wrap{height:clamp(500px,70dvh,780px)}
}
/* 1440px — large desktop */
@media(min-width:1440px) and (max-width:1919px){
  .h-img-wrap{height:clamp(460px,68dvh,720px)}
}
/* 1280px — standard desktop */
@media(min-width:1280px) and (max-width:1439px){
  .h-img-wrap{height:clamp(420px,66dvh,680px)}
}
/* 1024px — laptop */
@media(min-width:1024px) and (max-width:1279px){
  .h-name{font-size:clamp(1.85rem,3.8vw,3.2rem)}
  .h-img-wrap{height:clamp(360px,62dvh,620px)}
}
/* 900px–1023px — small laptop / large tablet landscape */
@media(min-width:900px) and (max-width:1023px){
  .h-inner{grid-template-columns:1.1fr 0.9fr;gap:.75rem;padding-inline:1.25rem}
  .h-name{font-size:clamp(1.7rem,3.5vw,2.8rem)}
  .h-img-wrap{height:clamp(300px,58dvh,560px)}
}
/* 768px–899px — tablet landscape */
@media(min-width:768px) and (max-width:899px){
  .hero{height:auto;min-height:100dvh}
  .h-inner{grid-template-columns:1fr;padding-block:5rem 3rem;gap:1.5rem;text-align:center;align-items:start}
  .h-content{align-items:center}
  .h-visual{justify-content:center;height:auto}
  .h-img-wrap{height:clamp(220px,44dvh,380px);align-self:auto}
  .h-photo{width:auto;height:100%;max-width:280px}
  .h-bio{max-width:70%;text-align:center}
  .h-cta,.h-socials,.h-stats,.h-greet{justify-content:center}
  .h-scroll{display:none}
}
/* 640px–767px — large mobile */
@media(min-width:640px) and (max-width:767px){
  .hero{height:auto;min-height:100dvh}
  .h-inner{grid-template-columns:1fr;padding-block:4.5rem 2.5rem;gap:1.25rem;text-align:center;align-items:start}
  .h-content{align-items:center}
  .h-visual{justify-content:center;height:auto}
  .h-img-wrap{height:clamp(200px,40dvh,340px);align-self:auto}
  .h-photo{height:100%;max-width:240px}
  .h-bio{max-width:80%;text-align:center}
  .h-cta,.h-socials,.h-stats,.h-greet{justify-content:center}
  .h-scroll{display:none}
}
/* 480px–639px — medium mobile */
@media(min-width:480px) and (max-width:639px){
  .hero{height:auto;min-height:100dvh}
  .h-inner{grid-template-columns:1fr;padding-block:4rem 2.5rem;gap:1rem;text-align:center;align-items:start}
  .h-content{align-items:center}
  .h-visual{justify-content:center;height:auto}
  .h-img-wrap{height:clamp(180px,36dvh,300px);align-self:auto}
  .h-photo{height:100%;max-width:210px}
  .h-bio{max-width:86%}
  .h-cta,.h-socials,.h-stats,.h-greet{justify-content:center}
  .h-scroll{display:none}
}
/* 414px–479px — iPhone Plus/Pro Max */
@media(min-width:414px) and (max-width:479px){
  .hero{height:auto;min-height:100dvh}
  .h-inner{grid-template-columns:1fr;padding-block:3.75rem 2rem;gap:.9rem;text-align:center}
  .h-content{align-items:center}
  .h-visual{justify-content:center;height:auto}
  .h-img-wrap{height:clamp(160px,32dvh,260px)}
  .h-photo{height:100%;max-width:190px}
  .h-bio{max-width:90%}
  .h-cta,.h-socials,.h-stats,.h-greet{justify-content:center}
  .h-scroll{display:none}
}
/* 375px–413px — iPhone standard */
@media(min-width:375px) and (max-width:413px){
  .hero{height:auto;min-height:100dvh}
  .h-inner{grid-template-columns:1fr;padding-block:3.5rem 2rem;gap:.85rem;text-align:center}
  .h-content{align-items:center}
  .h-visual{justify-content:center;height:auto}
  .h-img-wrap{height:clamp(145px,30dvh,240px)}
  .h-photo{height:100%;max-width:175px}
  .h-name{font-size:clamp(1.7rem,9vw,2.4rem)}
  .h-bio{max-width:92%}
  .h-cta,.h-socials,.h-stats,.h-greet{justify-content:center}
  .h-scroll{display:none}
}
/* ≤374px — small mobile */
@media(max-width:374px){
  .hero{height:auto;min-height:100dvh}
  .h-inner{grid-template-columns:1fr;padding-block:3.25rem 1.75rem;gap:.75rem;text-align:center}
  .h-content{align-items:center}
  .h-visual{justify-content:center;height:auto}
  .h-img-wrap{height:clamp(130px,28dvh,210px)}
  .h-photo{height:100%;max-width:155px}
  .h-name{font-size:clamp(1.55rem,8.5vw,2.1rem)}
  .h-bio{max-width:94%;font-size:.78rem}
  .h-cta,.h-socials,.h-stats,.h-greet{justify-content:center}
  .h-scroll{display:none}
}
/* Portrait phones: image goes above content, slightly bigger */
@media(max-width:767px) and (orientation:portrait){
  .h-visual{order:-1}
  .h-content{order:1}
}
/* Short screens (landscape phones) — compact mode */
@media(max-height:500px) and (max-width:900px){
  .hero{height:auto;min-height:100dvh}
  .h-inner{grid-template-columns:1fr 1fr;gap:.75rem;align-items:center;padding-block:var(--navbar-h) 1rem}
  .h-visual{height:auto;justify-content:center}
  .h-img-wrap{height:clamp(120px,72vh,240px);align-self:auto}
  .h-photo{height:100%;max-width:180px}
  .h-bio{display:none}
  .h-scroll{display:none}
}
`}</style>

    <section className="hero" id="hero" aria-label="Introduction">
      <div className="h-bg-grid" aria-hidden="true"/>
      <div className="h-stars"  aria-hidden="true">{STARS.map(s=><span key={s.key} className="h-star" style={s.style} aria-hidden="true"/>)}</div>
      <div className="h-orb h-orb-1" aria-hidden="true"/>
      <div className="h-orb h-orb-2" aria-hidden="true"/>
      <div className="h-parts"  aria-hidden="true">{PARTS.map(p=><span key={p.key} className="h-part" style={p.style} aria-hidden="true">{p.ch}</span>)}</div>
      <div className="h-grad"   aria-hidden="true"/>

      <div className="h-inner">
        {/* LEFT */}
        <div className="h-content">
          <div className="h-greet h-up" style={{'--d':'0ms'}}>
            <span className="h-greet-salam">Assalamu Alaikum</span>
            <span style={{fontSize:'1.1em',verticalAlign:'middle',color:'#f59e0b',display:'inline-flex',alignItems:'center'}} className="material-symbols-outlined" aria-hidden="true">waving_hand</span>
            <span className="h-greet-rest">I am —</span>
          </div>

          <h1 className="h-name" aria-label="Muhtasim Rahman (Turzo)">
            <span className="h-name-line"><span className="h-name-in" style={{'--d':'70ms'}}>Muhtasim</span></span>
            <span className="h-name-line"><span className="h-name-in h-name-acc" style={{'--d':'185ms'}}>Rahman<span className="h-name-nick">(Turzo)</span></span></span>
          </h1>

          <div className="h-role h-up" style={{'--d':'300ms'}} aria-live="polite">
            <span className="h-role-t">{typed}</span>
            <span className="h-cursor" aria-hidden="true">|</span>
          </div>

          <p className="h-bio h-up" style={{'--d':'400ms'}}>
            Self-taught developer &amp; designer from Bangladesh — building clean,
            fast and meaningful digital experiences.
          </p>

          <div className="h-cta h-up" style={{'--d':'500ms'}}>
            <Link to="/projects" className="h-btn h-btn-p">
              <FontAwesomeIcon icon={faFolderOpen} aria-hidden="true"/> View Projects
            </Link>
            {cvEnabled&&cvUrl&&cvUrl!=='#'
              ? <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="h-btn h-btn-o"><FontAwesomeIcon icon={faDownload} aria-hidden="true"/> Download CV</a>
              : <span className="h-btn h-btn-o" style={{opacity:.6,cursor:'default'}}><FontAwesomeIcon icon={faDownload} aria-hidden="true"/> Download CV</span>
            }
          </div>

          <div className="h-socials h-up" style={{'--d':'590ms'}} aria-label="Social links">
            {SOCIALS.map(({icon,href,label,h})=>(
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                 className="h-social" aria-label={`${label}: ${h}`}>
                <FontAwesomeIcon icon={icon} aria-hidden="true"/>
              </a>
            ))}
          </div>

          <div ref={sRef} className="h-stats h-up" style={{'--d':'680ms'}} aria-label="Quick stats">
            <StatItem value={yDev}  label="Yrs Dev"    sep={false} inView={inView}/>
            <StatItem value={yDes}  label="Yrs Design" sep={true}  inView={inView}/>
            <StatItem value={proj}  label="Projects"   sep={true}  inView={inView}/>
          </div>
        </div>

        {/* RIGHT — pure CSS sizing, no JS height */}
        <div className="h-visual" aria-hidden="true">
          <div className="h-img-wrap">
            <img src="/hero.webp" alt="Muhtasim Rahman" className="h-photo"
                 loading="eager" fetchPriority="high"
                 draggable="false"/>
          </div>
        </div>
      </div>

      <button className="h-scroll" onClick={()=>window.scrollBy({top:window.innerHeight*.82,behavior:'smooth'})}
              aria-label="Scroll down" type="button">
        <div className="h-scroll-t"><div className="h-scroll-d"/></div>
        <span className="h-scroll-lbl">Scroll</span>
      </button>
    </section>
  </>)
}
