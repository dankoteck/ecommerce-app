import { Prisma } from "@prisma/client";
import Footer from "../components/Footer";
import { prisma } from "~/lib/prisma";

async function getSitemap() {
  // TODO: replace with API call with real sitemap
  const sitemap = await prisma.sectionGroup.findMany({
    include: {
      sections: true,
    },
    take: 4,
  });

  return sitemap;
}

export default async function Page() {
  const sitemap: Prisma.PromiseReturnType<typeof getSitemap> =
    await getSitemap();

  return <Footer sitemap={sitemap} />;
}
