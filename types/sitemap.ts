export type Sitemap = {
  id: number;
  name: string;
  sections: {
    id: number;
    slug: string;
    name: string;
  }[];
}[];
