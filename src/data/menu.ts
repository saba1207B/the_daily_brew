export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  category: string;
  tagline: string;
  description: string;
  tastingNotes: string[];
  specs: { label: string; value: string }[];
  theme: 'light' | 'dark';
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    price: 150,
    image: '/assets/images/02_alternate_cappuccino.jpg',
    alt: 'Cappuccino with latte art on a white saucer, beside coffee beans',
    category: 'Artisanal Hot Brew',
    tagline: 'Double-Shot Espresso · Silky Micro-Foam',
    description:
      'A masterfully balanced double-shot of our signature 100% Arabica espresso, gently fused with velvety micro-foamed steamed milk and finished with delicate hand-poured latte art. Smooth, aromatic, and deeply comforting.',
    tastingNotes: ['Toasted Hazelnut', 'Dark Cocoa Crema', 'Sweet Buttercream'],
    specs: [
      { label: 'Origin', value: 'Chikmagalur Single-Estate Arabica' },
      { label: 'Serving', value: '240 ml · Freshly Pulled' },
      { label: 'Roast Profile', value: 'Medium-Dark Roast' },
    ],
    theme: 'dark',
  },
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    price: 180,
    image: '/assets/images/03_alternate_iced_coffee.jpg',
    alt: 'Tall glass of cold coffee over ice with a metal straw',
    category: 'Signature Iced Specialty',
    tagline: '18-Hour Slow Steep · Poured Over Crystal Ice',
    description:
      'Slow-steeped specialty cold brew shaken with fresh whole farm milk, pure Madagascar vanilla bean essence, and poured over crystal-clear ice. Intensely refreshing with a naturally sweet caramel finish.',
    tastingNotes: ['Caramelized Sugar', 'Toffee Undertones', 'Crisp Cold Finish'],
    specs: [
      { label: 'Steep Time', value: '18-Hour Slow Cold Extraction' },
      { label: 'Serving', value: '350 ml · Served Over Ice' },
      { label: 'Blend', value: 'Coorg Hill Reserve Reserve' },
    ],
    theme: 'light',
  },
  {
    id: 'classic-sandwich',
    name: 'Classic Sandwich',
    price: 120,
    image: '/assets/images/04_alternate_sandwich.jpg',
    alt: 'Toasted sandwich with tomato, lettuce and cheese, sliced in halves',
    category: 'Fresh From The Kitchen',
    tagline: 'Artisanal Sourdough · Farm-Fresh Fillings',
    description:
      'Thick slices of artisanal sourdough bread toasted golden-crisp in cultured butter, generously layered with vine-ripened tomatoes, crunchy garden lettuce, aged cheddar cheese, and house-made herb mayonnaise.',
    tastingNotes: ['Crisp Sourdough Crust', 'Aged Creamy Cheddar', 'Fresh Herb Aioli'],
    specs: [
      { label: 'Bread', value: 'Daily-Baked Fermented Sourdough' },
      { label: 'Serving', value: '2 Sliced Halves · Made to Order' },
      { label: 'Cheese', value: 'Matured White Cheddar' },
    ],
    theme: 'dark',
  },
  {
    id: 'chocolate-brownie',
    name: 'Chocolate Brownie',
    price: 100,
    image: '/assets/images/05_alternate_brownie.jpg',
    alt: 'Square chocolate brownie with walnuts and a mint leaf on a plate',
    category: 'Decadent Bakery & Dessert',
    tagline: '70% Belgian Dark Cocoa · Roasted California Walnuts',
    description:
      'Dense, fudgy, melt-in-your-mouth brownie crafted from single-origin Belgian dark chocolate, studded with crunchy roasted California walnuts and crowned with a delicate sprig of fresh organic mint.',
    tastingNotes: ['Molten Fudge Center', 'Toasted Crunchy Walnuts', 'Rich 70% Dark Cocoa'],
    specs: [
      { label: 'Chocolate', value: '70% Belgian Callebaut Cocoa' },
      { label: 'Serving', value: '1 Generous Square · Served Warm' },
      { label: 'Nuts', value: 'Roasted California Walnuts' },
    ],
    theme: 'light',
  },
];
