// Hero.jsx — v2.2.6
// CHANGES from v2.2.5:
//   • ResizeObserver on leftContent ref → hscene height = leftContentHeight × 1.10
//   • Round frame ONLY at ≤900px width (removed orientation + max-height triggers)
//   • hscene has no max-width on desktop (image fully visible)
//   • Floating icons positioned just outside circular frame border on tablet/mobile
//   • hero-sit.webp reference: NONE (was never in Hero, confirmed)
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

// Floating tech icons — desktop positions (left/right sides of image)
// On mobile (≤900px) they reposition to just outside the circular frame
const FLOAT_ICONS = [
  { file:'html5',  label:'HTML5',  cls:'html',   dur:'3.9s', del:'0s',    pcTop:'10%',  pcSide:{left:'-28px'}, sz:'48px' },
  { file:'css3',   label:'CSS3',   cls:'css',    dur:'4.4s', del:'0.65s', pcTop:'58%',  pcSide:{left:'-24px'}, sz:'42px' },
  { file:'python', label:'Python', cls:'python', dur:'3.6s', del:'1.2s',  pcTop:'80%',  pcSide:{left:'-22px'}, sz:'40px' },
  { file:'vscode', label:'VSCode', cls:'vscode', dur:'3.3s', del:'0.95s', pcTop:'6%',   pcSide:{right:'-27px'},sz:'46px' },
  { file:'design', label:'Design', cls:'design', dur:'4.8s', del:'0.35s', pcTop:'42%',  pcSide:{right:'-22px'},sz:'38px' },
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
  const leftRef=useRef(null)   // v2.2.6: ResizeObserver target
  const [inView,setInView]=useState(false)
  const [imgHeight,setImgHeight]=useState(null) // v2.2.6: dynamic image height
  const cvEnabled=settings?.cvEnabled??false
  const cvUrl=settings?.cvUrl??'#'
  const yDev=settings?.statsYearsDev??3
  const yDes=settings?.statsYearsDesign??6
  const proj=settings?.statsProjects??16

  // Stats inView observer
  useEffect(()=>{
    if(!sRef.current) return
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setInView(true)},{threshold:0.2})
    obs.observe(sRef.current)
    return()=>obs.disconnect()
  },[])

  // v2.2.6: ResizeObserver — image height = leftContent height × 1.10
  // Only active on desktop (>900px). On mobile, CSS handles the square circle.
  useEffect(()=>{
    if(!leftRef.current) return
    const ro=new ResizeObserver(([entry])=>{
      // Only apply on desktop (>900px wide viewport)
      if(window.innerWidth>900){
        setImgHeight(Math.round(entry.contentRect.height*1.10))
      }else{
        setImgHeight(null)
      }
    })
    ro.observe(leftRef.current)
    const onResize=()=>{
      if(window.innerWidth<=900) setImgHeight(null)
    }
    window.addEventListener('resize',onResize,{passive:true})
    return()=>{ ro.disconnect(); window.removeEventListener('resize',onResize) }
  },[])

  return(
    <>
<style>{`
.hero{position:relative;height:100dvh;min-height:580px;display:flex;align-items:center;overflow:hidden}
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

/* v2.2.6: hinner — left content vertically centered */
.hinner{position:relative;z-index:5;display:grid;grid-template-columns:1.18fr 1fr;gap:clamp(1rem,3vw,2.5rem);align-items:center;width:100%;height:100%;max-width:1280px;margin-inline:auto;padding-inline:clamp(1rem,4vw,2rem);padding-block:clamp(2rem,4vh,3rem)}
.hcontent{display:flex;flex-direction:column;justify-content:center;gap:clamp(.65rem,1.6vh,1.1rem);height:100%;position:relative;z-index:6}
.hgreet{display:inline-flex;align-items:center;gap:.42rem;width:fit-content;line-height:1.3}
.hgreet-salam{font-family:'Georgia',serif;font-style:italic;color:#F59E0B;font-weight:600;font-size:.88rem}
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
.hbtn-p:active,.hbtn-o:active{transform:scale(.96)!important}
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

/* v2.2.6: hvisual — right side — no width constraint on image parent */
.hvisual{position:relative;z-index:5;display:flex;align-items:center;justify-content:center;height:100%;opacity:0;animation:hvis-in .85s cubic-bezier(.16,1,.3,1) .2s forwards}
@keyframes hvis-in{from{opacity:0;transform:translateX(22px) scale(.94)}to{opacity:1;transform:none}}
/* v2.2.6: hscene has no max-width on desktop — width fills the column naturally */
.hscene{position:relative;width:100%;height:var(--img-h,clamp(400px,min(82vh,650px),700px));flex-shrink:0;align-self:center}
.hglow{position:absolute;inset:4% 8%;z-index:0;border-radius:50%;background:radial-gradient(ellipse at 50% 38%,rgba(37,99,235,.24) 0%,transparent 70%);filter:blur(36px);pointer-events:none;animation:hglow-p 4s ease-in-out infinite}
[data-theme=light] .hglow{background:radial-gradient(ellipse at 50% 38%,rgba(37,99,235,.11) 0%,transparent 70%)}
@keyframes hglow-p{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.12)}}
.hwrap{position:relative;z-index:1;width:100%;height:100%}
.hphoto{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;filter:drop-shadow(0 12px 40px rgba(0,0,0,.25))}
[data-theme=dark] .hphoto{filter:drop-shadow(0 12px 40px rgba(0,0,0,.5))}
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
.hicon{position:absolute;z-index:7;width:var(--sz,46px);height:var(--sz,46px);border-radius:13px;background:rgba(11,17,36,.74);border:1px solid rgba(148,163,184,.18);box-shadow:0 4px 22px rgba(0,0,0,.28),inset 0 0 0 1px rgba(255,255,255,.04);display:flex;align-items:center;justify-content:center;padding:9px;backdrop-filter:blur(14px) saturate(160%);animation:hicon-f var(--dur,3.5s) ease-in-out var(--del,0s) infinite}
[data-theme=light] .hicon{background:rgba(255,255,255,.93);border-color:rgba(226,232,240,.8);box-shadow:0 4px 18px rgba(0,0,0,.08)}
.hicon img{width:100%;height:100%;object-fit:contain;display:block}
@keyframes hicon-f{0%,100%{transform:translateY(0) rotate(0deg)}38%{transform:translateY(-12px) rotate(4.5deg)}70%{transform:translateY(6px) rotate(-3deg)}}
.hscroll-btn{position:absolute;bottom:1.6rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:5px;background:none;border:none;color:var(--text-tertiary);cursor:pointer;z-index:8;transition:color .18s ease;padding:6px 12px}
.hscroll-btn:hover{color:var(--accent-primary)}
.hscroll-btn:hover .hscroll-track{border-color:var(--accent-primary)}
.hscroll-btn:hover .hscroll-dot{background:var(--accent-primary)}
.hscroll-track{width:22px;height:34px;border:1.5px solid rgba(148,163,184,.35);border-radius:12px;display:flex;align-items:flex-start;justify-content:center;padding:4px;transition:border-color .18s ease}
.hscroll-dot{width:4px;height:8px;background:rgba(148,163,184,.6);border-radius:3px;animation:hscroll-d 2.2s cubic-bezier(.42,0,.58,1) infinite;transition:background .18s ease}
@keyframes hscroll-d{0%{transform:translateY(0);opacity:1}60%{transform:translateY(12px);opacity:.3}61%{transform:translateY(0);opacity:0}65%{opacity:0}66%{opacity:1}}
.hscroll-lbl{font-size:.55rem;font-family:var(--font-mono);letter-spacing:.14em;text-transform:uppercase;opacity:.6}
.hgrad-1{position:absolute;bottom:0;left:0;right:0;height:55%;pointer-events:none;z-index:3;background:linear-gradient(to top,var(--bg-page) 0%,rgba(2,6,23,.72) 22%,rgba(2,6,23,.35) 46%,transparent 100%)}
[data-theme=light] .hgrad-1{background:linear-gradient(to top,var(--bg-page) 0%,rgba(248,250,252,.75) 22%,rgba(248,250,252,.3) 46%,transparent 100%)}
.hgrad-2{position:absolute;bottom:0;left:0;right:0;height:58%;pointer-events:none;z-index:9;background:linear-gradient(to top,rgba(2,6,23,.15) 0%,rgba(2,6,23,.09) 14%,rgba(2,6,23,.04) 30%,transparent 50%)}
[data-theme=light] .hgrad-2{background:linear-gradient(to top,rgba(248,250,252,.15) 0%,rgba(248,250,252,.07) 24%,transparent 48%)}

/* v2.2.6: ≤900px — round frame ONLY triggered by width, NOT orientation or height */
@media(max-width:900px){
  .hero{height:auto;max-height:none;min-height:100dvh}
  .hinner{grid-template-columns:1fr;padding-block:2rem 3.5rem;gap:1.25rem;text-align:center;align-items:start}
  .hcontent{align-items:center;order:2;justify-content:flex-start;gap:1rem;height:auto}
  .hvisual{order:1;height:auto;justify-content:center;align-items:center}
  .hbio{max-width:76%;text-align:center}
  .hcta,.hsocials,.hstats{justify-content:center}
  .hgreet{align-self:center}
  .hscene{width:clamp(175px,46vw,240px);height:clamp(175px,46vw,240px)!important;max-width:none;align-self:auto}
  /* v2.2.6: round frame — width-only trigger */
  .hwrap{border-radius:50%;overflow:hidden;box-shadow:0 0 0 4px var(--bg-page),0 0 0 6px var(--border-color),0 0 30px rgba(37,99,235,.16);animation:hring-p 3s ease-in-out infinite}
  .hglow{border-radius:50%}
  .hphoto{object-position:top center}
  .hbot,.hgrad-1{display:none}
  .hicon{--sz:38px !important;border-radius:11px}
  /* v2.2.6: floating icons positioned just outside the circular frame border */
  .hicon-html{top:8% !important;left:-14px !important;right:auto !important;transform:none !important}
  .hicon-css{top:8% !important;left:auto !important;right:-14px !important;transform:none !important}
  .hicon-python{top:50% !important;left:-16px !important;right:auto !important;transform:translateY(-50%) !important;animation-name:hicon-fy !important}
  .hicon-vscode{top:50% !important;left:auto !important;right:-16px !important;transform:translateY(-50%) !important;animation-name:hicon-fy !important}
  .hicon-design{display:none}
  .hscroll-btn{display:none}
}
@keyframes hring-p{0%,100%{box-shadow:0 0 0 4px var(--bg-page),0 0 0 6px var(--border-color),0 0 20px rgba(37,99,235,.1)}50%{box-shadow:0 0 0 4px var(--bg-page),0 0 0 6px #60A5FA,0 0 36px rgba(37,99,235,.26)}}
@keyframes hicon-fy{0%,100%{transform:translateY(-50%) rotate(0deg)}50%{transform:translateY(calc(-50% - 10px)) rotate(4deg)}}
@media(max-width:520px){
  .hinner{padding-block:1.5rem 2.8rem;gap:1rem}
  .hscene{width:clamp(150px,44vw,185px) !important;height:clamp(150px,44vw,185px) !important}
  .hicon{--sz:32px !important;padding:6px;border-radius:9px}
  .hicon-html{top:6% !important;left:-12px !important}
  .hicon-css{top:6% !important;right:-12px !important}
  .hicon-python{left:-13px !important}
  .hicon-vscode{right:-13px !important}
}
/* v2.2.6: Remove orientation-based round frame trigger (was in v2.2.5) */
@media(min-width:1400px){.hscene{max-width:none}}
`}</style>

      <section className="hero" id="hero" aria-label="Introduction">
        <div className="hbg" aria-hidden="true"/>
        <div className="hstars" aria-hidden="true">{STARS.map(s=><span key={s.key} className="hstar" style={s.style} aria-hidden="true"/>)}</div>
        <div className="horb horb-1" aria-hidden="true"/>
        <div className="horb horb-2" aria-hidden="true"/>
        <div className="horb horb-3" aria-hidden="true"/>
        <div className="horb horb-4" aria-hidden="true"/>
        <div className="hparts" aria-hidden="true">{PARTS.map(p=><span key={p.key} className="hpart" style={p.style} aria-hidden="true">{p.ch}</span>)}</div>
        <div className="hgrad-1" aria-hidden="true"/>

        <div className="hinner">
          {/* LEFT CONTENT — v2.2.6: ref for ResizeObserver */}
          <div className="hcontent" ref={leftRef}>
            <div className="hgreet hup" style={{'--d':'0ms'}}>
              <span className="hgreet-salam">Assalamu Alaikum</span>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '1.1em', verticalAlign: 'middle', color: 'var(--accent-secondary, #f59e0b)', lineHeight: 1, display: 'inline-flex', alignItems: 'center' }}
                aria-hidden="true">
                waving_hand
              </span>
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

          {/* RIGHT VISUAL — v2.2.6: image height driven by ResizeObserver */}
          <div className="hvisual" aria-hidden="true">
            <div className="hscene" style={imgHeight ? {'--img-h': imgHeight + 'px'} : {}}>
              <div className="hglow"/>
              <div className="hwrap">
                <img src="/hero.webp" alt="Muhtasim Rahman" className="hphoto"
                     loading="eager" fetchPriority="high"/>
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
                    <ellipse cx="300" cy="6" rx="85" ry="13" fill="none" stroke="rgba(99,102,241,.08)" strokeWidth="0.8"/>
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

              {/* Floating icons */}
              {FLOAT_ICONS.map(ic=>(
                <div key={ic.cls}
                     className={`hicon hicon-${ic.cls}`}
                     style={{'--dur':ic.dur,'--del':ic.del,'--sz':ic.sz,top:ic.pcTop,...ic.pcSide}}
                     title={ic.label} aria-label={ic.label}>
                  <img src={`/icons/${ic.file}.svg`} alt={ic.label} loading="lazy"/>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hgrad-2" aria-hidden="true"/>

        {/* Scroll indicator — scrolls down, not to a specific section */}
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
