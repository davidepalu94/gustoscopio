import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <div>
      <Nav />
      <div className="section" style={{ maxWidth: 760 }}>
        <div className="section-head" style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 42px)' }}>Informativa sulla Privacy</h1>
          <p>Ultimo aggiornamento: 19 settembre 2026</p>
        </div>

        <div className="legal-content">
          <h2>1. Titolare del trattamento</h2>
          <p>
            Dr. Davide Palumbo — Biologo Nutrizionista — Partita IVA
            12543901008 — email: davidepalumbo.nutrizione@gmail.com. Per
            qualsiasi domanda sul trattamento dei tuoi dati puoi scrivere
            a davidepalumbo.nutrizione@gmail.com.
          </p>

          <h2>2. Quali dati raccogliamo e perché</h2>

          <h3>2.1 Dati dell'account</h3>
          <p>
            Quando crei un account inseriamo email e password. La password
            non è mai leggibile da noi: viene gestita in forma cifrata dal
            nostro fornitore di autenticazione (Supabase). Questi dati
            servono per farti accedere al sito e riconoscerti come
            proprietario di un corso acquistato — base giuridica:
            esecuzione del contratto (art. 6.1.b GDPR).
          </p>

          <h3>2.2 Dati di acquisto</h3>
          <p>
            Quando acquisti un corso registriamo quale corso, la data e un
            riferimento alla transazione Stripe, per darti accesso ai
            contenuti e per i nostri obblighi contabili e fiscali —
            base giuridica: esecuzione del contratto ed obbligo legale
            (art. 6.1.b e 6.1.c GDPR).
          </p>

          <h3>2.3 Dati di pagamento</h3>
          <p>
            Il pagamento con carta è gestito interamente da Stripe: i dati
            della tua carta non transitano né vengono conservati sui nostri
            server. Stripe agisce come titolare autonomo del trattamento
            per questi dati — puoi consultare la loro informativa su{' '}
            <a href="https://stripe.com/it/privacy" target="_blank" rel="noopener noreferrer">
              stripe.com/it/privacy
            </a>.
          </p>

          <h3>2.4 Dati fisici inseriti nella "valutazione rapida"</h3>
          <p>
            Età, sesso, peso e altezza che inserisci per vedere una stima
            di BMI, fabbisogno calorico o proteico vengono elaborati
            <strong> esclusivamente nel tuo browser</strong>: non vengono
            mai inviati né salvati sui nostri server. Se in futuro
            acquisti un percorso che prevede una valutazione scritta da un
            professionista, quei dati ti verranno richiesti separatamente,
            con un'informativa specifica al momento della raccolta.
          </p>

          <h3>2.5 Dati tecnici</h3>
          <p>
            Come qualsiasi sito, i nostri fornitori di infrastruttura
            (Vercel per l'hosting, Bunny.net per lo streaming video)
            possono registrare automaticamente informazioni tecniche
            (es. indirizzo IP, tipo di browser) nei log di sistema, per
            motivi di sicurezza e funzionamento del servizio — base
            giuridica: legittimo interesse (art. 6.1.f GDPR).
          </p>

          <h2>3. A chi comunichiamo i tuoi dati</h2>
          <p>
            Ci appoggiamo ai seguenti fornitori, che trattano i dati per
            nostro conto in qualità di responsabili del trattamento (o, per
            i pagamenti, come titolari autonomi):
          </p>
          <ul>
            <li><strong>Supabase</strong> — gestione account e database (server in UE).</li>
            <li><strong>Stripe</strong> — elaborazione dei pagamenti.</li>
            <li><strong>Bunny.net</strong> — hosting e distribuzione dei video dei corsi.</li>
            <li><strong>Vercel</strong> — hosting del sito web.</li>
          </ul>
          <p>
            Non vendiamo né cediamo i tuoi dati a terzi per finalità di
            marketing.
          </p>

          <h2>4. Per quanto tempo conserviamo i dati</h2>
          <p>
            I dati dell'account vengono conservati finché il tuo account è
            attivo, o fino a una tua richiesta di cancellazione. I dati
            relativi agli acquisti vengono conservati per il periodo
            richiesto dalla normativa fiscale italiana (di norma 10 anni).
          </p>

          <h2>5. I tuoi diritti</h2>
          <p>
            In qualsiasi momento puoi chiedere di accedere ai tuoi dati,
            correggerli, cancellarli, limitarne il trattamento, riceverli
            in formato portabile, o opporti al trattamento, scrivendo a
            davidepalumbo.nutrizione@gmail.com. Hai inoltre diritto di proporre reclamo al
            Garante per la Protezione dei Dati Personali
            (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">garanteprivacy.it</a>).
          </p>

          <h2>6. Minori</h2>
          <p>
            Il servizio non è pensato per persone minori di 18 anni. Se sei
            minorenne, utilizza il sito solo con il consenso di un
            genitore o tutore.
          </p>

          <h2>7. Modifiche a questa informativa</h2>
          <p>
            Questa informativa può essere aggiornata nel tempo. Verrà
            sempre pubblicata la versione più recente su questa pagina,
            con la data di ultimo aggiornamento in cima.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
