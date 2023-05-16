"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { toast } from "react-toastify";
import { ProductDetails } from "../actions/getProductDetails";

const OrderSummary = dynamic(() => import("./OrderSummary"), {
  ssr: false,
});

type CartItem = ProductDetails & {
  quantity: number;
};

// Maximum to 10 quantity
const quantityOptions = [
  { id: 1, label: "1", value: 1 },
  { id: 2, label: "2", value: 2 },
  { id: 3, label: "3", value: 3 },
  { id: 4, label: "4", value: 4 },
  { id: 5, label: "5", value: 5 },
  { id: 6, label: "6", value: 6 },
  { id: 7, label: "7", value: 7 },
  { id: 8, label: "8", value: 8 },
  { id: 9, label: "9", value: 9 },
  { id: 10, label: "10", value: 10 },
];

export default function ShoppingCart({
  open,
  setOpen,
  items,
  onRemoveItem,
  onUpdateItem,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateItem: (id: number, quantity: number) => void;
}) {
  const calculatedSubtotal = items.reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  );
  const isEmptyCart = items.length === 0;

  const backToShopping = () => {
    setOpen(false);
    window.location.href = "/";
  };

  const onCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      });

      if (!response.ok) {
        return toast.error("Failed to create order", {
          position: "top-left",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }

      const { url } = await response.json();

      window.location.href = url;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                  <div className="flex flex-col h-full bg-white shadow-xl">
                    {/* Dialog header */}
                    <div className="flex items-start justify-between px-4 py-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shipping cart
                      </Dialog.Title>
                      <div className="flex items-center ml-3 h-7">
                        <button
                          type="button"
                          className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    {/* List products */}
                    {isEmptyCart ? (
                      <div className="px-4 py-6 text-center sm:px-6">
                        <ShoppingBagIcon className="block mx-auto font-normal text-indigo-700 w-42 h-42" />
                        <h1 className="mt-2 text-3xl font-semibold">
                          Look like your cart is currently empty.
                        </h1>
                        <p className="mt-2 text-base text-slate-500">
                          {
                            "Before proceed to checkout you must add some products to your shopping cart. You'll find a lots of interesting products on our Homepage."
                          }
                        </p>
                      </div>
                    ) : (
                      <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                        <div>
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {items.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="relative flex items-center justify-center flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md shadow-md">
                                    <Image
                                      priority
                                      width={56}
                                      height={56}
                                      src={product.imageSrc}
                                      alt={product.imageAlt}
                                    />
                                  </div>

                                  <div className="flex flex-col flex-1 ml-4">
                                    <div>
                                      <div className="flex justify-between text-sm font-medium hover:underline">
                                        <Link
                                          target="_blank"
                                          href={`/product/${product.slug}`}
                                          className="w-full flex items-start gap-2 !text-indigo-600 "
                                        >
                                          <span className="line-clamp-1">
                                            {product.name}
                                          </span>
                                        </Link>
                                      </div>
                                      <p className="mt-1 font-normal text-black">
                                        {Intl.NumberFormat("en-US", {
                                          currency: "USD",
                                          style: "currency",
                                        }).format(
                                          product.price * product.quantity
                                        )}
                                      </p>
                                    </div>
                                    <div className="flex items-end justify-between flex-1 text-sm">
                                      <div className="flex items-end gap-4">
                                        Qty:{" "}
                                        <select
                                          onChange={(evt) =>
                                            onUpdateItem(
                                              product.id,
                                              +evt.target.value
                                            )
                                          }
                                          defaultValue={product.quantity}
                                          className="block w-16 px-3 py-1 font-medium text-gray-900 border rounded-md shadow-md appearance-none cursor-pointer focus:ring-blue-500 focus:border-blue-500 border-slate-200"
                                        >
                                          {quantityOptions.map((item) => (
                                            <option
                                              key={item.value}
                                              value={item.value}
                                            >
                                              {item.label}
                                            </option>
                                          ))}
                                        </select>
                                      </div>

                                      <button
                                        onClick={() => onRemoveItem(product.id)}
                                        type="button"
                                        className="font-medium text-red-600 hover:text-red-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="px-4 py-6 border-t border-t-slate-200 sm:px-6">
                      {!isEmptyCart && (
                        <OrderSummary
                          subtotal={calculatedSubtotal}
                          cod={5} // hard code for now
                          tax={8.32} // hard code for now
                        />
                      )}
                      <button
                        onClick={isEmptyCart ? backToShopping : onCheckout}
                        className="flex items-center justify-center w-full px-6 py-3 mt-6 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                      >
                        {isEmptyCart ? "Back to shopping" : "Checkout"}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
