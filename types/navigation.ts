export type Navigation = {
  featured: {
    name: string;
    slug: string;
    imageSrc: string;
    imageAlt: string;
  }[];
  sectionsGroup: {
    id: number;
    name: string;
    sections: {
      name: string;
      slug: string;
    }[];
  }[];
  name: string;
}[];
