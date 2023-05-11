"use client";

import { useState } from "react";
import { Navigation } from "~/types/navigation";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

type Props = {
  categories: Navigation;
};

export default function Header({ categories }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MobileNavigation open={open} setOpen={setOpen} categories={categories} />
      <DesktopNavigation setOpen={setOpen} categories={categories} />
    </>
  );
}
