import { cache } from "react";
import { prisma } from "~/lib/prisma";

async function getProductsWithinSection() {
  try {
    const sections = await prisma.section.findMany({
      select: {
        name: true,
        slug: true,
        imageAlt: true,
        imageSrc: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return sections.filter((section) => section._count.products >= 2);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default cache(getProductsWithinSection);
