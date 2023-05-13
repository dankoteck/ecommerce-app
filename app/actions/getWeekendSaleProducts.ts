import { cache } from "react";
import { prisma } from "~/lib/prisma";
import getProductsForSlider from "./getProductsForSlider";

async function getWeekendSaleProducts() {
  // TODO: replace with API get list weekend sale
  const sections = await prisma.section.findMany({
    where: {
      slug: {
        startsWith: "women",
      },
    },
    select: {
      id: true,
      slug: true,
      imageAlt: true,
      imageSrc: true,
    },
    take: 3,
  });

  const products = await getProductsForSlider({
    where: {
      discount: { gt: 0 },
      sections: {
        every: {
          slug: {
            startsWith: "men",
          },
        },
      },
    },
  });

  return { products, sections };
}

export default cache(getWeekendSaleProducts);
