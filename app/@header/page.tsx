import { Prisma } from "@prisma/client";
import Navigation from "~/components/Navigation";
import prisma from "~/lib/prisma";

async function getCategoriesForNavigation() {
  const categories = await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      featured: true,
      sectionsGroup: {
        include: {
          sections: true,
        },
      },
    },
  });

  return categories;
}

type CategoriesNavigation = Prisma.PromiseReturnType<
  typeof getCategoriesForNavigation
>;

export default async function Page() {
  const categories: CategoriesNavigation = await getCategoriesForNavigation();
  return <Navigation categories={categories} />;
}
