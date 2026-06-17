import Stripe from "stripe";

// Lazy singleton: the Stripe client is created on first use at request time,
// not at module load. This keeps a missing STRIPE_SECRET_KEY from throwing
// during the build's page-data collection (which would fail the whole deploy).
let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    client = new Stripe(key);
  }
  return client;
}
