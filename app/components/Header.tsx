"use client";

import { useState } from "react";
import { Navigation } from "~/types/navigation";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import { Prisma } from "@prisma/client";
import { getCategories } from "../actions";

export default function Header({
  categories,
}: {
  categories: Prisma.PromiseReturnType<typeof getCategories>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MobileNavigation open={open} setOpen={setOpen} categories={categories} />
      <DesktopNavigation setOpen={setOpen} categories={categories} />
    </>
  );
}
