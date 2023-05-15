import Image from "next/image";
import Link from "next/link";

import { FooterSitemap } from "../actions/getFooterSitemap";
import SocialNetwork from "./SocialNetwork";

type Props = {
  sitemap: FooterSitemap;
};

export default function Footer({ sitemap }: Props) {
  // Grouped by pair for ease to render
  const groupedSitemap = [
    //
    sitemap.slice(0, 2),
    sitemap.slice(2, 4),
  ];

  return (
    <footer className="max-w-2xl px-4 py-16 mx-auto border-t sm:px-6 sm:py-24 lg:max-w-7xl border-t-slate-200 lg:px-8">
      <div className="lg:grid-cols-2 lg:grid lg:gap-8">
        <div>
          {/* Logo */}
          <Link href="/" className="block w-fit">
            <span className="sr-only">Extremely Advanced Ecommerce Logo</span>
            <div className="relative w-20 h-20 aspect-h-1 aspect-w-1">
              <Image
                fill
                priority
                sizes="(max-width: 768px) 10vw, (max-width: 1200px) 50vw, 33vw"
                src="https://mxobnfuivgwfltxkazmu.supabase.co/storage/v1/object/public/assets/Ecommerce-Logo.png"
                alt="Just a template Logo"
              />
            </div>
          </Link>

          {/* Description */}
          <p className="mt-8 text-sm text-gray-500">
            My goal is to become a well-rounded Fullstack Developer.
          </p>

          <SocialNetwork github twitter facebook linkedin youtube />
        </div>

        {/* Sitemap */}
        <div className="grid grid-cols-2 gap-8 mt-16 lg:mt-0">
          {groupedSitemap.map((group, index) => (
            <div key={index} className="grid gap-0 md:gap-8 md:grid-cols-2">
              {group.map((groupItem, sectionIndex) => (
                <div
                  key={groupItem?.id}
                  className={sectionIndex === 0 ? "" : "mt-10 md:mt-0"}
                >
                  <h3 className="font-semibold">{groupItem?.name}</h3>
                  <ul role="list" className="mt-6">
                    {groupItem?.sections.map((section) => (
                      <li
                        key={section?.id}
                        className="[&:not(:last-child)]:mb-4"
                      >
                        <Link href={`/section/${section.slug}`}>
                          {section?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 mt-16 border-t border-t-slate-200">
        <p className="pt-8 text-sm text-slate-500 ">
          © 2023 Le Dang Khoa, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
