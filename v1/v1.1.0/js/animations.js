// ================================================
// js/animations.js
// ================================================

// ── IntersectionObserver scroll reveals ──
export function initAOS() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('aos-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-aos],[data-stagger]').forEach(el => io.observe(el));

  // Skill bars
  const barIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.bar-fill').forEach(f => f.classList.add('bar-go'));
        barIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.35 });
  document.querySelectorAll('.sb-item').forEach(el => barIO.observe(el));

  // Counters
  initCounters();
}

// ── Number counter animation ──
function initCounters() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { countUp(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
}

function countUp(el) {
  const target  = parseFloat(el.getAttribute('data-count'));
  const suffix  = el.getAttribute('data-suffix') || '';
  const dur     = 1400;
  const start   = performance.now();
  const tick    = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const v = target * (1 - Math.pow(1 - p, 3));
    el.textContent = (Number.isInteger(target) ? Math.round(v) : v.toFixed(1)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ── Typing effect ──
export function initTyping(el, words, opts = {}) {
  if (!el) return;
  const { speed = 75, del = 38, pause = 1800 } = opts;
  let wi = 0, ci = 0, deleting = false;

  const tick = () => {
    const w = words[wi % words.length];
    el.textContent = deleting ? w.slice(0, ci - 1) : w.slice(0, ci + 1);
    deleting ? ci-- : ci++;
    let delay = deleting ? del : speed;
    if (!deleting && ci === w.length) { delay = pause; deleting = true; }
    else if (deleting && ci === 0)   { deleting = false; wi++; delay = 300; }
    setTimeout(tick, delay);
  };
  tick();
}

// ── Particle canvas for hero ──
export function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let pts = [], raf;

  const resize = () => {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    spawn();
  };

  const spawn = () => {
    const n = Math.floor((canvas.width * canvas.height) / 16000);
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - .5) * .22,
      vy: (Math.random() - .5) * .22,
      a: Math.random() * .45 + .08,
      // jersey palette colors
      c: Math.random() > .65 ? '245,166,35' : Math.random() > .4 ? '113,213,255' : '74,144,205',
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Lines between close particles
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.hypot(dx, dy);
        if (d < 115) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(74,144,205,${(1 - d / 115) * .1})`;
          ctx.lineWidth = .4;
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
      // Move
      pts[i].x += pts[i].vx;
      pts[i].y += pts[i].vy;
      if (pts[i].x < 0) pts[i].x = canvas.width;
      if (pts[i].x > canvas.width)  pts[i].x = 0;
      if (pts[i].y < 0) pts[i].y = canvas.height;
      if (pts[i].y > canvas.height) pts[i].y = 0;
      // Draw
      ctx.beginPath();
      ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${pts[i].c},${pts[i].a})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  };

  const ro = new ResizeObserver(() => { resize(); });
  ro.observe(canvas.parentElement || canvas);
  resize();
  draw();

  // Cleanup on page leave
  return () => { cancelAnimationFrame(raf); ro.disconnect(); };
}
