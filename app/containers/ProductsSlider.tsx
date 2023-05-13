"use client";

import { Prisma } from "@prisma/client";
import { getProductsForSlider } from "../actions";
import KeenSlider from "../components/KeenSlider";
import ProductItem from "../components/ProductItem";

type Items = Prisma.PromiseReturnType<typeof getProductsForSlider>;

export default function ProductsSlider({ items }: { items: Items }) {
  return (
    <KeenSlider
      items={items}
      renderItem={(item) => (
        <div key={item.id} className="keen-slider__slide">
          <ProductItem showRating={false} item={item} />
        </div>
      )}
    />
  );
}
