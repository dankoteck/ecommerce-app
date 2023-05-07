import { PrismaClient } from "@prisma/client";
import data from "../data/dumb.json";

const prisma = new PrismaClient();

async function main() {
  // await prisma.product.createMany({
  //   data: data.map((product) => ({
  //     title: product.title,
  //     description: product.description,
  //     price: product.price,
  //     image: product.image,
  //     rawPrice: product.rawPrice,
  //     discount: product.discount ?? 0,
  //   })),
  // });
  //
  // await prisma.attribute.createMany({
  //   data: [
  //     { name: "Color", slug: "color", value: "Black", productId: 10 },
  //     { name: "Color", slug: "color", value: "White", productId: 2 },
  //     { name: "Color", slug: "color", value: "Red", productId: 3 },
  //     { name: "Color", slug: "color", value: "Blue", productId: 14 },
  //     { name: "Color", slug: "color", value: "Yellow", productId: 9 },
  //     { name: "Color", slug: "color", value: "Green", productId: 5 },
  //     { name: "Material", slug: "material", value: "Cotton", productId: 1 },
  //     { name: "Material", slug: "material", value: "Silk", productId: 9 },
  //     { name: "Material", slug: "material", value: "Leather", productId: 8 },
  //     { name: "Material", slug: "material", value: "Denim", productId: 4 },
  //     { name: "Material", slug: "material", value: "Velvet", productId: 14 },
  //     { name: "Material", slug: "material", value: "Plastic", productId: 16 },
  //     { name: "Material", slug: "material", value: "Rubber", productId: 3 },
  //     { name: "Material", slug: "material", value: "Vinyl", productId: 4 },
  //     { name: "Material", slug: "material", value: "Fur", productId: 11 },
  //     { name: "Material", slug: "material", value: "Mesh", productId: 10 },
  //     { name: "Size", slug: "size", value: "XS", productId: 4 },
  //     { name: "Size", slug: "size", value: "S", productId: 8 },
  //     { name: "Size", slug: "size", value: "M", productId: 16 },
  //     { name: "Size", slug: "size", value: "L", productId: 9 },
  //     { name: "Size", slug: "size", value: "XL", productId: 19 },
  //     { name: "Size", slug: "size", value: "XXL", productId: 11 },
  //     { name: "Brand", slug: "brand", value: "Nike", productId: 14 },
  //     { name: "Brand", slug: "brand", value: "Adidas", productId: 2 },
  //     { name: "Brand", slug: "brand", value: "Puma", productId: 7 },
  //     { name: "Brand", slug: "brand", value: "Levis", productId: 10 },
  //   ],
  // });
  //
  // await prisma.category.createMany({
  //   data: [
  //     { name: `Men's clothing`, slug: `mens-clothing` },
  //     { name: `Women's clothing`, slug: `womens-clothing` },
  //     { name: `Jewelery`, slug: `jewelery` },
  //     { name: `Electronics`, slug: `electronics` },
  //     { name: `Kids`, slug: `kids` },
  //     { name: `Shoes`, slug: `shoes` },
  //     { name: `Bags`, slug: `bags` },
  //     { name: `Watches`, slug: `watches` },
  //     { name: `Accessories`, slug: `accessories` },
  //     { name: `Sports`, slug: `sports` },
  //     { name: `Beauty`, slug: `beauty` },
  //     { name: `Furniture`, slug: `furniture` },
  //     { name: `Health`, slug: `health` },
  //   ],
  // });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
