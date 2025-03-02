import Stripe from "stripe";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export async function POST(req) {
  try {
    const { amount, success_url, cancel_url } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      confirm: true, // Auto-confirm so no redirect needed
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Parking Booking" },
            unit_amount: amount * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      success_url,
      cancel_url,
    });

    return Response.json({ id: session.id, url: session.url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
