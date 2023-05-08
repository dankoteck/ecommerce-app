import { Category, Featured, Section, SectionGroup } from "@prisma/client";

export type CategoriesNavigation = (Category & {
  featured: Featured[];
  sectionsGroup: (SectionGroup & {
    sections: Section[];
  })[];
})[];
