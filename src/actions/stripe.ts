"use server";
import type { Stripe } from "stripe";
import { headers } from "next/headers";
import { CURRENCY } from "@/config";
import { formatAmountForStripe } from "@/utils/stripe-helpers";
import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(
  selectedOption: number,
  email: string,
  artist: string
): Promise<Stripe.Checkout.Session> {
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price:
            selectedOption === 25
              ? "price_1O9GXkKOBbArU92kAB25mRZE"
              : "price_1OA0nRKOBbArU92kxAt6fuf9",
          quantity: 1,
        },
      ],

      mode: "payment",
      automatic_tax: { enabled: true },
      // success_url: `${headers().get(
      //   "origin"
      // )}/return?session_id={CHECKOUT_SESSION_ID}`,
      // cancel_url: `${headers().get("origin")}/`,
      return_url: `${headers().get(
        "origin"
      )}/return?session_id={CHECKOUT_SESSION_ID}&email=${encodeURI(
        email
      )}&artist=${encodeURI(artist)}`,
    });
  return checkoutSession;
  // redirect(checkoutSession.url as string);
}

export async function createPaymentIntent(
  data: FormData
): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.get("customDonation") as string),
        CURRENCY
      ),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    });

  return { client_secret: paymentIntent.client_secret as string };
}
