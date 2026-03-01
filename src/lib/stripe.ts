import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeClient;
}

export async function createCheckoutSession(
  priceId: string,
  successUrl: string,
  cancelUrl: string
): Promise<string | null> {
  const stripe = getStripe();
  if (!stripe || !priceId) return null;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session.url;
}

export async function verifySubscription(
  customerId: string
): Promise<boolean> {
  const stripe = getStripe();
  if (!stripe) return false;

  const subs = await stripe.subscriptions.list({
    customer: customerId,
    status: "active",
    limit: 1,
  });

  return subs.data.length > 0;
}
