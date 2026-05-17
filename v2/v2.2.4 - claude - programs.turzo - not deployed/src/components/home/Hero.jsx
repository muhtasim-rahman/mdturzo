// Hero.jsx — v2.2.4
// Changes:
//   - Waving hand: Google Material Symbols waving_hand icon (replaces inline SVG)
//   - Image height: tracks left-content div height + 10% (ResizeObserver)
//   - Image parent: no width restriction, image fully visible
//   - Round frame: ONLY on tablet (≤1024px) / when columns stack — not on PC
//   - Floating icons: always outside round frame border, positioned on tablet/mobile correctly
//   - Left content: vertically centered via flex-col justify-center
//   - Tablet/mobile: all content centered

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

// Floating icons: positions for PC (absolute on hscene frame) and tablet/mobile (outside round frame)
// pcSide: absolute position relative to hscene (PC only, no round frame)
// roundSide: position relative to round frame center for tablet/mobile (outside the frame)
const FLOAT_ICONS = [
  { file:'html5',  label:'HTML5',  cls:'html',   dur:'3.9s', del:'0s',    pcTop:'8%',   pcSide:{left:'-38px'},  sz:'48px' },
  { file:'css3',   label:'CSS3',   cls:'css',    dur:'4.4s', del:'0.65s', pcTop:'56%',  pcSide:{left:'-30px'},  sz:'42px' },
  { file:'python', label:'Python', cls:'python', dur:'3.6s', del:'1.2s',  pcTop:'82%',  pcSide:{left:'-28px'},  sz:'40px' },
  { file:'vscode', label:'VSCode', cls:'vscode', dur:'3.3s', del:'0.95s', pcTop:'4%',   pcSide:{right:'-36px'}, sz:'46px' },
  { file:'design', label:'Design', cls:'design', dur:'4.8s', del:'0.35s', pcTop:'40%',  pcSide:{right:'-28px'}, sz:'38px' },
]

const SOCIALS = [
  { icon:faGithub,    href:SITE_CONFIG.social.github,    label:'GitHub',    handle:'muhtasim-rahman' },
  { icon:faLinkedin,  href:SITE_CONFIG.social.linkedin,  label:'LinkedIn',  handle:'mdturzo999'      },
  { icon:faFacebook,  href:SITE_CONFIG.social.facebook,  label:'Facebook',  handle:'mdturzo999'      },
  { icon:faInstagram, href:SITE_CONFIG.social.instagram, label:'Instagram', handle:'@mdturzo999'     },
  { icon:faYoutube,   href:SITE_CONFIG.social.youtube,   label:'YouTube',   handle:'@mdturzo999'     },
  { icon:faTelegram,  href:SITE_CONFIG.social.telegram,  label:'Telegram',  handle:'@mdturzo16'      },
]

const PT = [
  {ch:'★',c:'rgba(59,130,246,V)',  l:'rgba(37,99,235,V)',   s:'0.65rem'},
  {ch:'✦',c:'rgba(99,102,241,V)', l:'rgba(79,70,229,V)',   s:'0.55rem'},
  {ch:'✧',c:'rgba(147,197,253,V)',l:'rgba(96,165,250,V)',  s:'0.50rem'},
  {ch:'·',c:'rgba(255,255,255,V)',l:'rgba(37,99,235,V)',   s:'0.72rem'},
  {ch:'◆',c:'rgba(139,92,246,V)', l:'rgba(124,58,237,V)', s:'0.45rem'},
  {ch:'⊹',c:'rgba(147,197,253,V)',l:'rgba(96,165,250,V)',  s:'0.62rem'},
  {ch:'✺',c:'rgba(251,191,36,V)', l:'rgba(245,158,11,V)', s:'0.50rem'},
  {ch:'◦',c:'rgba(96,165,250,V)', l:'rgba(59,130,246,V)', s:'0.55rem'},
  {ch:'⋆',c:'rgba(167,139,250,V)',l:'rgba(139,92,246,V)', s:'0.60rem'},
]
const STARS = Array.from({length:68},(_,i)=>{
  const sz=Math.random()<0.65?1:Math.random()<0.8?2:3
  return {key:i,style:{width:sz,height:sz,left:`${(Math.random()*100).toFixed(1)}%`,top:`${(Math.random()*100).toFixed(1)}%`,'--dur':`${(1.8+Math.random()*5.2).toFixed(1)}s`,'--del':`${(Math.random()*9).toFixed(1)}s`,'--op-lo':(0.04+Math.random()*0.12).toFixed(2),'--op-hi':(0.22+Math.random()*0.5).toFixed(2)}}
})
const PARTS = Array.from({length:52},(_,i)=>{
  const p=PT[i%PT.length], op=(0.22+Math.random()*0.42).toFixed(2)
  return {key:i,ch:p.ch,style:{left:`${(2+Math.random()*96).toFixed(1)}%`,'--pd':`${(7+Math.random()*11).toFixed(1)}s`,'--pp':`${(Math.random()*18).toFixed(1)}s`,'--po':op,'--ps':p.s,'--px':`${((Math.random()-0.5)*90).toFixed(0)}px`,'--pr':`${((Math.random()-0.5)*360).toFixed(0)}deg`,'--pc':p.c.replace('V',op),'--pc-l':p.l.replace('V',op)}}
})
const BEAM_XS = [0.14,0.25,0.38,0.5,0.62,0.75,0.86]

function StatItem({value,label,sep,inView}){
  const num=parseInt(value,10)
  const count=useCountUp(num,inView)
  return(<>{sep&&<div className="hstat-sep"/>}<div className="hstat"><div className="hstat-num"><span>{count}</span><FontAwesomeIcon icon={faPlus} className="hstat-plus" aria-hidden="true"/></div><span className="hstat-lbl">{label}</span></div></>)
}

export default function Hero({settings,settingsLoading}){
  const typed=useTyping()
  const sRef=useRef(null)
  const contentRef=useRef(null)
  const [inView,setInView]=useState(false)
  const [imgHeight,setImgHeight]=useState(null)
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

  // Track left content height → image height = content height * 1.10
  useEffect(()=>{
    if(!contentRef.current) return
    const updateHeight = () => {
      const h = contentRef.current?.offsetHeight
      if (h) setImgHeight(Math.round(h * 1.10))
    }
    updateHeight()
    const ro = new ResizeObserver(updateHeight)
    ro.observe(contentRef.current)
    return () => ro.disconnect()
  },[])

  return(
    <>
<style>{`
.material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;vertical-align:middle}
.hero{position:relative;min-height:100svh;display:flex;align-items:stretch;overflow:visible}
.hbg{position:absolute;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px),radial-gradient(rgba(59,130,246,.05) 1px,transparent 1px);background-size:30px 30px,16px 16px;background-position:0 0,8px 8px;mask-image:radial-gradient(ellipse 96% 96% at 50% 38%,black 12%,transparent 88%);animation:hbg-drift 38s linear infinite}
[data-theme=light] .hbg{background-image:radial-gradient(rgba(37,99,235,.08) 1px,transparent 1px),radial-gradient(rgba(99,102,241,.05) 1px,transparent 1px)}
@keyframes hbg-drift{to{background-position:30px 30px,24px 24px}}
.horb{position:absolute;z-index:0;pointer-events:none;border-radius:50%;filter:blur(72px);animation:horb-d var(--dur,20s) ease-in-out var(--del,0s) infinite alternate}
.horb-1{width:520px;height:520px;background:radial-gradient(circle,rgba(37,99,235,.22) 0%,transparent 68%);top:-120px;left:-100px;--dur:22s;--del:0s}
.horb-2{width:380px;height:380px;background:radial-gradient(circle,rgba(99,102,241,.15) 0%,transparent 68%);bottom:-80px;right:6%;--dur:17s;--del:5s}
.horb-3{width:280px;height:280px;background:radial-gradient(circle,rgba(59,130,246,.11) 0%,transparent 68%);top:35%;left:28%;--dur:28s;--del:9s}
.horb-4{width:180px;height:180px;background:radial-gradient(circle,rgba(167,139,250,.09) 0%,transparent 68%);bottom:20%;right:30%;--dur:19s;--del:3s}
[data-theme=light] .horb-1{background:radial-gradient(circle,rgba(37,99,235,.08) 0%,transparent 68%)}
[data-theme=light] .horb-2{background:radial-gradient(circle,rgba(99,102,241,.06) 0%,transparent 68%)}
@keyframes horb-d{0%{transform:translate(0,0) scale(1)}33%{transform:translate(28px,-20px) scale(1.08)}66%{transform:translate(-20px,24px) scale(.93)}100%{transform:translate(14px,-10px) scale(1.04)}}
.hstars{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.hstar{position:absolute;border-radius:50%;background:rgba(255,255,255,.65);animation:hstar-t var(--dur,3s) ease-in-out var(--del,0s) infinite}
[data-theme=light] .hstar{background:#3B82F6;opacity:.1}
@keyframes hstar-t{0%,100%{opacity:var(--op-lo,.1);transform:scale(1)}50%{opacity:var(--op-hi,.5);transform:scale(1.6)}}
.hparts{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.hpart{position:absolute;bottom:-10px;font-size:var(--ps,.7rem);color:var(--pc,rgba(59,130,246,.45));line-height:1;user-select:none;animation:hpart-r var(--pd,8s) ease-in var(--pp,0s) infinite;opacity:0}
[data-theme=light] .hpart{color:var(--pc-l,rgba(37,99,235,.3))}
@keyframes hpart-r{0%{opacity:0;transform:translateY(0) translateX(0) rotate(0deg) scale(1)}10%{opacity:var(--po,.55)}80%{opacity:calc(var(--po,.55)*.15)}100%{opacity:0;transform:translateY(-95vh) translateX(var(--px,20px)) rotate(var(--pr,180deg)) scale(.4)}}

/* ── Hero inner layout ── */
.hinner{position:relative;z-index:5;display:grid;grid-template-columns:1.15fr 1fr;gap:clamp(1.5rem,3vw,3rem);align-items:center;width:100%;min-height:100svh;max-width:1280px;margin-inline:auto;padding-inline:1.75rem;padding-block:clamp(5rem,8vh,7rem)}
@media(min-width:1440px){.hinner{padding-inline:0}}

/* ── Left content ── */
.hcontent{display:flex;flex-direction:column;justify-content:center;gap:clamp(.6rem,1.5vh,1rem);position:relative;z-index:6}
.hgreet{display:inline-flex;align-items:center;gap:.42rem;width:fit-content;line-height:1.3}
.hgreet-salam{font-family:'Georgia',serif;font-style:italic;color:#F59E0B;font-weight:600;font-size:.88rem}
.hgreet-icon{color:#F59E0B;font-size:1.1rem;flex-shrink:0;position:relative;top:1px;display:inline-flex;align-items:center}
.hgreet-rest{color:var(--text-primary);font-family:var(--font-mono);font-weight:500;font-size:.82rem;opacity:.9}
.hname{font-size:clamp(2.3rem,4.8vw,4.4rem);font-weight:800;line-height:1.02;letter-spacing:-.03em;font-family:var(--font-display);color:var(--text-primary)}
.hname-line{display:block;overflow:hidden;line-height:1.15}
.hname-in{display:inline-block;transform:translateY(106%);animation:hname-up .72s cubic-bezier(.16,1,.3,1) var(--d,0ms) forwards}
@keyframes hname-up{to{transform:translateY(0)}}
.hname-acc{color:var(--accent-primary)}
.hname-nick{font-size:.3em;font-weight:500;color:var(--text-tertiary);letter-spacing:.03em;vertical-align:middle;font-family:var(--font-mono);margin-left:.5em;opacity:0;animation:hfade .5s ease 1.1s forwards}
@keyframes hfade{to{opacity:1}}
.hrole{font-size:clamp(.88rem,1.4vw,1.1rem);color:var(--text-secondary);font-weight:500;min-height:1.7em;display:flex;align-items:center;gap:2px}
.hrole-t{color:var(--text-primary);font-weight:600}
.hcursor{color:var(--accent-primary);animation:hblink .7s step-end infinite}
@keyframes hblink{0%,100%{opacity:1}50%{opacity:0}}
.hbio{font-size:clamp(.83rem,1.1vw,.93rem);color:var(--text-secondary);line-height:1.72;max-width:440px}
.hcta{display:flex;gap:.75rem;flex-wrap:wrap}
.hbtn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.6rem 1.35rem;font-family:var(--font-display);font-size:.86rem;font-weight:600;border-radius:.75rem;border:2px solid transparent;cursor:pointer;transition:all .22s ease;white-space:nowrap;text-decoration:none;position:relative;overflow:hidden}
.hbtn-p{background:var(--accent-primary);color:#fff;border-color:var(--accent-primary);box-shadow:0 2px 10px rgba(37,99,235,.28)}
.hbtn-p:hover{background:var(--accent-hover);border-color:var(--accent-hover);box-shadow:0 6px 20px rgba(37,99,235,.38);transform:translateY(-1px)}
.hbtn-o{background:transparent;color:var(--accent-primary);border-color:var(--accent-primary)}
.hbtn-o:hover{background:var(--accent-light);transform:translateY(-1px);box-shadow:0 4px 14px rgba(37,99,235,.15)}
.hbtn-wrap{position:relative;display:inline-block}
.hbtn-tt{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(5px) scale(.93);background:rgba(8,15,35,.96);color:#f1f5f9;border:1px solid rgba(148,163,184,.18);box-shadow:0 6px 20px rgba(0,0,0,.32);font-size:11px;font-weight:500;padding:5px 10px;border-radius:8px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s ease,transform .15s ease;z-index:20;backdrop-filter:blur(10px)}
.hbtn-wrap:hover .hbtn-tt{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}
.hsocials{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap}
.hsocial-wrap{position:relative;display:inline-block}
.hsocial{width:33px;height:33px;border-radius:.55rem;background:rgba(255,255,255,.05);border:1px solid rgba(148,163,184,.18);display:flex;align-items:center;justify-content:center;color:var(--text-tertiary);font-size:.82rem;text-decoration:none;transition:all .18s cubic-bezier(.16,1,.3,1);backdrop-filter:blur(8px)}
[data-theme=light] .hsocial{background:var(--bg-surface);border-color:var(--border-color);color:var(--text-secondary)}
.hsocial:hover{background:var(--accent-primary);border-color:var(--accent-primary);color:#fff;transform:translateY(-3px) scale(1.08);box-shadow:0 6px 16px rgba(37,99,235,.3)}
.hsocial-tt{position:absolute;bottom:calc(100% + 7px);left:50%;transform:translateX(-50%) translateY(4px) scale(.93);background:rgba(8,15,35,.96);color:#f1f5f9;border:1px solid rgba(148,163,184,.18);box-shadow:0 5px 16px rgba(0,0,0,.28);font-size:10.5px;font-weight:500;padding:4px 9px;border-radius:7px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .14s ease,transform .14s ease;z-index:20;font-family:var(--font-mono);backdrop-filter:blur(8px)}
.hsocial-wrap:hover .hsocial-tt{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}
.hstats{display:flex;align-items:center;gap:1.2rem;flex-wrap:wrap}
.hstat{display:flex;flex-direction:column;gap:2px}
.hstat-num{display:flex;align-items:baseline;gap:3px;font-size:clamp(1.2rem,2vw,1.45rem);font-weight:800;font-family:var(--font-display);color:var(--text-primary);line-height:1}
.hstat-plus{color:var(--accent-primary);font-size:.65em}
.hstat-lbl{font-size:.62rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.06em;margin-top:1px}
.hstat-sep{width:1px;height:28px;background:var(--border-color);flex-shrink:0}
.hup{opacity:0;animation:hup-a .6s cubic-bezier(.16,1,.3,1) var(--d,0ms) forwards}
@keyframes hup-a{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

/* ── Right visual (PC: tall rectangular, tablet/mobile: round frame) ── */
.hvisual{position:relative;z-index:5;display:flex;align-items:center;justify-content:center;padding-block:2rem;opacity:0;animation:hvis-in .85s cubic-bezier(.16,1,.3,1) .2s forwards}
@keyframes hvis-in{from{opacity:0;transform:translateX(22px) scale(.94)}to{opacity:1;transform:none}}

/* PC: tall frame, no rounding, image fills completely */
.hscene{position:relative;z-index:1;display:flex;align-items:flex-start;justify-content:center;overflow:visible}
.hphoto-wrap-pc{position:relative;z-index:1;display:flex;align-items:flex-start;justify-content:center;overflow:visible;width:auto}
.hphoto{display:block;object-fit:cover;object-position:top center;width:auto;max-width:clamp(200px,22vw,300px);filter:drop-shadow(0 12px 40px rgba(0,0,0,.25))}
[data-theme=dark] .hphoto{filter:drop-shadow(0 12px 40px rgba(0,0,0,.5))}
.hglow-pc{position:absolute;inset:4% 8%;z-index:0;border-radius:50%;background:radial-gradient(ellipse at 50% 38%,rgba(37,99,235,.24) 0%,transparent 70%);filter:blur(36px);pointer-events:none;animation:hglow-p 4s ease-in-out infinite}
[data-theme=light] .hglow-pc{background:radial-gradient(ellipse at 50% 38%,rgba(37,99,235,.11) 0%,transparent 70%)}
@keyframes hglow-p{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.12)}}

/* PC floating icons: absolute relative to hscene */
.hicon{position:absolute;z-index:7;width:var(--sz,46px);height:var(--sz,46px);border-radius:13px;background:rgba(11,17,36,.74);border:1px solid rgba(148,163,184,.18);box-shadow:0 4px 22px rgba(0,0,0,.28),inset 0 0 0 1px rgba(255,255,255,.04);display:flex;align-items:center;justify-content:center;padding:9px;backdrop-filter:blur(14px) saturate(160%);animation:hicon-f var(--dur,3.5s) ease-in-out var(--del,0s) infinite}
[data-theme=light] .hicon{background:rgba(255,255,255,.93);border-color:rgba(226,232,240,.8);box-shadow:0 4px 18px rgba(0,0,0,.08)}
.hicon img{width:100%;height:100%;object-fit:contain;display:block}
@keyframes hicon-f{0%,100%{transform:translateY(0) rotate(0deg)}38%{transform:translateY(-12px) rotate(4.5deg)}70%{transform:translateY(6px) rotate(-3deg)}}
/* PC icons hidden on tablet/mobile, round-icons shown instead */
.hicon-pc{display:flex}
.hicon-round{display:none}

/* Tablet/mobile: round frame with floating icons outside */
.hround-wrap{position:relative;display:inline-block}
.hround-frame{border-radius:50%;overflow:hidden;border:3px solid rgba(59,130,246,.45);box-shadow:0 0 0 6px rgba(59,130,246,.08),0 12px 40px rgba(0,0,0,.3);animation:hring-pulse 3s ease-in-out infinite;background:var(--bg-surface-2)}
@keyframes hring-pulse{0%,100%{box-shadow:0 0 0 6px rgba(59,130,246,.08),0 12px 40px rgba(0,0,0,.3)}50%{box-shadow:0 0 0 12px rgba(59,130,246,.04),0 12px 40px rgba(0,0,0,.3)}}
.hround-frame img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}
/* Round floating icons: positioned outside the frame border */
.hicon-round{position:absolute;z-index:8;border-radius:12px;background:rgba(11,17,36,.82);border:1px solid rgba(148,163,184,.2);box-shadow:0 4px 16px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;padding:7px;backdrop-filter:blur(12px)}
[data-theme=light] .hicon-round{background:rgba(255,255,255,.95);border-color:rgba(226,232,240,.9);box-shadow:0 3px 12px rgba(0,0,0,.1)}
.hicon-round img{object-fit:contain;display:block}

/* ── Bottom decorative bar ── */
.hbot{position:absolute;bottom:0;left:-18%;right:-18%;z-index:4;pointer-events:none}
.hbot-fade{display:block;height:clamp(80px,24%,170px);background:linear-gradient(to top,var(--bg-page) 0%,var(--bg-page) 10%,rgba(10,14,27,.85) 36%,rgba(10,14,27,.4) 58%,transparent 100%);margin-bottom:-1px}
[data-theme=light] .hbot-fade{background:linear-gradient(to top,var(--bg-page) 0%,var(--bg-page) 8%,rgba(248,250,252,.92) 34%,rgba(248,250,252,.44) 56%,transparent 100%)}
.hbot-ring{position:relative;height:40px;overflow:visible;margin-top:-2px}
.hbot-svg{position:absolute;left:50%;transform:translateX(-50%);bottom:0;width:200%;height:40px}
.hbot-line{animation:hhr-p 3s ease-in-out infinite}
@keyframes hhr-p{0%,100%{opacity:.72}50%{opacity:1}}
.hbot-arc{animation:hhr-p 4.5s ease-in-out .8s infinite}
@keyframes hbeam{0%,100%{opacity:.15}50%{opacity:.65}}
@keyframes hdot-b{0%,100%{opacity:.3}50%{opacity:1}}

/* ── Scroll button ── */
.hscroll-btn{position:absolute;bottom:1.6rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:5px;background:none;border:none;color:var(--text-tertiary);cursor:pointer;z-index:8;transition:color .18s ease;padding:6px 12px}
.hscroll-btn:hover{color:var(--text-secondary)}
.hscroll-track{width:18px;height:28px;border:1.5px solid currentColor;border-radius:10px;display:flex;align-items:flex-start;justify-content:center;padding-top:4px;opacity:.7}
.hscroll-dot{width:3px;height:7px;background:currentColor;border-radius:3px;animation:hscroll-d 1.6s ease-in-out infinite}
@keyframes hscroll-d{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(7px);opacity:1}}
.hscroll-lbl{font-size:.62rem;text-transform:uppercase;letter-spacing:.08em;opacity:.5}

/* ── hgrad overlays ── */
.hgrad-1{position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,var(--bg-page) 100%);z-index:3;pointer-events:none}
.hgrad-2{position:absolute;inset:0;background:linear-gradient(90deg,rgba(2,6,23,.35) 0%,transparent 50%,transparent 100%);z-index:3;pointer-events:none}
[data-theme=light] .hgrad-1{background:linear-gradient(180deg,transparent 55%,var(--bg-page) 100%)}
[data-theme=light] .hgrad-2{background:linear-gradient(90deg,rgba(248,250,252,.2) 0%,transparent 50%)}

/* ── Tablet breakpoint: 2-col → 1-col, show round frame ── */
@media(max-width:1024px){
  .hinner{grid-template-columns:1fr;gap:2.5rem;align-items:center;padding-block:6rem 4rem;text-align:center}
  .hcontent{align-items:center}
  .hgreet,.hcta,.hsocials,.hstats{justify-content:center}
  .hbio{max-width:500px;text-align:center;margin-inline:auto}
  .hvisual{justify-content:center;padding-block:0}
  /* Hide PC scene, show round frame */
  .hscene-pc{display:none}
  .hscene-round{display:flex;justify-content:center}
  /* Show round icons, hide pc icons */
  .hicon-pc{display:none}
  .hicon-round{display:flex}
}
@media(min-width:1025px){
  .hscene-pc{display:flex;align-items:flex-start;justify-content:center;overflow:visible}
  .hscene-round{display:none}
  .hicon-pc{display:flex}
  .hicon-round{display:none}
}

/* ── Mobile ── */
@media(max-width:640px){
  .hinner{padding-inline:1.25rem;padding-block:5rem 3rem}
  .hround-frame{width:clamp(180px,55vw,240px)!important;height:clamp(220px,65vw,290px)!important}
}
`}</style>

      <section className="hero" id="hero" aria-label="Introduction">
        <div className="hbg" aria-hidden="true"/>
        <div className="hstars" aria-hidden="true">{STARS.map(s=><span key={s.key} className="hstar" style={s.style} aria-hidden="true"/>)}</div>
        <div className="horb horb-1" aria-hidden="true"/>
        <div className="horb horb-2" aria-hidden="true"/>
        <div className="horb horb-3" aria-hidden="true"/>
        <div className="horb horb-4" aria-hidden="true"/>
        <div className="hparts" aria-hidden="true">{PARTS.map(p=><span key={p.key} className="hpart" style={p.style} aria-hidden="true">{p.ch}</span>)}</div>
        <div className="hgrad-2" aria-hidden="true"/>

        <div className="hinner">
          {/* LEFT CONTENT */}
          <div className="hcontent" ref={contentRef}>
            <div className="hgreet hup" style={{'--d':'0ms'}}>
              <span className="hgreet-salam">Assalamu Alaikum</span>
              <span className="hgreet-icon material-symbols-outlined" aria-hidden="true">waving_hand</span>
              <span className="hgreet-rest">I am —</span>
            </div>

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
              Self-taught developer &amp; designer from Bangladesh —
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
                     className="hsocial" aria-label={`${label} — ${handle}`}>
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

            {/* ── PC: tall rectangular image (no round frame) ── */}
            <div className="hscene hscene-pc">
              <div className="hglow-pc"/>
              <div className="hphoto-wrap-pc">
                <img
                  src="/hero.webp"
                  alt="Muhtasim Rahman"
                  className="hphoto"
                  style={imgHeight ? {height:`${imgHeight}px`} : {height:'auto',maxHeight:'88vh'}}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              {/* Futuristic bottom bar */}
              <div className="hbot">
                <span className="hbot-fade"/>
                <div className="hbot-ring">
                  <svg className="hbot-svg" viewBox="0 0 600 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="hbg1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent"/>
                        <stop offset="16%" stopColor="rgba(99,102,241,.25)"/>
                        <stop offset="35%" stopColor="rgba(59,130,246,.7)"/>
                        <stop offset="50%" stopColor="rgba(147,197,253,.95)"/>
                        <stop offset="65%" stopColor="rgba(59,130,246,.7)"/>
                        <stop offset="84%" stopColor="rgba(99,102,241,.25)"/>
                        <stop offset="100%" stopColor="transparent"/>
                      </linearGradient>
                      <filter id="hgf"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    </defs>
                    <line x1="0" y1="6" x2="600" y2="6" stroke="url(#hbg1)" strokeWidth="1.5" filter="url(#hgf)" className="hbot-line"/>
                    <line x1="55" y1="13" x2="545" y2="13" stroke="rgba(59,130,246,.2)" strokeWidth="0.8"/>
                    <ellipse cx="300" cy="6" rx="155" ry="20" fill="none" stroke="rgba(59,130,246,.1)" strokeWidth="1" className="hbot-arc"/>
                    {BEAM_XS.map((x,i)=>(
                      <line key={i} x1={x*600} y1="6" x2={x*600+1.5} y2={6+8+i*3} stroke="rgba(147,197,253,.4)" strokeWidth="1"
                        style={{animation:`hbeam ${1.8+i*0.3}s ease-in-out ${i*0.28}s infinite`}}/>
                    ))}
                    {[0.14,0.35,0.5,0.65,0.86].map((x,i)=>(
                      <circle key={i} cx={x*600} cy="6" r="2.2" fill="rgba(96,165,250,.85)"
                        style={{animation:`hdot-b 2s ease-in-out ${i*0.38}s infinite`,filter:'drop-shadow(0 0 3px rgba(96,165,250,.9))'}}/>
                    ))}
                  </svg>
                </div>
              </div>
              {/* PC floating icons */}
              {FLOAT_ICONS.map(ic=>(
                <div key={ic.cls}
                     className="hicon hicon-pc"
                     style={{'--dur':ic.dur,'--del':ic.del,'--sz':ic.sz,top:ic.pcTop,...ic.pcSide}}
                     title={ic.label} aria-label={ic.label}>
                  <img src={`/icons/${ic.file}.svg`} alt={ic.label} loading="lazy"/>
                </div>
              ))}
            </div>

            {/* ── Tablet/Mobile: round frame with icons outside ── */}
            <div className="hscene-round">
              <div className="hround-wrap">
                <div className="hround-frame" style={{width:'clamp(200px,40vw,280px)',height:'clamp(240px,48vw,336px)'}}>
                  <img src="/hero.webp" alt="Muhtasim Rahman" loading="eager"/>
                </div>
                {/* Round frame floating icons — positioned outside the frame */}
                {/* HTML5 — top-left outside frame */}
                <div className="hicon-round" style={{width:44,height:44,'--dur':'3.9s','--del':'0s',top:'-16px',left:'-16px',animation:'hicon-f 3.9s ease-in-out 0s infinite'}} title="HTML5">
                  <img src="/icons/html5.svg" alt="HTML5" style={{width:26,height:26}} loading="lazy"/>
                </div>
                {/* CSS3 — left outside frame, middle */}
                <div className="hicon-round" style={{width:40,height:40,'--dur':'4.4s','--del':'0.65s',top:'50%',left:'-20px',transform:'translateY(-50%)',animation:'hicon-f 4.4s ease-in-out 0.65s infinite'}} title="CSS3">
                  <img src="/icons/css3.svg" alt="CSS3" style={{width:24,height:24}} loading="lazy"/>
                </div>
                {/* Python — bottom-left outside frame */}
                <div className="hicon-round" style={{width:38,height:38,'--dur':'3.6s','--del':'1.2s',bottom:'-14px',left:'-14px',animation:'hicon-f 3.6s ease-in-out 1.2s infinite'}} title="Python">
                  <img src="/icons/python.svg" alt="Python" style={{width:22,height:22}} loading="lazy"/>
                </div>
                {/* VSCode — top-right outside frame */}
                <div className="hicon-round" style={{width:42,height:42,'--dur':'3.3s','--del':'0.95s',top:'-14px',right:'-14px',animation:'hicon-f 3.3s ease-in-out 0.95s infinite'}} title="VSCode">
                  <img src="/icons/vscode.svg" alt="VSCode" style={{width:25,height:25}} loading="lazy"/>
                </div>
                {/* Design — right outside frame, middle */}
                <div className="hicon-round" style={{width:36,height:36,'--dur':'4.8s','--del':'0.35s',top:'50%',right:'-18px',transform:'translateY(-50%)',animation:'hicon-f 4.8s ease-in-out 0.35s infinite'}} title="Design">
                  <img src="/icons/design.svg" alt="Design" style={{width:20,height:20}} loading="lazy"/>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="hgrad-1" aria-hidden="true"/>

        <button className="hscroll-btn" onClick={()=>window.scrollBy({top:window.innerHeight*.88,behavior:'smooth'})}
                aria-label="Scroll down" type="button">
          <div className="hscroll-track">
            <div className="hscroll-dot"/>
          </div>
          <span className="hscroll-lbl">Scroll</span>
        </button>
      </section>
    </>
  )
}
