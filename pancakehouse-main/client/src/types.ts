export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  badge?: string;
  image: string;
}

export interface Rule {
  id: number;
  title: string;
  text: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export enum SectionType {
  HERO = 'HERO',
  MENU = 'MENU',
  CODE = 'CODE',
  LOCATION = 'LOCATION',
  REVIEWS = 'REVIEWS',
}
