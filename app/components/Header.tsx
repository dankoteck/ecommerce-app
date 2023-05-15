"use client";

import { Prisma } from "@prisma/client";
import { useState } from "react";
import { getCategories } from "../actions";
import MobileNavigation from "./MobileNavigation";
import dynamic from "next/dynamic";

const DesktopNavigation = dynamic(() => import("./DesktopNavigation"), {
  ssr: false,
});

export default function Header({
  categories,
}: {
  categories: Prisma.PromiseReturnType<typeof getCategories>;
}) {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <>
      <MobileNavigation
        openMobileMenu={openMobileMenu}
        setOpenMobileMenu={setOpenMobileMenu}
        categories={categories}
      />
      <DesktopNavigation
        setOpenMobileMenu={setOpenMobileMenu}
        categories={categories}
      />
    </>
  );
}
