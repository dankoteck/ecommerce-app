import { Attribute, Featured, Product, Review } from "@prisma/client";

export type FullyProduct =
  | (Product & {
      reviews: Review[];
      featured: Featured[];
      attributes: Attribute[];
    })
  | null;

export type ProductWithFullProperties = {
  id: number;
  name: string;
  slug: string;
  imageSrc?: string;
  imageAlt?: string;
  description: string | null;
  rawPrice: number;
  discount: number;
  rating: number;
  price: number;
};

export type ProductInSection = {
  id: number;
  name: string;
  products: {
    id: number;
    name: string;
    slug: string;
    imageSrc: string;
    imageAlt: string;
    description: string | null;
    price: number;
    rawPrice: number;
    discount: number;
    rating: number;
  }[];
};
