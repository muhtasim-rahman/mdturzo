-- ============================================================
-- supabase-schema-v2.5.1.sql
-- Changes from v2.5.0:
--   1. posts.embed_url — DROP NOT NULL (now optional; media_items is primary)
--   2. posts — ADD content TEXT
--   3. posts — ADD media_items JSONB
--   4. Sample blogs (2) + posts (5) with images/videos
-- Run this AFTER supabase-schema-v2.5.0.sql
-- ============================================================

-- ── Fix embed_url constraint ──────────────────────────────────
ALTER TABLE posts ALTER COLUMN embed_url DROP NOT NULL;

-- ── Extend posts table ────────────────────────────────────────
ALTER TABLE posts ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS media_items JSONB DEFAULT '[]'::jsonb;

-- ── Sample Blogs ──────────────────────────────────────────────
INSERT INTO blogs (slug, title, short_description, category, tags, status, visibility, pinned, reading_time, content, thumbnail_url, cover_image_url)
VALUES (
  'welcome-to-my-blog',
  'Welcome to My Blog',
  'The first post on my portfolio website. I write about web development, design, and my journey as a self-taught developer from Bangladesh.',
  'Personal',
  ARRAY['welcome','intro','web-dev'],
  'published','public', true, 2,
  '<h2>Hello, World! 👋</h2>
<p>Welcome to my blog. I am <strong>Muhtasim Rahman (Turzo)</strong>, a self-taught web developer from Nilphamari, Bangladesh. I am passionate about building clean, fast and meaningful digital experiences.</p>
<h2>What to Expect</h2>
<p>I plan to write about:</p>
<ul>
<li>Web development tips and tricks</li>
<li>Project breakdowns and case studies</li>
<li>Design insights and inspiration</li>
<li>My personal growth as a developer</li>
</ul>
<h2>My Stack</h2>
<p>I primarily work with <strong>React</strong>, <strong>Vite</strong>, <strong>Tailwind CSS</strong>, <strong>Supabase</strong>, and <strong>Firebase</strong>. I believe in shipping fast, learning from users, and iterating.</p>
<blockquote>The best code is the code that solves a real problem for real people.</blockquote>
<h2>Let''s Connect</h2>
<p>Feel free to reach out on <a href="https://facebook.com/mdturzo999">Facebook</a> or <a href="https://github.com/muhtasim-rahman">GitHub</a>. I am always happy to chat about tech, design, or anything else.</p>',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO blogs (slug, title, short_description, category, tags, status, visibility, pinned, reading_time, content, thumbnail_url)
VALUES (
  'building-portfolio-v2-react-supabase',
  'Building Portfolio v2 with React + Supabase',
  'A deep dive into how I built my portfolio v2 — design decisions, Supabase RLS policies, and performance optimizations.',
  'Web Dev',
  ARRAY['react','supabase','portfolio','web-dev'],
  'published','public', false, 5,
  '<h2>The Goal</h2>
<p>After my first portfolio, I wanted to build something truly mine — not just a template. The goal was a <strong>fast, dark, full-featured portfolio</strong> with a CMS, auth, interactions, and a feed system.</p>
<h2>Tech Stack Choices</h2>
<p>I chose <strong>React 19 + Vite</strong> for the frontend, <strong>Supabase</strong> as the backend (PostgreSQL + auth + storage), and <strong>Firebase Hosting</strong> for deployment. Framer Motion for animations, Tailwind CSS for utility classes.</p>
<h2>Database Design</h2>
<p>The database has tables for <code>projects</code>, <code>blogs</code>, <code>posts</code>, <code>comments</code>, <code>likes</code>, <code>users</code>, and <code>site_settings</code>. Row Level Security (RLS) ensures the public can only read published content, while the admin has full access.</p>
<h2>Performance</h2>
<p>I focused on:</p>
<ul>
<li>Lazy loading all route components</li>
<li>Skeleton loading states for every page</li>
<li>Image optimization with WebP and lazy loading</li>
<li>Minimal third-party dependencies</li>
</ul>',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80'
) ON CONFLICT (slug) DO NOTHING;

-- ── Sample Posts ──────────────────────────────────────────────
-- Post 1: Coding setup — 3 images
INSERT INTO posts (slug, title, content, embed_url, media_items, platform, tags, category, status, visibility, views_count, likes_count, comments_count)
VALUES (
  'my-coding-setup-2026',
  'My Coding Setup 2026 💻',
  'Just upgraded my development setup! This is what I use daily for web development. Clean desk, dark theme, mechanical keyboard — the perfect combo for late-night coding sessions.

What does your coding setup look like? Drop it in the comments! 👇',
  NULL,
  '[
    {"type":"image","url":"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=85","caption":"Main monitor setup"},
    {"type":"image","url":"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=85","caption":"Laptop on table"},
    {"type":"image","url":"https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&q=85","caption":"Code on screen"}
  ]'::jsonb,
  'other',
  ARRAY['setup','coding','developer','workspace'],
  'Tech',
  'published','public', 156, 42, 8
) ON CONFLICT (slug) DO NOTHING;

-- Post 2: React journey — 2 images
INSERT INTO posts (slug, title, content, embed_url, media_items, platform, tags, category, status, visibility, views_count, likes_count, comments_count)
VALUES (
  'learning-react-journey',
  'My React Learning Journey 🚀',
  'After months of learning, I finally feel comfortable with React hooks, state management, and component architecture!

Here''s a glimpse of some projects I built along the way. If you''re learning React — don''t give up. It clicks eventually. The key is to just build things, break things, and build again.

Follow for more web dev content! 🌐',
  NULL,
  '[
    {"type":"image","url":"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=85","caption":"Code on monitor"},
    {"type":"image","url":"https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=900&q=85","caption":"VS Code dark theme"}
  ]'::jsonb,
  'other',
  ARRAY['react','learning','webdev','javascript'],
  'Web Dev',
  'published','public', 98, 28, 5
) ON CONFLICT (slug) DO NOTHING;

-- Post 3: CSS tutorial — YouTube video
INSERT INTO posts (slug, title, content, embed_url, media_items, platform, tags, category, status, visibility, views_count, likes_count, comments_count)
VALUES (
  'css-flexbox-tutorial',
  'CSS Flexbox Full Tutorial 🎨',
  'I recorded a full CSS Flexbox tutorial for beginners! In this video I cover:

✅ What is Flexbox and why use it
✅ flex-direction, justify-content, align-items
✅ flex-wrap and the shorthand properties
✅ Building a real layout from scratch

Perfect for anyone starting with CSS. Like and share if helpful! 🙏',
  'https://www.youtube.com/watch?v=JJSoEo8JSnc',
  '[
    {"type":"youtube","url":"https://www.youtube.com/watch?v=JJSoEo8JSnc","thumbnail":"https://img.youtube.com/vi/JJSoEo8JSnc/maxresdefault.jpg","caption":"CSS Flexbox Tutorial"}
  ]'::jsonb,
  'youtube',
  ARRAY['css','flexbox','tutorial','webdev'],
  'Tutorial',
  'published','public', 312, 87, 19
) ON CONFLICT (slug) DO NOTHING;

-- Post 4: 4-image grid
INSERT INTO posts (slug, title, content, embed_url, media_items, platform, tags, category, status, visibility, views_count, likes_count, comments_count)
VALUES (
  'bangladesh-nature-2026',
  'Beautiful Bangladesh 🇧🇩',
  'Took a short break from coding to explore some of the natural beauty around us. Sometimes you need to step away from the screen and touch some grass! 😄

Nature is the best reset button. Back to coding tomorrow with fresh eyes and new ideas. 💚',
  NULL,
  '[
    {"type":"image","url":"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85","caption":"Mountain lake"},
    {"type":"image","url":"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=85","caption":"Green fields"},
    {"type":"image","url":"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=85","caption":"Sunset view"},
    {"type":"image","url":"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=85","caption":"Forest path"}
  ]'::jsonb,
  'other',
  ARRAY['bangladesh','nature','travel','life'],
  'Personal',
  'published','public', 74, 31, 6
) ON CONFLICT (slug) DO NOTHING;

-- Post 5: JS tutorial — YouTube video
INSERT INTO posts (slug, title, content, embed_url, media_items, platform, tags, category, status, visibility, views_count, likes_count, comments_count)
VALUES (
  'javascript-async-await-explained',
  'JavaScript Async/Await Explained 🔄',
  'One of the most confusing concepts for JS beginners — async/await! I made this short video to break it down as simply as possible.

After watching, you''ll understand:
• What the event loop is
• Callbacks → Promises → Async/Await
• How to handle errors with try/catch
• Real-world API fetch examples

Drop your questions below! 💬',
  'https://www.youtube.com/watch?v=V_Kr9OSfDeU',
  '[
    {"type":"youtube","url":"https://www.youtube.com/watch?v=V_Kr9OSfDeU","thumbnail":"https://img.youtube.com/vi/V_Kr9OSfDeU/maxresdefault.jpg","caption":"Async/Await Tutorial"}
  ]'::jsonb,
  'youtube',
  ARRAY['javascript','async','tutorial','promises'],
  'Tutorial',
  'published','public', 445, 112, 24
) ON CONFLICT (slug) DO NOTHING;
