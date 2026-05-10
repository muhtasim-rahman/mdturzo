// ================================================
// pages/projects.js — All Projects
// ================================================
import { projCard, initProjectFilter } from './home.js';

const ALL = [
  { icon:'📊', title:'FMT Tracker Pro', year:'2025–2026', cat:'webapp', featured:true,
    desc:'Smart PWA dashboard for SSC-26 students — merit tracking, real-time charts, PIN security, offline support.',
    stack:['HTML','CSS','JavaScript','Chart.js','Sheets API','PWA','Service Worker'],
    status:'🔧 Active Beta', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/UFMT-SSC26/', gh:'https://github.com/muhtasim-rahman/UFMT-SSC26' },
  { icon:'🔔', title:'Functional Notification Panel', year:'2024–2025', cat:'tool', featured:true,
    desc:'Plug-and-play notification widget powered by Google Sheets. Tab nav, read/unread state, pagination, LocalStorage.',
    stack:['HTML','CSS','JavaScript','Sheets API','LocalStorage'],
    status:'✅ Complete', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/notification-panel/', gh:'https://github.com/muhtasim-rahman/notification-panel' },
  { icon:'🗂️', title:'Odoo Website Assets', year:'2024', cat:'tool', featured:false,
    desc:'CDN-style GitHub repo for mdturzo.odoo.com — mega nav, floating share sidebar, custom search & scrollbar.',
    stack:['CSS','JavaScript','GitHub Pages'],
    status:'🔧 Active', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/odoo-website-assets/mdturzo.odoo.com/', gh:'https://github.com/muhtasim-rahman/odoo-website-assets' },
  { icon:'🌐', title:'Portfolio V2 (Old)', year:'2024–2025', cat:'design', featured:false,
    desc:'Live portfolio on Odoo with mega nav, notification panel, gallery, and eLearning platform.',
    stack:['Odoo','CSS','JavaScript'],
    status:'✅ Active', sc:'accent',
    demo:'https://mdturzo.odoo.com', gh:null },
  { icon:'🏫', title:'SGSC Web Campus', year:'2024', cat:'webapp', featured:false,
    desc:'Institutional website for Saidpur Govt. Science College, voluntarily built and maintained.',
    stack:['Odoo','CSS','JavaScript'],
    status:'⚠️ Check Live', sc:'gold',
    demo:'https://sgsc.odoo.com', gh:null },
  { icon:'☪️', title:'Halal — World of Muslims', year:'2024', cat:'islamic', featured:false,
    desc:'Islamic web app with Islamic resources and content. 71+ GitHub commits — most committed project.',
    stack:['HTML','CSS','JavaScript'],
    status:'✅ Published', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/halal', gh:'https://github.com/muhtasim-rahman/halal' },
  { icon:'🎨', title:'Web Templates Collection', year:'2024', cat:'design', featured:false,
    desc:'Showcase of HTML/CSS templates — various UI patterns, layouts, and design experiments.',
    stack:['HTML','CSS','JavaScript'],
    status:'✅ Published', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/web-templets-2024.2', gh:'https://github.com/muhtasim-rahman/web-templets-2024.2' },
  { icon:'🛒', title:'Turzo Express', year:'2024', cat:'design', featured:false,
    desc:'E-commerce website UI — product listings, cart design, fully responsive layout.',
    stack:['HTML','CSS','JavaScript'],
    status:'✅ Published', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/turzo-express', gh:'https://github.com/muhtasim-rahman/turzo-express' },
  { icon:'🍽️', title:'Master Chef Restaurant', year:'2024', cat:'design', featured:false,
    desc:'Restaurant website UI with menu display, responsive layout, and clean design.',
    stack:['HTML','CSS','JavaScript'],
    status:'✅ Published', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/master-chef', gh:'https://github.com/muhtasim-rahman/master-chef' },
  { icon:'📖', title:'Study With Muhtasim', year:'2024', cat:'design', featured:false,
    desc:'Teacher/course website UI for educational content delivery with clean academic layout.',
    stack:['HTML','CSS','JavaScript'],
    status:'✅ Published', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/study-with-muhtasim', gh:'https://github.com/muhtasim-rahman/study-with-muhtasim' },
  { icon:'🖥️', title:'Portfolio 2023', year:'2023', cat:'design', featured:false,
    desc:'First personal portfolio website. Fully responsive — the beginning of the journey.',
    stack:['HTML','CSS'],
    status:'✅ Published', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/portfolio-2023', gh:'https://github.com/muhtasim-rahman/portfolio-2023' },
  { icon:'📄', title:'Basic CV', year:'2023', cat:'design', featured:false,
    desc:'Clean, printable CV/resume website built with HTML and CSS. Desktop-optimized.',
    stack:['HTML','CSS'],
    status:'✅ Published', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/basic-cv', gh:'https://github.com/muhtasim-rahman/basic-cv' },
  { icon:'🔢', title:'CSS Calculator Design', year:'2023', cat:'design', featured:false,
    desc:'Pixel-perfect calculator UI built purely with HTML & CSS. No JavaScript — pure design practice.',
    stack:['HTML','CSS'],
    status:'✅ Published', sc:'accent',
    demo:'https://muhtasim-rahman.github.io/css-calculator-design', gh:'https://github.com/muhtasim-rahman/css-calculator-design' },
];

export function renderPage() {
  return `
<div class="page-wrap">
  <section class="section projects-section">
    <div class="container">
      <div style="margin-bottom:3rem" data-aos>
        <span class="section-label">// my_work</span>
        <h1 class="section-title">All <span>Projects</span></h1>
        <div class="divider"></div>
        <p class="section-sub">${ALL.length} projects — web apps, tools, design & Islamic content.</p>
      </div>

      <div class="filter-row" id="filter-row">
        <button class="filter-btn active" data-filter="all">All (${ALL.length})</button>
        <button class="filter-btn" data-filter="webapp">Web App</button>
        <button class="filter-btn" data-filter="tool">Tool</button>
        <button class="filter-btn" data-filter="design">Design</button>
        <button class="filter-btn" data-filter="islamic">Islamic</button>
      </div>

      <div class="proj-grid" id="proj-grid" data-stagger>
        ${ALL.map(projCard).join('')}
      </div>
    </div>
  </section>
</div>`;
}

export function initPage() {
  initProjectFilter();
}
