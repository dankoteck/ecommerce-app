import { Product, Section } from "@prisma/client";

export type SectionsWithProducts = (Section & {
  products: Product[];
})[];
