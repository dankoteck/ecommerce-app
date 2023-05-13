import { Prisma } from "@prisma/client";

export const options = [
  {
    id: 2,
    label: "Price: High to low",
    value: {
      orderBy: {
        price: "desc",
      },
    } as Prisma.ProductFindManyArgs,
  },
  {
    id: 3,
    label: "Price: Low to high",
    value: {
      orderBy: {
        price: "asc",
      },
    } as Prisma.ProductFindManyArgs,
  },
  {
    id: 4,
    label: "Discount: High to low",
    value: {
      orderBy: {
        discount: "desc",
      },
    } as Prisma.ProductFindManyArgs,
  },
  {
    id: 5,
    label: "Discount: Low to high",
    value: {
      orderBy: {
        discount: "asc",
      },
    } as Prisma.ProductFindManyArgs,
  },
];
