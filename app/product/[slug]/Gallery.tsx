"use client";

import Image from "next/image";
import { useState } from "react";

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
          src={items?.[selectedImageIndex].imageSrc ?? ""}
          alt={items?.[selectedImageIndex].imageAlt ?? ""}
        />
      </div>

      <div className="block w-full mt-6">
        <div className="grid grid-cols-4 gap-6">
          {items?.map((item, index) => (
            <button
              onClick={() => setSelectedImageIndex(index)}
              className="relative flex items-center justify-center w-full h-24 bg-white rounded-md cursor-pointer  focus:ring ring-offset-2"
              key={item.id}
            >
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <Image
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={item.imageSrc ?? ""}
                  alt={item.imageAlt ?? ""}
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
