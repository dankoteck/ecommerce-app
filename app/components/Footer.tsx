"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Sitemap } from "~/types/sitemap";

type Props = {
  sitemap: Sitemap;
};

export default function Footer({ sitemap }: Props) {
  // Grouped by pair for ease to render
  const groupedSitemap = [
    //
    sitemap.slice(0, 2),
    sitemap.slice(2, 4),
  ];

  return (
    <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="lg:grid-cols-2 lg:grid lg:gap-8">
        <div>
          {/* Logo */}
          <Link href="/" className="block w-fit">
            <span className="sr-only">Extremely Advanced Ecommerce Logo</span>
            <div className="relative w-8 h-8 aspect-h-1 aspect-w-1">
              <Image
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 10vw, (max-width: 1200px) 50vw, 33vw"
                loader={({ src }) => src}
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Just a template logo"
              />
            </div>
          </Link>

          {/* Description */}
          <p className="mt-8 text-sm text-gray-500">
            My goal is to become a well-rounded Fullstack Developer.
          </p>

          {/* Social Media */}
          <div className="mt-8">
            <h3 className="sr-only">Social media</h3>
            <div className="flex gap-8">
              <FaFacebook className="w-5 h-5 text-gray-500" />
              <FaGithub className="w-5 h-5 text-gray-500" />
              <FaLinkedin className="w-5 h-5 text-gray-500" />
              <FaTwitter className="w-5 h-5 text-gray-500" />
              <FaYoutube className="w-5 h-5 text-gray-500" />
            </div>
          </div>
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
                        {section?.name}
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
    </div>
  );
}
