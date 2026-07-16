const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const modalTags = document.getElementById('modal-tags');
const modalImage = document.getElementById('modal-image');
const modalImagePlaceholder = document.getElementById(
  'modal-image-placeholder',
);
const modalCaption = document.getElementById('modal-caption');
const modalCounter = document.getElementById('modal-counter');

let currentProject = null;
let currentImageIndex = 0;

menuToggle.addEventListener('click', () => {
  const menuHidden = menu.classList.toggle('hidden');
  if (menuHidden) {
    menuToggle.setAttribute('aria-expanded', 'false');
  } else {
    menuToggle.setAttribute('aria-expanded', 'true');
  }
});

const liensMenu = menu.querySelectorAll('a');
liensMenu.forEach((lien) => {
  lien.addEventListener('click', () => {
    menu.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const modal = document.getElementById('modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const modalCategory = document.getElementById('modal-category');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalGithub = document.getElementById('modal-github');

const modalOpen = document.querySelectorAll('[open-modal]');
modalOpen.forEach((btn) => {
  btn.addEventListener('click', () => {
    const projectKey = btn.getAttribute('open-modal');
    const project = projectsData[projectKey];

    modalCategory.textContent = project.category;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalGithub.href = project.github;
    modalTags.innerHTML = '';
    project.tags.forEach((tag) => {
      const span = document.createElement('span');
      span.className =
        'px-3 py-1 rounded-full bg-bg border border-border text-xs text-white/70';
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    modal.classList.remove('hidden');
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modalBackdrop.addEventListener('click', () => {
  modal.classList.add('hidden');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.add('hidden');
  }
});
