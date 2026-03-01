import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const priceId = process.env.STRIPE_PRICE_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!priceId) {
    return NextResponse.json(
      { error: "Stripe not configured yet. Coming soon!" },
      { status: 503 }
    );
  }

  try {
    const url = await createCheckoutSession(
      priceId,
      `${appUrl}?upgraded=true`,
      `${appUrl}?canceled=true`
    );

    if (!url) {
      return NextResponse.json(
        { error: "Could not create checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Payment system error" },
      { status: 500 }
    );
  }
}
