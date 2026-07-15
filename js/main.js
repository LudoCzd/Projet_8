// Menu burger
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
  const nowHidden = menu.classList.toggle('hidden');
  menuToggle.setAttribute('aria-expanded', String(!nowHidden));
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Données des projets pour la modale.
// Remplacer les "placeholder" par de vraies balises <img src="..." alt="..."> une fois les captures dans /images.
const projectsData = {
  kasa: {
    category: 'Application web',
    title: 'Kasa',
    description: "Plateforme de location d'appartements entre particuliers, développée en React avec routage dynamique et galerie photo interactive.",
    images: [
      { placeholder: 'Capture Kasa 1/3 — à ajouter', caption: "Page d'accueil : liste des logements avec filtres." },
      { placeholder: 'Capture Kasa 2/3 — à ajouter', caption: "Détail d'un logement avec galerie photo cyclique." },
      { placeholder: 'Capture Kasa 3/3 — à ajouter', caption: 'Version mobile, menu et mise en page adaptés.' },
    ],
    tags: ['React', 'React Router', 'Sass', 'Vite'],
    github: '[lien-github-kasa]',
  },
  grimoire: {
    category: 'API back-end',
    title: 'Mon Vieux Grimoire',
    description: 'API sécurisée de notation de livres : authentification JWT, opérations CRUD complètes et modélisation MongoDB.',
    images: [
      { placeholder: 'Capture Grimoire 1/3 — à ajouter', caption: 'Requête Postman authentifiée sur une route sécurisée.' },
      { placeholder: 'Capture Grimoire 2/3 — à ajouter', caption: 'Modèle de données dans MongoDB Atlas.' },
      { placeholder: 'Capture Grimoire 3/3 — à ajouter', caption: "Front fourni par OpenClassrooms consommant l'API." },
    ],
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    github: '[lien-github-grimoire]',
  },
};

// Modale projet avec carrousel accessible
const modal = document.getElementById('modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const modalCategory = document.getElementById('modal-category');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalImagePlaceholder = document.getElementById('modal-image-placeholder');
const modalCounter = document.getElementById('modal-counter');
const modalCaption = document.getElementById('modal-caption');
const modalTags = document.getElementById('modal-tags');
const modalGithub = document.getElementById('modal-github');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');

let currentProject = null;
let currentImageIndex = 0;
let lastFocusedElement = null;

function openModal(projectKey, triggerEl) {
  currentProject = projectsData[projectKey];
  currentImageIndex = 0;
  lastFocusedElement = triggerEl;

  modalCategory.textContent = currentProject.category;
  modalTitle.textContent = currentProject.title;
  modalDescription.textContent = currentProject.description;
  modalGithub.href = currentProject.github;

  modalTags.innerHTML = '';
  currentProject.tags.forEach((tag) => {
    const span = document.createElement('span');
    span.className = 'px-3 py-1 rounded-full bg-bg border border-border text-xs text-white/70';
    span.textContent = tag;
    modalTags.appendChild(span);
  });

  updateImage();

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
  document.addEventListener('keydown', handleModalKeydown);
}

function updateImage() {
  const img = currentProject.images[currentImageIndex];
  modalImagePlaceholder.textContent = img.placeholder;
  modalCaption.textContent = img.caption;
  modalCounter.textContent = `${currentImageIndex + 1} / ${currentProject.images.length}`;
}

function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleModalKeydown);
  if (lastFocusedElement) lastFocusedElement.focus();
}

// Navigation cyclique dans le carrousel : même logique de modulo que la galerie Kasa
function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
  updateImage();
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
  updateImage();
}

function handleModalKeydown(e) {
  if (e.key === 'Escape') {
    closeModal();
  } else if (e.key === 'ArrowLeft') {
    showPrevImage();
  } else if (e.key === 'ArrowRight') {
    showNextImage();
  } else if (e.key === 'Tab') {
    trapFocus(e);
  }
}

function trapFocus(e) {
  const focusableEls = modal.querySelectorAll('button, [href]');
  const firstEl = focusableEls[0];
  const lastEl = focusableEls[focusableEls.length - 1];

  if (e.shiftKey && document.activeElement === firstEl) {
    e.preventDefault();
    lastEl.focus();
  } else if (!e.shiftKey && document.activeElement === lastEl) {
    e.preventDefault();
    firstEl.focus();
  }
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
modalPrev.addEventListener('click', showPrevImage);
modalNext.addEventListener('click', showNextImage);

document.querySelectorAll('[data-open-modal]').forEach((btn) => {
  btn.addEventListener('click', () => openModal(btn.dataset.openModal, btn));
});
