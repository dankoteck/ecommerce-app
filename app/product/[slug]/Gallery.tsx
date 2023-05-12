"use client";

import Image from "next/image";
import { useState } from "react";
import { getClassNames } from "~/utils";

type Item = {
  id: number;
  imageSrc: string;
  imageAlt: string;
};

export default function Gallery({ items }: { items: Item[] | undefined }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="lg:col-span-4 lg:row-end-1">
      <div className="overflow-hidden aspect-w-4 aspect-h-3">
        <Image
          fill
          priority
          className="object-cover object-center w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={items?.[selectedImageIndex]?.imageSrc ?? "https://mxobnfuivgwfltxkazmu.supabase.co/storage/v1/object/public/assets/ecommerce-product-image-not-found.jpeg"}
          alt={items?.[selectedImageIndex]?.imageAlt ?? "Not found image"}
        />
      </div>

      <div className="block w-full mt-6">
        <div className="grid grid-cols-4 gap-6">
          {items?.map((item, index) => (
            <button
              onClick={() => setSelectedImageIndex(index)}
              className={getClassNames(
                index === selectedImageIndex ? "ring ring-offset-2 ring-indigo-600" : "",
                "relative flex items-center justify-center w-full h-24 bg-white rounded-md cursor-pointer"
              )}
              key={item.id}
            >
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <Image
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={item.imageSrc ?? "https://mxobnfuivgwfltxkazmu.supabase.co/storage/v1/object/public/assets/ecommerce-product-image-not-found.jpeg"}
                  alt={item.imageAlt ?? "Not found image"}
                  className="object-cover object-center w-full h-full"
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
