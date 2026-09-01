export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  link: string;
  colors: string[];
  features: string[];
  featured: boolean;
  year: string;
}

export const projects: Project[] = [
  {
    id: 'maniesta-resume-ai',
    title: 'Maniesta Resume AI',
    description: 'An AI powered resume creation platform designed to help users build professional resumes with structured content, modern templates and intelligent assistance.',
    category: 'AI',
    technologies: ['React', 'TypeScript', 'AI APIs', 'Firebase', 'Tailwind CSS'],
    link: 'https://maniestaresumeai.netlify.app/',
    colors: ['#22d3ee', '#3b82f6', '#8b5cf6'],
    features: ['AI-powered content suggestions', 'Modern resume templates', 'Structured resume builder', 'Export to PDF', 'Real-time preview'],
    featured: true,
    year: '2025'
  },
  {
    id: 'maniesta-digital',
    title: 'Maniesta Digital',
    description: 'A modern digital platform focused on showcasing and organizing digital services, solutions and technology driven experiences.',
    category: 'Business',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Modern Web APIs'],
    link: 'https://maniestadigital.netlify.app/',
    colors: ['#3b82f6', '#6366f1', '#8b5cf6'],
    features: ['Digital service showcase', 'Solution organization', 'Modern interface', 'Responsive design'],
    featured: true,
    year: '2025'
  },
  {
    id: 'maniesta-weather',
    title: 'Maniesta Weather',
    description: 'A modern weather application providing weather information through a clean and interactive interface.',
    category: 'Utilities',
    technologies: ['React', 'Weather API', 'TypeScript', 'Responsive UI'],
    link: 'https://maniestaweather.netlify.app/',
    colors: ['#22d3ee', '#06b6d4', '#3b82f6'],
    features: ['Real-time weather data', 'Location search', '7-day forecast', 'Clean UI', 'Responsive design'],
    featured: false,
    year: '2024'
  },
  {
    id: 'maniesta-one',
    title: 'Maniesta One',
    description: 'A unified digital application concept bringing multiple useful capabilities together through one modern interface.',
    category: 'Productivity',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Modern Web APIs'],
    link: 'https://maniestaone.netlify.app/',
    colors: ['#8b5cf6', '#a855f7', '#d946ef'],
    features: ['Unified tool hub', 'Multi-purpose interface', 'Modern design', 'Easy navigation'],
    featured: false,
    year: '2024'
  },
  {
    id: 'maniesta-notes',
    title: 'Maniesta Notes',
    description: 'A modern note taking application designed for creating, organizing and managing digital notes efficiently.',
    category: 'Productivity',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    link: 'https://maniestanotes.netlify.app/',
    colors: ['#6366f1', '#8b5cf6', '#a855f7'],
    features: ['Note organization', 'Real-time sync', 'Categories & tags', 'Search functionality', 'Clean editing interface'],
    featured: false,
    year: '2025'
  },
  {
    id: 'maniesta-play',
    title: 'Maniesta Play',
    description: 'An interactive entertainment focused web application designed around digital play and engaging user experiences.',
    category: 'Entertainment',
    technologies: ['React', 'TypeScript', 'Animation', 'Responsive UI'],
    link: 'https://maniestaplay.netlify.app/',
    colors: ['#d946ef', '#a855f7', '#8b5cf6'],
    features: ['Interactive experiences', 'Engaging UI', 'Animation-driven', 'Fun & modern'],
    featured: false,
    year: '2024'
  },
  {
    id: 'maniesta-school',
    title: 'Maniesta School',
    description: 'A digital school management and education platform designed to support academic information, school workflows and educational experiences.',
    category: 'Education',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    link: 'https://maniesta-school.netlify.app/',
    colors: ['#3b82f6', '#22d3ee', '#6366f1'],
    features: ['School management', 'Student information', 'Academic workflows', 'Dashboard views', 'Educational tools'],
    featured: true,
    year: '2025'
  },
  {
    id: 'nexa-calculator',
    title: 'Nexa Calculator',
    description: 'A modern calculator application with a clean interface focused on fast and accessible calculations.',
    category: 'Utilities',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    link: 'https://nexacalculator.netlify.app/',
    colors: ['#22d3ee', '#3b82f6', '#6366f1'],
    features: ['Clean calculator UI', 'Fast calculations', 'Keyboard support', 'Responsive design', 'Modern styling'],
    featured: false,
    year: '2024'
  },
  {
    id: 'maniesta-suite',
    title: 'Maniesta Suite',
    description: 'A collection of productivity focused digital tools brought together into a unified software experience.',
    category: 'Productivity',
    technologies: ['React', 'TypeScript', 'Modern Web APIs', 'Tailwind CSS'],
    link: 'https://maniestasuite.netlify.app/',
    colors: ['#8b5cf6', '#6366f1', '#3b82f6'],
    features: ['Unified tool suite', 'Productivity tools', 'Modern interface', 'Integrated experience'],
    featured: true,
    year: '2025'
  },
  {
    id: 'zain-real-estate',
    title: 'Zain Real Estate',
    description: 'A modern real estate web application designed for property discovery, presentation and digital real estate experiences.',
    category: 'Real Estate',
    technologies: ['React', 'TypeScript', 'Responsive UI', 'Modern Web Technologies'],
    link: 'https://zainrealestate.netlify.app/',
    colors: ['#3b82f6', '#22d3ee', '#8b5cf6'],
    features: ['Property discovery', 'Listing presentation', 'Search & filters', 'Modern gallery', 'Contact integration'],
    featured: false,
    year: '2025'
  },
  {
    id: 'maniesta-campus',
    title: 'Maniesta Campus',
    description: 'An educational campus platform designed to provide a centralized digital experience for students, academics and campus related information.',
    category: 'Education',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    link: 'https://maniestacampus.netlify.app/',
    colors: ['#6366f1', '#3b82f6', '#22d3ee'],
    features: ['Campus dashboard', 'Student portal', 'Academic resources', 'Event management', 'Centralized information'],
    featured: false,
    year: '2024'
  },
  {
    id: 'resume-ai-x-pro',
    title: 'Resume AI X Pro',
    description: 'An advanced AI resume platform focused on helping users create, improve and present professional resumes through an intelligent digital experience.',
    category: 'AI',
    technologies: ['React', 'TypeScript', 'AI APIs', 'Tailwind CSS', 'Firebase'],
    link: 'https://resumeaixpro.netlify.app/',
    colors: ['#d946ef', '#a855f7', '#8b5cf6'],
    features: ['Advanced AI resume tools', 'Professional templates', 'Content improvement', 'Intelligent suggestions', 'Export capabilities'],
    featured: true,
    year: '2025'
  }
];

export const categories = ['All', 'AI', 'Productivity', 'Education', 'Utilities', 'Business', 'Entertainment', 'Real Estate'];

export const technologies = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'JavaScript', icon: 'JS' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Motion', icon: '🌀' },
  { name: 'Three.js', icon: '🔺' },
  { name: 'React Three Fiber', icon: '🧊' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'AI APIs', icon: '🤖' },
  { name: 'REST APIs', icon: '🔗' },
  { name: 'Web APIs', icon: '🌐' },
  { name: 'Git', icon: '📦' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'Netlify', icon: '🚀' }
];