import { NextResponse } from "next/server";
import queryString from "query-string";
import { prisma } from "~/lib/prisma";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: number };
  }
) {
  const { url } = request;
  const { query } = queryString.parseUrl(url);
  const { orderBy, attributes } = query as {
    orderBy: string;
    attributes: string;
  };
  const arrValue = orderBy ? orderBy.split(":") : [];

  const data = await prisma.section.findUnique({
    where: { id: +params.id },
    select: {
      id: true,
      name: true,
      slug: true,
      products: {
        where: attributes
          ? {
              attributes: {
                some: {
                  id: {
                    in: attributes.split(",").map((item) => +item),
                  },
                },
              },
            }
          : {},
        orderBy: orderBy
          ? {
              [arrValue[0]]: arrValue[1],
            }
          : {},
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
          attributes: true,
        },
      },
    },
  });
  return NextResponse.json(data);
}
