// Hero.jsx — v2.2.3
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faFacebook, faInstagram, faYoutube, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faDownload, faFolderOpen, faHand } from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '../../config/site.config.js'

// ── Typing hook (slower, smoother) ───────────────────────
const ROLES = [
  'Web Developer',
  'UI/UX Designer',
  'Graphic Designer',
  'Video Editor',
  'AI Tools User',
]
function useTyping() {
  const [text, setText] = useState('')
  const r = useRef(0), c = useRef(0), del = useRef(false)
  useEffect(() => {
    let t
    const tick = () => {
      const cur = ROLES[r.current]
      if (!del.current) {
        setText(cur.slice(0, ++c.current))
        t = c.current === cur.length
          ? setTimeout(tick, 2400)
          : setTimeout(tick, 95)
      } else {
        setText(cur.slice(0, --c.current))
        if (c.current === 0) {
          del.current = false
          r.current = (r.current + 1) % ROLES.length
          t = setTimeout(tick, 350)
        } else t = setTimeout(tick, 42)
      }
    }
    t = setTimeout(tick, 900)
    return () => clearTimeout(t)
  }, [])
  return text
}

// ── Count-up ─────────────────────────────────────────────
function useCountUp(target, inView) {
  const [n, setN] = useState(0)
  const ran = useRef(false)
  useEffect(() => {
    if (!inView || ran.current) return
    ran.current = true
    const num = parseInt(target, 10)
    const start = performance.now(), dur = 1100
    const frame = (now) => {
      const t = Math.min((now - start) / dur, 1)
      const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      setN(Math.round(e * num))
      if (t < 1) requestAnimationFrame(frame)
      else setN(num)
    }
    requestAnimationFrame(frame)
  }, [inView, target])
  return n
}

// ── Static data ───────────────────────────────────────────
const FLOAT_ICONS = [
  { file: 'html5',  label: 'HTML5',       dur: '3.9s', del: '0s',    // left side
    pos: { desktop: 'top:18%;left:-32px', tablet: 'top:-15px;left:8%' } },
  { file: 'css3',   label: 'CSS3',        dur: '4.4s', del: '0.65s',
    pos: { desktop: 'top:46%;left:-28px', tablet: 'bottom:20%;left:-14px' } },
  { file: 'python', label: 'Python',      dur: '3.6s', del: '1.2s',  // right side
    pos: { desktop: 'top:12%;right:-30px', tablet: 'top:-15px;right:8%' } },
  { file: 'vscode', label: 'VS Code',     dur: '3.3s', del: '0.95s',
    pos: { desktop: 'top:52%;right:-28px', tablet: 'bottom:20%;right:-14px' } },
  { file: 'design', label: 'Design',      dur: '4.8s', del: '0.35s', // bottom left desktop only
    pos: { desktop: 'top:76%;left:-24px', tablet: 'display:none' } },
]

const SOCIALS = [
  { icon: faGithub,    href: SITE_CONFIG.social.github,    label: 'GitHub'    },
  { icon: faLinkedin,  href: SITE_CONFIG.social.linkedin,  label: 'LinkedIn'  },
  { icon: faFacebook,  href: SITE_CONFIG.social.facebook,  label: 'Facebook'  },
  { icon: faInstagram, href: SITE_CONFIG.social.instagram, label: 'Instagram' },
  { icon: faYoutube,   href: SITE_CONFIG.social.youtube,   label: 'YouTube'   },
  { icon: faTelegram,  href: SITE_CONFIG.social.telegram,  label: 'Telegram'  },
]

// ── Random stable particles ────────────────────────────────
const PT = [
  { ch: '★', c: 'rgba(59,130,246,V)',   l: 'rgba(37,99,235,V)',   s: '0.65rem' },
  { ch: '✦', c: 'rgba(99,102,241,V)',  l: 'rgba(79,70,229,V)',   s: '0.55rem' },
  { ch: '✧', c: 'rgba(147,197,253,V)', l: 'rgba(96,165,250,V)',  s: '0.50rem' },
  { ch: '·', c: 'rgba(255,255,255,V)', l: 'rgba(37,99,235,V)',   s: '0.70rem' },
  { ch: '◆', c: 'rgba(139,92,246,V)',  l: 'rgba(124,58,237,V)',  s: '0.45rem' },
  { ch: '⊹', c: 'rgba(147,197,253,V)', l: 'rgba(96,165,250,V)',  s: '0.60rem' },
  { ch: '✺', c: 'rgba(251,191,36,V)',  l: 'rgba(245,158,11,V)',  s: '0.50rem' },
]
const STARS = Array.from({ length: 60 }, (_, i) => {
  const sz = Math.random() < 0.65 ? 1 : Math.random() < 0.8 ? 2 : 3
  return {
    key: i, style: {
      width: sz, height: sz,
      left: `${(Math.random() * 100).toFixed(1)}%`,
      top: `${(Math.random() * 100).toFixed(1)}%`,
      '--dur': `${(1.8 + Math.random() * 5).toFixed(1)}s`,
      '--del': `${(Math.random() * 8).toFixed(1)}s`,
      '--op-lo': (0.05 + Math.random() * 0.12).toFixed(2),
      '--op-hi': (0.3 + Math.random() * 0.55).toFixed(2),
    }
  }
})
const PARTS = Array.from({ length: 48 }, (_, i) => {
  const p = PT[i % PT.length], op = (0.22 + Math.random() * 0.42).toFixed(2)
  return {
    key: i, ch: p.ch, style: {
      left: `${(2 + Math.random() * 96).toFixed(1)}%`,
      '--pd': `${(7 + Math.random() * 11).toFixed(1)}s`,
      '--pp': `${(Math.random() * 18).toFixed(1)}s`,
      '--po': op, '--ps': p.s,
      '--px': `${((Math.random() - 0.5) * 90).toFixed(0)}px`,
      '--pr': `${((Math.random() - 0.5) * 360).toFixed(0)}deg`,
      '--pc': p.c.replace('V', op), '--pc-l': p.l.replace('V', op),
    }
  }
})

// ── Stat item ──────────────────────────────────────────────
function StatItem({ value, label, inView }) {
  const num = parseInt(value, 10)
  const count = useCountUp(num, inView)
  return (
    <div className="hstat">
      <div className="hstat-num">
        <span>{count}</span>
        <span className="hstat-plus">+</span>
      </div>
      <span className="hstat-lbl">{label}</span>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
export default function Hero({ settings, settingsLoading }) {
  const typed = useTyping()
  const sRef = useRef(null)
  const [inView, setInView] = useState(false)

  const cvEnabled = settings?.cvEnabled ?? false
  const cvUrl     = settings?.cvUrl ?? '#'
  const yDev  = settings?.statsYearsDev    ?? '3'
  const yDes  = settings?.statsYearsDesign ?? '6'
  const proj  = settings?.statsProjects    ?? '16'

  useEffect(() => {
    if (!sRef.current) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    obs.observe(sRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
/* ─────────────── HERO v2.2.3 ─────────────────── */
.hero{position:relative;display:flex;align-items:center;overflow:hidden;min-height:100dvh}
@media(min-width:901px){.hero{max-height:760px;min-height:600px}}

/* BG grid */
.hbg{position:absolute;inset:0;z-index:0;pointer-events:none;
  background-image:radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px),radial-gradient(rgba(59,130,246,.05) 1px,transparent 1px);
  background-size:36px 36px,18px 18px;background-position:0 0,9px 9px;
  mask-image:radial-gradient(ellipse 95% 90% at 50% 35%,black 15%,transparent 88%);
  animation:hbg-d 45s linear infinite}
[data-theme=light] .hbg{background-image:radial-gradient(rgba(37,99,235,.08) 1px,transparent 1px),radial-gradient(rgba(99,102,241,.06) 1px,transparent 1px)}
@keyframes hbg-d{to{background-position:36px 36px,27px 27px}}

/* Orbs */
.horb{position:absolute;z-index:0;pointer-events:none;border-radius:50%;filter:blur(80px);animation:horb-d var(--dur,20s) ease-in-out var(--del,0s) infinite alternate}
.horb-1{width:520px;height:520px;background:radial-gradient(circle,rgba(37,99,235,.22) 0%,transparent 68%);top:-120px;left:-100px;--dur:24s}
.horb-2{width:380px;height:380px;background:radial-gradient(circle,rgba(99,102,241,.15) 0%,transparent 68%);bottom:-90px;right:6%;--dur:18s;--del:6s}
.horb-3{width:280px;height:280px;background:radial-gradient(circle,rgba(59,130,246,.11) 0%,transparent 68%);top:35%;left:28%;--dur:28s;--del:10s}
[data-theme=light] .horb-1{background:radial-gradient(circle,rgba(37,99,235,.09) 0%,transparent 68%)}
[data-theme=light] .horb-2{background:radial-gradient(circle,rgba(99,102,241,.07) 0%,transparent 68%)}
@keyframes horb-d{0%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-20px) scale(1.08)}66%{transform:translate(-20px,24px) scale(.93)}100%{transform:translate(14px,-10px) scale(1.03)}}

/* Stars */
.hstars{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.hstar{position:absolute;border-radius:50%;background:rgba(255,255,255,.75);animation:hstar-t var(--dur,3s) ease-in-out var(--del,0s) infinite}
[data-theme=light] .hstar{background:#60A5FA;opacity:.15}
@keyframes hstar-t{0%,100%{opacity:var(--op-lo,.1);transform:scale(1)}50%{opacity:var(--op-hi,.55);transform:scale(1.6)}}

/* Particles */
.hparts{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.hpart{position:absolute;bottom:-12px;font-size:var(--ps,.7rem);color:var(--pc,rgba(59,130,246,.45));line-height:1;user-select:none;animation:hpart-r var(--pd,8s) ease-in var(--pp,0s) infinite;opacity:0}
[data-theme=light] .hpart{color:var(--pc-l,rgba(37,99,235,.3))}
@keyframes hpart-r{0%{opacity:0;transform:translateY(0) translateX(0) rotate(0deg) scale(1)}10%{opacity:var(--po,.55)}78%{opacity:calc(var(--po,.55)*.1)}100%{opacity:0;transform:translateY(-98vh) translateX(var(--px,20px)) rotate(var(--pr,180deg)) scale(.35)}}

/* ── Bottom gradient layers ── */
/* Layer 1: sits over LEFT content area, covers hero image bottom (z:3) */
.hgrad-main{position:absolute;bottom:0;left:0;right:0;height:45%;z-index:3;pointer-events:none;
  background:linear-gradient(to top,var(--bg-page) 0%,var(--bg-page) 8%,rgba(2,6,23,.80) 32%,rgba(2,6,23,.35) 58%,transparent 100%)}
[data-theme=light] .hgrad-main{background:linear-gradient(to top,var(--bg-page) 0%,var(--bg-page) 8%,rgba(248,250,252,.80) 32%,rgba(248,250,252,.35) 58%,transparent 100%)}
/* Layer 2: 15% overlay on EVERYTHING incl left content (z:6) */
.hgrad-top{position:absolute;bottom:0;left:0;right:0;height:50%;z-index:6;pointer-events:none;
  background:linear-gradient(to top,rgba(2,6,23,.15) 0%,rgba(2,6,23,.10) 25%,transparent 50%)}
[data-theme=light] .hgrad-top{background:linear-gradient(to top,rgba(248,250,252,.15) 0%,rgba(248,250,252,.10) 25%,transparent 50%)}

/* ── Layout ── */
.hinner{position:relative;z-index:5;display:grid;grid-template-columns:3fr 2fr;gap:clamp(2rem,4vw,4rem);align-items:center;width:100%;max-width:1280px;margin-inline:auto;padding-inline:clamp(1rem,4vw,2rem);padding-block:clamp(2rem,5vh,3.5rem)}

/* ── Left content ── */
.hcontent{display:flex;flex-direction:column;gap:clamp(.65rem,1.6vh,1.1rem)}

/* Salam chip - signature style, not a badge */
.hchip{display:inline-flex;align-items:center;gap:.45rem;width:fit-content;
  font-family:'Courier New',monospace;font-size:.82rem;letter-spacing:.01em;line-height:1}
.hchip-salam{color:#F59E0B;font-weight:700}
.hchip-icon{color:#F59E0B;font-size:.78rem}
.hchip-rest{color:rgba(226,232,240,.82);font-weight:400}
[data-theme=light] .hchip-rest{color:rgba(30,41,59,.7)}

/* Name */
.hname{font-size:clamp(2.6rem,5vw,4.6rem);font-weight:900;line-height:1.0;letter-spacing:-.04em;font-family:var(--font-display)}
.hname-line{display:block;overflow:hidden;line-height:1.12}
.hname-in{display:inline-block;transform:translateY(108%);animation:hname-up .75s cubic-bezier(.16,1,.3,1) var(--d,0ms) forwards}
@keyframes hname-up{to{transform:translateY(0)}}
.hname-main{color:var(--accent-primary)}
.hname-last{color:var(--text-primary)}
.hname-nick{font-size:.28em;font-weight:500;color:var(--text-tertiary);letter-spacing:.03em;font-family:var(--font-mono);margin-left:.5em;vertical-align:middle;opacity:0;animation:hfade .5s ease 1.1s forwards}
@keyframes hfade{to{opacity:1}}

/* Role */
.hrole{font-size:clamp(.9rem,1.5vw,1.12rem);color:var(--text-secondary);min-height:1.75em;display:flex;align-items:center;gap:2px}
.hrole-typed{color:var(--text-primary);font-weight:600}
.hcursor{color:var(--accent-primary);animation:hblink .75s step-end infinite;font-weight:300}
@keyframes hblink{0%,100%{opacity:1}50%{opacity:0}}

/* Bio */
.hbio{font-size:clamp(.82rem,1.1vw,.93rem);color:var(--text-secondary);line-height:1.72;max-width:420px}

/* Buttons */
.hcta{display:flex;gap:.7rem;flex-wrap:wrap}
.hbtn{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;padding:.58rem 1.3rem;font-family:var(--font-display);font-size:.86rem;font-weight:600;border-radius:.75rem;border:2px solid transparent;cursor:pointer;transition:all .22s ease;white-space:nowrap;text-decoration:none}
.hbtn-p{background:var(--accent-primary);color:#fff;border-color:var(--accent-primary);box-shadow:0 2px 10px rgba(37,99,235,.28)}
.hbtn-p:hover{background:var(--accent-hover);border-color:var(--accent-hover);box-shadow:0 4px 18px rgba(37,99,235,.38);transform:translateY(-1px)}
.hbtn-o{background:transparent;color:var(--accent-primary);border-color:rgba(59,130,246,.45)}
.hbtn-o:hover{background:var(--accent-light);border-color:var(--accent-primary);transform:translateY(-1px)}

/* Socials */
.hsocials{display:flex;align-items:center;gap:.45rem;flex-wrap:wrap}
.hsocial{width:33px;height:33px;border-radius:.55rem;background:rgba(255,255,255,.05);border:1px solid rgba(148,163,184,.18);display:flex;align-items:center;justify-content:center;color:var(--text-tertiary);font-size:.82rem;text-decoration:none;transition:all .18s ease;backdrop-filter:blur(8px)}
[data-theme=light] .hsocial{background:var(--bg-surface);border-color:var(--border-color)}
.hsocial:hover{background:var(--accent-primary);border-color:var(--accent-primary);color:#fff;transform:translateY(-2px);box-shadow:0 4px 12px rgba(59,130,246,.35)}

/* Stats */
.hstats{display:flex;align-items:center;gap:1.4rem;flex-wrap:wrap}
.hstat{display:flex;flex-direction:column;gap:1px}
.hstat-num{display:flex;align-items:baseline;gap:1px;font-size:clamp(1.25rem,2.2vw,1.55rem);font-weight:800;font-family:var(--font-display);color:var(--text-primary);line-height:1}
.hstat-plus{color:var(--accent-primary);font-size:1.1em;font-weight:900}
.hstat-lbl{font-size:.62rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.06em;margin-top:1px}
.hstat-div{width:1px;height:28px;background:var(--border-color);flex-shrink:0}

/* Fade-up animation */
.hup{opacity:0;animation:hup-a .6s cubic-bezier(.16,1,.3,1) var(--d,0ms) forwards}
@keyframes hup-a{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

/* ── Right visual ── */
.hvisual{position:relative;display:flex;align-items:center;justify-content:center;
  opacity:0;animation:hvis-in .9s cubic-bezier(.16,1,.3,1) .12s forwards}
@keyframes hvis-in{from{opacity:0;transform:translateX(22px) scale(.93)}to{opacity:1;transform:none}}

/* Photo scene - height MATCHES left content, width fully flexible */
.hscene{position:relative;display:flex;align-items:flex-end;justify-content:center;
  width:100%;height:100%}

/* Photo wrap - unconstrained width */
.hwrap{position:relative;z-index:2;
  display:flex;align-items:flex-end;justify-content:center;
  width:100%;height:100%}

.hphoto{display:block;width:auto;height:100%;max-height:100%;
  object-fit:contain;object-position:bottom center;
  filter:drop-shadow(0 8px 32px rgba(0,0,0,.28));
  position:relative;z-index:2}
[data-theme=dark] .hphoto{filter:drop-shadow(0 12px 40px rgba(0,0,0,.52))}

/* Photo glow */
.hglow{position:absolute;bottom:0;left:10%;right:10%;height:70%;z-index:1;pointer-events:none;
  background:radial-gradient(ellipse at 50% 80%,rgba(37,99,235,.24) 0%,transparent 68%);
  filter:blur(32px);animation:hglow-p 4s ease-in-out infinite}
[data-theme=light] .hglow{background:radial-gradient(ellipse at 50% 80%,rgba(37,99,235,.12) 0%,transparent 68%)}
@keyframes hglow-p{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}

/* ── Futuristic bottom bar (2D top-view hologram ring) ── */
.hring-wrap{position:absolute;bottom:-2px;left:50%;transform:translateX(-50%);z-index:3;
  width:min(280px,90%);pointer-events:none}
.hring{position:relative;height:32px;overflow:visible}
.hring svg{width:100%;height:100%;overflow:visible}

/* ── Floating icons ── */
.hicon{position:absolute;z-index:8;width:var(--sz,44px);height:var(--sz,44px);border-radius:12px;
  background:rgba(11,17,36,.75);border:1px solid rgba(148,163,184,.2);
  box-shadow:0 4px 20px rgba(0,0,0,.3),inset 0 0 0 1px rgba(255,255,255,.04);
  display:flex;align-items:center;justify-content:center;padding:9px;
  backdrop-filter:blur(16px) saturate(170%);animation:hicon-f var(--dur,3.5s) ease-in-out var(--del,0s) infinite}
[data-theme=light] .hicon{background:rgba(255,255,255,.93);border-color:rgba(226,232,240,.85);box-shadow:0 4px 16px rgba(0,0,0,.09)}
.hicon img{width:100%;height:100%;object-fit:contain;display:block}
@keyframes hicon-f{0%,100%{transform:translateY(0) rotate(0deg)}38%{transform:translateY(-10px) rotate(3.5deg)}72%{transform:translateY(5px) rotate(-2deg)}}

/* Desktop icon positions */
.hicon-html  {--sz:46px;top:16%;left:-32px;--dur:3.9s;--del:0s}
.hicon-css   {--sz:40px;top:52%;left:-28px;--dur:4.4s;--del:.65s}
.hicon-python{--sz:40px;top:10%;right:-30px;--dur:3.6s;--del:1.2s}
.hicon-vscode{--sz:44px;top:48%;right:-28px;--dur:3.3s;--del:.95s}
.hicon-design{--sz:36px;top:78%;left:-22px;--dur:4.8s;--del:.35s}

/* Scroll button */
.hscroll{position:absolute;bottom:1.2rem;left:50%;transform:translateX(-50%);z-index:8;
  display:flex;flex-direction:column;align-items:center;gap:5px;
  background:none;border:none;cursor:pointer;padding:8px;
  animation:hscroll-a 2.8s ease-in-out infinite;transition:color .15s}
.hscroll-track{width:24px;height:38px;border-radius:12px;
  border:1.5px solid rgba(148,163,184,.3);display:flex;align-items:flex-start;justify-content:center;
  padding-top:5px;transition:border-color .2s}
[data-theme=light] .hscroll-track{border-color:rgba(99,102,241,.35)}
.hscroll:hover .hscroll-track{border-color:var(--accent-primary)}
.hscroll-dot{width:5px;height:8px;border-radius:3px;background:rgba(148,163,184,.5);
  animation:hscroll-dot 2.8s ease-in-out infinite;transition:background .2s}
.hscroll:hover .hscroll-dot{background:var(--accent-primary)}
.hscroll-lbl{font-size:.55rem;letter-spacing:.15em;text-transform:uppercase;
  color:rgba(148,163,184,.45);font-family:var(--font-mono);transition:color .2s}
.hscroll:hover .hscroll-lbl{color:var(--accent-primary)}
@keyframes hscroll-a{0%,100%{opacity:.45;transform:translateX(-50%) translateY(0)}50%{opacity:.9;transform:translateX(-50%) translateY(6px)}}
@keyframes hscroll-dot{0%,100%{transform:translateY(0);opacity:.6}50%{transform:translateY(16px);opacity:1}}

/* ──────────── TABLET ≤900px ──────────── */
@media(max-width:900px){
  .hero{height:auto;max-height:none;min-height:100dvh}
  .hinner{grid-template-columns:1fr;padding-block:2rem 3.5rem;gap:1rem;text-align:center;align-items:start}
  .hcontent{align-items:center;order:2}
  .hvisual{order:1;height:auto}
  .hbio{max-width:80%;text-align:center}
  .hcta,.hsocials,.hstats{justify-content:center}
  .hchip,.hname-line{align-self:center}

  /* Circular frame for tablet */
  .hscene{width:clamp(170px,46vw,220px);height:clamp(170px,46vw,220px);align-items:center}
  .hwrap{border-radius:50%;overflow:hidden;
    box-shadow:0 0 0 4px var(--bg-page),0 0 0 6px var(--border-color),0 0 28px rgba(37,99,235,.16);
    animation:ring-pulse 3s ease-in-out infinite}
  .hphoto{width:100%;height:100%;object-fit:cover;object-position:top center}
  .hglow{display:none}
  .hring-wrap{display:none}
  @keyframes ring-pulse{
    0%,100%{box-shadow:0 0 0 4px var(--bg-page),0 0 0 6px var(--border-color),0 0 20px rgba(37,99,235,.10)}
    50%{box-shadow:0 0 0 4px var(--bg-page),0 0 0 6px rgba(96,165,250,1),0 0 34px rgba(37,99,235,.26)}
  }

  /* Floating icon positions: away from frame, between frame and body edge */
  .hicon-html  {--sz:34px;top:-18px;left:12%;animation-name:hicon-f}
  .hicon-css   {--sz:30px;top:50%;left:-18px;transform:translateY(-50%);animation-name:hicon-fy}
  .hicon-python{--sz:34px;top:-18px;right:12%;animation-name:hicon-f}
  .hicon-vscode{--sz:30px;top:50%;right:-18px;transform:translateY(-50%);animation-name:hicon-fy}
  .hicon-design{display:none}
  .hscroll{display:none}

  /* Gradient covers less on mobile */
  .hgrad-main{height:35%}
  .hgrad-top{height:40%}
}
@keyframes hicon-fy{0%,100%{transform:translateY(-50%) rotate(0deg)}50%{transform:translateY(calc(-50% - 9px)) rotate(4deg)}}

/* ──────────── MOBILE ≤520px ──────────── */
@media(max-width:520px){
  .hinner{padding-block:1.5rem 2.5rem;gap:.85rem}
  .hscene{width:148px;height:148px}
  .hicon{--sz:30px!important;padding:7px;border-radius:9px}
  .hicon-html{top:-14px;left:10%}
  .hicon-css{top:50%;left:-14px}
  .hicon-python{top:-14px;right:10%}
  .hicon-vscode{top:50%;right:-14px}
  .hbio{max-width:92%}
}

/* ──────────── LARGE ≥1400px ──────────── */
@media(min-width:1400px){.hinner{max-width:1380px}}
@media(max-height:580px) and (min-width:521px){
  .hero{max-height:none;height:auto;min-height:100dvh}
}
      `}</style>

      <section className="hero" id="hero" aria-label="Hero">
        {/* BG layers */}
        <div className="hbg" aria-hidden="true" />
        <div className="hstars" aria-hidden="true">{STARS.map(s => <span key={s.key} className="hstar" style={s.style} />)}</div>
        <div className="horb horb-1" aria-hidden="true" />
        <div className="horb horb-2" aria-hidden="true" />
        <div className="horb horb-3" aria-hidden="true" />
        <div className="hparts" aria-hidden="true">{PARTS.map(p => <span key={p.key} className="hpart" style={p.style}>{p.ch}</span>)}</div>

        {/* Bottom gradients */}
        <div className="hgrad-main" aria-hidden="true" />
        <div className="hgrad-top"  aria-hidden="true" />

        <div className="hinner">
          {/* ── LEFT CONTENT ── */}
          <div className="hcontent">
            {/* Salam chip — signature style, NOT a badge */}
            <div className="hchip hup" style={{ '--d': '0ms' }}>
              <span className="hchip-salam">Assalamu Alaikum</span>
              <FontAwesomeIcon icon={faHand} className="hchip-icon" aria-hidden="true" />
              <span className="hchip-rest">I am —</span>
            </div>

            {/* Name */}
            <h1 className="hname" aria-label="Muhtasim Rahman (Turzo)">
              <span className="hname-line">
                <span className="hname-in hname-main" style={{ '--d': '80ms' }}>Muhtasim</span>
              </span>
              <span className="hname-line">
                <span className="hname-in hname-last" style={{ '--d': '190ms' }}>
                  Rahman<span className="hname-nick">(Turzo)</span>
                </span>
              </span>
            </h1>

            {/* Typing role */}
            <div className="hrole hup" style={{ '--d': '340ms' }} aria-live="polite">
              <span className="hrole-typed">{typed}</span>
              <span className="hcursor" aria-hidden="true">|</span>
            </div>

            {/* Bio */}
            <p className="hbio hup" style={{ '--d': '440ms' }}>
              Self-taught developer &amp; designer from Bangladesh —
              building clean, fast and meaningful digital experiences.
            </p>

            {/* Buttons */}
            <div className="hcta hup" style={{ '--d': '540ms' }}>
              <Link to="/projects" className="hbtn hbtn-p" title="Browse all my projects and work">
                <FontAwesomeIcon icon={faFolderOpen} aria-hidden="true" />
                View Projects
              </Link>
              {cvEnabled && cvUrl
                ? <a href={cvUrl} target="_blank" rel="noopener noreferrer"
                    className="hbtn hbtn-o" title="Download my CV / Resume as PDF">
                    <FontAwesomeIcon icon={faDownload} aria-hidden="true" />
                    Download CV
                  </a>
                : <Link to="/contact" className="hbtn hbtn-o" title="Download CV — Upload one from Admin Panel">
                    <FontAwesomeIcon icon={faDownload} aria-hidden="true" />
                    Download CV
                  </Link>
              }
            </div>

            {/* Social links */}
            <div className="hsocials hup" style={{ '--d': '630ms' }} aria-label="Social links">
              {SOCIALS.map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="hsocial" aria-label={label} title={label}>
                  <FontAwesomeIcon icon={icon} aria-hidden="true" />
                </a>
              ))}
            </div>

            {/* Stats */}
            <div ref={sRef} className="hstats hup" style={{ '--d': '720ms' }}>
              <StatItem value={yDev}  label="Yrs Dev"    inView={inView} />
              <div className="hstat-div" />
              <StatItem value={yDes}  label="Yrs Design" inView={inView} />
              <div className="hstat-div" />
              <StatItem value={proj}  label="Projects"   inView={inView} />
            </div>
          </div>

          {/* ── RIGHT VISUAL ── */}
          <div className="hvisual" aria-hidden="true">
            <div className="hscene">
              <div className="hglow" />

              {/* Photo — unconstrained width, height = 100% of scene */}
              <div className="hwrap">
                <img src="/hero.webp" alt="Muhtasim Rahman" className="hphoto"
                  loading="eager" fetchPriority="high" />
              </div>

              {/* Futuristic 2D hologram ring at bottom */}
              <div className="hring-wrap">
                <div className="hring">
                  <svg viewBox="0 0 280 32" xmlns="http://www.w3.org/2000/svg" overflow="visible">
                    <defs>
                      <radialGradient id="rg1" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                      </radialGradient>
                      <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    </defs>
                    {/* Outer ring */}
                    <ellipse cx="140" cy="12" rx="136" ry="10" fill="none" stroke="rgba(59,130,246,0.35)" strokeWidth="1">
                      <animate attributeName="stroke-opacity" values="0.35;0.65;0.35" dur="2.8s" repeatCount="indefinite"/>
                    </ellipse>
                    {/* Inner ring */}
                    <ellipse cx="140" cy="12" rx="90" ry="7" fill="none" stroke="rgba(96,165,250,0.55)" strokeWidth="1.2" filter="url(#glow)">
                      <animate attributeName="stroke-opacity" values="0.55;0.9;0.55" dur="2.2s" repeatCount="indefinite"/>
                    </ellipse>
                    {/* Center glow dot */}
                    <ellipse cx="140" cy="12" rx="18" ry="4" fill="url(#rg1)">
                      <animate attributeName="rx" values="18;24;18" dur="1.8s" repeatCount="indefinite"/>
                    </ellipse>
                    {/* Rising particles */}
                    {[60,90,120,140,160,180,210].map((x,i) => (
                      <line key={i} x1={x} y1="12" x2={x} y2={-14-i*3} stroke="rgba(147,197,253,0.6)" strokeWidth={i%3===0?1.5:0.8}>
                        <animate attributeName="y2" values={`${-14-i*3};${-28-i*4};${-14-i*3}`} dur={`${1.4+i*0.18}s`} repeatCount="indefinite"/>
                        <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur={`${1.4+i*0.18}s`} repeatCount="indefinite"/>
                      </line>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Floating tech icons */}
              {FLOAT_ICONS.map(ic => (
                <div key={ic.file}
                  className={`hicon hicon-${ic.file}`}
                  style={{ '--dur': ic.dur, '--del': ic.del }}
                  title={ic.label}>
                  <img src={`/icons/${ic.file}.svg`} alt={ic.label} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll button */}
        <button className="hscroll" type="button"
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.88, behavior: 'smooth' })}
          aria-label="Scroll down">
          <div className="hscroll-track">
            <div className="hscroll-dot" />
          </div>
          <span className="hscroll-lbl">scroll</span>
        </button>
      </section>
    </>
  )
}
