import { cache } from "react";
import { prisma } from "~/lib/prisma";

async function getPromotionProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { isNowPromotion: true },
      select: { imageAlt: true, imageSrc: true },
      take: 7,
    });
    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default cache(getPromotionProducts);
