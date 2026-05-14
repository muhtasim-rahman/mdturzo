import{j as e,c as t}from"./motion-B0YflK6s.js";import{r as d,L as g}from"./vendor-mcV3incF.js";import{H as F,g as V,a as R,b as H,S as l,c as _,d as G,e as y,f as L,h as M}from"./index-r7zlltVh.js";import{F as n,o as j,d as T,A as N,R as Y,S as E,z as $,x as q,D as B,l as O,T as W,U as J,V as U,W as I,X as Q,b as k,Y as X,Z,G as K,_ as ee,$ as A,a0 as ae}from"./icons-Ixa1EhSM.js";import{p as re,w as ie,b as te}from"./seo-fNTlkew9.js";import{t as oe}from"./analytics-DzVGNH0I.js";import"./firebase-DPKIO6Ex.js";import"./supabase-vrwWM04E.js";const s={hidden:{opacity:0,y:18},visible:{opacity:1,y:0,transition:{duration:.45,ease:[.16,1,.3,1]}}},p={hidden:{},visible:{transition:{staggerChildren:.08}}},se=[{label:"AI",value:90,icon:Q,note:"Coding, planning, docs and design workflow"},{label:"HTML/CSS",value:82,icon:k,note:"Responsive interfaces and clean visual systems"},{label:"Git & GitHub",value:78,icon:N,note:"Version control and project publishing"},{label:"Python",value:58,icon:X,note:"Learning scripts, logic and automation"},{label:"JavaScript",value:46,icon:Z,note:"Improving through real projects"},{label:"Java",value:40,icon:k,note:"Core programming fundamentals"}],ne=[{title:"Website Design",text:"Responsive, professional websites with clear structure, strong visual hierarchy and maintainable code.",icon:k},{title:"Graphic Design",text:"Logo, banner, thumbnail, card and poster visuals shaped for clean online presentation.",icon:K},{title:"Photo & Video Editing",text:"Practical editing support for YouTube, short videos, social posts, ads and presentation assets.",icon:ee}],le=[{label:"GitHub",icon:N,url:l.social.github},{label:"LinkedIn",icon:Y,url:l.social.linkedin},{label:"Facebook",icon:E,url:l.social.facebook},{label:"Instagram",icon:$,url:l.social.instagram},{label:"YouTube",icon:q,url:l.social.youtube},{label:"Telegram",icon:B,url:l.social.telegram}];function x(a,o,i){const r=a==null?void 0:a[o];return r==null||r===""?i:typeof r=="object"&&"value"in r?r.value??i:r}function u(a,o=0){const i=String(a??o).replace(/[^\d.]/g,""),r=Number.parseFloat(i);return Number.isFinite(r)?r:o}function ce(){const[a,o]=d.useState({}),[i,r]=d.useState([]),[m,b]=d.useState([]),[w,v]=d.useState({settings:!0,projects:!0,reviews:!0});return d.useEffect(()=>{let h=!0;return V().then(c=>{h&&o(c||{})}).catch(()=>{}).finally(()=>{h&&v(c=>({...c,settings:!1}))}),R().then(c=>{h&&r(Array.isArray(c)?c:[])}).catch(()=>{}).finally(()=>{h&&v(c=>({...c,projects:!1}))}),H({limit:3}).then(c=>{h&&b(Array.isArray(c)?c:[])}).catch(()=>{}).finally(()=>{h&&v(c=>({...c,reviews:!1}))}),()=>{h=!1}},[]),{settings:a,projects:i,reviews:m,loading:w}}function C({value:a,suffix:o="",className:i=""}){const r=d.useRef(null),m=t.useInView(r,{once:!0,margin:"-80px"}),[b,w]=d.useState(0),v=Number(a)||0;return d.useEffect(()=>{if(!m)return;const h=performance.now(),c=1200,S=P=>{const z=Math.min((P-h)/c,1),D=1-Math.pow(1-z,3);w(Math.round(v*D)),z<1&&requestAnimationFrame(S)};requestAnimationFrame(S)},[m,v]),e.jsxs("span",{ref:r,className:i,children:[b,o]})}function f({eyebrow:a,title:o,text:i,align:r="center"}){return e.jsxs(t.motion.div,{variants:s,className:`home-section-head ${r==="left"?"text-left mx-0":"text-center mx-auto"}`,children:[e.jsx("span",{className:"section-label",children:a}),e.jsx("h2",{children:o}),i&&e.jsx("p",{children:i})]})}function me({settings:a,loading:o}){const i=d.useMemo(()=>[{label:"Years Dev",value:u(x(a,"stats_years_dev",l.defaults.statsYearsDev),3)},{label:"Years Design",value:u(x(a,"stats_years_design",l.defaults.statsYearsDesign),6)},{label:"Projects",value:u(x(a,"stats_projects",l.defaults.statsProjects),16)}],[a]);return e.jsxs("section",{className:"home-hero",id:"hero","aria-label":"Introduction",children:[e.jsx("div",{className:"home-hero__mesh","aria-hidden":!0}),e.jsx("div",{className:"home-hero__grain","aria-hidden":!0}),e.jsx("div",{className:"home-hero__orb home-hero__orb--one","aria-hidden":!0}),e.jsx("div",{className:"home-hero__orb home-hero__orb--two","aria-hidden":!0}),e.jsxs("div",{className:"container-xl home-hero__inner",children:[e.jsxs(t.motion.div,{variants:p,initial:"hidden",animate:"visible",className:"home-hero__content",children:[e.jsxs(t.motion.div,{variants:s,className:"home-hero__greeting",children:[e.jsx("span",{children:"Assalamu Alaikum"}),e.jsx("small",{children:"I am"})]}),e.jsxs(t.motion.h1,{variants:s,children:["Muhtasim",e.jsxs("span",{children:["Rahman ",e.jsx("em",{children:"(Turzo)"})]})]}),e.jsx(t.motion.p,{variants:s,className:"home-hero__role",children:"Web Developer & Designer from Bangladesh"}),e.jsx(t.motion.p,{variants:s,className:"home-hero__bio",children:"A dedicated student developer building clean, fast and meaningful digital experiences with a focus on quality, ethics and useful technology."}),e.jsxs(t.motion.div,{variants:s,className:"home-hero__actions",children:[e.jsxs(g,{to:"/projects",className:"home-btn home-btn--primary",children:["View Projects ",e.jsx(n,{icon:j})]}),e.jsxs(g,{to:"/contact",className:"home-btn home-btn--ghost",children:["Contact Me ",e.jsx(n,{icon:T})]})]}),e.jsx(t.motion.div,{variants:s,className:"home-hero__socials","aria-label":"Social links",children:le.map(r=>e.jsx("a",{href:r.url,target:"_blank",rel:"noopener noreferrer","aria-label":r.label,children:e.jsx(n,{icon:r.icon})},r.label))}),e.jsx(t.motion.div,{variants:s,className:"home-hero__stats",children:o?e.jsx(e.Fragment,{children:[0,1,2].map(r=>e.jsx(_,{w:"w-24",h:"h-12",rounded:"rounded-xl"},r))}):i.map(r=>e.jsxs("div",{className:"home-hero__stat",children:[e.jsx("strong",{children:e.jsx(C,{value:r.value,suffix:"+"})}),e.jsx("span",{children:r.label})]},r.label))})]}),e.jsx(t.motion.div,{initial:{opacity:0,scale:.96,y:18},animate:{opacity:1,scale:1,y:0},transition:{duration:.55,delay:.15,ease:[.16,1,.3,1]},className:"home-hero__visual","aria-hidden":!0,children:e.jsxs("div",{className:"home-hero__photo-ring",children:[e.jsx("div",{className:"home-hero__photo-glow"}),e.jsx("img",{src:"/hero.webp",alt:"",className:"home-hero__photo"}),e.jsx("span",{className:"home-hero__tech home-hero__tech--html",children:"HTML"}),e.jsx("span",{className:"home-hero__tech home-hero__tech--css",children:"CSS"}),e.jsx("span",{className:"home-hero__tech home-hero__tech--ai",children:"AI"})]})})]})]})}function de({settings:a,loading:o}){const i=G(),r=u(x(a,"stats_years_dev",l.defaults.statsYearsDev),3);return e.jsx(t.motion.section,{variants:p,initial:"hidden",whileInView:"visible",viewport:{once:!0,margin:"-100px"},className:"section home-about-mini",children:e.jsxs("div",{className:"container-xl home-about-mini__grid",children:[e.jsxs(t.motion.div,{variants:s,className:"home-about-mini__image",children:[e.jsx("img",{src:"/hero-back.webp",alt:"Muhtasim Rahman portrait"}),e.jsxs("div",{className:"home-about-mini__card",children:[e.jsx(n,{icon:O}),e.jsx("span",{children:"Ethical, halal and useful work first"})]})]}),e.jsxs("div",{children:[e.jsx(f,{align:"left",eyebrow:"Mini About",title:"Student developer with a practical builder mindset.",text:"From technical curiosity in childhood to a CSE-focused goal, I am learning by building real tools, useful websites and polished interfaces."}),e.jsx(t.motion.div,{variants:s,className:"home-about-mini__facts",children:o?e.jsxs(e.Fragment,{children:[e.jsx(y,{lines:3}),e.jsx(y,{lines:2})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx(n,{icon:W}),e.jsx("span",{children:l.owner.location})]}),e.jsxs("div",{children:[e.jsx(n,{icon:J}),e.jsx("span",{children:"SSC-26 student, future CSE path"})]}),e.jsxs("div",{children:[e.jsx(n,{icon:U}),e.jsxs("span",{children:[r,"+ years of web development practice"]})]}),e.jsxs("div",{children:[e.jsx(n,{icon:I}),e.jsxs("span",{children:["Approx. ",i," years old, age auto-calculated"]})]})]})}),e.jsx(t.motion.div,{variants:s,className:"home-about-mini__actions",children:e.jsxs(g,{to:"/about",className:"home-text-link",children:["Read full story ",e.jsx(n,{icon:j})]})})]})]})})}function he(){return e.jsx(t.motion.section,{variants:p,initial:"hidden",whileInView:"visible",viewport:{once:!0,margin:"-100px"},className:"section",children:e.jsxs("div",{className:"container-xl",children:[e.jsx(f,{eyebrow:"Skills",title:"Balanced between code, design and AI-assisted workflows.",text:"The numbers are self-rated references from the profile data, useful for showing current direction rather than claiming formal employment experience."}),e.jsx("div",{className:"home-skills",children:se.map(a=>e.jsxs(t.motion.article,{variants:s,className:"home-skill-card card",children:[e.jsxs("div",{className:"home-skill-card__top",children:[e.jsx("span",{children:e.jsx(n,{icon:a.icon})}),e.jsx("strong",{children:a.label})]}),e.jsx("p",{children:a.note}),e.jsx("div",{className:"home-skill-card__bar","aria-label":`${a.label} skill level ${a.value}%`,children:e.jsx("i",{style:{width:`${a.value}%`}})})]},a.label))})]})})}function pe(){return e.jsx(t.motion.section,{variants:p,initial:"hidden",whileInView:"visible",viewport:{once:!0,margin:"-100px"},className:"section home-services-wrap",children:e.jsxs("div",{className:"container-xl",children:[e.jsx(f,{eyebrow:"Services",title:"Services kept focused, honest and practical.",text:"These are the areas currently suitable for public presentation; the service list can stay dynamic later through the admin system."}),e.jsx("div",{className:"home-services",children:ne.map(a=>e.jsxs(t.motion.article,{variants:s,className:"home-service-card card",children:[e.jsx("span",{children:e.jsx(n,{icon:a.icon})}),e.jsx("h3",{children:a.title}),e.jsx("p",{children:a.text})]},a.title))})]})})}function ge({settings:a,loading:o}){const i=[{label:"Web Development",value:u(x(a,"stats_years_dev",l.defaults.statsYearsDev),3),suffix:"+ yrs"},{label:"Design Practice",value:u(x(a,"stats_years_design",l.defaults.statsYearsDesign),6),suffix:"+ yrs"},{label:"Portfolio Projects",value:u(x(a,"stats_projects",l.defaults.statsProjects),16),suffix:"+"},{label:"Core Services",value:3,suffix:""}];return e.jsx(t.motion.section,{variants:p,initial:"hidden",whileInView:"visible",viewport:{once:!0,margin:"-100px"},className:"section home-stats-section",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"home-stats",children:o?[0,1,2,3].map(r=>e.jsxs("div",{className:"home-stat-card card",children:[e.jsx(_,{w:"w-20",h:"h-10",rounded:"rounded-lg",className:"mx-auto"}),e.jsx(_,{w:"w-28",h:"h-4",className:"mx-auto mt-3"})]},r)):i.map(r=>e.jsxs(t.motion.div,{variants:s,className:"home-stat-card card",children:[e.jsx("strong",{children:e.jsx(C,{value:r.value,suffix:r.suffix})}),e.jsx("span",{children:r.label})]},r.label))})})})}function xe({project:a}){const o=a.thumbnail_url||a.cover_image_url||"/preview.png",i=`/projects/${a.slug}`;return e.jsxs(t.motion.article,{variants:s,className:"home-project-card card",children:[e.jsxs(g,{to:i,className:"home-project-card__image",children:[e.jsx("img",{src:o,alt:a.title||"Project thumbnail",loading:"lazy"}),a.category&&e.jsx("span",{children:a.category})]}),e.jsxs("div",{className:"home-project-card__body",children:[e.jsx("h3",{children:e.jsx(g,{to:i,children:a.title})}),e.jsx("p",{children:a.short_description||a.description||"Project details will be available soon."}),Array.isArray(a.tags)&&a.tags.length>0&&e.jsx("div",{className:"home-project-card__tags",children:a.tags.slice(0,3).map(r=>e.jsx("span",{children:r},r))}),e.jsxs("div",{className:"home-project-card__links",children:[e.jsxs(g,{to:i,children:["Details ",e.jsx(n,{icon:j})]}),a.live_link&&e.jsxs("a",{href:a.live_link,target:"_blank",rel:"noopener noreferrer",children:["Live ",e.jsx(n,{icon:ae})]})]})]})]})}function ue({projects:a,loading:o}){return!o&&a.length===0?null:e.jsx(t.motion.section,{variants:p,initial:"hidden",whileInView:"visible",viewport:{once:!0,margin:"-100px"},className:"section",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"home-split-head",children:[e.jsx(f,{align:"left",eyebrow:"Featured Projects",title:"Recent work highlighted from Supabase.",text:"The home list follows the admin featured order and hides automatically when no project is featured."}),e.jsx(t.motion.div,{variants:s,children:e.jsxs(g,{to:"/projects",className:"home-text-link",children:["All projects ",e.jsx(n,{icon:j})]})})]}),o?e.jsx("div",{className:"home-projects-grid",children:[0,1,2,3,4,5].map(i=>e.jsx(L,{},i))}):e.jsx("div",{className:"home-projects-grid",children:a.map(i=>e.jsx(xe,{project:i},i.id||i.slug))})]})})}function be(){return e.jsx(t.motion.section,{variants:p,initial:"hidden",whileInView:"visible",viewport:{once:!0,margin:"-100px"},className:"section home-github-section",children:e.jsxs("div",{className:"container-xl home-github",children:[e.jsxs("div",{children:[e.jsx(f,{align:"left",eyebrow:"GitHub",title:"Open source activity and learning trail.",text:"GitHub is used for publishing, version control and preserving the project journey from simple HTML/CSS work to advanced apps."}),e.jsxs(t.motion.a,{variants:s,href:l.social.github,target:"_blank",rel:"noopener noreferrer",className:"home-btn home-btn--ghost",children:["Visit GitHub ",e.jsx(n,{icon:N})]})]}),e.jsx(t.motion.div,{variants:s,className:"home-github__card card",children:e.jsx("img",{src:"https://streak-stats.demolab.com?user=muhtasim-rahman&theme=transparent&hide_border=true&date_format=M%20j%5B%2C%20Y%5D&card_width=820",alt:"GitHub streak stats for muhtasim-rahman",loading:"lazy"})})]})})}function ve({reviews:a,loading:o}){return e.jsx(t.motion.section,{variants:p,initial:"hidden",whileInView:"visible",viewport:{once:!0,margin:"-100px"},className:"section",children:e.jsxs("div",{className:"container-xl",children:[e.jsx(f,{eyebrow:"Reviews",title:"Community feedback preview.",text:"Approved reviews are loaded from Supabase. When none are approved yet, the section shows a clean empty state."}),o?e.jsx("div",{className:"home-reviews",children:[0,1,2].map(i=>e.jsxs("div",{className:"home-review-card card",children:[e.jsxs("div",{className:"flex gap-3 items-center mb-4",children:[e.jsx(M,{size:42}),e.jsxs("div",{className:"flex-1",children:[e.jsx(_,{w:"w-32",h:"h-4"}),e.jsx(_,{w:"w-20",h:"h-3",className:"mt-2"})]})]}),e.jsx(y,{lines:3})]},i))}):a.length>0?e.jsx("div",{className:"home-reviews",children:a.map(i=>{const r=i.users||{};return e.jsxs(t.motion.article,{variants:s,className:"home-review-card card",children:[e.jsx(n,{icon:A,className:"home-review-card__quote"}),e.jsx("div",{className:"home-review-card__stars","aria-label":`${i.rating||5} star rating`,children:Array.from({length:5},(m,b)=>e.jsx(n,{icon:I,className:b<(i.rating||5)?"is-active":""},b))}),e.jsx("p",{children:i.text||"No written review provided."}),e.jsxs("div",{className:"home-review-card__user",children:[e.jsx("span",{children:(r.display_name||r.username||"Visitor").slice(0,1).toUpperCase()}),e.jsxs("div",{children:[e.jsx("strong",{children:r.display_name||"Portfolio Visitor"}),r.username&&e.jsxs("small",{children:["@",r.username]})]})]})]},i.id)})}):e.jsxs(t.motion.div,{variants:s,className:"home-empty card",children:[e.jsx(n,{icon:A}),e.jsx("h3",{children:"No approved reviews yet"}),e.jsx("p",{children:"Approved Supabase reviews will appear here automatically after the admin review flow is ready."})]})]})})}function ze(){const{settings:a,projects:o,reviews:i,loading:r}=ce(),m=te({title:null,image:l.seo.defaultOGImage});return d.useEffect(()=>{oe("Home")},[]),e.jsxs(e.Fragment,{children:[e.jsxs(F,{children:[e.jsx("title",{children:m.title}),e.jsx("meta",{name:"description",content:m.description}),e.jsx("meta",{name:"keywords",content:m.keywords}),e.jsx("meta",{property:"og:title",content:m.title}),e.jsx("meta",{property:"og:description",content:m.description}),e.jsx("meta",{property:"og:image",content:m.image}),e.jsx("meta",{property:"og:url",content:m.url}),e.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),e.jsx("meta",{name:"twitter:image",content:m.image}),e.jsx("script",{type:"application/ld+json",children:JSON.stringify(re())}),e.jsx("script",{type:"application/ld+json",children:JSON.stringify(ie())})]}),e.jsx(me,{settings:a,loading:r.settings}),e.jsx(de,{settings:a,loading:r.settings}),e.jsx(he,{}),e.jsx(pe,{}),e.jsx(ge,{settings:a,loading:r.settings}),e.jsx(ue,{projects:o,loading:r.projects}),e.jsx(be,{}),e.jsx(ve,{reviews:i,loading:r.reviews}),e.jsx("style",{children:`
        .home-hero {
          position: relative;
          min-height: min(850px, calc(100vh - 40px));
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: clamp(5rem, 9vw, 7.5rem) 0 clamp(4rem, 7vw, 6rem);
          background:
            radial-gradient(circle at 18% 22%, rgba(59,130,246,.18), transparent 34%),
            radial-gradient(circle at 72% 24%, rgba(14,165,233,.11), transparent 30%),
            linear-gradient(180deg, rgba(2,6,23,.2), var(--bg-page));
        }
        .home-hero__mesh {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(148,163,184,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,.06) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(circle at 50% 36%, #000 0 42%, transparent 78%);
          pointer-events: none;
        }
        .home-hero__grain {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px);
          background-size: 18px 18px;
          opacity: .18;
          pointer-events: none;
        }
        .home-hero__orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(4px);
          opacity: .55;
          animation: home-float 8s ease-in-out infinite;
        }
        .home-hero__orb--one {
          width: 270px; height: 270px; right: 12%; top: 16%;
          background: radial-gradient(circle, rgba(59,130,246,.28), transparent 68%);
        }
        .home-hero__orb--two {
          width: 190px; height: 190px; left: 7%; bottom: 12%;
          background: radial-gradient(circle, rgba(34,197,94,.13), transparent 70%);
          animation-delay: -2.5s;
        }
        .home-hero__inner {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(320px, .82fr);
          align-items: center;
          gap: clamp(2rem, 6vw, 5rem);
          z-index: 1;
        }
        .home-hero__content { max-width: 720px; }
        .home-hero__greeting {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 13px;
          border-radius: 999px;
          border: 1px solid rgba(96,165,250,.28);
          background: rgba(15,23,42,.58);
          color: var(--clr-primary-300);
          font-family: var(--font-mono);
          font-size: .78rem;
          margin-bottom: 1.15rem;
          backdrop-filter: blur(14px);
        }
        [data-theme="light"] .home-hero__greeting { background: rgba(255,255,255,.72); }
        .home-hero__greeting small { color: var(--text-tertiary); }
        .home-hero h1 {
          font-size: clamp(3rem, 9vw, 7.4rem);
          line-height: .88;
          letter-spacing: -.07em;
          margin-bottom: 1.15rem;
        }
        .home-hero h1 span {
          display: block;
          color: var(--clr-primary-400);
        }
        .home-hero h1 em {
          font-style: normal;
          color: var(--text-tertiary);
          font-size: .24em;
          letter-spacing: -.03em;
          margin-left: .18em;
        }
        .home-hero__role {
          color: var(--text-primary);
          font-weight: 700;
          font-size: clamp(1.05rem, 2vw, 1.35rem);
          margin-bottom: .8rem;
        }
        .home-hero__bio {
          max-width: 620px;
          font-size: clamp(.98rem, 1.6vw, 1.08rem);
          color: var(--text-secondary);
        }
        .home-hero__actions, .home-about-mini__actions {
          display: flex;
          gap: .85rem;
          flex-wrap: wrap;
          margin-top: 1.7rem;
        }
        .home-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: .55rem;
          min-height: 44px;
          padding: 0 1.15rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: .92rem;
          transition: transform .22s ease, border-color .22s ease, background .22s ease, color .22s ease, box-shadow .22s ease;
        }
        .home-btn:hover { transform: translateY(-2px); }
        .home-btn--primary {
          background: linear-gradient(135deg, var(--accent-primary), #38bdf8);
          color: white;
          box-shadow: 0 14px 30px rgba(37,99,235,.28);
        }
        .home-btn--ghost {
          color: var(--text-primary);
          border: 1px solid var(--border-strong);
          background: rgba(15,23,42,.46);
        }
        [data-theme="light"] .home-btn--ghost { background: rgba(255,255,255,.72); }
        .home-hero__socials {
          display: flex;
          gap: .6rem;
          flex-wrap: wrap;
          margin-top: 1.35rem;
        }
        .home-hero__socials a {
          width: 38px; height: 38px;
          display: grid; place-items: center;
          border-radius: 999px;
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          transition: all .22s ease;
        }
        .home-hero__socials a:hover {
          color: white;
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          transform: translateY(-3px);
        }
        .home-hero__stats {
          display: flex;
          flex-wrap: wrap;
          gap: .75rem;
          margin-top: 1.5rem;
        }
        .home-hero__stat {
          min-width: 112px;
          padding: .85rem 1rem;
          border-radius: 18px;
          border: 1px solid var(--border-color);
          background: rgba(15,23,42,.62);
          backdrop-filter: blur(16px);
        }
        [data-theme="light"] .home-hero__stat { background: rgba(255,255,255,.72); }
        .home-hero__stat strong {
          display: block;
          color: var(--text-primary);
          font-size: 1.45rem;
          line-height: 1;
        }
        .home-hero__stat span {
          display: block;
          color: var(--text-tertiary);
          font-size: .75rem;
          font-weight: 700;
          margin-top: .35rem;
          text-transform: uppercase;
          letter-spacing: .08em;
        }
        .home-hero__visual {
          min-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .home-hero__photo-ring {
          position: relative;
          width: min(430px, 82vw);
          aspect-ratio: 1 / 1.18;
          border-radius: 46% 46% 28% 28%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          isolation: isolate;
        }
        .home-hero__photo-glow {
          position: absolute;
          inset: 6% 8% 0;
          border-radius: 48% 48% 30% 30%;
          background:
            radial-gradient(circle at 50% 18%, rgba(96,165,250,.5), transparent 36%),
            linear-gradient(180deg, rgba(59,130,246,.18), rgba(14,165,233,.04));
          border: 1px solid rgba(147,197,253,.24);
          box-shadow: 0 40px 90px rgba(2,6,23,.55), inset 0 1px 0 rgba(255,255,255,.12);
          z-index: -1;
        }
        .home-hero__photo {
          width: 92%;
          max-height: 100%;
          object-fit: contain;
          object-position: bottom center;
          filter: drop-shadow(0 30px 44px rgba(0,0,0,.45));
        }
        .home-hero__tech {
          position: absolute;
          padding: .52rem .72rem;
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,.18);
          background: rgba(15,23,42,.78);
          color: var(--clr-primary-200);
          font-family: var(--font-mono);
          font-size: .72rem;
          box-shadow: 0 18px 40px rgba(0,0,0,.28);
          animation: home-float 5s ease-in-out infinite;
        }
        .home-hero__tech--html { left: 3%; top: 30%; }
        .home-hero__tech--css { right: 2%; top: 42%; animation-delay: -1.4s; }
        .home-hero__tech--ai { left: 12%; bottom: 18%; animation-delay: -2.6s; }

        .home-section-head {
          max-width: 740px;
          margin-bottom: clamp(2rem, 4vw, 3rem);
        }
        .home-section-head h2 {
          font-size: clamp(2rem, 4.4vw, 3.4rem);
          letter-spacing: -.055em;
          margin-bottom: .8rem;
        }
        .home-section-head p {
          font-size: 1rem;
          color: var(--text-secondary);
        }
        .home-about-mini__grid {
          display: grid;
          grid-template-columns: minmax(280px, .8fr) minmax(0, 1fr);
          gap: clamp(2rem, 6vw, 5rem);
          align-items: center;
        }
        .home-about-mini__image {
          position: relative;
          min-height: 460px;
          border-radius: 34px;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(15,23,42,.08), rgba(15,23,42,.88)),
            radial-gradient(circle at 50% 15%, rgba(59,130,246,.28), transparent 40%);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-xl);
        }
        .home-about-mini__image img {
          width: 100%;
          height: 100%;
          min-height: 460px;
          object-fit: cover;
          object-position: center top;
        }
        .home-about-mini__card {
          position: absolute;
          left: 18px; right: 18px; bottom: 18px;
          display: flex;
          align-items: center;
          gap: .75rem;
          padding: 1rem;
          border-radius: 18px;
          color: var(--text-primary);
          background: rgba(2,6,23,.78);
          border: 1px solid rgba(148,163,184,.18);
          backdrop-filter: blur(16px);
          font-weight: 700;
        }
        .home-about-mini__card svg { color: var(--accent-hover); }
        .home-about-mini__facts {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: .85rem;
          margin-top: 1.5rem;
        }
        .home-about-mini__facts > div {
          display: flex;
          gap: .75rem;
          align-items: center;
          padding: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 16px;
          background: var(--bg-surface);
          color: var(--text-secondary);
        }
        .home-about-mini__facts svg { color: var(--accent-primary); flex-shrink: 0; }
        .home-text-link {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          color: var(--accent-hover);
          font-weight: 800;
          transition: gap .22s ease, color .22s ease;
        }
        .home-text-link:hover { gap: .75rem; color: var(--text-primary); }

        .home-skills, .home-services, .home-projects-grid, .home-reviews {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }
        .home-skill-card, .home-service-card, .home-project-card, .home-review-card, .home-stat-card {
          padding: 1.25rem;
        }
        .home-skill-card__top {
          display: flex;
          align-items: center;
          gap: .75rem;
          margin-bottom: .8rem;
        }
        .home-skill-card__top span, .home-service-card > span {
          width: 42px; height: 42px;
          display: grid; place-items: center;
          border-radius: 14px;
          color: var(--accent-hover);
          background: var(--accent-light);
        }
        .home-skill-card strong, .home-service-card h3, .home-project-card h3, .home-review-card strong {
          color: var(--text-primary);
          font-size: 1.05rem;
        }
        .home-skill-card p, .home-service-card p, .home-project-card p, .home-review-card p, .home-empty p {
          font-size: .92rem;
          color: var(--text-secondary);
        }
        .home-skill-card__bar {
          height: 9px;
          margin-top: 1rem;
          border-radius: 999px;
          background: var(--bg-surface-2);
          overflow: hidden;
        }
        .home-skill-card__bar i {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--accent-primary), #38bdf8);
        }
        .home-services-wrap {
          background: linear-gradient(180deg, transparent, rgba(59,130,246,.05), transparent);
        }
        .home-service-card > span { margin-bottom: 1rem; }
        .home-service-card h3 { margin-bottom: .55rem; }
        .home-stats-section { padding-block: clamp(2rem, 5vw, 4rem); }
        .home-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
        }
        .home-stat-card {
          text-align: center;
          background:
            linear-gradient(180deg, rgba(59,130,246,.08), transparent),
            var(--bg-surface);
        }
        .home-stat-card strong {
          display: block;
          font-size: clamp(1.65rem, 3vw, 2.4rem);
          line-height: 1;
          color: var(--text-primary);
        }
        .home-stat-card span {
          display: block;
          margin-top: .7rem;
          color: var(--text-tertiary);
          font-weight: 800;
          font-size: .76rem;
          text-transform: uppercase;
          letter-spacing: .08em;
        }
        .home-split-head {
          display: flex;
          justify-content: space-between;
          gap: 1.5rem;
          align-items: end;
          margin-bottom: 2rem;
        }
        .home-split-head .home-section-head { margin-bottom: 0; }
        .home-project-card {
          padding: 0;
          overflow: hidden;
        }
        .home-project-card__image {
          position: relative;
          display: block;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: var(--bg-surface-2);
        }
        .home-project-card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .35s ease;
        }
        .home-project-card:hover .home-project-card__image img { transform: scale(1.04); }
        .home-project-card__image span {
          position: absolute;
          left: .85rem; bottom: .85rem;
          padding: .32rem .65rem;
          border-radius: 999px;
          background: rgba(2,6,23,.78);
          color: white;
          font-size: .7rem;
          font-weight: 800;
          backdrop-filter: blur(12px);
        }
        .home-project-card__body { padding: 1.15rem; }
        .home-project-card h3 { margin-bottom: .5rem; }
        .home-project-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: .4rem;
          margin-top: .9rem;
        }
        .home-project-card__tags span {
          padding: .25rem .55rem;
          border-radius: 999px;
          border: 1px solid var(--border-color);
          color: var(--text-tertiary);
          font-size: .68rem;
          font-weight: 700;
        }
        .home-project-card__links {
          display: flex;
          justify-content: space-between;
          gap: .75rem;
          margin-top: 1rem;
        }
        .home-project-card__links a {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          color: var(--accent-hover);
          font-size: .85rem;
          font-weight: 800;
        }
        .home-github-section {
          background:
            radial-gradient(circle at 18% 50%, rgba(59,130,246,.1), transparent 28%),
            linear-gradient(180deg, transparent, rgba(15,23,42,.34), transparent);
        }
        .home-github {
          display: grid;
          grid-template-columns: minmax(0, .75fr) minmax(320px, 1.1fr);
          gap: clamp(1.5rem, 5vw, 4rem);
          align-items: center;
        }
        .home-github__card {
          padding: 1rem;
          background: rgba(15,23,42,.68);
        }
        [data-theme="light"] .home-github__card { background: rgba(255,255,255,.82); }
        .home-github__card img {
          width: 100%;
          min-height: 190px;
          object-fit: contain;
        }
        .home-review-card {
          position: relative;
          min-height: 250px;
        }
        .home-review-card__quote {
          color: var(--accent-primary);
          opacity: .4;
          font-size: 1.4rem;
          margin-bottom: .85rem;
        }
        .home-review-card__stars {
          display: flex;
          gap: .25rem;
          color: var(--border-strong);
          margin-bottom: .8rem;
        }
        .home-review-card__stars .is-active { color: #f59e0b; }
        .home-review-card__user {
          display: flex;
          align-items: center;
          gap: .75rem;
          margin-top: 1.2rem;
        }
        .home-review-card__user > span {
          width: 38px; height: 38px;
          display: grid; place-items: center;
          border-radius: 999px;
          color: white;
          background: linear-gradient(135deg, var(--accent-primary), #38bdf8);
          font-weight: 900;
        }
        .home-review-card__user small {
          display: block;
          color: var(--text-tertiary);
          font-size: .76rem;
        }
        .home-empty {
          max-width: 520px;
          margin: 0 auto;
          padding: 2rem;
          text-align: center;
        }
        .home-empty > svg {
          color: var(--accent-primary);
          font-size: 1.6rem;
          margin-bottom: .8rem;
        }
        .home-empty h3 {
          font-size: 1.25rem;
          margin-bottom: .4rem;
        }
        @keyframes home-float {
          0%, 100% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(0,-14px,0); }
        }
        @media (max-width: 1080px) {
          .home-hero__inner,
          .home-about-mini__grid,
          .home-github {
            grid-template-columns: 1fr;
          }
          .home-hero__visual { min-height: 420px; order: -1; }
          .home-hero__content { max-width: 100%; }
          .home-skills, .home-services, .home-projects-grid, .home-reviews {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .home-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 720px) {
          .home-hero { padding-top: 3.5rem; }
          .home-hero__visual { min-height: 340px; }
          .home-hero__photo-ring { width: min(330px, 92vw); }
          .home-about-mini__facts,
          .home-skills,
          .home-services,
          .home-projects-grid,
          .home-reviews,
          .home-stats {
            grid-template-columns: 1fr;
          }
          .home-split-head {
            display: block;
          }
          .home-split-head .home-text-link { margin-top: 1rem; }
          .home-hero h1 { font-size: clamp(3rem, 16vw, 4.8rem); }
          .home-hero__tech { display: none; }
        }
      `})]})}export{ze as default};
