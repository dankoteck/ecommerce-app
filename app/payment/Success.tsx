"use client";

import { useEffect } from "react";
import Stripe from "stripe";
import useLocalStorage from "~/hooks/localStorage";

export default function Success({
  paymentIntent,
}: {
  paymentIntent: Stripe.Checkout.Session["payment_intent"];
}) {
  const [_, setCartItems] = useLocalStorage("cartItems", []);

  useEffect(() => {
    setCartItems([]);
  }, []);

  return (
    <main className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h1 className="text-base font-medium text-indigo-500">Thank you !</h1>
      <p className="mt-2 text-4xl font-bold tracking-tight text-black">
        {"It's on the way!"}
      </p>
      <p className="mt-2 text-base text-slate-500">
        {`Your order #${
          paymentIntent /* fake for order_id */
        } has shipped and will be with you
        soon.`}
      </p>

      <dl className="grid grid-cols-2 pt-10 text-sm gap-x-6">
        <div className="">
          <dt className="font-medium text-slate-700">Shipping Address</dt>

          {/* Fake Address for development */}
          <dd className="mt-2 text-slate-500">
            <address className="not-italic">
              <span className="block">1A Le Thi Rieng</span>
              <span className="block">Pham Ngu Lao ward, District 1</span>
              <span className="block">Ho Chi Minh city</span>
            </address>
          </dd>
        </div>

        <div className="">
          <dt className="font-medium text-slate-700">Billing Address</dt>

          {/* Fake Address for development */}
          <dd className="mt-2 text-slate-500">
            <address className="not-italic">
              <span className="block">54A Nguyen Cong Hoan</span>
              <span className="block">Ward 7, Phu Nhuan district</span>
              <span className="block">Ho Chi Minh city</span>
            </address>
          </dd>
        </div>
      </dl>
    </main>
  );
}
