import { Squares2X2Icon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "~/app/components/Breadcrumbs";
import ProductItem from "~/app/components/ProductItem";
import { prisma } from "~/lib/prisma";
import { getIdFromSlugify } from "~/utils";
import MenuDropdown from "~/app/containers/MenuDropdown";
import { Prisma } from "@prisma/client";

type Props = {
  params: {
    slug: string;
  };
};

const sortableItems = [
  {
    id: 1,
    label: "Is now promotion",
    value: {
      where: {
        isNowPromotion: true,
      },
      orderBy: {
        name: "asc",
      },
    } as Prisma.ProductFindManyArgs,
  },
  {
    id: 2,
    label: "Price: High to low",
    value: {
      orderBy: {
        price: "desc",
      },
    } as Prisma.ProductFindManyArgs,
  },
  {
    id: 3,
    label: "Price: Low to high",
    value: {
      orderBy: {
        price: "asc",
      },
    } as Prisma.ProductFindManyArgs,
  },
  {
    id: 4,
    label: "Discount: High to low",
    value: {
      orderBy: {
        discount: "desc",
      },
    } as Prisma.ProductFindManyArgs,
  },
  {
    id: 5,
    label: "Discount: Low to high",
    value: {
      orderBy: {
        discount: "asc",
      },
    } as Prisma.ProductFindManyArgs,
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = getIdFromSlugify(params.slug);
  const section = await getSection(id);
  return { title: section?.name };
}

async function getSection(id: number) {
  try {
    const section = await prisma.section.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        slug: true,
        products: {
          select: {
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
    return section;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getAttributes() {
  try {
    const attributes = await prisma.attribute.findMany({});
    return attributes;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default async function Page({ params }: Props) {
  const section = await getSection(getIdFromSlugify(params?.slug));
  const attributes = await getAttributes();
  const breadcrumbItems = [
    { title: "Home", path: "/" },
    { title: "Sections", path: "/sections" },
    { title: section?.name, path: `/section/${section?.slug}` },
  ];

  const filters = attributes.map((attr) => ({
    id: attr.id,
    label: attr.name,
  }));

  return (
    <div className="max-w-2xl px-4 mx-auto lg:max-w-7xl sm:px-6 lg:px-8">
      <div className="py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="py-16 sm:py-24">
        <div className="flex items-center justify-between pb-8 border-b border-b-slate-200">
          <h1 className="text-4xl font-bold">{section?.name}</h1>
          <div>
            <div className="flex items-center justify-between gap-8">
              <MenuDropdown items={sortableItems}>
                Sort
              </MenuDropdown>
              <Squares2X2Icon className="w-7 h-7 text-slate-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="">
        {/* Render filters here */}

        <div className="flex justify-end w-full mb-8">
          <Link href="/" className="hidden sm:block text-sky-600">
            View all products
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {section?.products.map((product) => (
            <ProductItem item={product} key={product.id} bordered />
          ))}
        </div>

        <Link href="/" className="block pt-4 text-right sm:hidden text-sky-600">
          View all products
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </div>
  );
}
