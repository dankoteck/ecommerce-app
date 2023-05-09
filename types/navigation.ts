import { Category, Featured, Section, SectionGroup } from "@prisma/client";

export type Navigation = (Category & {
  featured: Featured[];
  sectionsGroup: (SectionGroup & {
    sections: Section[];
  })[];
})[];
