import { Section } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { prisma } from "~/lib/prisma";
import { InfoBadge, PinkBadge } from "../components/Badges";

async function getSections(): Promise<Section[]> {
  const sections = await prisma.section.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return sections.filter((section) => section._count.products >= 2);
}

export default async function ShopBySections() {
  const sections: Section[] = await getSections();
  const groupSections = [
    //
    sections.slice(0, 3),
    sections.slice(3, 6),
  ];

  const getCategoryClassName = (groupIndex: number, categoryIndex: number) => {
    const rowSpan2 = "md:!row-span-2";
    const aspectW1 = "md:!aspect-w-1";
    const aspectW2 = "md:!aspect-w-2";

    if (groupIndex === 0) {
      if (categoryIndex === 0) return `${rowSpan2} ${aspectW1}`;
      return aspectW2;
    }

    if (categoryIndex === 1) return `${rowSpan2} ${aspectW1}`;

    return aspectW2;
  };

  return (
    <section
      aria-labelledby="shop-by-section"
      className="bg-slate-50 border-y border-y-slate-200"
    >
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Shop by Section</h2>
        <div className="flex items-center justify-between w-full mb-8">
          <p className="text-2xl">Shop by Section</p>

          {/* CTA */}
          <Link href="/" className="text-sky-600">
            Browse all categories
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <div>
          {groupSections.map((sections, groupIndex) => (
            <div
              key={groupIndex}
              className="grid grid-cols-1 grid-rows-1 gap-8 mb-8 md:grid-cols-2 md:grid-rows-2 "
            >
              {sections.map((section, categoryIndex) => (
                <Link
                  key={section.name}
                  href={`/section/${section.slug}`}
                  className={`cursor-pointer row-span-1 aspect-h-1 aspect-w-1 col-span-1 relative rounded-lg overflow-hidden group ${getCategoryClassName(
                    groupIndex,
                    categoryIndex
                  )} `}
                >
                  <Image
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={section.imageSrc ?? "https://picsum.photos/300/400"} // just a random picture
                    alt={section.imageAlt ?? "Alt"}
                    className="object-cover object-center w-full h-full group-hover:opacity-75"
                  />

                  <div className="absolute flex flex-col items-end justify-start p-6">
                    {/* Section name */}
                    <p className="text-xl font-medium">{section.name}</p>

                    <div className="flex items-center">
                      {/* Tag */}
                      {section.slug.includes("women") ? (
                        <PinkBadge>For women</PinkBadge>
                      ) : (
                        <InfoBadge>For men</InfoBadge>
                      )}

                      <p className="text-sm">Shop now</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
