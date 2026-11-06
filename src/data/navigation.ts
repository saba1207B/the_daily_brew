export type SectionId = 'home' | 'about' | 'menu' | 'contact';

export const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'menu', label: 'Menu' },
  { id: 'contact', label: 'Contact' },
];
