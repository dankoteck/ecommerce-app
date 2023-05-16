import { NextResponse } from "next/server";
import { ProductDetails } from "~/app/actions/getProductDetails";
import { stripe } from "~/lib/stripe";

export async function POST(request: Request) {
  try {
    // Create Checkout Sessions from body params.
    const body: (ProductDetails & {
      quantity: number;
    })[] = await request.json();

    const session = await stripe.checkout.sessions.create({
      line_items: body.map((product) => ({
        quantity: product.quantity,
        price_data: {
          currency: "usd",
          unit_amount: product.price * 100,
          product_data: {
            name: product.name,
            description: (product.description as string).slice(0, 30), // maximum 30 character for product describe.
            images: [product.imageSrc],
          },
        },
      })),
      mode: "payment",
      success_url: `${request.headers.get(
        "origin"
      )}/payment?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get(
        "origin"
      )}/payment?canceled=true&session_id={CHECKOUT_SESSION_ID}`,
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
