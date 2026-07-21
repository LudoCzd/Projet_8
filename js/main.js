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
let lastFocusedElement = null;

function closeModal() {
  modal.classList.add('hidden');
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function updateImage() {
  const img = currentProject.images[currentImageIndex];

  if (img.src) {
    modalImage.src = img.src;
    modalImage.alt = img.caption;
    modalImage.classList.remove('hidden');
    modalImagePlaceholder.classList.add('hidden');
    if (img.fit === 'contain') {
      modalImage.classList.remove('object-cover');
      modalImage.classList.add('object-contain');
    } else {
      modalImage.classList.remove('object-contain');
      modalImage.classList.add('object-cover');
    }
  } else {
    modalImagePlaceholder.textContent = img.placeholder;
    modalImagePlaceholder.classList.remove('hidden');
    modalImage.classList.add('hidden');
  }
  modalCaption.textContent = img.caption;
  modalCounter.textContent = `${currentImageIndex + 1} / ${currentProject.images.length}`;
}

const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');

modalPrev.addEventListener('click', () => {
  currentImageIndex =
    (currentImageIndex - 1 + currentProject.images.length) %
    currentProject.images.length;
  updateImage();
});

modalNext.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
  updateImage();
});

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
const focusableElements = modal.querySelectorAll('button, [href]');

const firstFocusableElement = focusableElements[0];
const lastFocusableElement = focusableElements[focusableElements.length - 1];

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }

  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === firstFocusableElement) {
      e.preventDefault();
      lastFocusableElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
      e.preventDefault();
      firstFocusableElement.focus();
    }
  }
});

const modalOpen = document.querySelectorAll('[open-modal]');
modalOpen.forEach((btn) => {
  btn.addEventListener('click', () => {
    const projectKey = btn.getAttribute('open-modal');
    currentProject = projectsData[projectKey];
    currentImageIndex = 0;
    lastFocusedElement = btn;

    modalCategory.textContent = currentProject.category;
    modalTitle.textContent = currentProject.title;
    modalDescription.textContent = currentProject.description;
    modalGithub.href = currentProject.github;
    modalTags.innerHTML = '';
    currentProject.tags.forEach((tag) => {
      const span = document.createElement('span');
      span.className =
        'px-3 py-1 rounded-full bg-bg border border-border text-xs text-white/70';
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    updateImage();

    modal.classList.remove('hidden');
    modalClose.focus();
  });
});

modalClose.addEventListener('click', () => {
  closeModal();
});

modalBackdrop.addEventListener('click', () => {
  closeModal();
});

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const honeypot = document.getElementById('contact-website');
  if (honeypot.value !== '') {
    return;
  }

  emailjs
    .sendForm('service_4qonvk9', 'template_mli0e09', contactForm)
    .then(() => {
      contactForm.reset();
      alert('Message envoyé');
    })
    .catch((error) => {
      console.error('Erreur EmailJS :', error);
      alert(
        'Une erreur est survenue, merci de réessayer ou de me contacter directement par email (ludovic.cazade@gmail.com).',
      );
    });
});
