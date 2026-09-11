const SOCIAL_LINKS = {
  telegram: 'https://t.me/PavelCodeMaster',
  vk: 'https://vk.ru/hermann_rorschach',
};

document.querySelector('[data-social="telegram"]').href = SOCIAL_LINKS.telegram;
document.querySelector('[data-social="vk"]').href = SOCIAL_LINKS.vk;

const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.site-nav');

function closeMenu() {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menu.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

const terms = document.querySelectorAll('[data-definition]');
function showDefinition(name, scroll = false) {
  terms.forEach((button) => button.classList.toggle('active', button.dataset.definition === name));
  document.querySelectorAll('[data-definition-panel]').forEach((panel) => panel.classList.toggle('active', panel.dataset.definitionPanel === name));
  if (scroll) document.querySelector(`[data-definition="${name}"]`).scrollIntoView({ behavior: 'smooth', block: 'center' });
}

terms.forEach((button) => button.addEventListener('click', () => showDefinition(button.dataset.definition)));
document.querySelectorAll('[data-term]').forEach((button) => button.addEventListener('click', () => showDefinition(button.dataset.term, true)));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('video').forEach((video) => {
  video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach((other) => {
      if (other !== video) other.pause();
    });
  });
});
