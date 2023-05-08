"use client";

import { useState } from "react";
import { CategoriesNavigation } from "~/types/categories";
import { default as DesktopNavigation } from "./Desktop";
import { default as MobileNavigation } from "./Mobile";

type Props = {
  categories: CategoriesNavigation;
};

export default function Navigation({ categories }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MobileNavigation open={open} setOpen={setOpen} categories={categories} />
      <DesktopNavigation setOpen={setOpen} categories={categories} />
    </>
  );
}
