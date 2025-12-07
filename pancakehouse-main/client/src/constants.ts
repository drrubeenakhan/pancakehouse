import { MenuItem, Rule, Review } from '@/types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'The Marauder Stack',
    description: "Two fluffy pancakes, 2 strips of bacon, 2 sausages, and 1 egg. A no-nonsense breakfast raid on hunger.",
    price: '$13.95',
    badge: 'STUDENT FUEL',
    image: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: '2',
    name: 'French Toast Frenzy',
    description: "Three slices of golden French toast, 2 back bacon, 2 sausages, and 1 egg. Syrup, carbs, and chaos in the best way.",
    price: '$16.95',
    badge: 'FAN FAVE',
    image: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: '3',
    name: 'The Lumberjack',
    description: "2 back bacon, 2 sausages, 2 eggs, homefries, and toast. Built for people who treat breakfast like a full-time job.",
    price: '$14.95',
    image: 'https://picsum.photos/400/300?random=3'
  },
  {
    id: '4',
    name: 'Exam Week Special',
    description: "2 eggs, 2 bacon, 2 sausages, homefries, and toast. A crash-course survival kit with caffeine optional and carbs mandatory.",
    price: '$13.95',
    badge: 'LIMITED TIME',
    image: 'https://picsum.photos/400/300?random=4'
  }
];

export const RULES: Rule[] = [
  { id: 1, title: 'NO ONE LEAVES HUNGRY', text: "Portions are sized for offensive linemen and hungry engineering students." },
  { id: 2, title: 'COFFEE IS BOTTOMLESS', text: "The pot never stops until your hands stop shaking." },
  { id: 3, title: 'CHAOS IS WELCOME', text: "Kids crying? Students debating physics? It's all part of the Saturday soundtrack." },
  { id: 4, title: 'SINCE 1999', text: "We've been flipping flapjacks in Westdale longer than you've been alive." },
];

export const REVIEWS: Review[] = [
  { id: 'r1', name: 'JASON, 2nd Year Eng', role: 'Professional Napper', quote: "The syrup is 80% of my blood stream." },
  { id: 'r2', name: 'MS. PATTERSON', role: 'Local Legend', quote: "I've been coming here for 30 years. The chairs are uncomfortable but the bacon is perfect." },
  { id: 'r3', name: 'THE HAMILTON SPEC', role: 'Newspaper', quote: "AN INSTITUTION OF SUGAR AND NOSTALGIA." }
];
