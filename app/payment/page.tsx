import { notFound } from "next/navigation";
import { stripe } from "~/lib/stripe";
import Canceled from "./Canceled";
import Success from "./Success";

async function getStripeSession(id: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(id);
    return session;
  } catch (err) {
    console.error(err);
    return notFound();
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: { session_id: string; success?: boolean; canceled?: boolean };
}) {
  const { canceled, session_id } = searchParams;
  const session = await getStripeSession(session_id);

  return canceled ? (
    <Canceled />
  ) : (
    <Success paymentIntent={session.payment_intent} />
  );
}
