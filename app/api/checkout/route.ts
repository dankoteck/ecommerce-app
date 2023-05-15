import { NextResponse } from "next/server";
import { ProductDetails } from "~/app/actions/getProductDetails";
import { stripe } from "~/lib/stripe";
// import { formatAmountForStripe } from "~/utils/stripe-helpers";

// const params: Stripe.Checkout.SessionCreateParams = {
//   submit_type: "donate",
//   payment_method_types: ["card"],
//   line_items: [
//     {
//       name: "Custom amount donation",
//       amount: formatAmountForStripe(amount, CURRENCY),
//       currency: CURRENCY,
//       quantity: 1,
//     },
//   ],
//   success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
//   cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
// };
// const checkoutSession: Stripe.Checkout.Session =
//   await stripe.checkout.sessions.create(params);

export async function POST(request: Request) {
  try {
    // Create Checkout Sessions from body params.
    const body: (ProductDetails & {
      quantity: number;
    })[] = await request.json();

    const session = await stripe.checkout.sessions.create({
      line_items: body.map((product) => ({
        price_data: {
          currency: "usd",
          unit_amount: product.price * 100,
          product_data: {
            name: product.name,
            description: product.description as string,
            images: [product.imageSrc],
          },
        },
        tax_rates: ["5"],
        quantity: product.quantity,
      })),
      mode: "payment",
      success_url: `${request.headers.get(
        "origin"
      )}/payment?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/payment?canceled=true`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
