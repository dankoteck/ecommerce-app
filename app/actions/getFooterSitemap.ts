import { cache } from "react";
import { prisma } from "~/lib/prisma";

async function getFooterSitemap() {
  try {
    // TODO: replace with API call with real sitemap
    const data = await prisma.sectionGroup.findMany({
      select: {
        id: true,
        name: true,
        sections: {
          select: {
            id: true,
            slug: true,
            name: true,
          },
        },
      },
      take: 4,
    });

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default cache(getFooterSitemap);
