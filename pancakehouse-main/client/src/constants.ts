import { MenuItem, Rule, Review } from '@/types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'The Marauder Stack',
    description: "Five buttermilk discs soaked in darkness (coffee-infused syrup) and chocolate chips. Keeps you awake through any lecture.",
    price: '$14.50',
    badge: 'STUDENT FUEL',
    image: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: '2',
    name: 'Strawberry Slam',
    description: "Whipped cream mountain, strawberry river, powdered sugar blizzard. It's not breakfast, it's a dessert disguised as a meal.",
    price: '$15.00',
    badge: 'FAN FAVE',
    image: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: '3',
    name: 'The Lumberjack',
    description: "Eggs, bacon, sausage, ham, home fries, toast, and two pancakes. Eat this and hibernate.",
    price: '$18.00',
    image: 'https://picsum.photos/400/300?random=3'
  },
  {
    id: '4',
    name: 'Exam Week Special',
    description: "Two eggs, toast, bottomless coffee, and a supportive pat on the back from the server.",
    price: '$10.99',
    badge: 'LIMITED TIME',
    image: 'https://picsum.photos/400/300?random=4'
  }
];

export const RULES: Rule[] = [
  { id: 1, title: 'NO ONE LEAVES HUNGRY', text: "Portions are sized for offensive linemen and hungry engineering students." },
  { id: 2, title: 'COFFEE IS BOTTOMLESS', text: "The pot never stops until your hands stop shaking." },
  { id: 3, title: 'CHAOS IS WELCOME', text: "Kids crying? Students debating physics? It's all part of the Saturday soundtrack." },
  { id: 4, title: 'SINCE 1994', text: "We've been flipping flapjacks in Westdale longer than you've been alive." },
];

export const REVIEWS: Review[] = [
  { id: 'r1', name: 'JASON, 2nd Year Eng', role: 'Professional Napper', quote: "The syrup is 80% of my blood stream." },
  { id: 'r2', name: 'MS. PATTERSON', role: 'Local Legend', quote: "I've been coming here for 30 years. The chairs are uncomfortable but the bacon is perfect." },
  { id: 'r3', name: 'THE HAMILTON SPEC', role: 'Newspaper', quote: "AN INSTITUTION OF SUGAR AND NOSTALGIA." }
];
