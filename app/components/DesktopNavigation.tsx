"use client";

import { Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import useLocalStorage from "~/hooks/localStorage";
import { getClassNames } from "~/utils";
import { getCategories } from "../actions";
import AdvertisingBanner from "./AdvertisingBanner";
import ShoppingCart from "./ShoppingCart";
import { ProductDetails } from "../actions/getProductDetails";

type CartItem = ProductDetails & {
  quantity: number;
};

export default function DesktopNavigation({
  setOpenMobileMenu,
  categories,
}: {
  setOpenMobileMenu: (open: boolean) => void;
  categories: Prisma.PromiseReturnType<typeof getCategories>;
}) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "cartItems",
    []
  );
  const [openShoppingCart, setOpenShoppingCart] = useState(false);

  const onOpenShoppingCart = () => {
    setOpenShoppingCart(true);
  };

  const onRemoveItem = (id: number) => {
    const productInCartIndex = cartItems.findIndex((item) => item.id === id);
    const newCardItems = [
      ...cartItems.slice(0, productInCartIndex),
      ...cartItems.slice(productInCartIndex + 1),
    ];
    setCartItems(newCardItems);
  };

  const onUpdateProductQuantity = (id: number, quantity: number) => {
    const productIndex = cartItems.findIndex((item) => item.id === id);

    if (productIndex > -1) {
      const newCartItems = [...cartItems];
      newCartItems[productIndex].quantity = quantity;
      setCartItems(newCartItems);
    }
  };

  return (
    <header className="relative z-50 bg-white border-b border-gray-200">
      <AdvertisingBanner />

      <nav aria-label="Top" className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <button
            type="button"
            className="p-2 text-gray-400 bg-white rounded-md lg:hidden"
            onClick={() => setOpenMobileMenu(true)}
          >
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Logo */}
          <div className="flex ml-4 lg:ml-0">
            <Link href="/">
              <span className="sr-only">Extremely Advanced Ecommerce</span>
              <div className="relative w-16 h-16 aspect-h-1 aspect-w-1">
                <Image
                  fill
                  priority
                  sizes="(max-width: 768px) 10vw, (max-width: 1200px) 50vw, 33vw"
                  src="https://mxobnfuivgwfltxkazmu.supabase.co/storage/v1/object/public/assets/Ecommerce-Logo.png"
                  alt="Just a template logo"
                />
              </div>
            </Link>
          </div>

          {/* Flyout menus */}
          <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
            <div className="flex h-full space-x-8">
              {categories.map((category) => (
                <Popover key={category.name} className="flex">
                  {({ open, close }) => (
                    <>
                      <div className="relative flex">
                        <Popover.Button
                          className={getClassNames(
                            open
                              ? "!outline-0 border-indigo-600 text-indigo-600"
                              : "!outline-0 border-transparent text-gray-700 hover:text-gray-800",
                            "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                          )}
                        >
                          {category.name}
                        </Popover.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Popover.Panel className="absolute inset-x-0 text-sm text-gray-500 top-full">
                          {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                          <div
                            className="absolute inset-0 bg-white shadow top-1/2"
                            aria-hidden="true"
                          />

                          <div className="relative bg-white">
                            <div className="px-8 mx-auto max-w-7xl">
                              <div className="grid grid-cols-2 py-16 gap-x-8 gap-y-10">
                                <div className="grid grid-cols-2 col-start-2 gap-x-8">
                                  {category.featured.map((item) => (
                                    <div
                                      key={item.name}
                                      className="relative text-base group sm:text-sm"
                                    >
                                      <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-h-1 aspect-w-1 group-hover:opacity-75">
                                        <Image
                                          fill
                                          priority
                                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                          src={item.imageSrc}
                                          alt={item.imageAlt}
                                          className="object-cover object-center"
                                        />
                                      </div>
                                      <Link
                                        href={`/featured/${item.slug}`}
                                        className="block mt-6 font-medium text-gray-900"
                                      >
                                        <span
                                          className="absolute inset-0 z-10"
                                          aria-hidden="true"
                                        />
                                        {item.name}
                                      </Link>
                                    </div>
                                  ))}
                                </div>
                                <div className="grid grid-cols-3 row-start-1 text-sm gap-x-8 gap-y-10">
                                  {category.sectionsGroup.map((group) => (
                                    <div key={group.name}>
                                      <p
                                        id={`${group.name}-heading`}
                                        className="font-medium text-gray-900"
                                      >
                                        {group.name}
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby={`${group.name}-heading`}
                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                      >
                                        {group.sections.map((section) => (
                                          <li
                                            key={section.name}
                                            className="flex"
                                          >
                                            <Link
                                              onClick={close}
                                              href={`/section/${section.slug}`}
                                              className="hover:text-gray-800"
                                            >
                                              {section.name}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ))}
            </div>
          </Popover.Group>

          <div className="flex items-center ml-auto">
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              <button
                onClick={() => {}}
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Sign in
              </button>
            </div>

            {/* Search */}
            <div className="flex lg:ml-6">
              <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Search</span>
                <MagnifyingGlassIcon className="w-6 h-6" aria-hidden="true" />
              </a>
            </div>

            {/* Cart */}
            <div className="flow-root ml-4 lg:ml-6">
              <button
                onClick={onOpenShoppingCart}
                type="button"
                className="inline-flex items-center py-2.5 text-sm font-medium text-center text-white rounded-lg"
              >
                <ShoppingBagIcon
                  className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="inline-flex items-center justify-center w-4 h-4 p-1 ml-2 text-base font-semibold text-black ">
                  {cartItems.length}
                </span>
                <span className="sr-only">items in cart, view bag</span>
              </button>
            </div>
          </div>
        </div>

        <ShoppingCart
          items={cartItems}
          open={openShoppingCart}
          setOpen={setOpenShoppingCart}
          onRemoveItem={onRemoveItem}
          onUpdateItem={onUpdateProductQuantity}
        />
      </nav>
    </header>
  );
}
