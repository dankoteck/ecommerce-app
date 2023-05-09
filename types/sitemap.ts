import { Section, SectionGroup } from "@prisma/client";

export type Sitemap = (
  | (SectionGroup & {
      sections: Section[];
    })
  | null
)[];
