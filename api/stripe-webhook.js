import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabaseAdmin = createClient(
  'https://bphlhasignetikelmfnl.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Serve il corpo "grezzo" della richiesta per verificare la firma di Stripe:
// per questo disattiviamo il body-parser automatico di Vercel.
export const config = {
  api: {
    bodyParser: false,
  },
};

function buffer(readable) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readable.on('data', (chunk) => chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk));
    readable.on('end', () => resolve(Buffer.concat(chunks)));
    readable.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end('Metodo non consentito');
    return;
  }

  const signature = req.headers['stripe-signature'];
  let event;

  try {
    const rawBody = await buffer(req);
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Firma webhook non valida:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.client_reference_id || session.metadata?.user_id;
    const courseId = session.metadata?.course_id;

    if (userId && courseId) {
      const { error } = await supabaseAdmin
        .from('purchases')
        .upsert(
          { user_id: userId, course_id: courseId, stripe_session_id: session.id },
          { onConflict: 'user_id,course_id' }
        );

      if (error) {
        console.error('Errore nel salvare l\'acquisto su Supabase:', error);
      }
    }
  }

  res.status(200).json({ received: true });
}
