const projectsData = {
  kasa: {
    category: 'Application web',
    title: 'Kasa',
    description:
      "Plateforme de location d'appartements entre particuliers, développée en React avec routage dynamique et galerie photo interactive.",
    images: [
      {
        src: './images/kasa-img-1.png',
        caption: "Page d'accueil : liste des logements avec filtres.",
      },
      {
        src: './images/kasa-img-2.png',
        caption: "Détail d'un logement avec galerie photo cyclique.",
      },
      {
        src: './images/kasa-img-3.png',
        caption: 'Version mobile, menu et mise en page adaptés.',
      },
    ],
    github: 'https://github.com/LudoCzd/Projet_5',
    tags: ['React', 'React Router', 'Sass', 'Vite'],
  },
  grimoire: {
    category: 'API back-end',
    title: 'Mon Vieux Grimoire',
    description:
      'API sécurisée de notation de livres : authentification JWT, opérations CRUD complètes et modélisation MongoDB.',
    images: [
      {
        placeholder: 'Capture Grimoire 1/2 — à ajouter',
        caption: "Page d'accueil : liste des livres avec filtres.",
      },
      {
        placeholder: 'Capture Grimoire 2/2 — à ajouter',
        caption: "Détail d'un livre avec notation et commentaires.",
      },
    ],
    github: 'https://github.com/LudoCzd/Projet_6',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
  },
};
