/* =============================================
   VSC SERVIÇOS AUTOMOTIVOS — script.js
   Dark Mode + WhatsApp + Hamburger + Scroll FX
   ============================================= */

const WHATSAPP_NUMBER = '5511943162840'; // Número com código do país (55) + DDD (11)

/* ─── Mensagens por serviço ─── */
const MENSAGENS = {
  'Câmbio Automático':         'Olá! Vim pelo site da VSC e gostaria de falar com um especialista em *Câmbio Automático*.',
  'Mecânica Geral':            'Olá! Vim pelo site da VSC e gostaria de falar com um especialista em *Mecânica Geral*.',
  'Alinhamento e Balanceamento':'Olá! Vim pelo site da VSC e gostaria de falar com um especialista em *Alinhamento e Balanceamento*.',
  'Suspensão':                 'Olá! Vim pelo site da VSC e gostaria de falar com um especialista em *Suspensão*.',
  'Freios':                    'Olá! Vim pelo site da VSC e gostaria de falar com um especialista em *Freios*.',
  'Ar-Condicionado Automotivo':'Olá! Vim pelo site da VSC e gostaria de falar com um especialista em *Ar-Condicionado Automotivo*.',
  'Embreagem':                 'Olá! Vim pelo site da VSC e gostaria de falar com um especialista em *Embreagem*.',
  geral:                       'Olá! Vim pelo site da VSC Serviços Automotivos e gostaria de mais informações.',
};

function abrirWhatsApp(servico) {
  const msg = MENSAGENS[servico] || MENSAGENS.geral;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/* ─── Dark / Light Mode ─── */
(function initTheme() {
  const saved = localStorage.getItem('vsc-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ── Tema ── */
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('vsc-theme', next);
    });
  }

  /* ── Hamburger ── */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      hamburger.classList.toggle('active', open);
    });
    // Fecha ao clicar em link do menu
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Botões "Falar com especialista" nos cards ── */
  document.querySelectorAll('.btn-whatsapp').forEach(btn => {
    btn.addEventListener('click', () => {
      const card    = btn.closest('[data-servico]');
      const servico = card ? card.dataset.servico : null;
      abrirWhatsApp(servico);
    });
  });

  /* ── WhatsApp geral (hero, sobre, contato, float) ── */
  ['heroWhatsapp', 'sobreWhatsapp', 'btnWhatsappGeral', 'whatsappFloat'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', e => {
        e.preventDefault();
        abrirWhatsApp('geral');
      });
    }
  });

  /* ── Navbar scrolled ── */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── Animate on scroll (IntersectionObserver) ── */
  const animEls = document.querySelectorAll('.servico-card, .depoimento-card, .diferencial, .stat, .contato-item');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 80}ms`;
      observer.observe(el);
    });
  } else {
    animEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Active nav link on scroll ── */
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-links a, .mobile-menu a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));
});