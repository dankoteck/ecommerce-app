import { cache } from "react";
import { prisma } from "~/lib/prisma";

async function getSectionPage(id: number) {
  try {
    const section = await prisma.section.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        slug: true,
        products: {
          select: {
            imageAlt: true,
            imageSrc: true,
            id: true,
            gallery: true,
            rawPrice: true,
            price: true,
            slug: true,
            discount: true,
            name: true,
            description: true,
            rating: true,
          },
        },
      },
    });

    return section!;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default cache(getSectionPage);
