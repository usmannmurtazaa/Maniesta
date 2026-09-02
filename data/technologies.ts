export interface Technology {
  name: string;
  icon: string;
  category?: string;
}

export const technologies: Technology[] = [
  {
    name: 'React',
    icon: 'fab fa-react',
    category: 'Frontend',
  },
  {
    name: 'Next.js',
    icon: 'fab fa-js',
    category: 'Framework',
  },
  {
    name: 'TypeScript',
    icon: 'fas fa-code',
    category: 'Language',
  },
  {
    name: 'JavaScript',
    icon: 'fab fa-js-square',
    category: 'Language',
  },
  {
    name: 'Tailwind CSS',
    icon: 'fas fa-paint-brush',
    category: 'Styling',
  },
  {
    name: 'Motion',
    icon: 'fas fa-wave-square',
    category: 'Animation',
  },
  {
    name: 'Three.js',
    icon: 'fas fa-cube',
    category: '3D',
  },
  {
    name: 'React Three Fiber',
    icon: 'fas fa-cubes',
    category: '3D',
  },
  {
    name: 'Firebase',
    icon: 'fas fa-fire',
    category: 'Backend',
  },
  {
    name: 'AI APIs',
    icon: 'fas fa-robot',
    category: 'AI',
  },
  {
    name: 'REST APIs',
    icon: 'fas fa-plug',
    category: 'API',
  },
  {
    name: 'Web APIs',
    icon: 'fas fa-globe',
    category: 'API',
  },
  {
    name: 'Git',
    icon: 'fab fa-git-alt',
    category: 'Tooling',
  },
  {
    name: 'GitHub',
    icon: 'fab fa-github',
    category: 'Tooling',
  },
  {
    name: 'Netlify',
    icon: 'fas fa-cloud-upload-alt',
    category: 'Deployment',
  },
];
