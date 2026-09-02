export interface NavItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

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

export const footerNav: NavItem[] = [
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
