// Loader
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 400);
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') document.documentElement.classList.add('light');
themeBtn.textContent = document.documentElement.classList.contains('light') ? '☀️' : '🌙';
themeBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  const isLight = document.documentElement.classList.contains('light');
  themeBtn.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// Scroll progress + scroll-to-top
const progress = document.getElementById('progress');
const scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = pct + '%';
  scrollTop.classList.toggle('visible', h.scrollTop > 400);
});
scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Typing effect
const phrases = ["Software Engineering Student", "Aspiring Full-Stack Developer", "AI & Web Enthusiast", "Lifelong Learner"];
const typedEl = document.getElementById('typed');
let pIndex = 0, cIndex = 0, deleting = false;
function type() {
  const current = phrases[pIndex % phrases.length];
  typedEl.textContent = current.slice(0, cIndex);
  if (!deleting && cIndex < current.length) { cIndex++; setTimeout(type, 80); }
  else if (!deleting && cIndex === current.length) { deleting = true; setTimeout(type, 1400); }
  else if (deleting && cIndex > 0) { cIndex--; setTimeout(type, 40); }
  else { deleting = false; pIndex++; setTimeout(type, 300); }
}
type();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Contact form -> mailto
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  const data = new FormData(f);
  const name = data.get('name') || '';
  const email = data.get('email') || '';
  const subject = data.get('subject') || 'Message from portfolio';
  const message = data.get('message') || '';
  const body = `Hi Nijanthini,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A—%0D%0A${encodeURIComponent(name)}%0D%0A${encodeURIComponent(email)}`;
  window.location.href = `mailto:nijanthi25@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  const btn = document.getElementById('sendBtn');
  btn.textContent = '✓ Sent! Thank you';
  f.reset();
  setTimeout(() => btn.textContent = '➤ Send Message', 3500);
});
