export type Site = {
  website: string;
  author: string;
  description: string;
  title: string;
  ogImage?: string;
  lightAndDarkMode: boolean;
  postPerPage: number;
};

export const SITE: Site = {
  website: "https://clock.vyke.dev",
  author: "Jose Albizures",
  description: "A clock",
  title: "Clock by Vyke",
  // ogImage: 'main.jpg',
  lightAndDarkMode: true,
  postPerPage: 6,
};
