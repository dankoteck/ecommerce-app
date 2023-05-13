import { cache } from "react";
import { prisma } from "~/lib/prisma";

async function getSaleOffProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { discount: { gt: 0 } },
      select: {
        id: true,
        name: true,
        slug: true,
        imageSrc: true,
        imageAlt: true,
        description: true,
        rawPrice: true,
        discount: true,
        rating: true,
        price: true,
      },
    });
    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default cache(getSaleOffProducts);
