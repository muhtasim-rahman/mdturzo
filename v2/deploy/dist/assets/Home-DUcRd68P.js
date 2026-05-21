import{j as e,c as p}from"./motion-B0YflK6s.js";import{r as l,L as v}from"./vendor-mcV3incF.js";import{S as b,c as ie,g as ne,a as oe,b as le,d as S,e as ce,f as de,u as pe,H as me}from"./index-DAt0WgDG.js";import{b as xe}from"./seo-vv5jPl_e.js";import{t as he}from"./analytics-BkvRLVkP.js";import{F as o,R as X,S as Y,A as V,C as ge,y as ue,z as be,x as fe,D as ve,T as ye,b as je,U as q,V as we,W as J,X as ke,Y as Ne,Z as Se,_ as ze,$ as Ce,a0 as _e,a1 as Ie,s as k,a2 as L,a3 as Q,u as Ae,a4 as Fe,a5 as Te,a6 as Ve,a7 as K,a8 as Ee,a9 as Re,aa as Z,ab as Pe,ac as De,ad as ee,ae as Le,af as Me,d as $e}from"./icons-S2hpoxBj.js";import"./firebase-DPKIO6Ex.js";import"./supabase-vrwWM04E.js";const B=["Web Developer","UI/UX Designer","Graphic Designer","Video Editor"];function Ye(){const[a,r]=l.useState(""),t=l.useRef(0),i=l.useRef(0),s=l.useRef(!1);return l.useEffect(()=>{let c;const m=()=>{const x=B[t.current];s.current?(r(x.slice(0,--i.current)),i.current===0?(s.current=!1,t.current=(t.current+1)%B.length,c=setTimeout(m,320)):c=setTimeout(m,44)):(r(x.slice(0,++i.current)),i.current===x.length?(s.current=!0,c=setTimeout(m,2200)):c=setTimeout(m,110))};return c=setTimeout(m,900),()=>clearTimeout(c)},[]),a}function Be(a,r){const[t,i]=l.useState(0);return l.useEffect(()=>{if(!r)return;const s=parseInt(a,10),c=performance.now(),m=1100,x=h=>{const u=Math.min((h-c)/m,1),f=u<.5?2*u*u:-1+(4-2*u)*u;i(Math.round(f*s)),u<1?requestAnimationFrame(x):i(s)};requestAnimationFrame(x)},[r,a]),t}const Ge=[{file:"html5",label:"HTML5",cls:"html",dur:"3.9s",del:"0s",pcTop:"10%",pcSide:{left:"-28px"},sz:"48px"},{file:"css3",label:"CSS3",cls:"css",dur:"4.4s",del:"0.65s",pcTop:"58%",pcSide:{left:"-24px"},sz:"42px"},{file:"python",label:"Python",cls:"python",dur:"3.6s",del:"1.2s",pcTop:"80%",pcSide:{left:"-22px"},sz:"40px"},{file:"vscode",label:"VSCode",cls:"vscode",dur:"3.3s",del:"0.95s",pcTop:"6%",pcSide:{right:"-27px"},sz:"46px"},{file:"design",label:"Design",cls:"design",dur:"4.8s",del:"0.35s",pcTop:"42%",pcSide:{right:"-22px"},sz:"38px"}],He=[{icon:V,href:b.social.github,label:"GitHub",handle:"muhtasim-rahman"},{icon:ge,href:b.social.linkedin,label:"LinkedIn",handle:"mdturzo999"},{icon:ue,href:b.social.facebook,label:"Facebook",handle:"mdturzo999"},{icon:be,href:b.social.instagram,label:"Instagram",handle:"@mdturzo999"},{icon:fe,href:b.social.youtube,label:"YouTube",handle:"@mdturzo999"},{icon:ve,href:b.social.telegram,label:"Telegram",handle:"@mdturzo16"}],G=[{ch:"★",c:"rgba(59,130,246,V)",l:"rgba(37,99,235,V)",s:"0.65rem"},{ch:"✦",c:"rgba(99,102,241,V)",l:"rgba(79,70,229,V)",s:"0.55rem"},{ch:"✧",c:"rgba(147,197,253,V)",l:"rgba(96,165,250,V)",s:"0.50rem"},{ch:"·",c:"rgba(255,255,255,V)",l:"rgba(37,99,235,V)",s:"0.72rem"},{ch:"◆",c:"rgba(139,92,246,V)",l:"rgba(124,58,237,V)",s:"0.45rem"},{ch:"⊹",c:"rgba(147,197,253,V)",l:"rgba(96,165,250,V)",s:"0.62rem"},{ch:"✺",c:"rgba(251,191,36,V)",l:"rgba(245,158,11,V)",s:"0.50rem"},{ch:"◦",c:"rgba(96,165,250,V)",l:"rgba(59,130,246,V)",s:"0.55rem"},{ch:"⋆",c:"rgba(167,139,250,V)",l:"rgba(139,92,246,V)",s:"0.60rem"}],Oe=Array.from({length:68},(a,r)=>{const t=Math.random()<.65?1:Math.random()<.8?2:3;return{key:r,style:{width:t,height:t,left:`${(Math.random()*100).toFixed(1)}%`,top:`${(Math.random()*100).toFixed(1)}%`,"--dur":`${(1.8+Math.random()*5.2).toFixed(1)}s`,"--del":`${(Math.random()*9).toFixed(1)}s`,"--op-lo":(.04+Math.random()*.12).toFixed(2),"--op-hi":(.22+Math.random()*.5).toFixed(2)}}}),Ue=Array.from({length:52},(a,r)=>{const t=G[r%G.length],i=(.22+Math.random()*.42).toFixed(2);return{key:r,ch:t.ch,style:{left:`${(2+Math.random()*96).toFixed(1)}%`,"--pd":`${(7+Math.random()*11).toFixed(1)}s`,"--pp":`${(Math.random()*18).toFixed(1)}s`,"--po":i,"--ps":t.s,"--px":`${((Math.random()-.5)*90).toFixed(0)}px`,"--pr":`${((Math.random()-.5)*360).toFixed(0)}deg`,"--pc":t.c.replace("V",i),"--pc-l":t.l.replace("V",i)}}}),We=[.14,.25,.38,.5,.62,.75,.86];function R({value:a,label:r,sep:t,inView:i}){const s=parseInt(a,10),c=Be(s,i);return e.jsxs(e.Fragment,{children:[t&&e.jsx("div",{className:"hstat-sep"}),e.jsxs("div",{className:"hstat",children:[e.jsxs("div",{className:"hstat-num",children:[e.jsx("span",{children:c}),e.jsx(o,{icon:ye,className:"hstat-plus","aria-hidden":"true"})]}),e.jsx("span",{className:"hstat-lbl",children:r})]})]})}function Xe({settings:a,settingsLoading:r}){const t=Ye(),i=l.useRef(null),s=l.useRef(null),[c,m]=l.useState(!1),[x,h]=l.useState(null),u=(a==null?void 0:a.cvEnabled)??!1,f=(a==null?void 0:a.cvUrl)??"#",C=(a==null?void 0:a.statsYearsDev)??3,z=(a==null?void 0:a.statsYearsDesign)??6,y=(a==null?void 0:a.statsProjects)??16;return l.useEffect(()=>{if(!i.current)return;const d=new IntersectionObserver(([n])=>{n.isIntersecting&&m(!0)},{threshold:.2});return d.observe(i.current),()=>d.disconnect()},[]),l.useEffect(()=>{if(!s.current)return;const d=new ResizeObserver(([g])=>{window.innerWidth>900?h(Math.round(g.contentRect.height*1.1)):h(null)});d.observe(s.current);const n=()=>{window.innerWidth<=900&&h(null)};return window.addEventListener("resize",n,{passive:!0}),()=>{d.disconnect(),window.removeEventListener("resize",n)}},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
`}),e.jsxs("section",{className:"hero",id:"hero","aria-label":"Introduction",children:[e.jsx("div",{className:"hbg","aria-hidden":"true"}),e.jsx("div",{className:"hstars","aria-hidden":"true",children:Oe.map(d=>e.jsx("span",{className:"hstar",style:d.style,"aria-hidden":"true"},d.key))}),e.jsx("div",{className:"horb horb-1","aria-hidden":"true"}),e.jsx("div",{className:"horb horb-2","aria-hidden":"true"}),e.jsx("div",{className:"horb horb-3","aria-hidden":"true"}),e.jsx("div",{className:"horb horb-4","aria-hidden":"true"}),e.jsx("div",{className:"hparts","aria-hidden":"true",children:Ue.map(d=>e.jsx("span",{className:"hpart",style:d.style,"aria-hidden":"true",children:d.ch},d.key))}),e.jsx("div",{className:"hgrad-1","aria-hidden":"true"}),e.jsxs("div",{className:"hinner",children:[e.jsxs("div",{className:"hcontent",ref:s,children:[e.jsxs("div",{className:"hgreet hup",style:{"--d":"0ms"},children:[e.jsx("span",{className:"hgreet-salam",children:"Assalamu Alaikum"}),e.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"1.1em",verticalAlign:"middle",color:"var(--accent-secondary, #f59e0b)",lineHeight:1,display:"inline-flex",alignItems:"center"},"aria-hidden":"true",children:"waving_hand"}),e.jsx("span",{className:"hgreet-rest",children:"I am —"})]}),e.jsxs("h1",{className:"hname","aria-label":"Muhtasim Rahman (Turzo)",children:[e.jsx("span",{className:"hname-line",children:e.jsx("span",{className:"hname-in",style:{"--d":"70ms"},children:"Muhtasim"})}),e.jsx("span",{className:"hname-line",children:e.jsxs("span",{className:"hname-in hname-acc",style:{"--d":"185ms"},children:["Rahman",e.jsx("span",{className:"hname-nick",children:"(Turzo)"})]})})]}),e.jsxs("div",{className:"hrole hup",style:{"--d":"320ms"},"aria-live":"polite",children:[e.jsx("span",{className:"hrole-t",children:t}),e.jsx("span",{className:"hcursor","aria-hidden":"true",children:"|"})]}),e.jsx("p",{className:"hbio hup",style:{"--d":"430ms"},children:"Self-taught developer & designer from Bangladesh — building clean, fast and meaningful digital experiences."}),e.jsxs("div",{className:"hcta hup",style:{"--d":"530ms"},children:[e.jsxs("span",{className:"hbtn-wrap",children:[e.jsxs(v,{to:"/projects",className:"hbtn hbtn-p",children:[e.jsx(o,{icon:X,"aria-hidden":"true"})," View Projects"]}),e.jsx("span",{className:"hbtn-tt",children:"Browse all my work & case studies"})]}),e.jsxs("span",{className:"hbtn-wrap",children:[u&&f&&f!=="#"?e.jsxs("a",{href:f,target:"_blank",rel:"noopener noreferrer",className:"hbtn hbtn-o",children:[e.jsx(o,{icon:Y,"aria-hidden":"true"})," Download CV"]}):e.jsxs("span",{className:"hbtn hbtn-o",style:{opacity:.7,cursor:"default"},children:[e.jsx(o,{icon:Y,"aria-hidden":"true"})," Download CV"]}),e.jsx("span",{className:"hbtn-tt",children:u&&f&&f!=="#"?"Download my resume as a PDF":"CV will be uploaded soon"})]})]}),e.jsx("div",{className:"hsocials hup",style:{"--d":"620ms"},"aria-label":"Social links",children:He.map(({icon:d,href:n,label:g,handle:A})=>e.jsxs("span",{className:"hsocial-wrap",children:[e.jsx("a",{href:n,target:"_blank",rel:"noopener noreferrer",className:"hsocial","aria-label":`${g} — ${A}`,children:e.jsx(o,{icon:d,"aria-hidden":"true"})}),e.jsx("span",{className:"hsocial-tt",children:A})]},g))}),e.jsxs("div",{ref:i,className:"hstats hup",style:{"--d":"710ms"},"aria-label":"Stats",children:[e.jsx(R,{value:C,label:"Yrs Dev",sep:!1,inView:c}),e.jsx(R,{value:z,label:"Yrs Design",sep:!0,inView:c}),e.jsx(R,{value:y,label:"Projects",sep:!0,inView:c})]})]}),e.jsx("div",{className:"hvisual","aria-hidden":"true",children:e.jsxs("div",{className:"hscene",style:x?{"--img-h":x+"px"}:{},children:[e.jsx("div",{className:"hglow"}),e.jsx("div",{className:"hwrap",children:e.jsx("img",{src:"/hero.webp",alt:"Muhtasim Rahman",className:"hphoto",loading:"eager",fetchPriority:"high"})}),e.jsxs("div",{className:"hbot",children:[e.jsx("span",{className:"hbot-fade"}),e.jsx("div",{className:"hbot-ring",children:e.jsxs("svg",{className:"hbot-svg",viewBox:"0 0 600 40",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"none",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"hbg1",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[e.jsx("stop",{offset:"0%",stopColor:"transparent"}),e.jsx("stop",{offset:"16%",stopColor:"rgba(99,102,241,.25)"}),e.jsx("stop",{offset:"35%",stopColor:"rgba(59,130,246,.7)"}),e.jsx("stop",{offset:"50%",stopColor:"rgba(147,197,253,.95)"}),e.jsx("stop",{offset:"65%",stopColor:"rgba(59,130,246,.7)"}),e.jsx("stop",{offset:"84%",stopColor:"rgba(99,102,241,.25)"}),e.jsx("stop",{offset:"100%",stopColor:"transparent"})]}),e.jsxs("filter",{id:"hgf",children:[e.jsx("feGaussianBlur",{stdDeviation:"1.5",result:"b"}),e.jsxs("feMerge",{children:[e.jsx("feMergeNode",{in:"b"}),e.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),e.jsx("line",{x1:"0",y1:"6",x2:"600",y2:"6",stroke:"url(#hbg1)",strokeWidth:"1.5",filter:"url(#hgf)",className:"hbot-line"}),e.jsx("line",{x1:"55",y1:"13",x2:"545",y2:"13",stroke:"rgba(59,130,246,.2)",strokeWidth:"0.8"}),e.jsx("ellipse",{cx:"300",cy:"6",rx:"155",ry:"20",fill:"none",stroke:"rgba(59,130,246,.1)",strokeWidth:"1",className:"hbot-arc"}),e.jsx("ellipse",{cx:"300",cy:"6",rx:"85",ry:"13",fill:"none",stroke:"rgba(99,102,241,.08)",strokeWidth:"0.8"}),We.map((d,n)=>e.jsx("line",{x1:d*600,y1:"6",x2:d*600+1.5,y2:14+n*3,stroke:"rgba(147,197,253,.4)",strokeWidth:"1",style:{animation:`hbeam ${1.8+n*.3}s ease-in-out ${n*.28}s infinite`}},n)),[.14,.35,.5,.65,.86].map((d,n)=>e.jsx("circle",{cx:d*600,cy:"6",r:"2.2",fill:"rgba(96,165,250,.85)",style:{animation:`hdot-b 2s ease-in-out ${n*.38}s infinite`,filter:"drop-shadow(0 0 3px rgba(96,165,250,.9))"}},n))]})})]}),Ge.map(d=>e.jsx("div",{className:`hicon hicon-${d.cls}`,style:{"--dur":d.dur,"--del":d.del,"--sz":d.sz,top:d.pcTop,...d.pcSide},title:d.label,"aria-label":d.label,children:e.jsx("img",{src:`/icons/${d.file}.svg`,alt:d.label,loading:"lazy"})},d.cls))]})})]}),e.jsx("div",{className:"hgrad-2","aria-hidden":"true"}),e.jsxs("button",{className:"hscroll-btn",onClick:()=>window.scrollBy({top:window.innerHeight*.88,behavior:"smooth"}),"aria-label":"Scroll down",type:"button",children:[e.jsx("div",{className:"hscroll-track",children:e.jsx("div",{className:"hscroll-dot"})}),e.jsx("span",{className:"hscroll-lbl",children:"Scroll"})]})]})]})}function qe(a,r){const[t,i]=l.useState(0);return l.useEffect(()=>{if(!r)return;const s=performance.now(),c=1300,m=x=>{const h=Math.min((x-s)/c,1),u=h<.5?2*h*h:-1+(4-2*h)*h;i(Math.round(u*a)),h<1?requestAnimationFrame(m):i(a)};requestAnimationFrame(m)},[r,a]),t}const P=[{id:"web",label:"Web Dev",icon:je,color:"#3B82F6",skills:[{n:"HTML & CSS",p:88},{n:"JavaScript",p:52},{n:"React",p:55},{n:"Git & GitHub",p:78},{n:"Python",p:62}]},{id:"des",label:"Design",icon:q,color:"#EC4899",skills:[{n:"Logo Design",p:80},{n:"Banner/Poster",p:82},{n:"Thumbnail",p:85},{n:"UI Design",p:75},{n:"Photo Editing",p:72}]},{id:"ai",label:"AI & Prod.",icon:we,color:"#00D4FF",skills:[{n:"AI Prompting",p:92},{n:"AI Coding",p:90},{n:"AI Design",p:85},{n:"Planning",p:88}]},{id:"vid",label:"Video",icon:J,color:"#A855F7",skills:[{n:"YouTube Videos",p:72},{n:"Short Reels",p:68},{n:"Animation",p:55},{n:"Ads/Promos",p:60}]}],F=[{key:"yDev",label:"Years Dev",suffix:"+",color:"#3B82F6",subLabel:"Web & code experience"},{key:"yDes",label:"Years Design",suffix:"+",color:"#EC4899",subLabel:"Graphic & UI design"},{key:"proj",label:"Projects Done",suffix:"+",color:"#A855F7",subLabel:"Shipped & deployed"},{key:"rating",label:"Avg. Rating",suffix:"/5",color:"#F59E0B",subLabel:"Client satisfaction"}];function Je({label:a,value:r,suffix:t,color:i,subLabel:s,inView:c,delay:m}){const x=qe(r,c);return e.jsxs(p.motion.div,{className:"sk-stat-card",style:{"--accent":i},initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.42,delay:m},children:[e.jsx("div",{className:"sk-stat-accent"}),e.jsx("div",{className:"sk-stat-icon-ring",children:e.jsx(o,{icon:ke})}),e.jsxs("div",{className:"sk-stat-num",children:[x,e.jsx("span",{className:"sk-stat-suf",children:t})]}),e.jsx("div",{className:"sk-stat-label",children:a}),e.jsx("div",{className:"sk-stat-sub",children:s})]})}function Qe({n:a,p:r,color:t,i,visible:s}){return e.jsxs("div",{className:"sk-bar-wrap",children:[e.jsxs("div",{className:"sk-bar-header",children:[e.jsx("span",{className:"sk-bar-name",children:a}),e.jsxs("span",{className:"sk-bar-pct",style:{color:t},children:[r,"%"]})]}),e.jsx("div",{className:"sk-bar-track",children:e.jsx(p.motion.div,{className:"sk-bar-fill",style:{"--bar-color":t,"--bar-w":`${r}%`},initial:{width:0},animate:{width:s?`${r}%`:0},transition:{duration:.75,delay:.06+i*.08,ease:[.16,1,.3,1]}})})]})}function Ke({settings:a}){const[r,t]=l.useState("web"),[i,s]=l.useState(!1),[c,m]=l.useState(!1),x=l.useRef(null),h=parseInt((a==null?void 0:a.statsYearsDev)??"3",10),u=parseInt((a==null?void 0:a.statsYearsDesign)??"6",10),f=parseInt((a==null?void 0:a.statsProjects)??"16",10),z=[{...F[0],value:h},{...F[1],value:u},{...F[2],value:f},{...F[3],value:5}];l.useEffect(()=>{if(!x.current)return;const n=new IntersectionObserver(([g])=>{g.isIntersecting&&(m(!0),s(!0))},{threshold:.15});return n.observe(x.current),()=>n.disconnect()},[]);const y=P.find(n=>n.id===r)??P[0],d=n=>{t(n),s(!1),setTimeout(()=>s(!0),24)};return e.jsxs("section",{className:"section section-alt",id:"skills",ref:x,children:[e.jsxs("div",{className:"container-xl",children:[e.jsxs(p.motion.div,{className:"text-center mb-10",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5},children:[e.jsx("p",{className:"text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2",children:"What I Bring"}),e.jsx("h2",{className:"text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]",children:"Skills & Experience"}),e.jsx("p",{className:"text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto",children:"Self-rated levels based on real projects. Actively growing every day."})]}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10",children:z.map((n,g)=>e.jsx(Je,{...n,inView:c,delay:g*.08},n.key))}),e.jsxs("div",{className:"sk-layout",children:[e.jsx("div",{className:"sk-tabs",children:P.map(n=>e.jsxs("button",{onClick:()=>d(n.id),className:`sk-tab ${r===n.id?"sk-tab--active":""}`,style:{"--tab-color":n.color},children:[e.jsx("div",{className:"sk-tab-icon",children:e.jsx(o,{icon:n.icon})}),e.jsx("span",{className:"sk-tab-label",children:n.label}),r===n.id&&e.jsx("span",{className:"sk-tab-dot"})]},n.id))}),e.jsx(p.AnimatePresence,{mode:"wait",children:e.jsxs(p.motion.div,{initial:{opacity:0,x:14},animate:{opacity:1,x:0},exit:{opacity:0,x:-14},transition:{duration:.22,ease:"easeOut"},className:"card p-6",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border-color)]",children:[e.jsx("div",{className:"w-10 h-10 rounded-xl flex items-center justify-center",style:{background:`${y.color}18`,color:y.color},children:e.jsx(o,{icon:y.icon})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-display font-bold text-[var(--text-primary)] text-lg",children:y.label}),e.jsxs("p",{className:"text-[11px] text-[var(--text-tertiary)]",children:[y.skills.length," skills tracked"]})]})]}),e.jsx("div",{className:"space-y-5",children:y.skills.map((n,g)=>e.jsx(Qe,{n:n.n,p:n.p,color:y.color,i:g,visible:i},n.n))}),e.jsx("p",{className:"text-[10px] text-[var(--text-tertiary)] pt-4 mt-4 border-t border-[var(--border-color)]",children:"✦ Self-assessed from real project experience  ·  Actively improving"})]},r)})]})]}),e.jsx("style",{children:`
        /* ── Stat Cards ─────────────────────────────────── */
        .sk-stat-card {
          position: relative;
          padding: 1.1rem 1.1rem 1rem;
          border-radius: 16px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-left: 3px solid var(--accent);
          overflow: hidden;
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
          cursor: default;
        }
        .sk-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 32px rgba(0,0,0,.18), 0 0 0 1px rgba(255,255,255,.04);
          border-color: var(--accent);
        }
        .sk-stat-accent {
          position: absolute;
          top: 0; right: 0;
          width: 80px; height: 80px;
          border-radius: 0 16px 0 80px;
          background: var(--accent);
          opacity: .06;
          pointer-events: none;
        }
        .sk-stat-icon-ring {
          width: 30px; height: 30px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--accent) 15%, transparent);
          color: var(--accent);
          font-size: 12px;
          margin-bottom: .6rem;
        }
        .sk-stat-num {
          font-size: 1.85rem;
          font-weight: 800;
          font-family: var(--font-display);
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 4px;
        }
        .sk-stat-suf {
          font-size: .55em;
          font-weight: 600;
          color: var(--accent);
          margin-left: 2px;
        }
        .sk-stat-label {
          font-size: .78rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2px;
        }
        .sk-stat-sub {
          font-size: .7rem;
          color: var(--text-tertiary);
        }

        /* ── Layout grid ─────────────────────────────────── */
        .sk-layout {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 1.25rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .sk-layout {
            grid-template-columns: 1fr;
          }
          .sk-tabs {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
            gap: .5rem;
          }
        }
        @media (max-width: 420px) {
          .sk-tabs {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* ── Sidebar tabs ─────────────────────────────────── */
        .sk-tabs {
          display: flex;
          flex-direction: column;
          gap: .5rem;
        }
        .sk-tab {
          display: flex;
          align-items: center;
          gap: .7rem;
          width: 100%;
          padding: .7rem .9rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-secondary);
          font-size: .84rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: all .18s ease;
          position: relative;
        }
        .sk-tab:hover:not(.sk-tab--active) {
          background: var(--bg-surface-2);
          color: var(--text-primary);
          border-color: var(--border-strong);
          transform: translateX(2px);
        }
        .sk-tab:active {
          transform: scale(.97);
        }
        .sk-tab--active {
          background: color-mix(in srgb, var(--tab-color) 12%, transparent);
          border-color: color-mix(in srgb, var(--tab-color) 42%, transparent);
          color: var(--tab-color);
        }
        .sk-tab-icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          flex-shrink: 0;
          background: color-mix(in srgb, var(--tab-color) 14%, transparent);
          color: var(--tab-color);
          transition: background .18s ease;
        }
        .sk-tab--active .sk-tab-icon {
          background: color-mix(in srgb, var(--tab-color) 22%, transparent);
        }
        .sk-tab-label {
          flex: 1;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sk-tab-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--tab-color);
          flex-shrink: 0;
          box-shadow: 0 0 6px var(--tab-color);
        }

        /* ── v2.2.6: 8px shimmer progress bars ──────────────── */
        .sk-bar-wrap { display: flex; flex-direction: column; gap: 6px; }
        .sk-bar-header {
          display: flex; align-items: center; justify-content: space-between;
        }
        .sk-bar-name { font-size: .85rem; color: var(--text-secondary); font-weight: 500; }
        .sk-bar-pct  { font-size: 11px; font-weight: 700; font-family: var(--font-mono); }
        .sk-bar-track {
          height: 8px;
          border-radius: 9999px;
          background: var(--bg-surface-3, var(--bg-surface-2));
          overflow: hidden;
          position: relative;
        }
        .sk-bar-fill {
          height: 100%;
          border-radius: 9999px;
          position: relative;
          background: linear-gradient(90deg,
            color-mix(in srgb, var(--bar-color) 70%, transparent),
            var(--bar-color)
          );
          overflow: hidden;
        }
        /* Shimmer sweep animation */
        .sk-bar-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.38) 45%,
            rgba(255,255,255,0.55) 50%,
            rgba(255,255,255,0.38) 55%,
            transparent 100%
          );
          transform: translateX(-100%);
          animation: sk-shimmer 2.6s ease-in-out infinite;
          border-radius: inherit;
        }
        @keyframes sk-shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `})]})}const Ze=[{icon:Ne,color:"#3B82F6",label:"Location",value:"Nilphamari, Bangladesh"},{icon:Se,color:"#10B981",label:"School",value:"SSC-26 · SGSC"},{icon:ze,color:"#F59E0B",label:"Goal",value:"CSE Engineer & Developer"},{icon:Ce,color:"#EC4899",label:"Languages",value:"Bengali · English · Hindi"},{icon:_e,color:"#A855F7",label:"Values",value:"Islam · Discipline · Quality"}],_={hidden:{opacity:0,y:24},show:{opacity:1,y:0,transition:{duration:.5,ease:[.16,1,.3,1]}}};function ea(){const a=ie();return e.jsxs("section",{className:"section section-alt",id:"about-mini",children:[e.jsx("div",{className:"container-xl",children:e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-items-center mx-auto",children:[e.jsx(p.motion.div,{className:"relative flex justify-center",initial:{opacity:0,x:-30},whileInView:{opacity:1,x:0},viewport:{once:!0,amount:.2},transition:{duration:.6,ease:[.16,1,.3,1]},children:e.jsxs("div",{className:"relative w-72 sm:w-80 lg:w-96",children:[e.jsx("div",{className:"absolute inset-0 translate-x-5 translate-y-5 rounded-2xl border-2 border-[var(--accent-primary)] opacity-20"}),e.jsxs("div",{className:"relative rounded-2xl overflow-hidden aspect-[3/4] border border-[var(--border-strong)] bg-[var(--bg-surface-2)] shadow-[var(--shadow-xl)]",children:[e.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(135deg,#0F172A,#1E293B 60%,#1E3A8A)"}}),e.jsx("img",{src:"/muhtasim-about.webp",alt:"Muhtasim Rahman",className:"absolute inset-0 w-full h-full object-cover",onError:r=>{r.target.style.display="none"}}),e.jsx("div",{className:"about-img-overlay absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"}),e.jsxs("div",{className:"absolute bottom-4 left-4",children:[e.jsx("p",{className:"text-white font-bold font-display",children:b.owner.displayName}),e.jsxs("p",{className:"text-white/60 text-xs mt-0.5",children:["Age ",a," · Bangladesh"]})]})]}),e.jsxs(p.motion.div,{className:"absolute -right-6 top-12 card px-3 py-2 shadow-[var(--shadow-lg)] text-center min-w-[78px]",animate:{y:[0,-6,0]},transition:{duration:3,repeat:1/0,ease:"easeInOut"},children:[e.jsx("p",{className:"text-xl font-display font-extrabold text-[var(--accent-primary)]",children:"3+"}),e.jsx("p",{className:"text-[10px] text-[var(--text-tertiary)] uppercase tracking-wide",children:"Yrs Dev"})]}),e.jsxs(p.motion.div,{className:"absolute -left-6 bottom-16 card px-3 py-2 shadow-[var(--shadow-lg)] text-center min-w-[78px]",animate:{y:[0,6,0]},transition:{duration:4,repeat:1/0,ease:"easeInOut",delay:1},children:[e.jsx("p",{className:"text-xl font-display font-extrabold text-[#10B981]",children:"16+"}),e.jsx("p",{className:"text-[10px] text-[var(--text-tertiary)] uppercase tracking-wide",children:"Projects"})]})]})}),e.jsxs(p.motion.div,{className:"flex flex-col gap-5",initial:"hidden",whileInView:"show",viewport:{once:!0,amount:.15},variants:{hidden:{},show:{transition:{staggerChildren:.09}}},children:[e.jsx(p.motion.p,{variants:_,className:"text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold",children:"About Me"}),e.jsxs(p.motion.h2,{variants:_,className:"text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] leading-tight",children:["Self-taught developer",e.jsx("br",{}),e.jsx("span",{className:"text-[var(--accent-primary)]",children:"from Bangladesh"})]}),e.jsxs(p.motion.p,{variants:_,className:"text-[var(--text-secondary)] leading-relaxed text-sm",children:["Hi, I'm ",e.jsx("strong",{className:"text-[var(--text-primary)]",children:"Muhtasim Rahman (Turzo)"}),", a ",a,"-year-old student and self-taught web developer from Nilphamari, Bangladesh. Since I was young I've been fascinated by technology — from circuits to my first HTML page."]}),e.jsxs(p.motion.p,{variants:_,className:"text-[var(--text-secondary)] leading-relaxed text-sm",children:["Currently preparing for HSC while building real-world projects. My goal is to become a professional full-stack developer and pursue a CSE degree. All work follows ",e.jsx("strong",{className:"text-[var(--text-primary)]",children:"Islamic & ethical principles"}),"."]}),e.jsxs(p.motion.div,{variants:_,className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:[Ze.map(({icon:r,color:t,label:i,value:s})=>e.jsxs("div",{className:"flex items-start gap-2.5 p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors duration-200",children:[e.jsx("div",{className:"w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5",style:{background:`${t}18`,color:t},children:e.jsx(o,{icon:r,className:"text-xs"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium",children:i}),e.jsx("p",{className:"text-xs text-[var(--text-secondary)] mt-0.5",children:s})]})]},i)),e.jsxs(v,{to:"/about",className:"group flex items-start gap-2.5 p-3 rounded-lg border transition-all duration-200 active:scale-[.98]",style:{background:"linear-gradient(135deg,rgba(59,130,246,.1),rgba(99,102,241,.06))",borderColor:"rgba(59,130,246,.3)"},children:[e.jsx("div",{className:"w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5",style:{background:"rgba(59,130,246,.18)",color:"var(--accent-primary)"},children:e.jsx(o,{icon:Ie,className:"text-xs"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"text-[10px] uppercase tracking-wider text-[var(--accent-primary)] font-medium opacity-80",children:"More"}),e.jsxs("p",{className:"text-xs font-semibold text-[var(--accent-primary)] mt-0.5 flex items-center gap-1",children:["Read Full Story",e.jsx(o,{icon:k,className:"text-[10px] transition-transform duration-200 group-hover:translate-x-1"})]})]})]})]})]})]})}),e.jsx("style",{children:`
        .about-img-overlay {
          background: linear-gradient(to top, rgba(2,6,23,0.85), transparent);
        }
        [data-theme="light"] .about-img-overlay {
          background: linear-gradient(to top, rgba(248,250,252,0.18), transparent);
        }
      `})]})}const H=[{id:"linkivo",slug:"linkivo",title:"Linkivo — Smart Link Manager",short_description:"PWA for intelligent link management with weighted discovery and GSAP animations.",thumbnail_url:null,github_link:null,live_link:null,tags:["PWA","Firebase","GSAP"],category:"Web App"},{id:"qr-prism",slug:"qr-prism",title:"QR Prism",short_description:"Feature-rich PWA for QR generation, scanning, batch processing with cloud storage.",thumbnail_url:null,github_link:"https://github.com/muhtasim-rahman/qr-prism",live_link:"https://muhtasim-rahman.github.io/qr-prism",tags:["PWA","Firebase","QR"],category:"Utility"},{id:"ufmt",slug:"ufmt-ssc26",title:"FMT Tracker Pro — SSC-26",short_description:"Merit tracking dashboard for SSC-26 students powered by Google Sheets.",thumbnail_url:null,github_link:"https://github.com/muhtasim-rahman/UFMT-SSC26",live_link:"https://muhtasim-rahman.github.io/UFMT-SSC26/",tags:["Education","Sheets","Charts"],category:"Education"},{id:"notif",slug:"notification-panel",title:"Notification Panel",short_description:"Plug-and-play notification panel powered by Google Sheets for any website.",thumbnail_url:null,github_link:"https://github.com/muhtasim-rahman/notification-panel",live_link:null,tags:["Component","Open Source"],category:"UI Component"},{id:"exporter",slug:"exporter-pro",title:"Project Exporter Pro",short_description:"JS export engine: PNG, JPG, SVG, PDF with Shadow DOM isolation.",thumbnail_url:null,github_link:"https://github.com/muhtasim-rahman/exporter-pro",live_link:null,tags:["Library","Shadow DOM"],category:"Dev Tool"},{id:"halal",slug:"halal",title:"Halal — World of Muslims",short_description:"Interactive Islamic resource covering the Five Pillars of Islam.",thumbnail_url:null,github_link:"https://github.com/muhtasim-rahman/halal",live_link:"https://muhtasim-rahman.github.io/halal",tags:["Islamic","Educational"],category:"Islamic"}],O={"Web App":"#3B82F6",Utility:"#10B981",Education:"#F59E0B","UI Component":"#EC4899","Dev Tool":"#A855F7",Islamic:"#06B6D4",default:"#64748B"};function aa({p:a,i:r}){var c;const t=O[a.category]??O.default,[i,s]=l.useState(!1);return e.jsxs(p.motion.div,{className:"card flex flex-col overflow-hidden transition-all duration-300",style:{borderColor:i?t:void 0},onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),initial:{opacity:0,y:28},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.1},transition:{duration:.45,delay:r*.07},children:[e.jsxs("div",{className:"relative h-40 bg-[var(--bg-surface-2)] overflow-hidden flex-shrink-0 group",children:[a.thumbnail_url?e.jsx("img",{src:a.thumbnail_url,alt:a.title,className:"w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",loading:"lazy"}):e.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-2",style:{background:`linear-gradient(135deg,${t}18,${t}08)`},children:[e.jsx(o,{icon:X,className:"text-3xl",style:{color:`${t}60`}}),e.jsx("span",{className:"text-xs text-[var(--text-tertiary)]",children:a.category})]}),e.jsx("div",{className:"absolute top-3 left-3",children:e.jsx("span",{className:"text-[10px] font-semibold px-2 py-0.5 rounded-full",style:{background:`${t}22`,color:t,border:`1px solid ${t}35`,backdropFilter:"blur(4px)"},children:a.category})}),e.jsxs("div",{className:"absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200",children:[a.github_link&&e.jsx("a",{href:a.github_link,target:"_blank",rel:"noopener noreferrer",className:"w-7 h-7 rounded-md bg-[var(--bg-surface-2)]/90 backdrop-blur-sm flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors text-xs",children:e.jsx(o,{icon:V})}),a.live_link&&e.jsx("a",{href:a.live_link,target:"_blank",rel:"noopener noreferrer",className:"w-7 h-7 rounded-md bg-[var(--bg-surface-2)]/90 backdrop-blur-sm flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors text-xs",children:e.jsx(o,{icon:L})})]})]}),e.jsxs("div",{className:"p-4 flex flex-col gap-2.5 flex-1",children:[((c=a.tags)==null?void 0:c.length)>0&&e.jsxs("div",{className:"flex flex-wrap gap-1",children:[a.tags.slice(0,3).map(m=>e.jsxs("span",{className:"inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--bg-surface-3)] text-[var(--text-tertiary)]",children:[e.jsx(o,{icon:Q,className:"text-[8px]"}),m]},m)),a.tags.length>3&&e.jsxs("span",{className:"text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--bg-surface-3)] text-[var(--text-tertiary)]",children:["+",a.tags.length-3]})]}),e.jsx(v,{to:`/projects/${a.slug}`,className:"font-display font-bold text-[var(--text-primary)] leading-snug line-clamp-2 text-sm hover:text-[var(--accent-primary)] transition-colors duration-200 w-fit max-w-full",style:{color:void 0},children:a.title}),e.jsx("p",{className:"text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1",children:a.short_description}),e.jsx("div",{className:"pt-2 border-t border-[var(--border-color)]",children:e.jsxs(v,{to:`/projects/${a.slug}`,className:"flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 group/link",children:[e.jsx("span",{children:"View details"}),e.jsx(o,{icon:k,className:"text-[10px] transition-transform duration-200 group-hover/link:translate-x-1"})]})})]})]})}function ta(){const[a,r]=l.useState([]),[t,i]=l.useState(!0);return l.useEffect(()=>{ne().then(s=>r(s!=null&&s.length?s:H)).catch(()=>r(H)).finally(()=>i(!1))},[]),e.jsx("section",{className:"section",id:"projects-mini",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10",children:[e.jsxs(p.motion.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5},children:[e.jsx("p",{className:"text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2",children:"My Work"}),e.jsx("h2",{className:"text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]",children:"Featured Projects"})]}),e.jsx(p.motion.div,{initial:{opacity:0,x:20},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.5,delay:.1},children:e.jsxs(v,{to:"/projects",className:"inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 group",children:["All projects ",e.jsx(o,{icon:k,className:"text-xs transition-transform duration-200 group-hover:translate-x-1"})]})})]}),e.jsx("div",{className:"proj-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",children:t?Array.from({length:6},(s,c)=>e.jsx(oe,{},c)):a.map((s,c)=>e.jsx(aa,{p:s,i:c},s.id))}),e.jsx("style",{children:`
          @media(max-width:639px){ .proj-grid > *:nth-child(n+4){ display:none; } }
          @media(min-width:640px) and (max-width:1023px){ .proj-grid > *:nth-child(n+5){ display:none; } }
        `}),e.jsx(p.motion.div,{className:"flex justify-center mt-10",initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:.2},children:e.jsxs(v,{to:"/projects",className:"inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all duration-200 active:scale-[.97] group",children:["View All Projects",e.jsx(o,{icon:k,className:"text-xs transition-transform duration-200 group-hover:translate-x-1"})]})})]})})}const ra=[{icon:Ae,color:"#3B82F6",gradient:"from-blue-500/10 to-blue-600/5",title:"Website Design & Development",description:"Visually appealing, responsive, and professional websites tailored to your needs — built with modern tech stack.",features:["Responsive design (mobile-first)","Clean & modern UI","Fast loading & optimized","SEO-friendly structure","React or static HTML/CSS"],badge:"Most popular",badgeColor:"#3B82F6"},{icon:q,color:"#EC4899",gradient:"from-pink-500/10 to-pink-600/5",title:"Graphic Design",description:"Eye-catching visuals for your brand — logos, banners, thumbnails, posters, and more using design principles.",features:["Logo & brand identity","Social media banners","YouTube thumbnails","Event posters","Business card design"],badge:"6+ years exp.",badgeColor:"#EC4899"},{icon:J,color:"#A855F7",gradient:"from-purple-500/10 to-purple-600/5",title:"Video Editing",description:"Professional video content for YouTube, social media, ads — polished edits with effects and motion.",features:["YouTube video editing","Reels & Shorts","Intro / outro animation","Subtitle & captions","Color grading"],badge:"5+ years exp.",badgeColor:"#A855F7"}];function sa(){return e.jsx("section",{className:"section section-alt",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs(p.motion.div,{className:"text-center mb-12",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5},children:[e.jsx("p",{className:"text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2",children:"What I Offer"}),e.jsx("h2",{className:"text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]",children:"Services"}),e.jsx("p",{className:"text-[var(--text-secondary)] mt-3 max-w-lg mx-auto text-sm leading-relaxed",children:"I provide quality digital services — ethically and professionally. All work follows Islamic & halal principles."})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-5",children:ra.map((a,r)=>{const[t,i]=l.useState(!1);return e.jsxs(p.motion.div,{className:"card p-6 flex flex-col gap-5 relative overflow-hidden group transition-colors duration-300",style:{borderColor:t?a.color:void 0},onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.2},transition:{duration:.55,delay:r*.1,ease:[.16,1,.3,1]},children:[e.jsx("div",{className:`absolute inset-0 bg-gradient-to-br ${a.gradient} opacity-0
                  group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}),e.jsxs("div",{className:"flex items-start justify-between gap-2 relative",children:[e.jsx("div",{className:"w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",style:{background:`${a.color}18`,color:a.color},children:e.jsx(o,{icon:a.icon,className:"text-xl"})}),e.jsx("span",{className:"text-[10px] font-semibold px-2.5 py-1 rounded-full",style:{background:`${a.badgeColor}18`,color:a.badgeColor,border:`1px solid ${a.badgeColor}30`},children:a.badge})]}),e.jsxs("div",{className:"relative space-y-2",children:[e.jsx("h3",{className:"font-display font-bold text-[var(--text-primary)] text-lg leading-tight",children:a.title}),e.jsx("p",{className:"text-sm text-[var(--text-secondary)] leading-relaxed",children:a.description})]}),e.jsx("ul",{className:"relative space-y-2 flex-1",children:a.features.map(s=>e.jsxs("li",{className:"flex items-center gap-2 text-sm text-[var(--text-secondary)]",children:[e.jsx(o,{icon:Fe,className:"text-xs flex-shrink-0",style:{color:a.color}}),s]},s))}),e.jsx("div",{className:"border-t border-[var(--border-color)] relative"}),e.jsxs(v,{to:"/contact",className:`relative flex items-center justify-between text-sm font-semibold
                  group/cta`,style:{color:a.color},children:[e.jsx("span",{children:"Get this service"}),e.jsx(o,{icon:k,className:"text-xs transition-transform duration-200 group-hover/cta:translate-x-1"})]})]},a.title)})}),e.jsx(p.motion.p,{className:"text-center text-xs text-[var(--text-tertiary)] mt-8",initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.5,delay:.3},children:"All services are offered ethically. No haram content or immoral projects accepted."})]})})}const U=[{id:1,reviewer_name:"Arif Hossain",reviewer_role:"Client — Logo Design",rating:5,body:"Exceptional design work! Muhtasim delivered a professional logo that perfectly captured my brand vision. Fast, communicative, and highly skilled."},{id:2,reviewer_name:"Tanvir Ahmed",reviewer_role:"Client — Website",rating:5,body:"The portfolio website he built for me was clean, fast, and exactly what I needed. Great attention to detail and responsive to feedback."},{id:3,reviewer_name:"Rina Begum",reviewer_role:"Client — Thumbnail Design",rating:4,body:"Loved the YouTube thumbnails — vibrant and eye-catching. Click-through rate improved noticeably after switching to his designs."}];function ia({n:a}){return e.jsx("div",{className:"flex gap-0.5",children:[1,2,3,4,5].map(r=>e.jsx(o,{icon:K,className:`text-xs ${r<=a?"text-amber-400":"text-[var(--border-strong)]"}`},r))})}function na({r:a,i:r}){var i;const t=(i=a.reviewer_name)==null?void 0:i.split(" ").map(s=>s[0]).join("").slice(0,2).toUpperCase();return e.jsxs(p.motion.div,{className:"card p-6 flex flex-col gap-4",initial:{opacity:0,y:24},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.2},transition:{duration:.5,delay:r*.09},children:[e.jsx(o,{icon:Ve,className:"text-[var(--accent-primary)] opacity-25 text-2xl"}),e.jsxs("p",{className:"text-sm text-[var(--text-secondary)] leading-relaxed flex-1 italic",children:['"',a.body,'"']}),e.jsxs("div",{className:"flex items-center justify-between pt-3 border-t border-[var(--border-color)]",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[a.avatar_url?e.jsx("img",{src:a.avatar_url,alt:a.reviewer_name,className:"w-9 h-9 rounded-full object-cover"}):e.jsx("div",{className:"w-9 h-9 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)] text-xs font-bold flex-shrink-0",children:t}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-[var(--text-primary)]",children:a.reviewer_name}),e.jsx("p",{className:"text-[10px] text-[var(--text-tertiary)]",children:a.reviewer_role})]})]}),e.jsx(ia,{n:a.rating})]})]})}function oa(){const[a,r]=l.useState([]),[t,i]=l.useState(!0);return l.useEffect(()=>{le({limit:3}).then(s=>r(s!=null&&s.length?s:U)).catch(()=>r(U)).finally(()=>i(!1))},[]),e.jsx("section",{className:"section",id:"reviews",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10",children:[e.jsxs(p.motion.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5},children:[e.jsx("p",{className:"text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2",children:"Kind Words"}),e.jsx("h2",{className:"text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]",children:"Reviews"}),e.jsx("p",{className:"text-sm text-[var(--text-secondary)] mt-1",children:"From clients, collaborators & visitors"})]}),e.jsxs(p.motion.div,{className:"flex items-center gap-3 flex-shrink-0",initial:{opacity:0,x:20},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.5,delay:.1},children:[e.jsxs(v,{to:"/reviews",className:"inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 group",children:["View all ",e.jsx(o,{icon:k,className:"text-xs transition-transform duration-200 group-hover:translate-x-1"})]}),e.jsxs(v,{to:"/reviews/give",className:"inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] transition-colors duration-200 active:scale-[.97]",children:[e.jsx(o,{icon:Te,className:"text-xs"})," Give Review"]})]})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-5",children:t?Array.from({length:3},(s,c)=>e.jsxs("div",{className:"card p-6 space-y-4",children:[e.jsx(S,{h:"h-4",w:"w-8",rounded:"rounded"}),e.jsx(S,{h:"h-16",rounded:"rounded",delay:.05}),e.jsxs("div",{className:"flex items-center gap-2 pt-2 border-t border-[var(--border-color)]",children:[e.jsx(ce,{size:36})," ",e.jsxs("div",{className:"space-y-1.5 flex-1",children:[e.jsx(S,{h:"h-3.5",w:"w-24",rounded:"rounded"}),e.jsx(S,{h:"h-3",w:"w-16",rounded:"rounded",delay:.08})]})]})]},c)):a.map((s,c)=>e.jsx(na,{r:s,i:c},s.id))})]})})}const N="muhtasim-rahman",I="#c084fc",W={JavaScript:"#f7df1e",TypeScript:"#3178c6",Python:"#3776ab",HTML:"#e44d26",CSS:"#264de4",Shell:"#89e051",PHP:"#777bb4",Java:"#b07219","C++":"#f34b7d",Go:"#00add8",Rust:"#dea584",Swift:"#ffac45",Ruby:"#701516",Kotlin:"#A97BFF",Dart:"#00b4ab",Vue:"#41b883",SCSS:"#c6538c",Lua:"#000080","C#":"#178600",R:"#198ce7",default:"#64748b"};function D(a){return W[a]??W.default}function la({repo:a,i:r}){return e.jsxs(p.motion.a,{href:a.html_url,target:"_blank",rel:"noopener noreferrer",className:"gh-repo-card",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.1},transition:{duration:.4,delay:r*.06},children:[e.jsxs("div",{className:"gh-repo-top",children:[e.jsx(o,{icon:Z,className:"text-[var(--text-tertiary)] text-xs mt-0.5 flex-shrink-0"}),e.jsx("span",{className:"gh-repo-name",children:a.name}),e.jsx(o,{icon:L,className:"gh-repo-ext"})]}),a.description&&e.jsx("p",{className:"gh-repo-desc",children:a.description}),e.jsxs("div",{className:"gh-repo-meta",children:[a.language&&e.jsxs("span",{className:"gh-repo-lang",children:[e.jsx("span",{className:"gh-repo-lang-dot",style:{background:D(a.language)}}),a.language]}),a.stargazers_count>0&&e.jsxs("span",{className:"gh-repo-stat",children:[e.jsx(o,{icon:K,className:"text-yellow-400 text-[10px]"}),a.stargazers_count]}),a.forks_count>0&&e.jsxs("span",{className:"gh-repo-stat",children:[e.jsx(o,{icon:Le,className:"text-[var(--text-tertiary)] text-[10px]"}),a.forks_count]})]})]})}function ca({langs:a}){if(!a.length)return null;const r=a.reduce((t,i)=>t+i.bytes,0);return e.jsxs("div",{className:"gh-lang-section",children:[e.jsx("p",{className:"gh-sub-label",children:"Top Languages"}),e.jsx("div",{className:"gh-lang-bar",children:a.map((t,i)=>e.jsx(p.motion.div,{className:"gh-lang-seg",style:{"--clr":D(t.lang)},title:`${t.lang}: ${(t.bytes/r*100).toFixed(1)}%`,initial:{scaleX:0},whileInView:{scaleX:1},viewport:{once:!0},transition:{duration:.7,delay:i*.08,ease:[.16,1,.3,1]}},t.lang))}),e.jsx("div",{className:"gh-lang-legend",children:a.slice(0,8).map(t=>e.jsxs("span",{className:"gh-lang-item",children:[e.jsx("span",{className:"gh-lang-dot",style:{background:D(t.lang)}}),e.jsx("span",{className:"gh-lang-name",children:t.lang}),e.jsxs("span",{className:"gh-lang-pct",children:[(t.bytes/r*100).toFixed(0),"%"]})]},t.lang))})]})}function T({icon:a,value:r,label:t,color:i}){return e.jsxs("div",{className:"gh-stat-pill",style:{"--c":i},children:[e.jsx(o,{icon:a,className:"gh-stat-icon"}),e.jsx("span",{className:"gh-stat-val",children:r??"–"}),e.jsx("span",{className:"gh-stat-lbl",children:t})]})}function da(){const[a,r]=l.useState(null),[t,i]=l.useState([]),[s,c]=l.useState([]),[m,x]=l.useState(!0),[h,u]=l.useState(null),[f,C]=l.useState({streak:!1,readme:!1}),z=async()=>{x(!0),u(null);try{const[n,g]=await Promise.all([fetch(`https://api.github.com/users/${N}`),fetch(`https://api.github.com/users/${N}/repos?sort=stars&per_page=100&type=owner`)]);if(!n.ok)throw new Error(`GitHub API ${n.status}`);const A=await n.json(),M=g.ok?await g.json():[];r(A);const ae=M.filter(j=>!j.fork).sort((j,w)=>w.stargazers_count-j.stargazers_count).slice(0,6);i(ae);const E={},te=M.filter(j=>!j.fork).slice(0,30).map(j=>fetch(j.languages_url).then(w=>w.ok?w.json():{}).then(w=>{Object.entries(w).forEach(([$,se])=>{E[$]=(E[$]||0)+se})}).catch(()=>{}));await Promise.all(te);const re=Object.entries(E).sort((j,w)=>w[1]-j[1]).slice(0,8).map(([j,w])=>({lang:j,bytes:w}));c(re)}catch(n){u(n.message??"Failed to load")}finally{x(!1)}};l.useEffect(()=>{z()},[]);const y=`https://github-readme-stats.vercel.app/api?username=${N}&show_icons=true&hide_border=true&theme=transparent&title_color=c084fc&text_color=94a3b8&icon_color=818cf8&hide_title=false&count_private=true`,d=`https://github-readme-streak-stats.herokuapp.com/?user=${N}&hide_border=true&theme=transparent&stroke=c084fc&ring=c084fc&fire=f97316&sideLabels=94a3b8&currStreakLabel=c084fc&dates=64748b`;return e.jsxs("section",{className:"section section-alt",id:"github",children:[e.jsxs("div",{className:"container-xl",children:[e.jsxs(p.motion.div,{className:"text-center mb-10",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5},children:[e.jsx("p",{className:"text-xs uppercase tracking-widest font-semibold mb-2",style:{color:I},children:"Open Source"}),e.jsx("h2",{className:"text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]",children:"GitHub Activity"}),e.jsx("p",{className:"text-[var(--text-secondary)] mt-2 text-sm max-w-md mx-auto",children:"Real-time stats pulled from the GitHub API. Updated on every visit."})]}),m?e.jsxs("div",{className:"flex items-center justify-center py-20 gap-3 text-[var(--text-tertiary)]",children:[e.jsx(o,{icon:Ee,className:"animate-spin text-xl"}),e.jsx("span",{className:"text-sm",children:"Fetching GitHub data…"})]}):h?e.jsxs("div",{className:"flex flex-col items-center py-16 gap-4 text-center",children:[e.jsx("p",{className:"text-[var(--text-secondary)] text-sm",children:h.includes("403")?"GitHub API rate-limited. Try again shortly.":h}),e.jsxs("button",{onClick:z,className:"inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all active:scale-[.97]",children:[e.jsx(o,{icon:Re})," Retry"]})]}):e.jsxs(e.Fragment,{children:[a&&e.jsxs(p.motion.div,{className:"gh-profile-row",initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},children:[e.jsxs("a",{href:a.html_url,target:"_blank",rel:"noopener noreferrer",className:"gh-avatar-wrap",children:[e.jsx("img",{src:a.avatar_url,alt:a.name??N,className:"gh-avatar"}),e.jsxs("div",{children:[e.jsx("p",{className:"gh-profile-name",children:a.name??N}),e.jsxs("p",{className:"gh-profile-user",children:["@",a.login]}),a.bio&&e.jsx("p",{className:"gh-profile-bio",children:a.bio})]})]}),e.jsxs("div",{className:"gh-stat-pills",children:[e.jsx(T,{icon:Z,value:a.public_repos,label:"Repos",color:"#c084fc"}),e.jsx(T,{icon:Pe,value:a.followers,label:"Followers",color:"#818cf8"}),e.jsx(T,{icon:De,value:a.public_gists,label:"Gists",color:"#38bdf8"}),e.jsx(T,{icon:ee,value:t.reduce((n,g)=>n+g.stargazers_count,0),label:"Total Stars",color:"#fbbf24"})]})]}),e.jsxs("div",{className:"gh-img-grid",children:[!f.streak&&e.jsx(p.motion.div,{className:"gh-img-card",initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.45,delay:.1},children:e.jsx("img",{src:d,alt:"GitHub streak stats",className:"w-full h-auto block",loading:"lazy",onError:()=>C(n=>({...n,streak:!0}))})}),!f.readme&&e.jsx(p.motion.div,{className:"gh-img-card",initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.45,delay:.18},children:e.jsx("img",{src:y,alt:"GitHub overview stats",className:"w-full h-auto block",loading:"lazy",onError:()=>C(n=>({...n,readme:!0}))})})]}),s.length>0&&e.jsx(ca,{langs:s}),t.length>0&&e.jsxs("div",{className:"mt-8",children:[e.jsx("p",{className:"gh-sub-label mb-4",children:"Top Repositories"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:t.map((n,g)=>e.jsx(la,{repo:n,i:g},n.id))})]}),e.jsx(p.motion.div,{className:"flex justify-center mt-10",initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.5},children:e.jsxs("a",{href:`https://github.com/${N}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all active:scale-[.97] group",children:[e.jsx(o,{icon:V}),"View Full Profile",e.jsx(o,{icon:L,className:"text-xs transition-transform group-hover:translate-x-0.5"})]})})]})]}),e.jsx("style",{children:`
        .gh-profile-row {
          display: flex; align-items: flex-start; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 1.2rem 1.4rem;
          margin-bottom: 1.5rem;
        }
        .gh-avatar-wrap {
          display: flex; align-items: center; gap: 1rem;
          text-decoration: none; color: inherit;
          flex: 1; min-width: 0;
        }
        .gh-avatar {
          width: 60px; height: 60px; border-radius: 14px;
          object-fit: cover; flex-shrink: 0;
          border: 2px solid ${I}44;
        }
        .gh-profile-name {
          font-size: .95rem; font-weight: 700;
          color: var(--text-primary); line-height: 1.2;
        }
        .gh-profile-user {
          font-size: .78rem; color: var(--text-tertiary); font-family: var(--font-mono);
          margin-top: 1px;
        }
        .gh-profile-bio {
          font-size: .78rem; color: var(--text-secondary); margin-top: 4px;
          max-width: 340px; line-height: 1.5;
        }
        .gh-stat-pills {
          display: flex; gap: .6rem; flex-wrap: wrap; align-items: center;
        }
        .gh-stat-pill {
          display: flex; flex-direction: column; align-items: center;
          padding: .5rem .8rem; border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface-2);
          min-width: 68px;
          transition: transform .18s ease, border-color .18s ease;
        }
        .gh-stat-pill:hover {
          transform: translateY(-2px);
          border-color: var(--c, ${I});
        }
        .gh-stat-icon { font-size: 12px; color: var(--c, ${I}); margin-bottom: 3px; }
        .gh-stat-val  { font-size: 1rem; font-weight: 800; font-family: var(--font-display); color: var(--text-primary); line-height: 1; }
        .gh-stat-lbl  { font-size: .6rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: .05em; margin-top: 2px; }

        .gh-img-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 640px) { .gh-img-grid { grid-template-columns: 1fr; } }
        .gh-img-card {
          border: 1px solid var(--border-color);
          border-radius: 16px; overflow: hidden;
          background: var(--bg-surface);
          display: flex; align-items: center; justify-content: center;
        }

        .gh-sub-label {
          font-size: .7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .12em; color: var(--text-tertiary); margin-bottom: .75rem;
        }

        /* Language bar */
        .gh-lang-section { margin-bottom: 1.5rem; }
        .gh-lang-bar {
          display: flex; height: 10px; border-radius: 9999px; overflow: hidden; gap: 2px;
          margin-bottom: .75rem;
        }
        .gh-lang-seg {
          flex: 1 0 auto; height: 100%;
          background: var(--clr);
          transform-origin: left;
        }
        .gh-lang-legend {
          display: flex; flex-wrap: wrap; gap: .5rem .9rem;
        }
        .gh-lang-item {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: .78rem; color: var(--text-secondary);
        }
        .gh-lang-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
        }
        .gh-lang-name { font-weight: 500; }
        .gh-lang-pct  { color: var(--text-tertiary); font-size: .72rem; font-family: var(--font-mono); }

        /* Repo cards */
        .gh-repo-card {
          display: flex; flex-direction: column; gap: .5rem;
          padding: 1rem 1.1rem;
          border-radius: 14px;
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          text-decoration: none; color: inherit;
          transition: border-color .2s ease, transform .2s ease, box-shadow .2s ease;
          min-height: 100px;
        }
        .gh-repo-card:hover {
          border-color: ${I}66;
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(0,0,0,.18);
        }
        .gh-repo-top {
          display: flex; align-items: flex-start; gap: .5rem;
        }
        .gh-repo-name {
          flex: 1; min-width: 0;
          font-size: .84rem; font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-mono);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .gh-repo-ext {
          font-size: 10px; color: var(--text-tertiary); margin-top: 2px; flex-shrink: 0;
          opacity: 0; transition: opacity .15s ease;
        }
        .gh-repo-card:hover .gh-repo-ext { opacity: 1; }
        .gh-repo-desc {
          font-size: .77rem; color: var(--text-secondary); line-height: 1.5;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden; flex: 1;
        }
        .gh-repo-meta {
          display: flex; align-items: center; gap: .7rem; margin-top: auto; flex-wrap: wrap;
        }
        .gh-repo-lang {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: .73rem; color: var(--text-secondary);
        }
        .gh-repo-lang-dot {
          width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0;
        }
        .gh-repo-stat {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: .73rem; color: var(--text-secondary);
        }
      `})]})}function pa(a){const r=Date.now()-new Date(a),t=Math.floor(r/864e5);return t<1?"Today":t<7?`${t}d ago`:t<30?`${Math.floor(t/7)}w ago`:`${Math.floor(t/30)}mo ago`}function ma({post:a,i:r}){return e.jsxs(p.motion.article,{className:"card group flex flex-col gap-4 p-5 hover:border-[var(--accent-primary)] transition-colors duration-300",initial:{opacity:0,y:24},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.2},transition:{duration:.5,delay:r*.09,ease:[.16,1,.3,1]},children:[a.thumbnail_url&&e.jsx("div",{className:"h-40 rounded-lg overflow-hidden -mx-5 -mt-5 mb-0",children:e.jsx("img",{src:a.thumbnail_url,alt:a.title,className:"w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",loading:"lazy"})}),e.jsxs("div",{className:"flex items-center gap-3 text-[10px] text-[var(--text-tertiary)]",children:[a.category&&e.jsxs("span",{className:`inline-flex items-center gap-1 px-2 py-0.5 rounded-full
            bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-medium`,children:[e.jsx(o,{icon:Q,className:"text-[8px]"}),a.category]}),e.jsxs("span",{className:"flex items-center gap-1 ml-auto",children:[e.jsx(o,{icon:Me}),pa(a.created_at)]})]}),e.jsx("h3",{className:`font-display font-bold text-[var(--text-primary)] leading-snug line-clamp-2
        group-hover:text-[var(--accent-primary)] transition-colors duration-200`,children:a.title}),e.jsx("p",{className:"text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed flex-1",children:a.excerpt||a.short_description}),e.jsxs(v,{to:`/feed/${a.slug}`,className:`flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)]
          hover:gap-2.5 transition-all duration-200 group/link mt-auto`,children:["Read more ",e.jsx(o,{icon:k,className:"text-[10px]"})]})]})}function xa(){const[a,r]=l.useState([]),[t,i]=l.useState(!0);return l.useEffect(()=>{de({limit:3}).then(s=>r(s||[])).catch(()=>r([])).finally(()=>i(!1))},[]),!t&&a.length===0?null:e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"flex items-end justify-between gap-4 mb-10",children:[e.jsxs(p.motion.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5},children:[e.jsx("p",{className:"text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2",children:"Latest"}),e.jsx("h2",{className:"text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]",children:"From the Feed"})]}),e.jsxs(v,{to:"/feed",className:`text-sm font-semibold text-[var(--text-secondary)]
            hover:text-[var(--accent-primary)] transition-colors duration-200
            inline-flex items-center gap-1.5 group flex-shrink-0`,children:["All posts ",e.jsx(o,{icon:k,className:"text-xs transition-transform duration-200 group-hover:translate-x-1"})]})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-5",children:t?Array.from({length:3},(s,c)=>e.jsxs("div",{className:"card p-5 space-y-4",children:[e.jsx(S,{h:"h-40",rounded:"rounded-lg"}),e.jsx(S,{h:"h-4",w:"w-3/4",rounded:"rounded",delay:.05}),e.jsx(S,{h:"h-3",w:"w-1/2",rounded:"rounded",delay:.08})]},c)):a.map((s,c)=>e.jsx(ma,{post:s,i:c},s.id))})]})})}function ha(){return e.jsxs("section",{className:"cta-section section",id:"cta","aria-label":"Call to action",children:[e.jsx("div",{className:"cta-grid-bg","aria-hidden":"true"}),e.jsx("div",{className:"cta-glow","aria-hidden":"true"}),e.jsx("div",{className:"container-xl relative z-10",children:e.jsxs(p.motion.div,{className:"cta-inner",initial:{opacity:0,y:28},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.6,ease:[.16,1,.3,1]},children:[e.jsxs("div",{className:"cta-badge",children:[e.jsx("span",{className:"cta-badge-dot","aria-hidden":"true"}),e.jsx("span",{children:"Available for freelance & collaboration"})]}),e.jsxs("h2",{className:"cta-heading",children:["Let's build something ",e.jsx("br",{className:"hidden sm:block"}),e.jsx("span",{className:"cta-heading-accent",children:"amazing together"})]}),e.jsx("p",{className:"cta-sub",children:"Have a project idea, a problem to solve, or just want to say hello? I'm always open to exciting opportunities."}),e.jsxs("div",{className:"cta-btns",children:[e.jsxs(v,{to:"/contact",className:"cta-btn-primary","aria-label":"Get in touch",children:[e.jsx(o,{icon:$e}),"Get in touch",e.jsx(o,{icon:k,className:"cta-arrow"})]}),e.jsxs("a",{href:b.social.github,target:"_blank",rel:"noopener noreferrer",className:"cta-btn-secondary","aria-label":"View GitHub profile",children:[e.jsx(o,{icon:V}),"GitHub"]})]}),e.jsxs("p",{className:"cta-footer-note",children:[e.jsx(o,{icon:ee,className:"text-[var(--accent-primary)] text-xs"}),"  Fast response · Clean code · On-time delivery"]})]})}),e.jsx("style",{children:`
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
      `})]})}function ka(){const{settings:a,loading:r}=pe();return l.useEffect(()=>{he("Home")},[]),e.jsxs(e.Fragment,{children:[e.jsxs(me,{children:[e.jsx("title",{children:xe(null)}),e.jsx("meta",{name:"description",content:b.seo.defaultDescription}),e.jsx("meta",{property:"og:title",content:b.siteName}),e.jsx("meta",{property:"og:description",content:b.seo.defaultDescription}),e.jsx("meta",{property:"og:image",content:b.seo.defaultOGImage}),e.jsx("meta",{property:"og:image:type",content:"image/webp"}),e.jsx("meta",{property:"og:image:width",content:"1200"}),e.jsx("meta",{property:"og:image:height",content:"630"}),e.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),e.jsx("meta",{name:"twitter:creator",content:b.seo.twitterHandle}),e.jsx("meta",{name:"twitter:image",content:b.seo.defaultOGImage})]}),e.jsx(Xe,{settings:a,settingsLoading:r}),e.jsx(Ke,{settings:a}),e.jsx(ea,{}),e.jsx(ta,{}),e.jsx(sa,{}),e.jsx(oa,{}),e.jsx(da,{}),e.jsx(xa,{}),e.jsx(ha,{})]})}export{ka as default};
