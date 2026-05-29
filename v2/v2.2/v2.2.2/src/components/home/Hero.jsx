// Hero.jsx — v2.2.2  (based on hero-v1.html template)
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faFacebook, faInstagram, faYoutube, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faDownload, faHandshake, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
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
        if (c.current === cur.length) { del.current = true; t = setTimeout(tick, 2100) }
        else t = setTimeout(tick, 70)
      } else {
        setText(cur.slice(0, --c.current))
        if (c.current === 0) { del.current = false; r.current = (r.current+1)%ROLES.length; t = setTimeout(tick, 280) }
        else t = setTimeout(tick, 34)
      }
    }
    t = setTimeout(tick, 1050)
    return () => clearTimeout(t)
  }, [])
  return text
}

function useCountUp(target, inView) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const num = parseInt(target, 10)
    const start = performance.now(), dur = 900
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

const FLOAT_ICONS = [
  { file:'html5',  label:'HTML5',  cls:'html',   dur:'3.9s', del:'0s'    },
  { file:'css3',   label:'CSS3',   cls:'css',    dur:'4.4s', del:'0.65s' },
  { file:'python', label:'Python', cls:'python', dur:'3.6s', del:'1.2s'  },
  { file:'vscode', label:'VSCode', cls:'vscode', dur:'3.3s', del:'0.95s' },
  { file:'design', label:'Design', cls:'design', dur:'4.8s', del:'0.35s' },
]

const SOCIALS = [
  { icon:faGithub,    href:SITE_CONFIG.social.github,    label:'GitHub'    },
  { icon:faLinkedin,  href:SITE_CONFIG.social.linkedin,  label:'LinkedIn'  },
  { icon:faFacebook,  href:SITE_CONFIG.social.facebook,  label:'Facebook'  },
  { icon:faInstagram, href:SITE_CONFIG.social.instagram, label:'Instagram' },
  { icon:faYoutube,   href:SITE_CONFIG.social.youtube,   label:'YouTube'   },
  { icon:faTelegram,  href:SITE_CONFIG.social.telegram,  label:'Telegram'  },
]

const PT = [
  {ch:'★',c:'rgba(59,130,246,V)', l:'rgba(37,99,235,V)',  s:'0.65rem'},
  {ch:'✦',c:'rgba(99,102,241,V)',l:'rgba(79,70,229,V)',   s:'0.55rem'},
  {ch:'✧',c:'rgba(147,197,253,V)',l:'rgba(96,165,250,V)', s:'0.50rem'},
  {ch:'·',c:'rgba(255,255,255,V)',l:'rgba(37,99,235,V)',   s:'0.70rem'},
  {ch:'◆',c:'rgba(139,92,246,V)', l:'rgba(124,58,237,V)', s:'0.45rem'},
  {ch:'⊹',c:'rgba(147,197,253,V)',l:'rgba(96,165,250,V)', s:'0.60rem'},
  {ch:'✺',c:'rgba(251,191,36,V)', l:'rgba(245,158,11,V)', s:'0.50rem'},
]
const STARS = Array.from({length:52},(_,i)=>{
  const sz=Math.random()<0.7?1:Math.random()<0.8?2:3
  return {key:i,style:{width:sz,height:sz,left:`${(Math.random()*100).toFixed(1)}%`,top:`${(Math.random()*100).toFixed(1)}%`,'--dur':`${(2+Math.random()*5).toFixed(1)}s`,'--del':`${(Math.random()*7).toFixed(1)}s`,'--op-lo':(0.06+Math.random()*0.14).toFixed(2),'--op-hi':(0.25+Math.random()*0.45).toFixed(2)}}
})
const PARTS = Array.from({length:42},(_,i)=>{
  const p=PT[i%PT.length], op=(0.28+Math.random()*0.38).toFixed(2)
  return {key:i,ch:p.ch,style:{left:`${(2+Math.random()*96).toFixed(1)}%`,'--pd':`${(6+Math.random()*10).toFixed(1)}s`,'--pp':`${(Math.random()*16).toFixed(1)}s`,'--po':op,'--ps':p.s,'--px':`${((Math.random()-0.5)*80).toFixed(0)}px`,'--pr':`${((Math.random()-0.5)*360).toFixed(0)}deg`,'--pc':p.c.replace('V',op),'--pc-l':p.l.replace('V',op)}}
})

function StatItem({value,label,sep,inView}){
  const num=parseInt(value,10), suf=String(value).replace(/[0-9]/g,'')
  const count=useCountUp(num,inView)
  return(<>{sep&&<div className="hstat-sep"/>}<div className="hstat"><div className="hstat-num"><span>{count}</span><span className="hstat-plus">{suf}</span></div><span className="hstat-lbl">{label}</span></div></>)
}

export default function Hero({settings,settingsLoading}){
  const typed=useTyping()
  const sRef=useRef(null)
  const [inView,setInView]=useState(false)
  const cvEnabled=settings?.cvEnabled??false
  const cvUrl=settings?.cvUrl??'#'
  const yDev=settings?.statsYearsDev??'3+'
  const yDes=settings?.statsYearsDesign??'6+'
  const proj=settings?.statsProjects??'16+'

  useEffect(()=>{
    if(!sRef.current) return
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setInView(true)},{threshold:0.2})
    obs.observe(sRef.current)
    return()=>obs.disconnect()
  },[])

  return(
    <>
<style>{`
.hero{position:relative;height:100dvh;max-height:840px;min-height:600px;display:flex;align-items:center;overflow:hidden}
.hbg{position:absolute;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(rgba(255,255,255,.055) 1px,transparent 1px),radial-gradient(rgba(59,130,246,.04) 1px,transparent 1px);background-size:32px 32px,17px 17px;background-position:0 0,8px 8px;mask-image:radial-gradient(ellipse 90% 90% at 50% 40%,black 20%,transparent 85%);animation:hbg-drift 40s linear infinite}
[data-theme=light] .hbg{background-image:radial-gradient(rgba(37,99,235,.07) 1px,transparent 1px),radial-gradient(rgba(99,102,241,.05) 1px,transparent 1px);background-size:32px 32px,17px 17px}
@keyframes hbg-drift{to{background-position:32px 32px,25px 25px}}
.horb{position:absolute;z-index:0;pointer-events:none;border-radius:50%;filter:blur(72px);animation:horb-d var(--dur,20s) ease-in-out var(--del,0s) infinite alternate}
.horb-1{width:480px;height:480px;background:radial-gradient(circle,rgba(37,99,235,.20) 0%,transparent 68%);top:-100px;left:-80px;--dur:22s;--del:0s}
.horb-2{width:360px;height:360px;background:radial-gradient(circle,rgba(99,102,241,.14) 0%,transparent 68%);bottom:-80px;right:8%;--dur:17s;--del:5s}
.horb-3{width:260px;height:260px;background:radial-gradient(circle,rgba(59,130,246,.10) 0%,transparent 68%);top:38%;left:32%;--dur:26s;--del:9s}
[data-theme=light] .horb-1{background:radial-gradient(circle,rgba(37,99,235,.08) 0%,transparent 68%)}
[data-theme=light] .horb-2{background:radial-gradient(circle,rgba(99,102,241,.06) 0%,transparent 68%)}
@keyframes horb-d{0%{transform:translate(0,0) scale(1)}33%{transform:translate(28px,-18px) scale(1.07)}66%{transform:translate(-18px,22px) scale(.94)}100%{transform:translate(12px,-8px) scale(1.02)}}
.hstars{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.hstar{position:absolute;border-radius:50%;background:rgba(255,255,255,.6);animation:hstar-t var(--dur,3s) ease-in-out var(--del,0s) infinite}
[data-theme=light] .hstar{background:#60A5FA;opacity:.12}
@keyframes hstar-t{0%,100%{opacity:var(--op-lo,.1);transform:scale(1)}50%{opacity:var(--op-hi,.5);transform:scale(1.5)}}
.hparts{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.hpart{position:absolute;bottom:-10px;font-size:var(--ps,.7rem);color:var(--pc,rgba(59,130,246,.45));line-height:1;user-select:none;animation:hpart-r var(--pd,8s) ease-in var(--pp,0s) infinite;opacity:0}
[data-theme=light] .hpart{color:var(--pc-l,rgba(37,99,235,.3))}
@keyframes hpart-r{0%{opacity:0;transform:translateY(0) translateX(0) rotate(0deg) scale(1)}10%{opacity:var(--po,.55)}80%{opacity:calc(var(--po,.55)*.15)}100%{opacity:0;transform:translateY(-95vh) translateX(var(--px,20px)) rotate(var(--pr,180deg)) scale(.4)}}
.hinner{position:relative;z-index:1;display:grid;grid-template-columns:3fr 2fr;gap:clamp(1.5rem,4vw,3.5rem);align-items:center;width:100%;height:100%;max-width:1280px;margin-inline:auto;padding-inline:clamp(1rem,4vw,2rem);padding-block:clamp(2rem,4vh,3rem)}
.hcontent{display:flex;flex-direction:column;justify-content:center;gap:clamp(.7rem,1.8vh,1.2rem);height:100%}
.hchip{display:inline-flex;align-items:center;gap:.5rem;padding:.3em .9em;background:rgba(255,255,255,.06);border:1px solid rgba(148,163,184,.22);border-radius:9999px;font-size:.73rem;font-family:var(--font-mono);color:var(--text-tertiary);letter-spacing:.05em;width:fit-content;backdrop-filter:blur(10px)}
[data-theme=light] .hchip{background:var(--bg-surface);border-color:var(--border-color);color:var(--text-secondary)}
.hchip-icon{color:#F59E0B;font-size:.85rem;flex-shrink:0}
.hname{font-size:clamp(2.1rem,4.3vw,4rem);font-weight:800;line-height:1.03;letter-spacing:-.03em;font-family:var(--font-display);color:var(--text-primary)}
.hname-line{display:block;overflow:hidden;line-height:1.18}
.hname-in{display:inline-block;transform:translateY(105%);animation:hname-up .7s cubic-bezier(.16,1,.3,1) var(--d,0ms) forwards}
@keyframes hname-up{to{transform:translateY(0)}}
.hname-acc{color:var(--accent-primary)}
.hname-nick{font-size:.32em;font-weight:500;color:var(--text-tertiary);letter-spacing:.03em;vertical-align:middle;font-family:var(--font-mono);margin-left:.45em;opacity:0;animation:hfade .5s ease 1s forwards}
@keyframes hfade{to{opacity:1}}
.hrole{font-size:clamp(.88rem,1.5vw,1.15rem);color:var(--text-secondary);font-weight:500;min-height:1.7em;display:flex;align-items:center;gap:2px}
.hrole-t{color:var(--text-primary);font-weight:600}
.hcursor{color:var(--accent-primary);animation:hblink .7s step-end infinite}
@keyframes hblink{0%,100%{opacity:1}50%{opacity:0}}
.hbio{font-size:clamp(.83rem,1.15vw,.95rem);color:var(--text-secondary);line-height:1.7;max-width:430px}
.hcta{display:flex;gap:.75rem;flex-wrap:wrap}
.hbtn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.58rem 1.3rem;font-family:var(--font-display);font-size:.86rem;font-weight:600;border-radius:.75rem;border:2px solid transparent;cursor:pointer;transition:all .25s ease;white-space:nowrap;text-decoration:none;position:relative;overflow:hidden}
.hbtn-p{background:var(--accent-primary);color:#fff;border-color:var(--accent-primary);box-shadow:0 2px 8px rgba(37,99,235,.25)}
.hbtn-p:hover{background:var(--accent-hover);border-color:var(--accent-hover);box-shadow:0 4px 16px rgba(37,99,235,.35);transform:translateY(-1px)}
.hbtn-o{background:transparent;color:var(--accent-primary);border-color:var(--accent-primary)}
.hbtn-o:hover{background:var(--accent-light);transform:translateY(-1px)}
.hsocials{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap}
.hsocial{width:32px;height:32px;border-radius:.5rem;background:rgba(255,255,255,.05);border:1px solid rgba(148,163,184,.18);display:flex;align-items:center;justify-content:center;color:var(--text-tertiary);font-size:.82rem;text-decoration:none;transition:all .15s ease;backdrop-filter:blur(8px)}
[data-theme=light] .hsocial{background:var(--bg-surface);border-color:var(--border-color)}
.hsocial:hover{background:var(--accent-primary);border-color:var(--accent-primary);color:#fff;transform:translateY(-2px)}
.hstats{display:flex;align-items:center;gap:1.2rem;flex-wrap:wrap}
.hstat{display:flex;flex-direction:column;gap:2px}
.hstat-num{display:flex;align-items:baseline;gap:1px;font-size:clamp(1.2rem,2vw,1.45rem);font-weight:800;font-family:var(--font-display);color:var(--text-primary);line-height:1}
.hstat-plus{color:var(--accent-primary)}
.hstat-lbl{font-size:.63rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.05em}
.hstat-sep{width:1px;height:26px;background:var(--border-color);flex-shrink:0}
.hup{opacity:0;animation:hup-a .6s cubic-bezier(.16,1,.3,1) var(--d,0ms) forwards}
@keyframes hup-a{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.hvisual{position:relative;z-index:1;display:flex;align-items:flex-start;justify-content:center;height:100%;opacity:0;animation:hvis-in .85s cubic-bezier(.16,1,.3,1) .15s forwards}
@keyframes hvis-in{from{opacity:0;transform:translateX(20px) scale(.94)}to{opacity:1;transform:none}}
.hscene{position:relative;width:min(90%,clamp(200px,21vw,285px));height:clamp(390px,min(82vh,calc(100% + 50px)),710px);flex-shrink:0}
.hglow{position:absolute;inset:4% 8%;z-index:0;border-radius:50%;background:radial-gradient(ellipse at 50% 40%,rgba(37,99,235,.22) 0%,transparent 70%);filter:blur(36px);pointer-events:none;animation:hglow-p 4s ease-in-out infinite}
[data-theme=light] .hglow{background:radial-gradient(ellipse at 50% 40%,rgba(37,99,235,.10) 0%,transparent 70%)}
@keyframes hglow-p{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.1)}}
.hwrap{position:relative;z-index:1;width:100%;height:100%}
.hphoto{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;filter:drop-shadow(0 10px 36px rgba(0,0,0,.22))}
[data-theme=dark] .hphoto{filter:drop-shadow(0 10px 36px rgba(0,0,0,.45))}
.hbot{position:absolute;bottom:0;left:-15%;right:-15%;z-index:4;pointer-events:none}
.hbot::before{content:'';display:block;height:clamp(80px,22%,160px);background:linear-gradient(to top,var(--bg-page) 0%,var(--bg-page) 12%,rgba(10,14,27,.88) 38%,rgba(10,14,27,.42) 60%,transparent 100%);margin-bottom:-1px}
[data-theme=light] .hbot::before{background:linear-gradient(to top,var(--bg-page) 0%,var(--bg-page) 10%,rgba(248,250,252,.92) 36%,rgba(248,250,252,.45) 58%,transparent 100%)}
.hbot::after{content:'';display:block;height:1.5px;width:100%;background:linear-gradient(90deg,transparent 0%,rgba(99,102,241,.25) 12%,rgba(59,130,246,.7) 30%,rgba(147,197,253,.9) 48%,rgba(59,130,246,.7) 66%,rgba(99,102,241,.25) 88%,transparent 100%);box-shadow:0 0 8px rgba(59,130,246,.6),0 0 22px rgba(59,130,246,.3);animation:hhr-p 3s ease-in-out infinite}
[data-theme=light] .hbot::after{background:linear-gradient(90deg,transparent,rgba(37,99,235,.55) 40%,rgba(37,99,235,.75) 50%,rgba(37,99,235,.55) 62%,transparent);box-shadow:0 0 6px rgba(37,99,235,.25)}
@keyframes hhr-p{0%,100%{opacity:.75}50%{opacity:1}}
.hdots{position:absolute;bottom:-3px;left:-15%;right:-15%;display:flex;justify-content:space-between;pointer-events:none;padding-inline:12%}
.hdots span{width:4px;height:4px;border-radius:50%;background:#60A5FA;box-shadow:0 0 6px #60A5FA,0 0 12px rgba(59,130,246,.5);animation:hdot-b 2s ease-in-out var(--dd,0s) infinite;flex-shrink:0}
@keyframes hdot-b{0%,100%{opacity:.4}50%{opacity:1}}
.hicon{position:absolute;z-index:5;width:var(--sz,46px);height:var(--sz,46px);border-radius:14px;background:rgba(11,17,36,.72);border:1px solid rgba(148,163,184,.18);box-shadow:0 4px 22px rgba(0,0,0,.28),inset 0 0 0 1px rgba(255,255,255,.04);display:flex;align-items:center;justify-content:center;padding:10px;backdrop-filter:blur(14px) saturate(160%);animation:hicon-f var(--dur,3.5s) ease-in-out var(--del,0s) infinite}
[data-theme=light] .hicon{background:rgba(255,255,255,.92);border-color:rgba(226,232,240,.8);box-shadow:0 4px 18px rgba(0,0,0,.08)}
.hicon img{width:100%;height:100%;object-fit:contain;display:block}
@keyframes hicon-f{0%,100%{transform:translateY(0) rotate(0deg)}40%{transform:translateY(-11px) rotate(4deg)}70%{transform:translateY(5px) rotate(-2.5deg)}}
.hicon-html{--sz:48px;top:14%;left:-24px;--dur:3.9s;--del:0s}
.hicon-css{--sz:42px;top:40%;left:-21px;--dur:4.4s;--del:.65s}
.hicon-python{--sz:42px;top:64%;left:-20px;--dur:3.6s;--del:1.2s}
.hicon-vscode{--sz:46px;top:10%;right:-23px;--dur:3.3s;--del:.95s}
.hicon-design{--sz:38px;top:46%;right:-19px;--dur:4.8s;--del:.35s}
.hscroll-btn{position:absolute;bottom:1.4rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:var(--text-tertiary);font-size:.58rem;font-family:var(--font-mono);letter-spacing:.12em;text-transform:uppercase;cursor:pointer;z-index:6;animation:hscroll-h 2.5s ease-in-out infinite;transition:color .15s ease}
.hscroll-btn:hover{color:var(--accent-primary)}
@keyframes hscroll-h{0%,100%{transform:translateX(-50%) translateY(0);opacity:.38}50%{transform:translateX(-50%) translateY(5px);opacity:.88}}
/* tablet ≤900 */
@media(max-width:900px){
  .hero{height:auto;max-height:none;min-height:100dvh}
  .hinner{grid-template-columns:1fr;padding-block:2rem 3rem;gap:1.25rem;text-align:center;align-items:start}
  .hcontent{align-items:center;order:2;justify-content:flex-start;gap:1rem;height:auto}
  .hvisual{order:1;height:auto;justify-content:center;align-items:center}
  .hbio{max-width:76%;text-align:center}
  .hcta,.hsocials,.hstats{justify-content:center}
  .hchip{align-self:center}
  .hscene{width:clamp(160px,44vw,210px);height:clamp(160px,44vw,210px)}
  .hwrap{border-radius:50%;overflow:hidden;box-shadow:0 0 0 4px var(--bg-page),0 0 0 6px var(--border-color),0 0 30px rgba(37,99,235,.14)}
  .hglow{border-radius:50%}
  .hphoto{object-position:top center}
  .hbot,.hdots{display:none}
  .hicon-html{--sz:36px;top:-14px;left:6%}
  .hicon-css{--sz:32px;top:-14px;right:6%;left:auto}
  .hicon-python{--sz:32px;top:50%;left:-13px;transform:translateY(-50%);animation-name:hicon-fy}
  .hicon-vscode{--sz:36px;top:50%;right:-13px;left:auto;transform:translateY(-50%);animation-name:hicon-fy}
  .hicon-design{display:none}
  .hscroll-btn{display:none}
}
@keyframes hicon-fy{0%,100%{transform:translateY(-50%) rotate(0deg)}50%{transform:translateY(calc(-50% - 9px)) rotate(4deg)}}
/* mobile ≤520 */
@media(max-width:520px){
  .hinner{padding-block:1.5rem 2.5rem;gap:1rem}
  .hscene{width:152px;height:152px}
  .hicon{--sz:32px!important;padding:7px;border-radius:10px}
  .hicon-html{top:-11px;left:5%}
  .hicon-css{top:-11px;right:5%;left:auto}
  .hicon-python{top:50%;left:-11px}
  .hicon-vscode{top:50%;right:-11px;left:auto}
}
/* large ≥1400 */
@media(min-width:1400px){.hscene{width:clamp(265px,17vw,305px)}}
@media(min-height:900px) and (min-width:901px){.hero{max-height:900px}.hscene{height:clamp(510px,76vh,710px)}}
@media(max-height:600px) and (min-width:521px){.hero{height:auto;max-height:none;min-height:100dvh}.hscene{height:clamp(260px,52vh,370px)}}
`}</style>

      <section className="hero" id="hero" aria-label="Introduction">
        <div className="hbg" aria-hidden="true"/>
        <div className="hstars" aria-hidden="true">{STARS.map(s=><span key={s.key} className="hstar" style={s.style} aria-hidden="true"/>)}</div>
        <div className="horb horb-1" aria-hidden="true"/>
        <div className="horb horb-2" aria-hidden="true"/>
        <div className="horb horb-3" aria-hidden="true"/>
        <div className="hparts" aria-hidden="true">{PARTS.map(p=><span key={p.key} className="hpart" style={p.style} aria-hidden="true">{p.ch}</span>)}</div>

        <div className="hinner">
          {/* LEFT */}
          <div className="hcontent">
            <div className="hchip hup" style={{'--d':'0ms'}}>
              <FontAwesomeIcon icon={faHandshake} className="hchip-icon" aria-hidden="true"/>
              <span>Assalamu Alaikum — I am</span>
            </div>

            <h1 className="hname" aria-label="Muhtasim Rahman Mahmud (Turzo)">
              <span className="hname-line">
                <span className="hname-in hname-acc" style={{'--d':'80ms'}}>Muhtasim Rahman</span>
              </span>
              <span className="hname-line">
                <span className="hname-in" style={{'--d':'190ms'}}>
                  Mahmud<span className="hname-nick">(Turzo)</span>
                </span>
              </span>
            </h1>

            <div className="hrole hup" style={{'--d':'350ms'}} aria-live="polite">
              <span className="hrole-t">{typed}</span>
              <span className="hcursor" aria-hidden="true">|</span>
            </div>

            <p className="hbio hup" style={{'--d':'460ms'}}>
              Self-taught developer &amp; designer from Bangladesh —
              building clean, fast and meaningful digital experiences.
            </p>

            <div className="hcta hup" style={{'--d':'560ms'}}>
              <Link to="/projects" className="hbtn hbtn-p" title="Browse all my projects and work samples">
                <FontAwesomeIcon icon={faFolderOpen} aria-hidden="true"/> View Projects
              </Link>
              {cvEnabled && cvUrl
                ? <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="hbtn hbtn-o" title="Download my CV / Resume as a PDF">
                    <FontAwesomeIcon icon={faDownload} aria-hidden="true"/> Download CV
                  </a>
                : <Link to="/contact" className="hbtn hbtn-o" title="Get in touch — I respond within 24 hours">
                    Hire Me
                  </Link>
              }
            </div>

            <div className="hsocials hup" style={{'--d':'650ms'}} aria-label="Social links">
              {SOCIALS.map(({icon,href,label})=>(
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                   className="hsocial" aria-label={label} title={label}>
                  <FontAwesomeIcon icon={icon} aria-hidden="true"/>
                </a>
              ))}
            </div>

            <div ref={sRef} className="hstats hup" style={{'--d':'740ms'}} aria-label="Stats">
              <StatItem value={yDev}  label="Yrs Dev"    sep={false} inView={inView}/>
              <StatItem value={yDes}  label="Yrs Design" sep={true}  inView={inView}/>
              <StatItem value={proj}  label="Projects"   sep={true}  inView={inView}/>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hvisual" aria-hidden="true">
            <div className="hscene">
              <div className="hglow"/>
              <div className="hwrap">
                <img src="/hero.webp" alt="Muhtasim Rahman" className="hphoto"
                     loading="eager" fetchPriority="high" width={285} height={640}/>
              </div>
              <div className="hbot" aria-hidden="true">
                <div className="hdots">
                  <span style={{'--dd':'0s'}}/><span style={{'--dd':'.4s'}}/><span style={{'--dd':'.8s'}}/>
                </div>
              </div>
              {FLOAT_ICONS.map(ic=>(
                <div key={ic.cls} className={`hicon hicon-${ic.cls}`}
                     style={{'--dur':ic.dur,'--del':ic.del}} title={ic.label} aria-label={ic.label}>
                  <img src={`/icons/${ic.file}.svg`} alt={ic.label} loading="lazy"/>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="hscroll-btn" onClick={()=>window.scrollBy({top:window.innerHeight*.85,behavior:'smooth'})}
                aria-label="Scroll down" type="button">
          <span>Scroll</span>
          <i className="fa-solid fa-chevron-down" aria-hidden="true"/>
        </button>
      </section>
    </>
  )
}
