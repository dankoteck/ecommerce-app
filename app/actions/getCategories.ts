import { Prisma } from "@prisma/client";
import { cache } from "react";
import { prisma } from "~/lib/prisma";

async function getCategories() {
  try {
    const data = await prisma.category.findMany({
      select: {
        name: true,
        featured: {
          select: {
            imageAlt: true,
            imageSrc: true,
            name: true,
            slug: true,
          },
        },
        sectionsGroup: {
          select: {
            id: true,
            name: true,
            sections: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default cache(getCategories);

export type Categories = Prisma.PromiseReturnType<typeof getCategories>;
