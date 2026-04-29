// SPA Router & Core UI Logic
import { auth, database } from './firebase-app.js';
import './auth.js';

const app = document.getElementById('app');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// --- Theme Logic ---
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
        themeIcon.innerText = '☀️';
    } else {
        htmlElement.classList.remove('dark');
        themeIcon.innerText = '🌙';
    }
};

themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    const isDark = htmlElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.innerText = isDark ? '☀️' : '🌙';
});

// --- SPA Router ---
const routes = {
    '/': '/index.html',
    '/about': '/about.html',
    '/projects': '/projects.html',
    '/contact': '/contact.html'
};

const navigate = async (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    await handleRoute();
};

const handleRoute = async () => {
    const path = window.location.pathname;
    const route = routes[path] || '/404.html';
    
    // For index, we might want to just show the hero or fetch specific content
    // To make it a true SPA, we fetch the page and extract the #app content
    try {
        const response = await fetch(route);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.getElementById('app').innerHTML;
        
        app.classList.add('page-fade-in');
        app.innerHTML = newContent;
        
        // Re-initialize page-specific scripts
        initPageScripts(path);
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        setTimeout(() => app.classList.remove('page-fade-in'), 500);
    } catch (err) {
        console.error('Navigation error:', err);
    }
};

const initPageScripts = (path) => {
    if (path === '/' || path === '/index.html') {
        initHero();
    }
    // Add other page-specific initializers here
};

// --- Hero Animations (GSAP) ---
const initHero = () => {
    const typewriter = document.getElementById('typewriter');
    if (!typewriter) return;

    const words = ["Web Developer", "Creative Editor", "SSC-26 Student", "Tech Enthusiast"];
    let i = 0;
    let j = 0;
    let currentWord = "";
    let isDeleting = false;

    function type() {
        currentWord = words[i];
        if (isDeleting) {
            typewriter.textContent = currentWord.substring(0, j - 1);
            j--;
            if (j === 0) {
                isDeleting = false;
                i = (i + 1) % words.length;
            }
        } else {
            typewriter.textContent = currentWord.substring(0, j + 1);
            j++;
            if (j === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 1500);
                return;
            }
        }
        setTimeout(type, isDeleting ? 100 : 200);
    }
    type();

    // GSAP Floating Animation
    gsap.to("#hero-img", {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
};

// --- Event Listeners ---
window.addEventListener('popstate', handleRoute);

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('spa-link') || e.target.closest('.spa-link')) {
        e.preventDefault();
        const href = e.target.getAttribute('href') || e.target.closest('.spa-link').getAttribute('href');
        navigate(href);
    }
});

// Initialize
initTheme();
initHero();
