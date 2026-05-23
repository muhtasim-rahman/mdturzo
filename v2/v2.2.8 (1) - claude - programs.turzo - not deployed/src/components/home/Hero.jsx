// Hero.jsx -- v2.2.8
// CHANGES:
//   * Large screen .himg-frame: bg, border, box-shadow, top-bar (::before) removed
//     Image floats with transparent frame; bottom-blend (::after) kept
//   * .himg-box heights increased ~35px on all large-screen breakpoints
//   * Available-for-hire badge REMOVED
//   * Name responsiveness: tablet (480-899) = single line "Muhtasim Rahman (Turzo)"
//     Mobile (<480) = "Muhtasim Rahman" line 1, "(Turzo)" smaller on line 2
//   * Tablet/mobile circular frame: accent-colored ring (alt color)

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faFacebook, faInstagram, faYoutube, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faDownload, faFolderOpen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

const ROLES = ['Web Developer', 'UI/UX Designer', 'Graphic Designer', 'Video Editor']
function useTyping() {
  const [text, setText] = useState('')
  const r = useRef(0), c = useRef(0), del = useRef(false)
  useEffect(() => {
    let t
    const tick = () => {
      const cur = ROLES[r.current]
      if (!del.current) {
        setText(cur.slice(0, ++c.current))
        if (c.current === cur.length) { del.current = true; t = setTimeout(tick, 2200) }
        else t = setTimeout(tick, 110)
      } else {
        setText(cur.slice(0, --c.current))
        if (c.current === 0) { del.current = false; r.current = (r.current+1)%ROLES.length; t = setTimeout(tick, 320) }
        else t = setTimeout(tick, 44)
      }
    }
    t = setTimeout(tick, 900)
    return () => clearTimeout(t)
  }, [])
  return text
}

function useCountUp(target, inView) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const num = parseInt(target, 10)
    const start = performance.now(), dur = 1100
    const frame = (now) => {
      const t2 = Math.min((now-start)/dur, 1)
      const e = t2<0.5 ? 2*t2*t2 : -1+(4-2*t2)*t2
      setN(Math.round(e*num))
      if (t2 < 1) requestAnimationFrame(frame)
      else setN(num)
    }
    requestAnimationFrame(frame)
  }, [inView, target])
  return n
}

const SOCIALS = [
  { icon:faGithub,    href:SITE_CONFIG.social.github,    label:'GitHub',    handle:'muhtasim-rahman' },
  { icon:faLinkedin,  href:SITE_CONFIG.social.linkedin,  label:'LinkedIn',  handle:'mdturzo999'      },
  { icon:faFacebook,  href:SITE_CONFIG.social.facebook,  label:'Facebook',  handle:'mdturzo999'      },
  { icon:faInstagram, href:SITE_CONFIG.social.instagram, label:'Instagram', handle:'@mdturzo999'     },
  { icon:faYoutube,   href:SITE_CONFIG.social.youtube,   label:'YouTube',   handle:'@mdturzo999'     },
  { icon:faTelegram,  href:SITE_CONFIG.social.telegram,  label:'Telegram',  handle:'@mdturzo16'      },
]

const PT = [
  {ch:'.',  c:'rgba(59,130,246,V)',   l:'rgba(37,99,235,V)',   s:'0.65rem'},
  {ch:'*',  c:'rgba(99,102,241,V)',   l:'rgba(79,70,229,V)',   s:'0.48rem'},
  {ch:'*',  c:'rgba(147,197,253,V)',  l:'rgba(96,165,250,V)',  s:'0.44rem'},
  {ch:'o',  c:'rgba(96,165,250,V)',   l:'rgba(59,130,246,V)',  s:'0.50rem'},
  {ch:'*',  c:'rgba(167,139,250,V)',  l:'rgba(139,92,246,V)',  s:'0.52rem'},
  {ch:'*',  c:'rgba(139,92,246,V)',   l:'rgba(124,58,237,V)',  s:'0.38rem'},
  {ch:'+',  c:'rgba(147,197,253,V)',  l:'rgba(96,165,250,V)',  s:'0.56rem'},
]
const PARTS = Array.from({length:40},(_,i)=>{
  const p=PT[i%PT.length], op=(0.18+Math.random()*0.32).toFixed(2)
  return {key:i,ch:p.ch,style:{left:`${(3+Math.random()*94).toFixed(1)}%`,'--pd':`${(9+Math.random()*14).toFixed(1)}s`,'--pp':`${(Math.random()*20).toFixed(1)}s`,'--po':op,'--ps':p.s,'--px':`${((Math.random()-0.5)*70).toFixed(0)}px`,'--pr':`${((Math.random()-0.5)*260).toFixed(0)}deg`,'--pc':p.c.replace('V',op),'--pc-l':p.l.replace('V',op)}}
})

const STARS = Array.from({length:48},(_,i)=>{
  const sz=Math.random()<0.7?1:Math.random()<0.8?2:3
  return {key:i,style:{width:sz,height:sz,left:`${(Math.random()*100).toFixed(1)}%`,top:`${(Math.random()*100).toFixed(1)}%`,'--dur':`${(2+Math.random()*5).toFixed(1)}s`,'--del':`${(Math.random()*9).toFixed(1)}s`,'--op-lo':(0.03+Math.random()*0.09).toFixed(2),'--op-hi':(0.18+Math.random()*0.42).toFixed(2)}}
})

function StatItem({value,label,sep,inView}){
  const num=parseInt(value,10)
  const count=useCountUp(num,inView)
  return(<>{sep&&<div className="hstat-sep"/>}<div className="hstat"><div className="hstat-num"><span>{count}</span><FontAwesomeIcon icon={faPlus} className="hstat-plus" aria-hidden="true"/></div><span className="hstat-lbl">{label}</span></div></>)
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
    if(!sRef.current) return
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setInView(true)},{threshold:0.2})
    obs.observe(sRef.current)
    return()=>obs.disconnect()
  },[])

  return(
    <>
<style>{`
/* -- Hero wrapper --------------------------------------- */
.hero{
  position:relative;
  min-height:100dvh;
  display:flex;
  align-items:center;
  overflow:hidden;
  background:var(--bg-page);
}

/* -- Subtle dot-grid texture --------------------------- */
.hero-tex{
  position:absolute;inset:0;z-index:0;pointer-events:none;
  background-image:
    radial-gradient(rgba(59,130,246,.055) 1px,transparent 1px),
    radial-gradient(rgba(99,102,241,.03) 1px,transparent 1px);
  background-size:28px 28px,14px 14px;
  background-position:0 0,7px 7px;
  mask-image:radial-gradient(ellipse 100% 100% at 50% 50%,black 20%,transparent 85%);
  animation:hero-tex-d 40s linear infinite;
}
[data-theme=light] .hero-tex{
  background-image:
    radial-gradient(rgba(37,99,235,.07) 1px,transparent 1px),
    radial-gradient(rgba(99,102,241,.04) 1px,transparent 1px);
}
@keyframes hero-tex-d{to{background-position:28px 28px,21px 21px}}

/* -- Bottom-to-top gradient (page bg color) ----------- */
.hero-grad-btm{
  position:absolute;bottom:0;left:0;right:0;height:52%;
  pointer-events:none;z-index:2;
  background:linear-gradient(to top,var(--bg-page) 0%,rgba(2,6,23,.65) 26%,rgba(2,6,23,.22) 52%,transparent 100%);
}
[data-theme=light] .hero-grad-btm{
  background:linear-gradient(to top,var(--bg-page) 0%,rgba(240,244,248,.72) 26%,rgba(240,244,248,.28) 52%,transparent 100%);
}

/* -- Ambient orbs --------------------------------------- */
.hero-orb{position:absolute;z-index:0;pointer-events:none;border-radius:50%;filter:blur(80px);animation:horb-d var(--dur,20s) ease-in-out var(--del,0s) infinite alternate}
.hero-orb-1{width:480px;height:480px;background:radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%);top:-100px;left:-80px;--dur:22s;--del:0s}
.hero-orb-2{width:340px;height:340px;background:radial-gradient(circle,rgba(99,102,241,.12) 0%,transparent 70%);bottom:-60px;right:8%;--dur:17s;--del:5s}
.hero-orb-3{width:240px;height:240px;background:radial-gradient(circle,rgba(59,130,246,.09) 0%,transparent 70%);top:38%;left:30%;--dur:28s;--del:9s}
[data-theme=light] .hero-orb-1{background:radial-gradient(circle,rgba(37,99,235,.06) 0%,transparent 70%)}
[data-theme=light] .hero-orb-2{background:radial-gradient(circle,rgba(99,102,241,.04) 0%,transparent 70%)}
@keyframes horb-d{0%{transform:translate(0,0) scale(1)}33%{transform:translate(24px,-18px) scale(1.06)}66%{transform:translate(-18px,22px) scale(.94)}100%{transform:translate(12px,-8px) scale(1.03)}}

/* -- Star twinkle --------------------------------------- */
.hero-stars{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.hero-star{position:absolute;border-radius:50%;background:rgba(255,255,255,.7);animation:hstar-t var(--dur,3s) ease-in-out var(--del,0s) infinite}
[data-theme=light] .hero-star{background:#3B82F6;opacity:.08}
@keyframes hstar-t{0%,100%{opacity:var(--op-lo,.06);transform:scale(1)}50%{opacity:var(--op-hi,.38);transform:scale(1.7)}}

/* -- Rising particles ----------------------------------- */
.hero-parts{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.hero-part{
  position:absolute;bottom:-10px;
  font-size:var(--ps,.6rem);
  color:var(--pc,rgba(59,130,246,.35));
  line-height:1;user-select:none;
  animation:hpart-r var(--pd,9s) ease-in var(--pp,0s) infinite;
  opacity:0;
}
[data-theme=light] .hero-part{color:var(--pc-l,rgba(37,99,235,.25))}
@keyframes hpart-r{
  0%{opacity:0;transform:translateY(0) translateX(0) rotate(0deg) scale(1)}
  10%{opacity:var(--po,.4)}
  80%{opacity:calc(var(--po,.4)*.1)}
  100%{opacity:0;transform:translateY(-88vh) translateX(var(--px,20px)) rotate(var(--pr,180deg)) scale(.35)}
}

/* -- Main inner grid ------------------------------------ */
.hero-inner{
  position:relative;z-index:5;
  display:grid;
  grid-template-columns:1.15fr 1fr;
  gap:clamp(1.5rem,3.5vw,3rem);
  align-items:center;
  width:100%;
  max-width:1280px;
  margin-inline:auto;
  padding-inline:clamp(1rem,4vw,2rem);
  padding-top:calc(var(--navbar-h) + clamp(3rem,8vh,5rem));
  padding-bottom:clamp(3rem,6vh,5rem);
  min-height:100dvh;
}

/* -- Left content --------------------------------------- */
.hcontent{
  display:flex;flex-direction:column;
  justify-content:center;
  gap:clamp(.6rem,1.5vh,1rem);
  position:relative;z-index:6;
}

/* greeting */
.hgreet{display:inline-flex;align-items:center;gap:.42rem;width:fit-content;line-height:1.3}
.hgreet-salam{font-family:'Georgia',serif;font-style:italic;color:#F59E0B;font-weight:600;font-size:.88rem}
.hgreet-rest{color:var(--text-primary);font-family:var(--font-mono);font-weight:500;font-size:.82rem;opacity:.9}

/* name */
.hname{font-size:clamp(2.2rem,4.5vw,4.2rem);font-weight:800;line-height:1.02;letter-spacing:-.03em;font-family:var(--font-display);color:var(--text-primary)}
.hname-line{display:block;overflow:hidden;line-height:1.15}
.hname-in{display:inline-block;transform:translateY(106%);animation:hname-up .72s cubic-bezier(.16,1,.3,1) var(--d,0ms) forwards}
@keyframes hname-up{to{transform:translateY(0)}}
.hname-acc{color:var(--accent-primary)}
/* (Turzo) inline on desktop */
.hname-nick{font-size:.3em;font-weight:500;color:var(--text-tertiary);letter-spacing:.03em;vertical-align:middle;font-family:var(--font-mono);margin-left:.5em;opacity:0;animation:hfade .5s ease 1.1s forwards}
@keyframes hfade{to{opacity:1}}

/* ---- Tablet (480-899): single line "Muhtasim Rahman (Turzo)" ---- */
@media(min-width:480px) and (max-width:899px){
  .hname{
    display:flex;
    align-items:flex-end;
    gap:.28em;
    flex-wrap:nowrap;
    justify-content:center;
    font-size:clamp(2rem,6.5vw,2.8rem);
  }
  .hname-line{overflow:visible;line-height:1.1;}
  .hname-nick{
    font-size:.34em;
    margin-left:.3em;
    color:var(--text-tertiary);
    letter-spacing:.03em;
  }
}

/* ---- Mobile (<480): "Muhtasim Rahman" line 1, "(Turzo)" smaller below ---- */
@media(max-width:479px){
  .hname{
    display:flex;
    align-items:flex-end;
    gap:.22em;
    flex-wrap:wrap;
    justify-content:center;
    font-size:clamp(1.9rem,9vw,2.4rem);
  }
  .hname-line{overflow:visible;line-height:1.1;}
  /* (Turzo) block, full width, smaller */
  .hname-nick{
    display:block;
    width:100%;
    text-align:center;
    font-size:.32em;
    margin-left:0;
    margin-top:.12em;
    color:var(--text-tertiary);
    letter-spacing:.04em;
    font-weight:500;
  }
}

/* role */
.hrole{font-size:clamp(.86rem,1.35vw,1.05rem);color:var(--text-secondary);font-weight:500;min-height:1.7em;display:flex;align-items:center;gap:2px}
.hrole-t{color:var(--text-primary);font-weight:600}
.hcursor{color:var(--accent-primary);animation:hblink .7s step-end infinite}
@keyframes hblink{0%,100%{opacity:1}50%{opacity:0}}

/* bio */
.hbio{font-size:clamp(.82rem,1.05vw,.92rem);color:var(--text-secondary);line-height:1.72;max-width:430px}

/* cta buttons */
.hcta{display:flex;gap:.7rem;flex-wrap:wrap}
.hbtn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.58rem 1.3rem;font-family:var(--font-display);font-size:.85rem;font-weight:600;border-radius:.75rem;border:2px solid transparent;cursor:pointer;transition:all .22s ease;white-space:nowrap;text-decoration:none;position:relative;overflow:hidden}
.hbtn-p{background:var(--accent-primary);color:#fff;border-color:var(--accent-primary);box-shadow:0 2px 10px rgba(37,99,235,.28)}
.hbtn-p:hover{background:var(--accent-hover);border-color:var(--accent-hover);box-shadow:0 6px 20px rgba(37,99,235,.38);transform:translateY(-1px)}
.hbtn-p:active,.hbtn-o:active{transform:scale(.96)!important}
.hbtn-o{background:transparent;color:var(--accent-primary);border-color:var(--accent-primary)}
.hbtn-o:hover{background:var(--accent-light);transform:translateY(-1px);box-shadow:0 4px 14px rgba(37,99,235,.15)}
.hbtn-wrap{position:relative;display:inline-block}
.hbtn-tt{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(5px) scale(.93);background:rgba(8,15,35,.96);color:#f1f5f9;border:1px solid rgba(148,163,184,.18);box-shadow:0 6px 20px rgba(0,0,0,.32);font-size:11px;font-weight:500;padding:5px 10px;border-radius:8px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s ease,transform .15s ease;z-index:20;backdrop-filter:blur(10px)}
.hbtn-wrap:hover .hbtn-tt{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}

/* socials */
.hsocials{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap}
.hsocial-wrap{position:relative;display:inline-block}
.hsocial{width:32px;height:32px;border-radius:.55rem;background:rgba(255,255,255,.05);border:1px solid rgba(148,163,184,.16);display:flex;align-items:center;justify-content:center;color:var(--text-tertiary);font-size:.8rem;text-decoration:none;transition:all .18s cubic-bezier(.16,1,.3,1);backdrop-filter:blur(8px)}
[data-theme=light] .hsocial{background:var(--bg-surface);border-color:var(--border-color);color:var(--text-secondary)}
.hsocial:hover{background:var(--accent-primary);border-color:var(--accent-primary);color:#fff;transform:translateY(-3px) scale(1.08);box-shadow:0 6px 16px rgba(37,99,235,.3)}
.hsocial-tt{position:absolute;bottom:calc(100% + 7px);left:50%;transform:translateX(-50%) translateY(4px) scale(.93);background:rgba(8,15,35,.96);color:#f1f5f9;border:1px solid rgba(148,163,184,.18);box-shadow:0 5px 16px rgba(0,0,0,.28);font-size:10.5px;font-weight:500;padding:4px 9px;border-radius:7px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .14s ease,transform .14s ease;z-index:20;font-family:var(--font-mono);backdrop-filter:blur(8px)}
.hsocial-wrap:hover .hsocial-tt{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}

/* stats */
.hstats{display:flex;align-items:center;gap:1.1rem;flex-wrap:wrap}
.hstat{display:flex;flex-direction:column;gap:2px}
.hstat-num{display:flex;align-items:baseline;gap:3px;font-size:clamp(1.15rem,1.8vw,1.38rem);font-weight:800;font-family:var(--font-display);color:var(--text-primary);line-height:1}
.hstat-plus{color:var(--accent-primary);font-size:.65em}
.hstat-lbl{font-size:.6rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.06em;margin-top:1px}
.hstat-sep{width:1px;height:26px;background:var(--border-color);flex-shrink:0}
.hup{opacity:0;animation:hup-a .6s cubic-bezier(.16,1,.3,1) var(--d,0ms) forwards}
@keyframes hup-a{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

/* -- Right visual --------------------------------------- */
.hvisual{
  position:relative;z-index:5;
  display:flex;align-items:center;justify-content:center;
  opacity:0;
  animation:hvis-in .85s cubic-bezier(.16,1,.3,1) .2s forwards;
}
@keyframes hvis-in{from{opacity:0;transform:translateX(20px) scale(.95)}to{opacity:1;transform:none}}

/* Image container */
.himg-box{
  position:relative;
  width:clamp(280px,32vw,460px);
  height:clamp(375px,40vw,615px);
  flex-shrink:0;
}

/* Glow behind image */
.himg-glow{
  position:absolute;inset:8% 10%;z-index:0;
  border-radius:24px;
  background:radial-gradient(ellipse at 50% 40%,rgba(37,99,235,.22) 0%,transparent 70%);
  filter:blur(32px);
  pointer-events:none;
  animation:hglow-p 4s ease-in-out infinite;
}
[data-theme=light] .himg-glow{background:radial-gradient(ellipse at 50% 40%,rgba(37,99,235,.1) 0%,transparent 70%)}
@keyframes hglow-p{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.1)}}

/* Image frame -- LARGE SCREEN: no bg, no border, no shadow, no top bar */
.himg-frame{
  position:relative;z-index:1;
  width:100%;height:100%;
  border-radius:20px;
  overflow:hidden;
  background:transparent;
}
/* Bottom blend gradient stays */
.himg-frame::after{
  content:'';position:absolute;
  bottom:0;left:0;right:0;height:38%;
  background:linear-gradient(to top,var(--bg-page) 0%,var(--bg-page) 5%,rgba(2,6,23,.55) 30%,transparent 100%);
  z-index:2;pointer-events:none;
}
[data-theme=light] .himg-frame::after{
  background:linear-gradient(to top,var(--bg-page) 0%,var(--bg-page) 4%,rgba(240,244,248,.75) 28%,transparent 100%);
}

.himg-photo{
  width:100%;height:100%;
  object-fit:cover;object-position:top center;
  display:block;
  filter:drop-shadow(0 8px 30px rgba(0,0,0,.2));
}
[data-theme=dark] .himg-photo{filter:drop-shadow(0 8px 30px rgba(0,0,0,.45))}

/* -- RESPONSIVE BREAKPOINTS ============================== */

/* 2xl: 1536px+ */
@media(min-width:1536px){
  .hero-inner{grid-template-columns:1.1fr 1fr;max-width:1360px}
  .himg-box{width:500px;height:655px}
}

/* xl: 1280-1535 */
@media(min-width:1280px) and (max-width:1535px){
  .himg-box{width:440px;height:595px}
}

/* lg: 1024-1279 */
@media(min-width:1024px) and (max-width:1279px){
  .hero-inner{grid-template-columns:1.1fr 1fr;gap:2rem}
  .himg-box{width:360px;height:495px}
}

/* md-lg: 900-1023 */
@media(min-width:900px) and (max-width:1023px){
  .hero-inner{grid-template-columns:1fr 1fr;gap:1.5rem}
  .himg-box{width:300px;height:425px}
}

/* md: <=899 -- single column, image on top */
@media(max-width:899px){
  .hero{min-height:100dvh;height:auto}
  .hero-inner{
    grid-template-columns:1fr;
    padding-top:calc(var(--navbar-h) + 2.5rem);
    padding-bottom:3rem;
    gap:2rem;
    text-align:center;
    align-items:start;
    min-height:unset;
  }
  .hcontent{align-items:center;order:2;justify-content:flex-start;height:auto}
  .hvisual{order:1;height:auto}
  .hbio{max-width:72%;text-align:center}
  .hcta,.hsocials,.hstats{justify-content:center}
  .hgreet{align-self:center}

  /* Round frame on tablet/mobile */
  .himg-box{width:clamp(180px,46vw,240px);height:clamp(180px,46vw,240px)}
  .himg-frame{
    border-radius:50%;
    background:transparent;
    /* Accent-colored ring -- alt color */
    box-shadow:
      0 0 0 4px var(--bg-page),
      0 0 0 7px rgba(99,102,241,.55),
      0 0 36px rgba(99,102,241,.22);
    animation:hring-p 3s ease-in-out infinite;
  }
  [data-theme=light] .himg-frame{
    box-shadow:
      0 0 0 4px var(--bg-page),
      0 0 0 7px rgba(79,70,229,.45),
      0 0 28px rgba(79,70,229,.15);
    animation:hring-p-l 3s ease-in-out infinite;
  }
  .himg-glow{border-radius:50%;}
  .himg-frame::after{display:none;}
}

@keyframes hring-p{
  0%,100%{box-shadow:0 0 0 4px var(--bg-page),0 0 0 7px rgba(99,102,241,.45),0 0 24px rgba(99,102,241,.15)}
  50%{box-shadow:0 0 0 4px var(--bg-page),0 0 0 7px rgba(99,102,241,.72),0 0 42px rgba(99,102,241,.32)}
}
@keyframes hring-p-l{
  0%,100%{box-shadow:0 0 0 4px var(--bg-page),0 0 0 7px rgba(79,70,229,.38),0 0 20px rgba(79,70,229,.1)}
  50%{box-shadow:0 0 0 4px var(--bg-page),0 0 0 7px rgba(79,70,229,.62),0 0 34px rgba(79,70,229,.22)}
}

/* sm: 640-899 */
@media(min-width:640px) and (max-width:899px){
  .himg-box{width:clamp(200px,44vw,260px);height:clamp(200px,44vw,260px)}
}

/* xs: <480 */
@media(max-width:479px){
  .hero-inner{padding-top:calc(var(--navbar-h) + 2rem);padding-bottom:2.5rem;gap:1.5rem}
  .himg-box{width:clamp(160px,42vw,200px);height:clamp(160px,42vw,200px)}
}

/* xxs: <360 */
@media(max-width:359px){
  .himg-box{width:150px;height:150px}
}
`}</style>

      <section className="hero" id="hero" aria-label="Introduction">
        {/* Backgrounds */}
        <div className="hero-tex" aria-hidden="true"/>
        <div className="hero-orb hero-orb-1" aria-hidden="true"/>
        <div className="hero-orb hero-orb-2" aria-hidden="true"/>
        <div className="hero-orb hero-orb-3" aria-hidden="true"/>
        <div className="hero-stars" aria-hidden="true">
          {STARS.map(s=><span key={s.key} className="hero-star" style={s.style} aria-hidden="true"/>)}
        </div>
        <div className="hero-parts" aria-hidden="true">
          {PARTS.map(p=><span key={p.key} className="hero-part" style={p.style} aria-hidden="true">{p.ch}</span>)}
        </div>
        <div className="hero-grad-btm" aria-hidden="true"/>

        <div className="hero-inner">
          {/* LEFT CONTENT */}
          <div className="hcontent">
            <div className="hgreet hup" style={{'--d':'0ms'}}>
              <span className="hgreet-salam">Assalamu Alaikum</span>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '1.1em', verticalAlign: 'middle', color: 'var(--accent-secondary, #f59e0b)', lineHeight: 1, display: 'inline-flex', alignItems: 'center' }}
                aria-hidden="true">
                waving_hand
              </span>
              <span className="hgreet-rest">I am --</span>
            </div>

            {/* Name: desktop = 2 lines, tablet = single line flex, mobile = wrap with (Turzo) below */}
            <h1 className="hname" aria-label="Muhtasim Rahman (Turzo)">
              <span className="hname-line">
                <span className="hname-in" style={{'--d':'70ms'}}>Muhtasim</span>
              </span>
              <span className="hname-line">
                <span className="hname-in hname-acc" style={{'--d':'185ms'}}>
                  Rahman<span className="hname-nick">(Turzo)</span>
                </span>
              </span>
            </h1>

            <div className="hrole hup" style={{'--d':'320ms'}} aria-live="polite">
              <span className="hrole-t">{typed}</span>
              <span className="hcursor" aria-hidden="true">|</span>
            </div>

            <p className="hbio hup" style={{'--d':'430ms'}}>
              Self-taught developer &amp; designer from Bangladesh --
              building clean, fast and meaningful digital experiences.
            </p>

            <div className="hcta hup" style={{'--d':'530ms'}}>
              <span className="hbtn-wrap">
                <Link to="/projects" className="hbtn hbtn-p">
                  <FontAwesomeIcon icon={faFolderOpen} aria-hidden="true"/> View Projects
                </Link>
                <span className="hbtn-tt">Browse all my work &amp; case studies</span>
              </span>
              <span className="hbtn-wrap">
                {cvEnabled && cvUrl && cvUrl !== '#'
                  ? <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="hbtn hbtn-o">
                      <FontAwesomeIcon icon={faDownload} aria-hidden="true"/> Download CV
                    </a>
                  : <span className="hbtn hbtn-o" style={{opacity:.7,cursor:'default'}}>
                      <FontAwesomeIcon icon={faDownload} aria-hidden="true"/> Download CV
                    </span>
                }
                <span className="hbtn-tt">{cvEnabled && cvUrl && cvUrl !== '#' ? 'Download my resume as a PDF' : 'CV will be uploaded soon'}</span>
              </span>
            </div>

            <div className="hsocials hup" style={{'--d':'620ms'}} aria-label="Social links">
              {SOCIALS.map(({icon,href,label,handle})=>(
                <span key={label} className="hsocial-wrap">
                  <a href={href} target="_blank" rel="noopener noreferrer"
                     className="hsocial" aria-label={`${label} -- ${handle}`}>
                    <FontAwesomeIcon icon={icon} aria-hidden="true"/>
                  </a>
                  <span className="hsocial-tt">{handle}</span>
                </span>
              ))}
            </div>

            <div ref={sRef} className="hstats hup" style={{'--d':'710ms'}} aria-label="Stats">
              <StatItem value={yDev}  label="Yrs Dev"    sep={false} inView={inView}/>
              <StatItem value={yDes}  label="Yrs Design" sep={true}  inView={inView}/>
              <StatItem value={proj}  label="Projects"   sep={true}  inView={inView}/>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="hvisual" aria-hidden="true">
            <div className="himg-box">
              <div className="himg-glow"/>
              <div className="himg-frame">
                <img
                  src="/hero.webp"
                  alt="Muhtasim Rahman"
                  className="himg-photo"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
