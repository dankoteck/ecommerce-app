import { PrismaClient } from "@prisma/client";
import seedingData from "./seed.json";
import { slugify } from "../utils/slugify";

const prisma = new PrismaClient();

async function main() {
  //   await prisma.category.create({
  //     data: {
  //       name: "Women",
  //       featured: {
  //         createMany: {
  //           data: [
  //             {
  //               name: "New Arrivals",
  //               slug: "women-new-arrivals",
  //               imageSrc:
  //                 "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
  //               imageAlt:
  //                 "Models sitting back to back, wearing Basic Tee in black and bone.",
  //             },
  //             {
  //               name: "Basic Tees",
  //               slug: "women-basic-tees",
  //               imageSrc:
  //                 "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
  //               imageAlt:
  //                 "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
  //             },
  //           ],
  //         },
  //       },
  //       sectionsGroup: {
  //         create: [
  //           {
  //             name: "Clothing",
  //             sections: {
  //               createMany: {
  //                 data: [
  //                   { name: "Tops", slug: "women-clothing-tops" },
  //                   { name: "Dresses", slug: "women-clothing-dresses" },
  //                   { name: "Pants", slug: "women-clothing-pants" },
  //                   { name: "Denim", slug: "women-clothing-denim" },
  //                   { name: "Sweaters", slug: "women-clothing-sweaters" },
  //                   { name: "T-Shirts", slug: "women-clothing-t-shirts" },
  //                   { name: "Jackets", slug: "women-clothing-jackets" },
  //                   { name: "Activewear", slug: "women-clothing-activewear" },
  //                   { name: "Browse All", slug: "women-clothing-browse-all" },
  //                 ],
  //               },
  //             },
  //           },
  //           {
  //             name: "Brands",
  //             sections: {
  //               createMany: {
  //                 data: [
  //                   { name: "Full Nelson", slug: "women-brands-full-nelson" },
  //                   { name: "My Way", slug: "women-brands-my-way" },
  //                   { name: "Re-Arranged", slug: "women-brands-re-arranged" },
  //                   { name: "Counterfeit", slug: "women-brands-counterfeit" },
  //                   {
  //                     name: "Significant Other",
  //                     slug: "women-brands-significant-other",
  //                   },
  //                 ],
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });
  //   await prisma.category.create({
  //     data: {
  //       name: "Men",
  //       featured: {
  //         createMany: {
  //           data: [
  //             {
  //               name: "New Arrivals",
  //               slug: "men-new-arrivals",
  //               imageSrc:
  //                 "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
  //               imageAlt:
  //                 "Drawstring top with elastic loop closure and textured interior padding.",
  //             },
  //             {
  //               name: "Artwork Tees",
  //               slug: "men-artwork-tees",
  //               imageSrc:
  //                 "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
  //               imageAlt:
  //                 "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
  //             },
  //           ],
  //         },
  //       },
  //       sectionsGroup: {
  //         create: [
  //           {
  //             name: "Clothing",
  //             sections: {
  //               createMany: {
  //                 data: [
  //                   { name: "Tops", slug: "men-clothing-tops" },
  //                   { name: "Pants", slug: "men-clothing-pants" },
  //                   { name: "Sweaters", slug: "men-clothing-sweaters" },
  //                   { name: "T-Shirts", slug: "men-clothing-t-shirts" },
  //                   { name: "Jackets", slug: "men-clothing-jackets" },
  //                   { name: "Activewear", slug: "men-clothing-activewear" },
  //                   { name: "Browse All", slug: "men-clothing-browse-all" },
  //                 ],
  //               },
  //             },
  //           },
  //           {
  //             name: "Accessories",
  //             sections: {
  //               createMany: {
  //                 data: [
  //                   { name: "Watches", slug: "men-accessories-watches" },
  //                   { name: "Wallets", slug: "men-accessories-wallets" },
  //                   { name: "Bags", slug: "men-accessories-bags" },
  //                   { name: "Sunglasses", slug: "men-accessories-sunglasses" },
  //                   { name: "Hats", slug: "men-accessories-hats" },
  //                   { name: "Belts", slug: "men-accessories-belts" },
  //                 ],
  //               },
  //             },
  //           },
  //           {
  //             name: "Brands",
  //             sections: {
  //               createMany: {
  //                 data: [
  //                   { name: "Re-Arranged", slug: "men-brands-re-arranged" },
  //                   { name: "Counterfeit", slug: "men-brands-counterfeit" },
  //                   { name: "Full Nelson", slug: "men-brands-full-nelson" },
  //                   { name: "My Way", slug: "men-brands-my-way" },
  //                 ],
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });
  //   seedingData.forEach(async (product) => {
  //     await prisma.product.create({
  //       data: {
  //         name: product.name,
  //         description: product.description,
  //         price: product.price,
  //         imageSrc: product.imageSrc,
  //         imageAlt: product.imageAlt,
  //         rawPrice: product.rawPrice,
  //         discount: product.discount ?? 0,
  //         slug: slugify(product.name),
  //         featured: {
  //           connect: product.featured?.map((slug: string) => ({ slug })),
  //         },
  //         sections: {
  //           connect: product.sections?.map((slug: string) => ({ slug })),
  //         },
  //       },
  //     });
  //   });

  await prisma.product.update({
    where: {
      id: 14,
    },
    data: {
      gallery: {
        set: [
          "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
          "https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg",
          "https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg",
          "https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg",
        ],
      },
    },
  });
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
