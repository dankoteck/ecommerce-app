import Image from "next/image";
import { getPromotionProducts } from "../actions";

export default async function PromoSection() {
  const promotionProducts = await getPromotionProducts();

  // Grouped promotion products for ease to render
  const groupPromotionProducts = [
    promotionProducts.slice(0, 2),
    promotionProducts.slice(2, 5),
    promotionProducts.slice(5, 7),
  ];

  return (
    <div className="relative px-8 py-16 overflow-hidden border-b -z-10 bg-slate-50 border-b-slate-200">
      <div className="pt-16 pb-80 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative px-4 mx-auto max-w-7xl sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="!text-4xl font-bold tracking-tight text-gray-900 font sm:text-6xl">
              We ship over 45 million products around the world.
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Refresh your home with essentials under $500.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    {groupPromotionProducts.map((products, groupIndex) => (
                      <div
                        key={groupIndex}
                        className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"
                      >
                        {products.map((product, productIndex) => (
                          <div
                            key={product.imageAlt}
                            className={`${
                              groupIndex === 0 && productIndex === 0
                                ? "sm:opacity-0"
                                : ""
                            } relative aspect-w-1 aspect-h-1 h-64 overflow-hidden rounded-lg w-44 lg:opacity-100`}
                          >
                            <Image
                              fill
                              priority
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              src={product.imageSrc}
                              alt={product.imageAlt}
                              className="object-cover object-center w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="relative inline-block px-8 py-3 font-medium text-center text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
              >
                Shop New Arrivals
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
