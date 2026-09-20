import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito' });
    return;
  }

  try {
    const { courseId, courseTitle, priceEur, userId, userEmail } = req.body || {};

    if (!courseId || !priceEur || !userId) {
      res.status(400).json({ error: 'Dati mancanti per creare il pagamento' });
      return;
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: courseTitle || courseId },
            unit_amount: Math.round(Number(priceEur) * 100),
          },
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      client_reference_id: userId,
      metadata: { course_id: courseId, user_id: userId },
      success_url: `${origin}/corsi/${courseId}?acquisto=ok`,
      cancel_url: `${origin}/corsi/${courseId}?acquisto=annullato`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Errore creazione checkout Stripe:', err);
    res.status(500).json({ error: 'Errore nella creazione del pagamento' });
  }
}
