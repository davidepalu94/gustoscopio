import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  'https://bphlhasignetikelmfnl.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Solo questi id sono ammessi: evita che l'utente chieda file arbitrari del bucket.
const GUIDE_IDS = ['guida-proteine', 'guida-piatto-bilanciato', 'guida-spesa-etichette'];
const BUCKET = 'guide';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito' });
    return;
  }

  try {
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    const { guideId } = req.body || {};

    if (!token || !GUIDE_IDS.includes(guideId)) {
      res.status(400).json({ error: 'Richiesta non valida' });
      return;
    }

    // 1) chi è l'utente (dal token di sessione, non da ciò che dice il browser)
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !userData?.user) {
      res.status(401).json({ error: 'Accedi per scaricare la guida' });
      return;
    }

    // 2) ha davvero acquistato questa guida?
    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .select('id')
      .eq('user_id', userData.user.id)
      .eq('course_id', guideId)
      .maybeSingle();

    if (purchaseError || !purchase) {
      res.status(403).json({ error: 'Non risulta un acquisto di questa guida' });
      return;
    }

    // 3) link temporaneo (60 secondi) al file privato
    const { data: signed, error: signError } = await supabaseAdmin.storage
      .from(BUCKET)
      .createSignedUrl(`${guideId}.pdf`, 60, { download: `${guideId}.pdf` });

    if (signError || !signed?.signedUrl) {
      console.error('Errore link firmato:', signError);
      res.status(500).json({ error: 'Il file non è ancora disponibile. Riprova più tardi.' });
      return;
    }

    res.status(200).json({ url: signed.signedUrl });
  } catch (err) {
    console.error('Errore download guida:', err);
    res.status(500).json({ error: 'Errore nel download' });
  }
}
