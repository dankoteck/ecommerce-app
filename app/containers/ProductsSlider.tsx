"use client";

import KeenSlider from "./KeenSlider";
import ProductItem from "../components/ProductItem";
import { ProductWithFullProperties } from "~/types/product";

export default function ProductsSlider({
  items,
}: {
  items: ProductWithFullProperties[];
}) {
  return (
    <KeenSlider
      items={items}
      renderItem={(item) => (
        <div key={item.id} className="keen-slider__slide">
          <ProductItem showRating={false} item={item as ProductWithFullProperties} />
        </div>
      )}
    />
  );
}
