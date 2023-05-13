import { Prisma } from "@prisma/client";
import { cache } from "react";
import { prisma } from "~/lib/prisma";

async function getProductsForSlider({
  where,
}: {
  where: Prisma.ProductWhereInput;
}) {
  try {
    const products = await prisma.product.findMany({
      where,
      select: {
        id: true,
        slug: true,
        imageSrc: true,
        imageAlt: true,
        rating: true,
        name: true,
        description: true,
        discount: true,
        rawPrice: true,
        price: true,
      },
      take: 12,
    });

    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default cache(getProductsForSlider);
