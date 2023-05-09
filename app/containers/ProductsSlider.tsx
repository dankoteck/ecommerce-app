"use client";
import "keen-slider/keen-slider.min.css";

import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { Product } from "@prisma/client";
import { useMediaQuery } from "~/hooks/media-query";
import ProductItem from "../components/ProductItem";

type Props = {
  items: Product[];
  showProductRating?: boolean;
};

export default function ProductSlider({
  items,
  showProductRating = true,
}: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const { width } = useMediaQuery();
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slides: {
      perView:
        width && width > 1024
          ? 4
          : width && width > 640 && width < 1024
          ? 3
          : 2,
      spacing: 48,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="relative group/container">
      <div ref={sliderRef} className="keen-slider !m-auto">
        {items.map((product) => (
          <div key={product.id} className="keen-slider__slide">
            <ProductItem showRating={showProductRating} item={product} />
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            disabled={currentSlide === 0}
          />

          <Arrow
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
            }
          />
        </>
      )}
    </div>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabeld = props.disabled ? "fill-slate-300" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`block w-7 opacity-60 group-hover/container:opacity-100 h-16 absolute top-1/2 -translate-y-1/2 fill-slate-700 bg-slate-200 cursor-pointer ${
        props.left
          ? "-left-[12px] rounded-r-md"
          : "left-auto -right-[12px] rounded-l-md"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
