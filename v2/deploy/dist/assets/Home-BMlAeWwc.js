import{j as e,c as n}from"./motion-B0YflK6s.js";import{r as c,L as b}from"./vendor-mcV3incF.js";import{S as u,c as ce,g as de,a as me,b as pe,d as I,e as he,u as xe,f as ge,H as ue}from"./index-B2f4j69U.js";import{b as fe}from"./seo-CGGDuKfH.js";import{t as be}from"./analytics-BayCD_lo.js";import{F as o,R as Q,S as O,A,C as ve,y as ye,z as we,x as je,D as ke,T as Ne,U as Z,V as Se,W as ee,X as ze,Y as Ce,Z as Fe,s as S,_ as L,$ as Ie,b as B,a0 as _e,a1 as M,a2 as T,a3 as Ae,u as $,a4 as ae,a5 as Te,a6 as Ee,a7 as Pe,a8 as Ve,a9 as Re,aa as D,ab as Le,ac as Be,ad as Me,ae as $e,af as te,ag as De,ah as Ge,ai as He,d as Ye,aj as Oe}from"./icons-CDruSJAf.js";import"./firebase-DPKIO6Ex.js";import"./supabase-vrwWM04E.js";const U=["Web Developer","UI/UX Designer","Graphic Designer","Video Editor"];function Ue(){const[a,i]=c.useState(""),t=c.useRef(0),s=c.useRef(0),r=c.useRef(!1);return c.useEffect(()=>{let l;const m=()=>{const p=U[t.current];r.current?(i(p.slice(0,--s.current)),s.current===0?(r.current=!1,t.current=(t.current+1)%U.length,l=setTimeout(m,320)):l=setTimeout(m,44)):(i(p.slice(0,++s.current)),s.current===p.length?(r.current=!0,l=setTimeout(m,2200)):l=setTimeout(m,110))};return l=setTimeout(m,900),()=>clearTimeout(l)},[]),a}function We(a,i){const[t,s]=c.useState(0);return c.useEffect(()=>{if(!i)return;const r=parseInt(a,10),l=performance.now(),m=1100,p=x=>{const g=Math.min((x-l)/m,1),j=g<.5?2*g*g:-1+(4-2*g)*g;s(Math.round(j*r)),g<1?requestAnimationFrame(p):s(r)};requestAnimationFrame(p)},[i,a]),t}const Xe=[{icon:A,href:u.social.github,label:"GitHub",handle:"muhtasim-rahman"},{icon:ve,href:u.social.linkedin,label:"LinkedIn",handle:"mdturzo999"},{icon:ye,href:u.social.facebook,label:"Facebook",handle:"mdturzo999"},{icon:we,href:u.social.instagram,label:"Instagram",handle:"@mdturzo999"},{icon:je,href:u.social.youtube,label:"YouTube",handle:"@mdturzo999"},{icon:ke,href:u.social.telegram,label:"Telegram",handle:"@mdturzo16"}],W=[{ch:".",c:"rgba(59,130,246,V)",l:"rgba(37,99,235,V)",s:"0.65rem"},{ch:"*",c:"rgba(99,102,241,V)",l:"rgba(79,70,229,V)",s:"0.48rem"},{ch:"*",c:"rgba(147,197,253,V)",l:"rgba(96,165,250,V)",s:"0.44rem"},{ch:"o",c:"rgba(96,165,250,V)",l:"rgba(59,130,246,V)",s:"0.50rem"},{ch:"*",c:"rgba(167,139,250,V)",l:"rgba(139,92,246,V)",s:"0.52rem"},{ch:"*",c:"rgba(139,92,246,V)",l:"rgba(124,58,237,V)",s:"0.38rem"},{ch:"+",c:"rgba(147,197,253,V)",l:"rgba(96,165,250,V)",s:"0.56rem"}],qe=Array.from({length:40},(a,i)=>{const t=W[i%W.length],s=(.18+Math.random()*.32).toFixed(2);return{key:i,ch:t.ch,style:{left:`${(3+Math.random()*94).toFixed(1)}%`,"--pd":`${(9+Math.random()*14).toFixed(1)}s`,"--pp":`${(Math.random()*20).toFixed(1)}s`,"--po":s,"--ps":t.s,"--px":`${((Math.random()-.5)*70).toFixed(0)}px`,"--pr":`${((Math.random()-.5)*260).toFixed(0)}deg`,"--pc":t.c.replace("V",s),"--pc-l":t.l.replace("V",s)}}}),Ke=Array.from({length:48},(a,i)=>{const t=Math.random()<.7?1:Math.random()<.8?2:3;return{key:i,style:{width:t,height:t,left:`${(Math.random()*100).toFixed(1)}%`,top:`${(Math.random()*100).toFixed(1)}%`,"--dur":`${(2+Math.random()*5).toFixed(1)}s`,"--del":`${(Math.random()*9).toFixed(1)}s`,"--op-lo":(.03+Math.random()*.09).toFixed(2),"--op-hi":(.18+Math.random()*.42).toFixed(2)}}});function P({value:a,label:i,sep:t,inView:s}){const r=parseInt(a,10),l=We(r,s);return e.jsxs(e.Fragment,{children:[t&&e.jsx("div",{className:"hstat-sep"}),e.jsxs("div",{className:"hstat",children:[e.jsxs("div",{className:"hstat-num",children:[e.jsx("span",{children:l}),e.jsx(o,{icon:Ne,className:"hstat-plus","aria-hidden":"true"})]}),e.jsx("span",{className:"hstat-lbl",children:i})]})]})}function Je({settings:a,settingsLoading:i}){const t=Ue(),s=c.useRef(null),[r,l]=c.useState(!1),m=(a==null?void 0:a.cvEnabled)??!1,p=(a==null?void 0:a.cvUrl)??"#",x=(a==null?void 0:a.statsYearsDev)??3,g=(a==null?void 0:a.statsYearsDesign)??6,j=(a==null?void 0:a.statsProjects)??16;return c.useEffect(()=>{if(!s.current)return;const h=new IntersectionObserver(([k])=>{k.isIntersecting&&l(!0)},{threshold:.2});return h.observe(s.current),()=>h.disconnect()},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
.hname-nick{font-size:.3em;font-weight:500;color:var(--text-tertiary);letter-spacing:.03em;vertical-align:middle;font-family:var(--font-mono);margin-left:.5em;opacity:0;animation:hfade .5s ease 1.1s forwards}
.hname-turzo{font-size:.38em;font-weight:500;color:var(--text-tertiary);letter-spacing:.02em;vertical-align:middle;font-family:var(--font-mono);}
@keyframes hfade{to{opacity:1}}

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

/* Image container -- fixed size per breakpoint, never grows */
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

/* Image frame */
.himg-frame{
  position:relative;z-index:1;
  width:100%;height:100%;
  overflow:hidden;
  background:transparent;
  border:none;
  box-shadow:none;
}
/* Bottom fade gradient - keep */
.himg-frame::after{
  content:'';position:absolute;z-index:2;pointer-events:none;
  bottom:0;left:0;right:0;height:38%;
  background:linear-gradient(to top,var(--bg-page) 0%,var(--bg-page) 8%,rgba(2,6,23,.7) 32%,transparent 100%);
}
[data-theme=light] .himg-frame::after{
  background:linear-gradient(to top,var(--bg-page) 0%,var(--bg-page) 6%,rgba(240,244,248,.8) 30%,transparent 100%);
}

.himg-photo{
  width:100%;height:100%;
  object-fit:cover;object-position:top center;
  display:block;
  filter:drop-shadow(0 8px 30px rgba(0,0,0,.2));
}
[data-theme=dark] .himg-photo{filter:drop-shadow(0 8px 30px rgba(0,0,0,.45))}

/* Small floating badge */
.himg-badge{
  position:absolute;bottom:16px;left:16px;z-index:3;
  display:inline-flex;align-items:center;gap:.4rem;
  padding:.35rem .7rem;border-radius:9999px;
  background:rgba(8,15,35,.85);
  border:1px solid rgba(59,130,246,.3);
  backdrop-filter:blur(12px);
  font-size:.72rem;font-weight:600;
  color:rgba(147,197,253,.95);
  font-family:var(--font-mono);
  box-shadow:0 4px 16px rgba(0,0,0,.25);
}
.himg-badge-dot{
  width:6px;height:6px;border-radius:50%;
  background:#22c55e;
  box-shadow:0 0 6px #22c55e;
  animation:badge-p 1.8s ease-in-out infinite;
  flex-shrink:0;
}
@keyframes badge-p{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.3)}}
[data-theme=light] .himg-badge{
  background:rgba(255,255,255,.9);
  border-color:rgba(37,99,235,.25);
  color:var(--accent-primary);
}

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

/* md: 768-899 ? single column, image on top */
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
  .himg-box{width:clamp(200px,52vw,280px);height:clamp(250px,64vw,350px)}
  /* Round frame on mobile/tablet */
  .himg-box{width:clamp(180px,46vw,240px);height:clamp(180px,46vw,240px)}
  .himg-frame{border-radius:50%;background:var(--bg-surface-2)!important;border:none!important;box-shadow:0 0 0 4px var(--bg-page),0 0 0 6px var(--border-color),0 0 30px rgba(37,99,235,.16);animation:hring-p 3s ease-in-out infinite}
  [data-theme=light] .himg-frame{background:var(--bg-surface)!important;}
  .hname-turzo{display:block;font-size:.42em;margin-left:0;margin-top:.1em;}
  .himg-glow{border-radius:50%}
  .himg-frame::before,.himg-frame::after{display:none}
  .himg-badge{bottom:auto;top:-8px;left:50%;transform:translateX(-50%)}
}
@keyframes hring-p{0%,100%{box-shadow:0 0 0 4px var(--bg-page),0 0 0 6px var(--border-color),0 0 20px rgba(37,99,235,.1)}50%{box-shadow:0 0 0 4px var(--bg-page),0 0 0 6px #60A5FA,0 0 36px rgba(37,99,235,.26)}}

/* sm: 640-767 */
@media(min-width:640px) and (max-width:899px){
  .himg-box{width:clamp(200px,44vw,260px);height:clamp(200px,44vw,260px)}
}

/* xs: <480 */
@media(max-width:479px){
  .hero-inner{padding-top:calc(var(--navbar-h) + 2rem);padding-bottom:2.5rem;gap:1.5rem}
  .himg-box{width:clamp(160px,42vw,200px);height:clamp(160px,42vw,200px)}
  .hname{font-size:clamp(1.9rem,9vw,2.4rem)}
}

/* xxs: <360 */
@media(max-width:359px){
  .himg-box{width:150px;height:150px}
  .hname{font-size:1.8rem}
}
`}),e.jsxs("section",{className:"hero",id:"hero","aria-label":"Introduction",children:[e.jsx("div",{className:"hero-tex","aria-hidden":"true"}),e.jsx("div",{className:"hero-orb hero-orb-1","aria-hidden":"true"}),e.jsx("div",{className:"hero-orb hero-orb-2","aria-hidden":"true"}),e.jsx("div",{className:"hero-orb hero-orb-3","aria-hidden":"true"}),e.jsx("div",{className:"hero-stars","aria-hidden":"true",children:Ke.map(h=>e.jsx("span",{className:"hero-star",style:h.style,"aria-hidden":"true"},h.key))}),e.jsx("div",{className:"hero-parts","aria-hidden":"true",children:qe.map(h=>e.jsx("span",{className:"hero-part",style:h.style,"aria-hidden":"true",children:h.ch},h.key))}),e.jsx("div",{className:"hero-grad-btm","aria-hidden":"true"}),e.jsxs("div",{className:"hero-inner",children:[e.jsxs("div",{className:"hcontent",children:[e.jsxs("div",{className:"hgreet hup",style:{"--d":"0ms"},children:[e.jsx("span",{className:"hgreet-salam",children:"Assalamu Alaikum"}),e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"1.1em",verticalAlign:"middle",color:"var(--accent-secondary, #f59e0b)",lineHeight:1,display:"inline-flex",alignItems:"center"},"aria-hidden":"true",children:"waving_hand"}),e.jsx("span",{className:"hgreet-rest",children:"I am --"})]}),e.jsx("h1",{className:"hname","aria-label":"Muhtasim Rahman (Turzo)",children:e.jsx("span",{className:"hname-line",children:e.jsxs("span",{className:"hname-in",style:{"--d":"70ms"},children:["Muhtasim ",e.jsx("span",{className:"hname-acc",children:"Rahman"}),e.jsx("span",{className:"hname-turzo",children:" (Turzo)"})]})})}),e.jsxs("div",{className:"hrole hup",style:{"--d":"320ms"},"aria-live":"polite",children:[e.jsx("span",{className:"hrole-t",children:t}),e.jsx("span",{className:"hcursor","aria-hidden":"true",children:"|"})]}),e.jsx("p",{className:"hbio hup",style:{"--d":"430ms"},children:"Self-taught developer & designer from Bangladesh -- building clean, fast and meaningful digital experiences."}),e.jsxs("div",{className:"hcta hup",style:{"--d":"530ms"},children:[e.jsxs("span",{className:"hbtn-wrap",children:[e.jsxs(b,{to:"/projects",className:"hbtn hbtn-p",children:[e.jsx(o,{icon:Q,"aria-hidden":"true"})," View Projects"]}),e.jsx("span",{className:"hbtn-tt",children:"Browse all my work & case studies"})]}),e.jsxs("span",{className:"hbtn-wrap",children:[m&&p&&p!=="#"?e.jsxs("a",{href:p,target:"_blank",rel:"noopener noreferrer",className:"hbtn hbtn-o",children:[e.jsx(o,{icon:O,"aria-hidden":"true"})," Download CV"]}):e.jsxs("span",{className:"hbtn hbtn-o",style:{opacity:.7,cursor:"default"},children:[e.jsx(o,{icon:O,"aria-hidden":"true"})," Download CV"]}),e.jsx("span",{className:"hbtn-tt",children:m&&p&&p!=="#"?"Download my resume as a PDF":"CV will be uploaded soon"})]})]}),e.jsx("div",{className:"hsocials hup",style:{"--d":"620ms"},"aria-label":"Social links",children:Xe.map(({icon:h,href:k,label:z,handle:d})=>e.jsxs("span",{className:"hsocial-wrap",children:[e.jsx("a",{href:k,target:"_blank",rel:"noopener noreferrer",className:"hsocial","aria-label":`${z} -- ${d}`,children:e.jsx(o,{icon:h,"aria-hidden":"true"})}),e.jsx("span",{className:"hsocial-tt",children:d})]},z))}),e.jsxs("div",{ref:s,className:"hstats hup",style:{"--d":"710ms"},"aria-label":"Stats",children:[e.jsx(P,{value:x,label:"Yrs Dev",sep:!1,inView:r}),e.jsx(P,{value:g,label:"Yrs Design",sep:!0,inView:r}),e.jsx(P,{value:j,label:"Projects",sep:!0,inView:r})]})]}),e.jsx("div",{className:"hvisual","aria-hidden":"true",children:e.jsxs("div",{className:"himg-box",children:[e.jsx("div",{className:"himg-glow"}),e.jsx("div",{className:"himg-frame",children:e.jsx("img",{src:"/hero.webp",alt:"Muhtasim Rahman",className:"himg-photo",loading:"eager",fetchPriority:"high"})})]})})]})]})]})}const Qe=[{icon:Z,color:"#3B82F6",label:"Location",value:"Nilphamari, Bangladesh"},{icon:Se,color:"#10B981",label:"School",value:"SSC-26 ? SGSC"},{icon:ee,color:"#F59E0B",label:"Goal",value:"CSE Engineer & Developer"},{icon:ze,color:"#EC4899",label:"Languages",value:"Bengali ? English ? Hindi"},{icon:Ce,color:"#A855F7",label:"Values",value:"Islam ? Discipline ? Quality"}],F={hidden:{opacity:0,y:24},show:{opacity:1,y:0,transition:{duration:.5,ease:[.16,1,.3,1]}}};function Ze(){const a=ce();return e.jsxs("section",{className:"section section-alt",id:"about-mini",children:[e.jsx("div",{className:"container-xl",children:e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-items-center mx-auto",children:[e.jsx(n.motion.div,{className:"relative flex justify-center",initial:{opacity:0,x:-30},whileInView:{opacity:1,x:0},viewport:{once:!0,amount:.2},transition:{duration:.6,ease:[.16,1,.3,1]},children:e.jsxs("div",{className:"relative w-72 sm:w-80 lg:w-96",children:[e.jsx("div",{className:"absolute inset-0 translate-x-5 translate-y-5 rounded-2xl border-2 border-[var(--accent-primary)] opacity-20"}),e.jsxs("div",{className:"relative rounded-2xl overflow-hidden aspect-[3/4] border border-[var(--border-strong)] bg-[var(--bg-surface-2)] shadow-[var(--shadow-xl)]",children:[e.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(135deg,#0F172A,#1E293B 60%,#1E3A8A)"}}),e.jsx("img",{src:"/muhtasim-about.webp",alt:"Muhtasim Rahman",className:"absolute inset-0 w-full h-full object-cover",onError:i=>{i.target.style.display="none"}}),e.jsx("div",{className:"about-img-overlay absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"}),e.jsxs("div",{className:"absolute bottom-4 left-4",children:[e.jsx("p",{className:"text-white font-bold font-display",children:u.owner.displayName}),e.jsxs("p",{className:"text-white/60 text-xs mt-0.5",children:["Age ",a," ? Bangladesh"]})]})]}),e.jsxs(n.motion.div,{className:"absolute -right-6 top-12 card px-3 py-2 shadow-[var(--shadow-lg)] text-center min-w-[78px]",animate:{y:[0,-6,0]},transition:{duration:3,repeat:1/0,ease:"easeInOut"},children:[e.jsx("p",{className:"text-xl font-display font-extrabold text-[var(--accent-primary)]",children:"3+"}),e.jsx("p",{className:"text-[10px] text-[var(--text-tertiary)] uppercase tracking-wide",children:"Yrs Dev"})]}),e.jsxs(n.motion.div,{className:"absolute -left-6 bottom-16 card px-3 py-2 shadow-[var(--shadow-lg)] text-center min-w-[78px]",animate:{y:[0,6,0]},transition:{duration:4,repeat:1/0,ease:"easeInOut",delay:1},children:[e.jsx("p",{className:"text-xl font-display font-extrabold text-[#10B981]",children:"16+"}),e.jsx("p",{className:"text-[10px] text-[var(--text-tertiary)] uppercase tracking-wide",children:"Projects"})]})]})}),e.jsxs(n.motion.div,{className:"flex flex-col gap-5",initial:"hidden",whileInView:"show",viewport:{once:!0,amount:.15},variants:{hidden:{},show:{transition:{staggerChildren:.09}}},children:[e.jsx(n.motion.p,{variants:F,className:"text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold",children:"About Me"}),e.jsxs(n.motion.h2,{variants:F,className:"text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] leading-tight",children:["Self-taught developer",e.jsx("br",{}),e.jsx("span",{className:"text-[var(--accent-primary)]",children:"from Bangladesh"})]}),e.jsxs(n.motion.p,{variants:F,className:"text-[var(--text-secondary)] leading-relaxed text-sm",children:["Hi, I'm ",e.jsx("strong",{className:"text-[var(--text-primary)]",children:"Muhtasim Rahman (Turzo)"}),", a ",a,"-year-old student and self-taught web developer from Nilphamari, Bangladesh. Since I was young I've been fascinated by technology -- from circuits to my first HTML page."]}),e.jsxs(n.motion.p,{variants:F,className:"text-[var(--text-secondary)] leading-relaxed text-sm",children:["Currently preparing for HSC while building real-world projects. My goal is to become a professional full-stack developer and pursue a CSE degree. All work follows ",e.jsx("strong",{className:"text-[var(--text-primary)]",children:"Islamic & ethical principles"}),"."]}),e.jsxs(n.motion.div,{variants:F,className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:[Qe.map(({icon:i,color:t,label:s,value:r})=>e.jsxs("div",{className:"flex items-start gap-2.5 p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors duration-200",children:[e.jsx("div",{className:"w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5",style:{background:`${t}18`,color:t},children:e.jsx(o,{icon:i,className:"text-xs"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium",children:s}),e.jsx("p",{className:"text-xs text-[var(--text-secondary)] mt-0.5",children:r})]})]},s)),e.jsxs(b,{to:"/about",className:"group flex items-start gap-2.5 p-3 rounded-lg border transition-all duration-200 active:scale-[.98]",style:{background:"linear-gradient(135deg,rgba(59,130,246,.1),rgba(99,102,241,.06))",borderColor:"rgba(59,130,246,.3)"},children:[e.jsx("div",{className:"w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5",style:{background:"rgba(59,130,246,.18)",color:"var(--accent-primary)"},children:e.jsx(o,{icon:Fe,className:"text-xs"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"text-[10px] uppercase tracking-wider text-[var(--accent-primary)] font-medium opacity-80",children:"More"}),e.jsxs("p",{className:"text-xs font-semibold text-[var(--accent-primary)] mt-0.5 flex items-center gap-1",children:["Read Full Story",e.jsx(o,{icon:S,className:"text-[10px] transition-transform duration-200 group-hover:translate-x-1"})]})]})]})]})]})]})}),e.jsx("style",{children:`
        .about-img-overlay {
          background: linear-gradient(to top, rgba(2,6,23,0.85), transparent);
        }
        [data-theme="light"] .about-img-overlay {
          background: linear-gradient(to top, rgba(248,250,252,0.18), transparent);
        }
      `})]})}const X=[{id:"linkivo",slug:"linkivo",title:"Linkivo -- Smart Link Manager",short_description:"PWA for intelligent link management with weighted discovery and GSAP animations.",thumbnail_url:null,github_link:null,live_link:null,tags:["PWA","Firebase","GSAP"],category:"Web App"},{id:"qr-prism",slug:"qr-prism",title:"QR Prism",short_description:"Feature-rich PWA for QR generation, scanning, batch processing with cloud storage.",thumbnail_url:null,github_link:"https://github.com/muhtasim-rahman/qr-prism",live_link:"https://muhtasim-rahman.github.io/qr-prism",tags:["PWA","Firebase","QR"],category:"Utility"},{id:"ufmt",slug:"ufmt-ssc26",title:"FMT Tracker Pro -- SSC-26",short_description:"Merit tracking dashboard for SSC-26 students powered by Google Sheets.",thumbnail_url:null,github_link:"https://github.com/muhtasim-rahman/UFMT-SSC26",live_link:"https://muhtasim-rahman.github.io/UFMT-SSC26/",tags:["Education","Sheets","Charts"],category:"Education"},{id:"notif",slug:"notification-panel",title:"Notification Panel",short_description:"Plug-and-play notification panel powered by Google Sheets for any website.",thumbnail_url:null,github_link:"https://github.com/muhtasim-rahman/notification-panel",live_link:null,tags:["Component","Open Source"],category:"UI Component"},{id:"exporter",slug:"exporter-pro",title:"Project Exporter Pro",short_description:"JS export engine: PNG, JPG, SVG, PDF with Shadow DOM isolation.",thumbnail_url:null,github_link:"https://github.com/muhtasim-rahman/exporter-pro",live_link:null,tags:["Library","Shadow DOM"],category:"Dev Tool"},{id:"halal",slug:"halal",title:"Halal -- World of Muslims",short_description:"Interactive Islamic resource covering the Five Pillars of Islam.",thumbnail_url:null,github_link:"https://github.com/muhtasim-rahman/halal",live_link:"https://muhtasim-rahman.github.io/halal",tags:["Islamic","Educational"],category:"Islamic"}],q={"Web App":"#3B82F6",Utility:"#10B981",Education:"#F59E0B","UI Component":"#EC4899","Dev Tool":"#A855F7",Islamic:"#06B6D4",default:"#64748B"};function ea({p:a,i}){var l;const t=a.accent_color||q[a.category]||q.default,[s,r]=c.useState(!1);return e.jsxs(n.motion.div,{className:"rp-card card flex flex-col overflow-hidden transition-all duration-300",style:{borderColor:s?t:void 0,"--card-color":t},onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),initial:{opacity:0,y:28},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.1},transition:{duration:.45,delay:i*.07},children:[e.jsxs(b,{to:`/projects/${a.slug}`,className:"block relative h-40 bg-[var(--bg-surface-2)] overflow-hidden flex-shrink-0 group",children:[a.thumbnail_url?e.jsx("img",{src:a.thumbnail_url,alt:a.title,className:"w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",loading:"lazy"}):e.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-2",style:{background:`linear-gradient(135deg,${t}18,${t}08)`},children:[e.jsx(o,{icon:Q,className:"text-3xl",style:{color:`${t}60`}}),e.jsx("span",{className:"text-xs text-[var(--text-tertiary)]",children:a.category})]}),e.jsx("div",{className:"absolute top-3 left-3",children:e.jsx("span",{className:"text-[10px] font-semibold px-2 py-0.5 rounded-full",style:{background:`${t}22`,color:t,border:`1px solid ${t}35`,backdropFilter:"blur(4px)"},children:a.category})}),e.jsxs("div",{className:"absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200",children:[a.github_link&&e.jsx("a",{href:a.github_link,target:"_blank",rel:"noopener noreferrer",onClick:m=>m.stopPropagation(),className:"w-7 h-7 rounded-md bg-[var(--bg-surface-2)]/90 backdrop-blur-sm flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors text-xs",children:e.jsx(o,{icon:A})}),a.live_link&&e.jsx("a",{href:a.live_link,target:"_blank",rel:"noopener noreferrer",onClick:m=>m.stopPropagation(),className:"w-7 h-7 rounded-md bg-[var(--bg-surface-2)]/90 backdrop-blur-sm flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors text-xs",children:e.jsx(o,{icon:L})})]})]}),e.jsxs(b,{to:`/projects/${a.slug}`,className:"flex flex-col gap-2.5 flex-1 p-4 group/body",children:[((l=a.tags)==null?void 0:l.length)>0&&e.jsxs("div",{className:"flex flex-wrap gap-1",children:[a.tags.slice(0,3).map(m=>e.jsxs("span",{className:"inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--bg-surface-3)] text-[var(--text-tertiary)]",children:[e.jsx(o,{icon:Ie,className:"text-[8px]"}),m]},m)),a.tags.length>3&&e.jsxs("span",{className:"text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--bg-surface-3)] text-[var(--text-tertiary)]",children:["+",a.tags.length-3]})]}),e.jsx("h3",{className:"font-display font-bold text-[var(--text-primary)] leading-snug line-clamp-2 text-sm",children:a.title}),e.jsx("p",{className:"text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1",children:a.short_description})]}),e.jsxs(b,{to:`/projects/${a.slug}`,className:"rp-card-footer flex items-center justify-between px-4 py-2.5 transition-all duration-200",style:{background:s?`${t}14`:`${t}08`,borderTop:`1px solid ${t}22`},children:[e.jsx("span",{className:"text-xs font-semibold",style:{color:t},children:"View details"}),e.jsx(o,{icon:S,className:"text-[10px] transition-transform duration-200",style:{color:t,transform:s?"translateX(3px)":"none"}})]})]})}function aa(){const[a,i]=c.useState([]),[t,s]=c.useState(!0);return c.useEffect(()=>{de().then(r=>i(r!=null&&r.length?r:X)).catch(()=>i(X)).finally(()=>s(!1))},[]),e.jsx("section",{className:"section",id:"projects-mini",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10",children:[e.jsxs(n.motion.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5},children:[e.jsx("p",{className:"text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2",children:"My Work"}),e.jsx("h2",{className:"text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]",children:"Featured Projects"})]}),e.jsx(n.motion.div,{initial:{opacity:0,x:20},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.5,delay:.1},children:e.jsxs(b,{to:"/projects",className:"inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 group",children:["All projects ",e.jsx(o,{icon:S,className:"text-xs transition-transform duration-200 group-hover:translate-x-1"})]})})]}),e.jsx("div",{className:"proj-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",children:t?Array.from({length:6},(r,l)=>e.jsx(me,{},l)):a.map((r,l)=>e.jsx(ea,{p:r,i:l},r.id))}),e.jsx("style",{children:`
          @media(max-width:639px){ .proj-grid > *:nth-child(n+4){ display:none; } }
          @media(min-width:640px) and (max-width:1023px){ .proj-grid > *:nth-child(n+5){ display:none; } }
          .rp-card { cursor: pointer; }
          .rp-card:active { transform: scale(0.985); }
          .rp-card-footer { text-decoration: none; }
        `}),e.jsx(n.motion.div,{className:"flex justify-center mt-10",initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:.2},children:e.jsxs(b,{to:"/projects",className:"inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all duration-200 active:scale-[.97] group",children:["View All Projects",e.jsx(o,{icon:S,className:"text-xs transition-transform duration-200 group-hover:translate-x-1"})]})})]})})}function ta(a,i){const[t,s]=c.useState(0);return c.useEffect(()=>{if(!i)return;const r=performance.now(),l=1300,m=p=>{const x=Math.min((p-r)/l,1),g=x<.5?2*x*x:-1+(4-2*x)*x;s(Math.round(g*a)),x<1?requestAnimationFrame(m):s(a)};requestAnimationFrame(m)},[i,a]),t}const V=[{id:"skills",label:"Skills",icon:B,items:[{name:"HTML & CSS",pct:92,color:"#F97316"},{name:"JavaScript",pct:78,color:"#EAB308"},{name:"React.js",pct:72,color:"#06B6D4"},{name:"Python",pct:65,color:"#3B82F6"},{name:"Tailwind CSS",pct:85,color:"#10B981"},{name:"Firebase",pct:60,color:"#F59E0B"}]},{id:"tools",label:"Tools",icon:_e,items:[{name:"VS Code",pct:95,color:"#3B82F6"},{name:"Figma",pct:80,color:"#EC4899"},{name:"Adobe PS",pct:74,color:"#A855F7"},{name:"Git & GitHub",pct:82,color:"#64748B"},{name:"ChatGPT / AI",pct:93,color:"#10B981"},{name:"Canva",pct:88,color:"#06B6D4"}]},{id:"learning",label:"Learning",icon:M,items:[{name:"TypeScript",pct:42,color:"#3B82F6"},{name:"Next.js",pct:38,color:"#94A3B8"},{name:"Node.js",pct:35,color:"#22C55E"},{name:"Docker",pct:22,color:"#0EA5E9"},{name:"GraphQL",pct:28,color:"#EC4899"},{name:"PostgreSQL",pct:40,color:"#6366F1"}]}],ra=[{label:"Frontend Development",color:"#3B82F6",icon:$},{label:"Graphic & UI Design",color:"#EC4899",icon:T},{label:"Video Production",color:"#A855F7",icon:ae},{label:"AI-assisted Workflow",color:"#10B981",icon:M}];function ia({name:a,pct:i,color:t,i:s,visible:r}){return e.jsxs("div",{className:"sk2-bar-row",children:[e.jsxs("div",{className:"sk2-bar-meta",children:[e.jsx("span",{className:"sk2-bar-name",children:a}),e.jsxs("span",{className:"sk2-bar-pct",style:{color:t},children:[i,"%"]})]}),e.jsx("div",{className:"sk2-bar-track",children:e.jsx(n.motion.div,{className:"sk2-bar-fill",style:{"--c":t},initial:{width:0},animate:{width:r?`${i}%`:0},transition:{duration:.72,delay:.05+s*.07,ease:[.16,1,.3,1]}})})]})}function sa({value:a,label:i,suffix:t,color:s,subLabel:r,icon:l,inView:m,delay:p}){const x=ta(a,m);return e.jsxs(n.motion.div,{className:"sk2-stat",style:{"--c":s},initial:{opacity:0,y:18},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.42,delay:p},children:[e.jsx("div",{className:"sk2-stat-icon",children:e.jsx(o,{icon:l})}),e.jsxs("div",{className:"sk2-stat-body",children:[e.jsxs("div",{className:"sk2-stat-num",children:[x,e.jsx("span",{className:"sk2-stat-suf",children:t})]}),e.jsx("div",{className:"sk2-stat-label",children:i})]})]})}function oa({settings:a}){const[i,t]=c.useState("skills"),[s,r]=c.useState(!1),[l,m]=c.useState(!1),p=c.useRef(null),x=parseInt((a==null?void 0:a.statsYearsDev)??"3",10),g=parseInt((a==null?void 0:a.statsYearsDesign)??"6",10),j=parseInt((a==null?void 0:a.statsProjects)??"16",10),h=[{value:x,label:"Years Dev",suffix:"+",color:"#3B82F6",icon:B,subLabel:"Web & code"},{value:g,label:"Years Design",suffix:"+",color:"#EC4899",icon:T,subLabel:"UI/Graphic"},{value:j,label:"Projects",suffix:"+",color:"#A855F7",icon:Ae,subLabel:"Shipped"},{value:5,label:"Languages",suffix:"+",color:"#F59E0B",icon:$,subLabel:"Code & human"}];c.useEffect(()=>{if(!p.current)return;const d=new IntersectionObserver(([N])=>{N.isIntersecting&&(m(!0),r(!0))},{threshold:.15});return d.observe(p.current),()=>d.disconnect()},[]);const k=V.find(d=>d.id===i)??V[0],z=d=>{t(d),r(!1),setTimeout(()=>r(!0),22)};return e.jsxs("section",{className:"section section-alt",id:"skills",ref:p,children:[e.jsxs("div",{className:"container-xl",children:[e.jsxs(n.motion.div,{className:"text-center mb-10",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5},children:[e.jsx("p",{className:"text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2",children:"What I Know"}),e.jsx("h2",{className:"text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]",children:"Skills & Experience"}),e.jsx("p",{className:"text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto",children:"Continuously learning and building -- from UI design to full-stack development."})]}),e.jsxs("div",{className:"sk2-layout",children:[e.jsxs("div",{className:"sk2-left",children:[e.jsx("div",{className:"sk2-stats-grid",children:h.map((d,N)=>e.jsx(sa,{...d,inView:l,delay:N*.08},d.label))}),e.jsx(n.motion.p,{className:"sk2-bio",initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:.2},children:"Self-taught developer from Bangladesh with a passion for clean code, thoughtful UI design, and meaningful digital experiences. I combine creativity with technical precision to ship products that work beautifully."}),e.jsx(n.motion.div,{className:"sk2-specs",initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:.3},children:ra.map(d=>e.jsxs("div",{className:"sk2-spec-item",children:[e.jsx("span",{className:"sk2-spec-dot",style:{background:d.color,boxShadow:`0 0 6px ${d.color}60`}}),e.jsx("span",{className:"sk2-spec-label",children:d.label})]},d.label))})]}),e.jsxs("div",{className:"sk2-right",children:[e.jsx("div",{className:"sk2-tabs",children:V.map(d=>e.jsxs("button",{onClick:()=>z(d.id),className:`sk2-tab ${i===d.id?"sk2-tab--active":""}`,children:[e.jsx(o,{icon:d.icon,className:"text-xs"}),d.label]},d.id))}),e.jsx(n.AnimatePresence,{mode:"wait",children:e.jsxs(n.motion.div,{initial:{opacity:0,x:12},animate:{opacity:1,x:0},exit:{opacity:0,x:-12},transition:{duration:.2,ease:"easeOut"},className:"sk2-bars-panel",children:[k.items.map((d,N)=>e.jsx(ia,{name:d.name,pct:d.pct,color:d.color,i:N,visible:s},d.name)),e.jsx("p",{className:"text-[10px] text-[var(--text-tertiary)] pt-3 mt-1 border-t border-[var(--border-color)]",children:"* Self-assessed from real project experience . Actively improving"})]},i)})]})]})]}),e.jsx("style",{children:`
        /* -- Two-column layout ------------------------------- */
        .sk2-layout {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 2rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .sk2-layout { grid-template-columns: 1fr; gap: 1.5rem; }
        }

        /* -- Stat cards 2x2 grid ----------------------------- */
        .sk2-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: .7rem;
          margin-bottom: 1.2rem;
        }
        .sk2-stat {
          position: relative;
          padding: .6rem .8rem .55rem;
          border-radius: 10px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-left: 2px solid var(--c);
          display: flex;
          align-items: center;
          gap: .6rem;
          transition: border-color .18s ease;
          cursor: default;
        }
        .sk2-stat:hover {
          border-color: var(--c);
        }
        .sk2-stat-icon {
          width: 28px; height: 28px;
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--c) 12%, transparent);
          color: var(--c);
          font-size: 11px;
          flex-shrink: 0;
        }
        .sk2-stat-body { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .sk2-stat-num {
          font-size: 1.2rem; font-weight: 800;
          font-family: var(--font-display);
          color: var(--text-primary);
          line-height: 1;
        }
        .sk2-stat-suf {
          font-size: .55em; font-weight: 700;
          color: var(--c); margin-left: 1px;
        }
        .sk2-stat-label {
          font-size: .68rem; font-weight: 500;
          color: var(--text-tertiary);
          white-space: nowrap;
        }

        /* -- Bio --------------------------------------------- */
        .sk2-bio {
          font-size: .83rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        /* -- Specialties ------------------------------------- */
        .sk2-specs {
          display: flex;
          flex-direction: column;
          gap: .45rem;
        }
        .sk2-spec-item {
          display: flex;
          align-items: center;
          gap: .55rem;
        }
        .sk2-spec-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .sk2-spec-label {
          font-size: .82rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        /* -- Tabs -------------------------------------------- */
        .sk2-tabs {
          display: flex;
          gap: .4rem;
          margin-bottom: 1.2rem;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 4px;
        }
        .sk2-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .4rem;
          padding: .45rem .6rem;
          border-radius: 9px;
          font-size: .8rem;
          font-weight: 600;
          color: var(--text-tertiary);
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all .18s ease;
          white-space: nowrap;
        }
        .sk2-tab:hover:not(.sk2-tab--active) {
          color: var(--text-secondary);
          background: var(--bg-surface-3);
        }
        .sk2-tab:active { transform: scale(.96); }
        .sk2-tab--active {
          background: var(--bg-surface);
          color: var(--accent-primary);
          box-shadow: 0 2px 8px rgba(0,0,0,.12), 0 1px 3px rgba(0,0,0,.08);
          border: 1px solid var(--border-color);
        }

        /* -- Skills panel + bars ----------------------------- */
        .sk2-bars-panel {
          display: flex;
          flex-direction: column;
          gap: .9rem;
        }
        .sk2-bar-row { display: flex; flex-direction: column; gap: 5px; }
        .sk2-bar-meta {
          display: flex; align-items: center; justify-content: space-between;
        }
        .sk2-bar-name {
          font-size: .84rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .sk2-bar-pct {
          font-size: 11px; font-weight: 700;
          font-family: var(--font-mono);
        }
        .sk2-bar-track {
          height: 7px;
          border-radius: 9999px;
          background: var(--bg-surface-3, var(--bg-surface-2));
          overflow: hidden;
          position: relative;
        }
        .sk2-bar-fill {
          height: 100%;
          border-radius: 9999px;
          background: linear-gradient(90deg,
            color-mix(in srgb, var(--c) 65%, transparent),
            var(--c)
          );
          position: relative;
          overflow: hidden;
        }
        .sk2-bar-fill::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255,255,255,.35) 45%,
            rgba(255,255,255,.52) 50%,
            rgba(255,255,255,.35) 55%,
            transparent 100%
          );
          transform: translateX(-100%);
          animation: sk2-shimmer 2.8s ease-in-out infinite;
          border-radius: inherit;
        }
        @keyframes sk2-shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `})]})}const na=[{year:"2019",side:"right",icon:B,color:"#3B82F6",tag:"Beginning",title:"First Line of Code",desc:'Discovered web development through YouTube. Wrote my very first HTML page -- a simple "Hello World" that sparked everything.'},{year:"2020",side:"left",icon:T,color:"#EC4899",tag:"Design",title:"Fell in Love with Design",desc:"Started exploring graphic design -- logos, banners, thumbnails. Realized that design and code together are a superpower."},{year:"2021",side:"right",icon:ee,color:"#10B981",tag:"Milestone",title:"Built First Real Project",desc:"Shipped my first complete web application. Pure HTML/CSS/JS -- no frameworks. Learned that building is the best teacher."},{year:"2022",side:"left",icon:Te,color:"#F59E0B",tag:"Growth",title:"Leveled Up with React",desc:"Picked up React and Firebase. Started building dynamic apps with real backends. Portfolio began to take real shape."},{year:"2023",side:"right",icon:M,color:"#A855F7",tag:"Expansion",title:"AI & Full-Stack Thinking",desc:"Embraced AI-assisted workflows and started thinking in full systems -- from design tokens to deployment pipelines."},{year:"2024+",side:"left",icon:Ee,color:"#06B6D4",tag:"Now",title:"Freelancing & Open Source",desc:"Taking on client projects, contributing to open source, and building tools I wish existed. The journey continues."}];function la({ev:a,i}){const t=c.useRef(null),s=n.useInView(t,{once:!0,amount:.3});return e.jsxs("div",{ref:t,className:`tl-row tl-row--${a.side}`,"aria-label":`${a.year}: ${a.title}`,children:[e.jsx("div",{className:"tl-spacer"}),e.jsxs("div",{className:"tl-mid",children:[e.jsx(n.motion.div,{className:"tl-dot",style:{"--dc":a.color,borderColor:a.color},initial:{scale:0,opacity:0},animate:s?{scale:1,opacity:1}:{},transition:{duration:.35,delay:.1},children:e.jsx(o,{icon:a.icon,className:"tl-dot-icon",style:{color:a.color}})}),e.jsx(n.motion.span,{className:"tl-year",style:{color:a.color},initial:{opacity:0},animate:s?{opacity:1}:{},transition:{duration:.3,delay:.25},children:a.year})]}),e.jsxs(n.motion.div,{className:"tl-card card",style:{"--cc":a.color},initial:{opacity:0,x:a.side==="right"?32:-32},animate:s?{opacity:1,x:0}:{},transition:{duration:.45,delay:.15,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"tl-tag",style:{background:`${a.color}18`,color:a.color,borderColor:`${a.color}30`},children:a.tag}),e.jsx("h3",{className:"tl-title",children:a.title}),e.jsx("p",{className:"tl-desc",children:a.desc})]})]})}function ca(){return e.jsxs("section",{className:"section",id:"journey",children:[e.jsxs("div",{className:"container-xl",children:[e.jsxs(n.motion.div,{className:"text-center mb-12",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5},children:[e.jsx("p",{className:"text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2",children:"How I Got Here"}),e.jsx("h2",{className:"text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]",children:"My Journey"}),e.jsx("p",{className:"text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto",children:"From a curious student to a self-taught developer -- one project at a time."})]}),e.jsxs("div",{className:"tl-wrap",children:[e.jsx("div",{className:"tl-line","aria-hidden":"true"}),na.map((a,i)=>e.jsx(la,{ev:a,i},a.year))]})]}),e.jsx("style",{children:`
        /* ---- Timeline container -------------------------------- */
        .tl-wrap {
          position: relative;
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Center vertical line */
        .tl-line {
          position: absolute;
          top: 0; bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            var(--border-color) 6%,
            var(--border-color) 94%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* ---- Each row ------------------------------------------ */
        .tl-row {
          display: grid;
          grid-template-columns: 1fr 56px 1fr;
          align-items: start;
          gap: 0;
          position: relative;
          z-index: 1;
          padding-block: 1.4rem 1rem;
        }

        /* Right-side card: card in col 3, spacer in col 1 */
        .tl-row--right .tl-spacer { order: 1; }
        .tl-row--right .tl-mid    { order: 2; }
        .tl-row--right .tl-card   { order: 3; margin-left: 1.2rem; }

        /* Left-side card: card in col 1, spacer in col 3 */
        .tl-row--left .tl-card   { order: 1; margin-right: 1.2rem; }
        .tl-row--left .tl-mid    { order: 2; }
        .tl-row--left .tl-spacer { order: 3; }

        /* ---- Center column ------------------------------------ */
        .tl-mid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .35rem;
          padding-top: .25rem;
        }

        .tl-dot {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 2px solid;
          background: var(--bg-surface);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 0 4px var(--bg-page), 0 0 12px var(--dc, #3B82F6);
          flex-shrink: 0;
          z-index: 2;
          position: relative;
        }
        .tl-dot-icon { font-size: 13px; }

        .tl-year {
          font-size: .72rem;
          font-weight: 700;
          font-family: var(--font-mono);
          letter-spacing: .03em;
          text-align: center;
          white-space: nowrap;
        }

        /* ---- Card -------------------------------------------- */
        .tl-card {
          padding: 1rem 1.1rem;
          border-radius: 14px;
          transition: border-color .2s ease, transform .2s ease;
        }
        .tl-card:hover {
          border-color: color-mix(in srgb, var(--cc) 35%, var(--border-color));
          transform: translateY(-2px);
        }

        .tl-tag {
          display: inline-flex;
          align-items: center;
          font-size: .68rem;
          font-weight: 600;
          padding: .2rem .55rem;
          border-radius: 9999px;
          border: 1px solid;
          margin-bottom: .5rem;
          letter-spacing: .02em;
        }

        .tl-title {
          font-size: .92rem;
          font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-display);
          margin-bottom: .35rem;
          line-height: 1.3;
        }

        .tl-desc {
          font-size: .78rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ---- Responsive: single column on mobile -------------- */
        @media (max-width: 680px) {
          .tl-line { left: 20px; }

          .tl-row {
            grid-template-columns: 56px 1fr;
            grid-template-rows: auto;
            padding-block: 1rem .8rem;
          }

          .tl-row--right .tl-spacer,
          .tl-row--left .tl-spacer { display: none; }

          .tl-row--right .tl-mid,
          .tl-row--left .tl-mid    { order: 1; }

          .tl-row--right .tl-card,
          .tl-row--left .tl-card   { order: 2; margin-left: .9rem; margin-right: 0; }

          .tl-dot { width: 32px; height: 32px; }
          .tl-dot-icon { font-size: 11px; }
          .tl-year { font-size: .65rem; }
        }
      `})]})}const da=[{icon:$,color:"#3B82F6",gradient:"from-blue-500/10 to-blue-600/5",title:"Website Design & Development",description:"Visually appealing, responsive, and professional websites tailored to your needs -- built with modern tech stack.",features:["Responsive design (mobile-first)","Clean & modern UI","Fast loading & optimized","SEO-friendly structure","React or static HTML/CSS"],badge:"Most popular",badgeColor:"#3B82F6"},{icon:T,color:"#EC4899",gradient:"from-pink-500/10 to-pink-600/5",title:"Graphic Design",description:"Eye-catching visuals for your brand -- logos, banners, thumbnails, posters, and more using design principles.",features:["Logo & brand identity","Social media banners","YouTube thumbnails","Event posters","Business card design"],badge:"6+ years exp.",badgeColor:"#EC4899"},{icon:ae,color:"#A855F7",gradient:"from-purple-500/10 to-purple-600/5",title:"Video Editing",description:"Professional video content for YouTube, social media, ads -- polished edits with effects and motion.",features:["YouTube video editing","Reels & Shorts","Intro / outro animation","Subtitle & captions","Color grading"],badge:"5+ years exp.",badgeColor:"#A855F7"}];function ma(){return e.jsx("section",{className:"section section-alt",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs(n.motion.div,{className:"text-center mb-12",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5},children:[e.jsx("p",{className:"text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2",children:"What I Offer"}),e.jsx("h2",{className:"text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]",children:"Services"}),e.jsx("p",{className:"text-[var(--text-secondary)] mt-3 max-w-lg mx-auto text-sm leading-relaxed",children:"I provide quality digital services -- ethically and professionally. All work follows Islamic & halal principles."})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-5",children:da.map((a,i)=>{const[t,s]=c.useState(!1);return e.jsxs(n.motion.div,{className:"card p-6 flex flex-col gap-5 relative overflow-hidden group transition-colors duration-300",style:{borderColor:t?a.color:void 0},onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.2},transition:{duration:.55,delay:i*.1,ease:[.16,1,.3,1]},children:[e.jsx("div",{className:`absolute inset-0 bg-gradient-to-br ${a.gradient} opacity-0
                  group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}),e.jsxs("div",{className:"flex items-start justify-between gap-2 relative",children:[e.jsx("div",{className:"w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",style:{background:`${a.color}18`,color:a.color},children:e.jsx(o,{icon:a.icon,className:"text-xl"})}),e.jsx("span",{className:"text-[10px] font-semibold px-2.5 py-1 rounded-full",style:{background:`${a.badgeColor}18`,color:a.badgeColor,border:`1px solid ${a.badgeColor}30`},children:a.badge})]}),e.jsxs("div",{className:"relative space-y-2",children:[e.jsx("h3",{className:"font-display font-bold text-[var(--text-primary)] text-lg leading-tight",children:a.title}),e.jsx("p",{className:"text-sm text-[var(--text-secondary)] leading-relaxed",children:a.description})]}),e.jsx("ul",{className:"relative space-y-2 flex-1",children:a.features.map(r=>e.jsxs("li",{className:"flex items-center gap-2 text-sm text-[var(--text-secondary)]",children:[e.jsx(o,{icon:Pe,className:"text-xs flex-shrink-0",style:{color:a.color}}),r]},r))}),e.jsx("div",{className:"border-t border-[var(--border-color)] relative"}),e.jsxs(b,{to:"/contact",className:`relative flex items-center justify-between text-sm font-semibold
                  group/cta`,style:{color:a.color},children:[e.jsx("span",{children:"Get this service"}),e.jsx(o,{icon:S,className:"text-xs transition-transform duration-200 group-hover/cta:translate-x-1"})]})]},a.title)})}),e.jsx(n.motion.p,{className:"text-center text-xs text-[var(--text-tertiary)] mt-8",initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.5,delay:.3},children:"All services are offered ethically. No haram content or immoral projects accepted."})]})})}const K=[{id:1,reviewer_name:"Arif Hossain",reviewer_role:"Client -- Logo Design",rating:5,body:"Exceptional design work! Muhtasim delivered a professional logo that perfectly captured my brand vision. Fast, communicative, and highly skilled."},{id:2,reviewer_name:"Tanvir Ahmed",reviewer_role:"Client -- Website",rating:5,body:"The portfolio website he built for me was clean, fast, and exactly what I needed. Great attention to detail and responsive to feedback."},{id:3,reviewer_name:"Rina Begum",reviewer_role:"Client -- Thumbnail Design",rating:4,body:"Loved the YouTube thumbnails -- vibrant and eye-catching. Click-through rate improved noticeably after switching to his designs."}];function pa({n:a}){return e.jsx("div",{className:"flex gap-0.5",children:[1,2,3,4,5].map(i=>e.jsx(o,{icon:D,className:`text-xs ${i<=a?"text-amber-400":"text-[var(--border-strong)]"}`},i))})}function ha({r:a,i}){var s;const t=(s=a.reviewer_name)==null?void 0:s.split(" ").map(r=>r[0]).join("").slice(0,2).toUpperCase();return e.jsxs(n.motion.div,{className:"card p-6 flex flex-col gap-4",initial:{opacity:0,y:24},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.2},transition:{duration:.5,delay:i*.09},children:[e.jsx(o,{icon:Re,className:"text-[var(--accent-primary)] opacity-25 text-2xl"}),e.jsxs("p",{className:"text-sm text-[var(--text-secondary)] leading-relaxed flex-1 italic",children:['"',a.body,'"']}),e.jsxs("div",{className:"flex items-center justify-between pt-3 border-t border-[var(--border-color)]",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[a.avatar_url?e.jsx("img",{src:a.avatar_url,alt:a.reviewer_name,className:"w-9 h-9 rounded-full object-cover"}):e.jsx("div",{className:"w-9 h-9 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)] text-xs font-bold flex-shrink-0",children:t}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-[var(--text-primary)]",children:a.reviewer_name}),e.jsx("p",{className:"text-[10px] text-[var(--text-tertiary)]",children:a.reviewer_role})]})]}),e.jsx(pa,{n:a.rating})]})]})}function xa(){const[a,i]=c.useState([]),[t,s]=c.useState(!0);return c.useEffect(()=>{pe({limit:3}).then(r=>i(r!=null&&r.length?r:K)).catch(()=>i(K)).finally(()=>s(!1))},[]),e.jsx("section",{className:"section",id:"reviews",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10",children:[e.jsxs(n.motion.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5},children:[e.jsx("p",{className:"text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2",children:"Kind Words"}),e.jsx("h2",{className:"text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]",children:"Reviews"}),e.jsx("p",{className:"text-sm text-[var(--text-secondary)] mt-1",children:"From clients, collaborators & visitors"})]}),e.jsxs(n.motion.div,{className:"flex items-center gap-3 flex-shrink-0",initial:{opacity:0,x:20},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.5,delay:.1},children:[e.jsxs(b,{to:"/reviews",className:"inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 group",children:["View all ",e.jsx(o,{icon:S,className:"text-xs transition-transform duration-200 group-hover:translate-x-1"})]}),e.jsxs(b,{to:"/reviews/give",className:"inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] transition-colors duration-200 active:scale-[.97]",children:[e.jsx(o,{icon:Ve,className:"text-xs"})," Give Review"]})]})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-5",children:t?Array.from({length:3},(r,l)=>e.jsxs("div",{className:"card p-6 space-y-4",children:[e.jsx(I,{h:"h-4",w:"w-8",rounded:"rounded"}),e.jsx(I,{h:"h-16",rounded:"rounded",delay:.05}),e.jsxs("div",{className:"flex items-center gap-2 pt-2 border-t border-[var(--border-color)]",children:[e.jsx(he,{size:36})," ",e.jsxs("div",{className:"space-y-1.5 flex-1",children:[e.jsx(I,{h:"h-3.5",w:"w-24",rounded:"rounded"}),e.jsx(I,{h:"h-3",w:"w-16",rounded:"rounded",delay:.08})]})]})]},l)):a.map((r,l)=>e.jsx(ha,{r,i:l},r.id))})]})})}const w="muhtasim-rahman",_="#c084fc",J={JavaScript:"#f7df1e",TypeScript:"#3178c6",Python:"#3776ab",HTML:"#e44d26",CSS:"#264de4",Shell:"#89e051",PHP:"#777bb4",Java:"#b07219",Go:"#00add8",Rust:"#dea584",Swift:"#ffac45",Ruby:"#701516",Kotlin:"#A97BFF",Dart:"#00b4ab",Vue:"#41b883",SCSS:"#c6538c","C#":"#178600",default:"#64748b"},R=a=>J[a]??J.default;function ga({repo:a,i}){return e.jsxs(n.motion.a,{href:a.html_url,target:"_blank",rel:"noopener noreferrer",className:"gh-repo-card",initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.1},transition:{duration:.38,delay:i*.05},children:[e.jsxs("div",{className:"gh-repo-top",children:[e.jsx(o,{icon:te,className:"text-[var(--text-tertiary)] text-[10px] mt-0.5 flex-shrink-0"}),e.jsx("span",{className:"gh-repo-name",children:a.name}),e.jsx(o,{icon:L,className:"gh-repo-ext"})]}),a.description&&e.jsx("p",{className:"gh-repo-desc",children:a.description}),e.jsxs("div",{className:"gh-repo-meta",children:[a.language&&e.jsxs("span",{className:"gh-repo-lang",children:[e.jsx("span",{className:"gh-repo-lang-dot",style:{background:R(a.language)}}),a.language]}),a.stargazers_count>0&&e.jsxs("span",{className:"gh-repo-stat",children:[e.jsx(o,{icon:D,className:"text-yellow-400 text-[10px]"}),a.stargazers_count]}),a.forks_count>0&&e.jsxs("span",{className:"gh-repo-stat",children:[e.jsx(o,{icon:He,className:"text-[var(--text-tertiary)] text-[10px]"}),a.forks_count]})]})]})}function ua({langs:a}){if(!a.length)return null;const i=a.reduce((t,s)=>t+s.bytes,0);return e.jsxs("div",{className:"gh-section-block",children:[e.jsx("p",{className:"gh-sub-label",children:"Top Languages"}),e.jsx("div",{className:"gh-lang-bar",children:a.map((t,s)=>e.jsx(n.motion.div,{className:"gh-lang-seg",style:{"--clr":R(t.lang),flex:t.bytes/i},title:`${t.lang}: ${(t.bytes/i*100).toFixed(1)}%`,initial:{scaleX:0,transformOrigin:"left"},whileInView:{scaleX:1},viewport:{once:!0},transition:{duration:.65,delay:s*.07,ease:[.16,1,.3,1]}},t.lang))}),e.jsx("div",{className:"gh-lang-legend",children:a.slice(0,8).map(t=>e.jsxs("span",{className:"gh-lang-item",children:[e.jsx("span",{className:"gh-lang-dot",style:{background:R(t.lang)}}),e.jsx("span",{className:"gh-lang-name",children:t.lang}),e.jsxs("span",{className:"gh-lang-pct",children:[(t.bytes/i*100).toFixed(0),"%"]})]},t.lang))})]})}function fa({profile:a,totalStars:i,repos:t}){const s=a.created_at?new Date(a.created_at).getFullYear():null;return e.jsxs(n.motion.div,{className:"gh-profile-card",initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},children:[e.jsxs("div",{className:"gh-profile-left",children:[e.jsxs("a",{href:a.html_url,target:"_blank",rel:"noopener noreferrer",className:"gh-avatar-link",children:[e.jsx("img",{src:a.avatar_url,alt:a.name??w,className:"gh-avatar"}),e.jsx("div",{className:"gh-avatar-online",title:"GitHub active"})]}),e.jsxs("div",{className:"gh-profile-meta",children:[e.jsx("a",{href:a.html_url,target:"_blank",rel:"noopener noreferrer",className:"gh-profile-name",children:a.name??w}),e.jsxs("span",{className:"gh-profile-login",children:["@",a.login]}),a.bio&&e.jsx("p",{className:"gh-profile-bio",children:a.bio}),e.jsxs("div",{className:"gh-profile-details",children:[a.location&&e.jsxs("span",{className:"gh-detail-item",children:[e.jsx(o,{icon:Z,className:"text-[10px]"}),a.location]}),a.blog&&e.jsxs("a",{href:a.blog.startsWith("http")?a.blog:`https://${a.blog}`,target:"_blank",rel:"noopener noreferrer",className:"gh-detail-item gh-detail-link",children:[e.jsx(o,{icon:Me,className:"text-[10px]"}),a.blog.replace(/^https?:\/\//,"")]}),s&&e.jsxs("span",{className:"gh-detail-item",children:[e.jsx(o,{icon:$e,className:"text-[10px]"}),"Since ",s]})]})]})]}),e.jsx("div",{className:"gh-profile-stats",children:[{icon:te,value:a.public_repos,label:"Repos",color:"#c084fc"},{icon:D,value:i,label:"Stars",color:"#fbbf24"},{icon:De,value:a.followers,label:"Followers",color:"#818cf8"},{icon:Ge,value:t.reduce((r,l)=>r+l.forks_count,0),label:"Forks",color:"#38bdf8"}].map(r=>e.jsxs("div",{className:"gh-pstat",style:{"--c":r.color},children:[e.jsx(o,{icon:r.icon,className:"gh-pstat-icon"}),e.jsx("span",{className:"gh-pstat-val",children:r.value??0}),e.jsx("span",{className:"gh-pstat-lbl",children:r.label})]},r.label))})]})}function ba(){const[a,i]=c.useState(null),[t,s]=c.useState([]),[r,l]=c.useState([]),[m,p]=c.useState(!0),[x,g]=c.useState(null),{isDark:j}=xe(),h=j(),k=h?"tokyonight":"default",z=h?"tokyonight":"flat",N=`https://github-readme-streak-stats.herokuapp.com/?user=${w}&hide_border=true&theme=${h?"tokyonight":"default"}&stroke=c084fc&ring=c084fc&fire=f97316&sideLabels=94a3b8&currStreakLabel=c084fc&dates=64748b`,re=`https://awesome-github-stats.azurewebsites.net/user-stats/${w}?cardType=level&fontFamily=42dot%20Sans&preferLogin=false&theme=${k}`,ie=`https://github-profile-trophy.vercel.app/?username=${w}&theme=${z}&no-frame=true&column=6&margin-w=8&margin-h=8`,G=async()=>{p(!0),g(null);try{const[v,C]=await Promise.all([fetch(`https://api.github.com/users/${w}`),fetch(`https://api.github.com/users/${w}/repos?sort=stars&per_page=100&type=owner`)]);if(!v.ok)throw new Error(`GitHub API ${v.status}`);const oe=await v.json(),H=C.ok?await C.json():[];i(oe);const ne=H.filter(f=>!f.fork).sort((f,y)=>y.stargazers_count-f.stargazers_count).slice(0,6);s(ne);const E={};await Promise.all(H.filter(f=>!f.fork).slice(0,30).map(f=>fetch(f.languages_url).then(y=>y.ok?y.json():{}).then(y=>{Object.entries(y).forEach(([Y,le])=>{E[Y]=(E[Y]||0)+le})}).catch(()=>{}))),l(Object.entries(E).sort((f,y)=>y[1]-f[1]).slice(0,8).map(([f,y])=>({lang:f,bytes:y})))}catch(v){g(v.message??"Failed to load")}finally{p(!1)}};c.useEffect(()=>{G()},[]);const se=t.reduce((v,C)=>v+C.stargazers_count,0);return e.jsxs("section",{className:"section section-alt",id:"github",children:[e.jsxs("div",{className:"container-xl",children:[e.jsxs(n.motion.div,{className:"text-center mb-10",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5},children:[e.jsx("p",{className:"text-xs uppercase tracking-widest font-semibold mb-2",style:{color:_},children:"Open Source"}),e.jsx("h2",{className:"text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]",children:"GitHub Activity"}),e.jsx("p",{className:"text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto",children:"Real-time stats pulled from the GitHub API."})]}),m?e.jsxs("div",{className:"flex items-center justify-center py-20 gap-3 text-[var(--text-tertiary)]",children:[e.jsx(o,{icon:Le,className:"animate-spin text-xl"}),e.jsx("span",{className:"text-sm",children:"Fetching GitHub data..."})]}):x?e.jsxs("div",{className:"flex flex-col items-center py-16 gap-4 text-center",children:[e.jsx("p",{className:"text-[var(--text-secondary)] text-sm",children:x.includes("403")?"GitHub API rate-limited. Try again shortly.":x}),e.jsxs("button",{onClick:G,className:"inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all active:scale-[.97]",children:[e.jsx(o,{icon:Be})," Retry"]})]}):e.jsxs(e.Fragment,{children:[a&&e.jsx(fa,{profile:a,totalStars:se,repos:t}),e.jsxs(n.motion.div,{className:"gh-two-col",initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.45,delay:.1},children:[e.jsxs("div",{className:"gh-img-panel gh-img-panel--streak",children:[e.jsx("p",{className:"gh-panel-label",children:"Contribution Streak"}),e.jsx("div",{className:"gh-img-wrap",children:e.jsx("img",{src:N,alt:"GitHub streak stats",className:"gh-stat-img",loading:"lazy"},h?"dark":"light")})]}),e.jsxs("div",{className:"gh-img-panel",children:[e.jsx("p",{className:"gh-panel-label",children:"Profile Stats"}),e.jsx("div",{className:"gh-img-wrap",children:e.jsx("img",{src:re,alt:"GitHub profile stats",className:"gh-stat-img",loading:"lazy"},`awesome-${h}`)})]})]}),e.jsxs(n.motion.div,{className:"gh-section-block",initial:{opacity:0,y:12},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.2},transition:{duration:.45},children:[e.jsx("p",{className:"gh-sub-label",children:"GitHub Trophies"}),e.jsx("div",{className:"gh-trophy-wrap",children:e.jsx("img",{src:ie,alt:"GitHub trophies",className:"gh-trophy-img",loading:"lazy"},`trophy-${h}`)})]}),r.length>0&&e.jsx(ua,{langs:r}),t.length>0&&e.jsxs("div",{className:"gh-section-block",children:[e.jsx("p",{className:"gh-sub-label",children:"Top Repositories"}),e.jsx("div",{className:"gh-repos-grid",children:t.map((v,C)=>e.jsx(ga,{repo:v,i:C},v.id))})]}),e.jsx(n.motion.div,{className:"flex justify-center mt-8",initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.5},children:e.jsxs("a",{href:`https://github.com/${w}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all active:scale-[.97] group",children:[e.jsx(o,{icon:A}),"View Full Profile",e.jsx(o,{icon:L,className:"text-xs transition-transform group-hover:translate-x-0.5"})]})})]})]}),e.jsx("style",{children:`
        /* -- Profile card --------------------------------------- */
        .gh-profile-card {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 1.4rem 1.6rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .gh-profile-left {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          flex: 1;
          min-width: 0;
        }
        .gh-avatar-link {
          position: relative;
          flex-shrink: 0;
          display: block;
        }
        .gh-avatar {
          width: 68px; height: 68px;
          border-radius: 16px;
          object-fit: cover;
          border: 2px solid ${_}44;
          display: block;
        }
        .gh-avatar-online {
          position: absolute;
          bottom: 2px; right: 2px;
          width: 11px; height: 11px;
          border-radius: 50%;
          background: #22c55e;
          border: 2px solid var(--bg-surface);
          box-shadow: 0 0 6px #22c55e88;
        }
        .gh-profile-meta { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .gh-profile-name {
          font-size: 1rem; font-weight: 800;
          color: var(--text-primary);
          font-family: var(--font-display);
          text-decoration: none;
          line-height: 1.2;
          transition: color .15s;
        }
        .gh-profile-name:hover { color: ${_}; }
        .gh-profile-login { font-size: .78rem; color: var(--text-tertiary); font-family: var(--font-mono); }
        .gh-profile-bio   { font-size: .8rem; color: var(--text-secondary); line-height: 1.55; max-width: 380px; margin-top: 3px; }
        .gh-profile-details { display: flex; flex-wrap: wrap; gap: .4rem .9rem; margin-top: 5px; }
        .gh-detail-item {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: .73rem; color: var(--text-tertiary);
        }
        .gh-detail-link { text-decoration: none; }
        .gh-detail-link:hover { color: var(--accent-primary); }

        .gh-profile-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: .6rem;
          align-self: center;
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .gh-profile-stats { grid-template-columns: repeat(2, 1fr); width: 100%; }
        }
        .gh-pstat {
          display: flex; flex-direction: column; align-items: center;
          padding: .55rem .7rem;
          border-radius: 10px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          gap: 2px;
          transition: border-color .18s;
        }
        .gh-pstat:hover { border-color: var(--c); }
        .gh-pstat-icon { font-size: 12px; color: var(--c); }
        .gh-pstat-val  { font-size: 1.05rem; font-weight: 800; font-family: var(--font-display); color: var(--text-primary); line-height: 1; }
        .gh-pstat-lbl  { font-size: .6rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: .05em; }

        /* -- Two-col row: streak + stats ----------------------- */
        .gh-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        @media (max-width: 640px) {
          .gh-two-col { grid-template-columns: 1fr; }
        }
        .gh-img-panel {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 1rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: .6rem;
          overflow: hidden;
        }
        .gh-panel-label {
          font-size: .7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .1em;
          color: var(--text-tertiary);
        }
        .gh-img-wrap {
          display: flex; align-items: center; justify-content: center;
          min-height: 80px;
        }
        .gh-stat-img {
          width: 100%; height: auto; display: block;
          border-radius: 6px;
        }

        /* -- Trophy -------------------------------------------- */
        .gh-section-block { margin-bottom: 1.25rem; }
        .gh-trophy-wrap {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 1rem;
          margin-top: .5rem;
          overflow: hidden;
          display: flex; justify-content: center;
        }
        .gh-trophy-img {
          width: 100%; max-width: 820px;
          height: auto; display: block;
        }

        /* -- Language bar -------------------------------------- */
        .gh-sub-label {
          font-size: .7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .12em;
          color: var(--text-tertiary); margin-bottom: .5rem;
        }
        .gh-lang-bar {
          display: flex; height: 8px; border-radius: 9999px; overflow: hidden; gap: 2px;
          margin-bottom: .65rem;
        }
        .gh-lang-seg { height: 100%; background: var(--clr); }
        .gh-lang-legend { display: flex; flex-wrap: wrap; gap: .4rem .8rem; }
        .gh-lang-item  { display: inline-flex; align-items: center; gap: 5px; font-size: .77rem; color: var(--text-secondary); }
        .gh-lang-dot   { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .gh-lang-name  { font-weight: 500; }
        .gh-lang-pct   { color: var(--text-tertiary); font-size: .7rem; font-family: var(--font-mono); }

        /* -- Repo grid ----------------------------------------- */
        .gh-repos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: .75rem;
          margin-top: .5rem;
        }
        @media (max-width: 900px) { .gh-repos-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .gh-repos-grid { grid-template-columns: 1fr; } }

        .gh-repo-card {
          display: flex; flex-direction: column; gap: .45rem;
          padding: .85rem 1rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          text-decoration: none; color: inherit;
          transition: border-color .18s ease, transform .18s ease;
          min-height: 90px;
        }
        .gh-repo-card:hover {
          border-color: ${_}55;
          transform: translateY(-2px);
        }
        .gh-repo-top  { display: flex; align-items: flex-start; gap: .45rem; }
        .gh-repo-name {
          flex: 1; min-width: 0;
          font-size: .82rem; font-weight: 700; color: var(--text-primary);
          font-family: var(--font-mono);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .gh-repo-ext  { font-size: 10px; color: var(--text-tertiary); margin-top: 2px; flex-shrink: 0; opacity: 0; transition: opacity .15s; }
        .gh-repo-card:hover .gh-repo-ext { opacity: 1; }
        .gh-repo-desc {
          font-size: .74rem; color: var(--text-secondary); line-height: 1.5; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .gh-repo-meta { display: flex; align-items: center; gap: .6rem; margin-top: auto; flex-wrap: wrap; }
        .gh-repo-lang { display: inline-flex; align-items: center; gap: 4px; font-size: .72rem; color: var(--text-secondary); }
        .gh-repo-lang-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .gh-repo-stat { display: inline-flex; align-items: center; gap: 3px; font-size: .72rem; color: var(--text-secondary); }
      `})]})}function va(){return e.jsxs("section",{className:"cta-section section",id:"cta","aria-label":"Call to action",children:[e.jsx("div",{className:"cta-grid-bg","aria-hidden":"true"}),e.jsx("div",{className:"cta-glow","aria-hidden":"true"}),e.jsx("div",{className:"container-xl relative z-10",children:e.jsxs(n.motion.div,{className:"cta-inner",initial:{opacity:0,y:28},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.6,ease:[.16,1,.3,1]},children:[e.jsxs("h2",{className:"cta-heading",children:["Have a project in mind? ",e.jsx("br",{className:"hidden sm:block"}),e.jsx("span",{className:"cta-heading-accent",children:"Let's build it together"})]}),e.jsx("p",{className:"cta-sub",children:"Have a project idea, a problem to solve, or just want to say hello? I'm always open to exciting opportunities."}),e.jsxs("div",{className:"cta-btns",children:[e.jsxs(b,{to:"/contact",className:"cta-btn-primary","aria-label":"Get in touch",children:[e.jsx(o,{icon:Ye}),"Get in touch",e.jsx(o,{icon:S,className:"cta-arrow"})]}),e.jsxs("a",{href:u.social.github,target:"_blank",rel:"noopener noreferrer",className:"cta-btn-secondary","aria-label":"View GitHub profile",children:[e.jsx(o,{icon:A}),"GitHub"]})]}),e.jsxs("p",{className:"cta-footer-note",children:[e.jsx(o,{icon:Oe,className:"text-[var(--accent-primary)] text-xs"}),"  Fast response . Clean code . On-time delivery"]})]})}),e.jsx("style",{children:`
        .cta-section {
          position: relative;
          overflow: hidden;
        }
        /* Dot-grid texture */
        .cta-grid-bg {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            radial-gradient(rgba(99,102,241,.12) 1.5px, transparent 1.5px),
            radial-gradient(rgba(59,130,246,.07) 1px, transparent 1px);
          background-size: 28px 28px, 14px 14px;
          background-position: 0 0, 7px 7px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 80%);
          pointer-events: none;
          animation: cta-bg-drift 28s linear infinite;
        }
        [data-theme=light] .cta-grid-bg {
          background-image:
            radial-gradient(rgba(37,99,235,.09) 1.5px, transparent 1.5px),
            radial-gradient(rgba(99,102,241,.05) 1px, transparent 1px);
        }
        @keyframes cta-bg-drift { to { background-position: 28px 28px, 21px 21px; } }
        /* Accent glow */
        .cta-glow {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background: radial-gradient(ellipse 60% 50% at 50% 50%,
            rgba(99,102,241,.10) 0%, rgba(59,130,246,.06) 40%, transparent 72%);
          animation: cta-glow-p 5s ease-in-out infinite;
        }
        [data-theme=light] .cta-glow {
          background: radial-gradient(ellipse 60% 50% at 50% 50%,
            rgba(99,102,241,.06) 0%, rgba(59,130,246,.03) 40%, transparent 72%);
        }
        @keyframes cta-glow-p {
          0%,100% { opacity:.7; transform: scale(1); }
          50%      { opacity:1; transform: scale(1.05); }
        }
        /* Inner layout */
        .cta-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          gap: 1.4rem; max-width: 640px; margin-inline: auto;
        }
        /* Badge */
        .cta-badge {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .3rem .9rem; border-radius: 9999px;
          border: 1px solid rgba(99,102,241,.28);
          background: rgba(99,102,241,.10);
          font-size: .75rem; font-weight: 600;
          color: var(--accent-primary);
          letter-spacing: .02em;
        }
        .cta-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
          animation: cta-dot-p 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes cta-dot-p {
          0%,100% { opacity:1; transform: scale(1); box-shadow: 0 0 4px #22c55e; }
          50%      { opacity:.6; transform: scale(1.3); box-shadow: 0 0 10px #22c55e; }
        }
        /* Heading */
        .cta-heading {
          font-size: clamp(1.9rem, 4.5vw, 3.2rem);
          font-weight: 800; line-height: 1.12;
          letter-spacing: -.03em;
          color: var(--text-primary);
          font-family: var(--font-display);
        }
        .cta-heading-accent {
          background: linear-gradient(135deg, var(--accent-primary) 0%, #818cf8 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        /* Sub-text */
        .cta-sub {
          font-size: clamp(.86rem, 1.2vw, 1rem);
          color: var(--text-secondary);
          max-width: 480px;
          line-height: 1.7;
        }
        /* Buttons */
        .cta-btns {
          display: flex; flex-wrap: wrap; gap: .8rem; justify-content: center;
          margin-top: .4rem;
        }
        .cta-btn-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .7rem 1.6rem; border-radius: 1rem;
          background: var(--accent-primary);
          color: #fff; font-size: .9rem; font-weight: 700;
          border: 2px solid var(--accent-primary);
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(37,99,235,.32);
          transition: all .22s ease;
          position: relative; overflow: hidden;
        }
        .cta-btn-primary:hover {
          background: var(--accent-hover);
          border-color: var(--accent-hover);
          box-shadow: 0 8px 28px rgba(37,99,235,.44);
          transform: translateY(-2px);
        }
        .cta-btn-primary:active { transform: scale(.96); }
        .cta-arrow { transition: transform .2s ease; }
        .cta-btn-primary:hover .cta-arrow { transform: translateX(3px); }
        .cta-btn-secondary {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .7rem 1.4rem; border-radius: 1rem;
          background: transparent;
          color: var(--text-secondary); font-size: .9rem; font-weight: 600;
          border: 2px solid var(--border-strong);
          text-decoration: none;
          transition: all .2s ease;
        }
        .cta-btn-secondary:hover {
          border-color: var(--accent-primary);
          color: var(--text-primary);
          background: var(--accent-light);
          transform: translateY(-2px);
        }
        .cta-btn-secondary:active { transform: scale(.96); }
        /* Footer note */
        .cta-footer-note {
          font-size: .73rem;
          color: var(--text-tertiary);
          letter-spacing: .03em;
          margin-top: .4rem;
        }
      `})]})}function Fa(){const{settings:a,loading:i}=ge();return c.useEffect(()=>{be("Home")},[]),e.jsxs(e.Fragment,{children:[e.jsxs(ue,{children:[e.jsx("title",{children:fe(null)}),e.jsx("meta",{name:"description",content:u.seo.defaultDescription}),e.jsx("meta",{property:"og:title",content:u.siteName}),e.jsx("meta",{property:"og:description",content:u.seo.defaultDescription}),e.jsx("meta",{property:"og:image",content:u.seo.defaultOGImage}),e.jsx("meta",{property:"og:image:type",content:"image/webp"}),e.jsx("meta",{property:"og:image:width",content:"1200"}),e.jsx("meta",{property:"og:image:height",content:"630"}),e.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),e.jsx("meta",{name:"twitter:creator",content:u.seo.twitterHandle}),e.jsx("meta",{name:"twitter:image",content:u.seo.defaultOGImage})]}),e.jsx(Je,{settings:a,settingsLoading:i}),e.jsx(Ze,{}),e.jsx(aa,{}),e.jsx(oa,{settings:a}),e.jsx(ca,{}),e.jsx(ma,{}),e.jsx(xa,{}),e.jsx(ba,{}),e.jsx(va,{})]})}export{Fa as default};
