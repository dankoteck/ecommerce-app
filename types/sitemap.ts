import { Section, SectionGroup } from "@prisma/client";

export type Sitemap = {
  id: number;
  name: string;
  sections: {
    id: number;
    name: string;
  }[];
}[];
