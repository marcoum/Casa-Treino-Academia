const navbar = document.getElementById('navbar');
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = navMenu.querySelectorAll('a');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const icon = navToggle.querySelector('i');
  icon.className = navMenu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.querySelector('i').className = 'fas fa-bars';
  });
});

const heroBg = document.getElementById('heroBg');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroHeight = hero.offsetHeight;
  if (scrollY <= heroHeight) {
    const offset = scrollY * 0.4;
    heroBg.style.transform = `scale(1.1) translateY(${offset}px)`;
  }
});

const tabs = document.querySelectorAll('.service-tab');
const cards = document.querySelectorAll('.service-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

const counters = document.querySelectorAll('.stat-number');

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const step = Math.max(1, Math.floor(target / 60));
  let current = 0;
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(interval);
    } else {
      el.textContent = current;
    }
  }, duration / (target / step));
}

const aosElements = document.querySelectorAll('[data-aos]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('aos-visible');
      }, (entry.target.dataset.aosDelay || index % 3) * 80);
      observer.unobserve(entry.target);
      if (entry.target.classList.contains('stat-item')) {
        const num = entry.target.querySelector('.stat-number');
        if (num && !num.dataset.counted) {
          num.dataset.counted = 'true';
          animateCounter(num);
        }
      }
    }
  });
}, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

aosElements.forEach(el => observer.observe(el));

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 500);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Matrícula solicitada com sucesso! Entraremos em contato em breve pelo WhatsApp.');
    form.reset();
  });
}

console.log('Casa Treino Academia carregada com sucesso!');
