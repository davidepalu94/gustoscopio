import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function CookiePolicyPage() {
  return (
    <div>
      <Nav />
      <div className="section" style={{ maxWidth: 760 }}>
        <div className="section-head" style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 42px)' }}>Cookie Policy</h1>
          <p>Ultimo aggiornamento: 19 settembre 2026</p>
        </div>

        <div className="legal-content">
          <h2>Cosa usiamo, in breve</h2>
          <p>
            Gustoscopio, ad oggi, <strong>non utilizza cookie di
            profilazione o di marketing</strong>, e non installa strumenti
            di analisi del traffico (come Google Analytics) che
            richiedano il tuo consenso.
          </p>

          <h2>Cosa usiamo davvero</h2>
          <p>
            Per farti restare collegato dopo l'accesso, il sito salva un
            token di sessione nel tuo browser tramite il nostro fornitore
            di autenticazione (Supabase) — tecnicamente non è un cookie
            ma un meccanismo equivalente (local storage), strettamente
            necessario per far funzionare il login. Per questo tipo di
            dato, strettamente tecnico e necessario al funzionamento del
            servizio, la normativa non richiede un consenso preventivo
            (art. 122 Codice Privacy).
          </p>
          <p>
            Il sito salva inoltre, sempre nel tuo browser, una piccola
            informazione tecnica per ricordare se hai già chiuso il
            banner di download dell'app — anche questa non identifica te
            come persona e non richiede consenso.
          </p>

          <h2>Servizi di terze parti coinvolti</h2>
          <p>
            Alcuni fornitori che usiamo per far funzionare il sito
            (Stripe per i pagamenti, Bunny.net per i video, Vercel per
            l'hosting) potrebbero utilizzare cookie o tecnologie simili
            per finalità strettamente tecniche e di sicurezza. Ti
            invitiamo a consultare le rispettive informative per maggiori
            dettagli.
          </p>

          <h2>Se questo cambia</h2>
          <p>
            Se in futuro Gustoscopio dovesse aggiungere strumenti di
            analisi del traffico o marketing che richiedano il consenso,
            questa pagina verrà aggiornata e comparirà un banner per
            raccogliere la tua scelta prima di attivarli.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
