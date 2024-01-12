import { commonModifiers, createKeywords } from "./entities/keyword";

export type Site = {
  website: string;
  author: string;
  description: string;
  title: string;
  keywords: Array<string>;
  ogImage?: string;
  lightAndDarkMode: boolean;
  postPerPage: number;
};

export const SITE: Site = {
  website: "https://clock.vyke.dev",
  author: "Jose Albizures",
  description:
    "Simple and straightforward digital clock web app with user-friendly interface and useful features ",
  title: "Online Clock by Vyke",
  keywords: [
    ...createKeywords("clock", commonModifiers),
    ...createKeywords("tools", [...commonModifiers, "time", "free time"]),
    "hours",
    "minutes",
    "seconds",
  ],
  // ogImage: 'main.jpg',
  lightAndDarkMode: true,
  postPerPage: 6,
};
