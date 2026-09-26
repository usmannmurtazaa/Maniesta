export interface NavItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Primary navigation - used by the top navbar.
 * Focused on the Maniesta site sections only.
 */
export const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/projects',
  },
  {
    id: 'about',
    label: 'About',
    href: '/#about',
  },
  {
    id: 'technology',
    label: 'Technology',
    href: '/#technology',
  },
  {
    id: 'global',
    label: 'Global',
    href: '/#global',
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/#contact',
  },
];

/**
 * Footer navigation - used by the site footer on every page.
 * Includes everything from the primary nav, plus a sitewide
 * backlink to the creator's portfolio so every Maniesta page
 * carries a real crawlable link to usmanmurtaza.netlify.app.
 * The external entry opens in a new tab.
 */
export const footerNav: NavItem[] = [
  ...navItems,
  {
    id: 'portfolio',
    label: 'By Usman Murtaza',
    href: 'https://usmanmurtaza.netlify.app',
    external: true,
  },
];

/**
 * Creator info - single source of truth for the person behind Maniesta.
 * Consumed by the footer credit block and any other surface that wants
 * to display the creator's name or link.
 */
export const creatorInfo = {
  name: 'Usman Murtaza',
  role: 'Full Stack Developer',
  url: 'https://usmanmurtaza.netlify.app',
  email: 'usmanmurtazaportfolio@gmail.com',
} as const;
