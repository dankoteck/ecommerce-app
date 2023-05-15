import { NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";
import queryString from "query-string";
import { Prisma } from "@prisma/client";

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
          attributes: attributes
            ? {
                where: {
                  id: {
                    in: attributes.split(",").map((item) => +item),
                  },
                },
              }
            : true,
        },
      },
    },
  });
  return NextResponse.json(data);
}
