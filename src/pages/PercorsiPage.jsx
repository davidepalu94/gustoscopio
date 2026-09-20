import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import PercorsiModal from '../components/PercorsiModal';
import Footer from '../components/Footer';
import { getIncludedContent } from '../percorsiBonus';

const TRUST_POINTS = [
  { icon: '🎯', label: 'Su misura per te' },
  { icon: '🔄', label: 'Si adatta nel tempo' },
  { icon: '🤝', label: 'Accompagnamento reale' },
];

const PHASES = [
  { num: '01', title: 'Analizziamo', desc: 'Partiamo dalla tua situazione reale: abitudini, obiettivi, vincoli di tempo e di vita quotidiana.' },
  { num: '02', title: 'Costruiamo', desc: 'Un percorso pensato su di te, non un modello standard applicato a chiunque.' },
  { num: '03', title: 'Adattiamo', desc: 'Il percorso si aggiusta nel tempo, in base a come risponde la tua vita reale, non solo la teoria.' },
  { num: '04', title: 'Consolidiamo', desc: 'L\'obiettivo non è un risultato temporaneo, ma un cambiamento che regge nel tempo.' },
];

const INCLUDES = [
  'Analisi della tua situazione e dei tuoi obiettivi reali',
  'Piano nutrizionale costruito su di te, non un modello standard',
  'Aggiustamenti del percorso nel tempo, non un piano rigido e fisso',
  'Un punto di riferimento diretto per le tue domande',
  'Scheda di allenamento personalizzata',
  { text: 'Guide PDF esclusive di approfondimento', to: '/guide', linkLabel: 'Scopri le guide →' },
  'Accesso ai videocorsi di Gustoscopio',
];

const TESTIMONIALS = [
  { name: 'Marco, 34 anni', text: 'Avevo già provato diete rigide che duravano poche settimane. Qui il percorso si è adattato a me, non il contrario.' },
  { name: 'Giulia, 41 anni', text: 'Quello che mi ha convinta è stato non sentirmi giudicata per nessuna scelta alimentare, solo accompagnata.' },
  { name: 'Luca, 28 anni', text: 'Utile soprattutto la parte di adattamento: la mia vita è cambiata a metà percorso e il piano si è aggiustato con me.' },
  { name: 'Sara, 37 anni', text: 'Tra lavoro e famiglia non ho mai tempo. Qui i pasti sono pensati per essere veloci da preparare, non per un mondo ideale che non esiste.' },
  { name: 'Alessandro, 45 anni', text: 'La scheda di allenamento inclusa mi ha fatto capire come far andare insieme palestra e alimentazione, cosa che da solo non ero mai riuscito a fare.' },
  { name: 'Chiara, 29 anni', text: 'Avevo un rapporto complicato col cibo. Il tono usato durante il percorso non mi ha mai fatto sentire sbagliata per come mangiavo prima.' },
  { name: 'Davide, 52 anni', text: 'Ho abitudini radicate da vent\'anni. Non mi hanno chiesto di stravolgere tutto, ma di cambiare un pezzo alla volta.' },
  { name: 'Federica, 33 anni', text: 'Dopo la maternità cercavo qualcosa di realistico, non un piano da rivista. Qui si parte da dove sei davvero.' },
  { name: 'Andrea, 39 anni', text: 'Viaggio spesso per lavoro. Il percorso ha tenuto conto anche di questo, con alternative pratiche per quando sono fuori casa.' },
  { name: 'Valentina, 26 anni', text: 'Prima ho sempre fatto da sola, seguendo consigli trovati online. Avere un confronto reale ha fatto la differenza.' },
  { name: 'Roberto, 48 anni', text: 'I video del corso incluso mi hanno aiutato a capire il perché delle scelte, non solo il cosa fare — questo mi ha convinto a restare costante.' },
  { name: 'Elena, 31 anni', text: 'Quello che apprezzo di più è che il percorso si aggiorna con me: quando qualcosa non funziona, lo diciamo e si cambia.' },
];

const TESTIMONIALS_ROW_1 = TESTIMONIALS.slice(0, 6);
const TESTIMONIALS_ROW_2 = TESTIMONIALS.slice(6, 12);

export default function PercorsiPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const inc = getIncludedContent();

  return (
    <div>
      <Nav />

      <header className="hero percorsi-hero" style={{ paddingTop: 64, paddingBottom: 10 }}>
        <div className="percorsi-kicker">IL METODO</div>
        <h1 style={{ fontSize: 'clamp(38px, 7vw, 68px)' }}>
          Non ti serve<br />un'altra <span className="percorsi-highlight">dieta</span>.
        </h1>
        <p className="sub">Ti serve un metodo che riesca a entrare nella tua vita e rimanerci.</p>

        <div className="trust-row">
          {TRUST_POINTS.map((t) => (
            <div className="trust-pill" key={t.label}>
              <span>{t.icon}</span> {t.label}
            </div>
          ))}
        </div>
      </header>

      <div className="section" style={{ maxWidth: 920 }}>
        <div className="section-head">
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 46px)' }}>Il percorso, in 4 fasi.</h2>
        </div>
        <div className="phases-timeline">
          {PHASES.map((p, i) => (
            <div className="phase-card phase-card-v2" key={p.num}>
              <div className="phase-num-circle">{p.num}</div>
              {i < PHASES.length - 1 && <div className="phase-connector" />}
              <div className="phase-title">{p.title}</div>
              <div className="phase-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section includes-section" style={{ maxWidth: 980 }}>
        <div className="includes-grid">
          <div>
            <div className="section-head" style={{ textAlign: 'left', marginBottom: 24 }}>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}>Cosa include il percorso.</h2>
            </div>
            <div className="includes-list">
              {INCLUDES.map((item) => {
                const text = typeof item === 'string' ? item : item.text;
                return (
                  <div className="includes-row" key={text}>
                    <span className="includes-check">✓</span>
                    <span>
                      {text}
                      {typeof item !== 'string' && (
                        <>
                          {' '}
                          <Link to={item.to} style={{ color: '#3155FF', fontWeight: 600, whiteSpace: 'nowrap' }}>{item.linkLabel}</Link>
                        </>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="includes-visual">
            <div className="includes-visual-num">4</div>
            <div className="includes-visual-label">fasi pensate per durare<br />oltre il percorso stesso</div>
          </div>
        </div>
      </div>

      <div className="section bonus-section" style={{ maxWidth: 1000 }}>
        <div className="section-head" style={{ marginBottom: 8 }}>
          <div className="percorsi-kicker">INCLUSO NEL PERCORSO</div>
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 44px)' }}>Il percorso, e tutto il resto.</h2>
          <p className="sub" style={{ maxWidth: 560, margin: '12px auto 0' }}>
            Quando inizi un percorso ricevi anche i contenuti di Gustoscopio, senza costi aggiuntivi.
          </p>
        </div>

        <div className="bonus-grid">
          <div className="bonus-card">
            <div className="bonus-card-top">
              <span className="bonus-icon">🎬</span>
              <span className="bonus-tag">INCLUSO</span>
            </div>
            <h3>Videocorsi</h3>
            <ul className="bonus-list">
              {inc.courses.map((c) => (
                <li key={c.id}>
                  <strong>{c.title}</strong>
                  {c.totalPlannedVideos ? ` · ${c.totalPlannedVideos} video brevi` : ''}
                </li>
              ))}
            </ul>
            {inc.coursesValue && (
              <div className="bonus-value">
                <span className="bonus-value-num">{inc.courses.reduce((t, c) => t + c.price, 0)}€</span>
                <span className="bonus-value-label">{inc.courses.length === 1 ? 'il prezzo, se lo acquisti da solo' : 'il prezzo, se li acquisti da soli'}</span>
              </div>
            )}
          </div>

          <div className="bonus-card">
            <div className="bonus-card-top">
              <span className="bonus-icon">📘</span>
              <span className="bonus-tag">INCLUSO</span>
            </div>
            <h3>Guide PDF esclusive</h3>
            <ul className="bonus-list">
              {inc.guides.map((g) => (
                <li key={g.id}><strong>{g.title}</strong> · {g.pages} pagine</li>
              ))}
            </ul>
            <div className="bonus-value">
              <span className="bonus-value-num bonus-value-word">Esclusive</span>
              <span className="bonus-value-label">non si trovano in vendita: le ricevi solo con il percorso</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section" style={{ maxWidth: 1100, paddingLeft: 0, paddingRight: 0 }}>
        <div className="section-head" style={{ paddingLeft: 20, paddingRight: 20 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}>Chi lo ha provato</h2>
        </div>
        <div className="testimonial-marquee">
          <div className="testimonial-track">
            {[...TESTIMONIALS_ROW_1, ...TESTIMONIALS_ROW_1].map((t, i) => (
              <div className="testimonial-mini-card" key={i}>
                <div className="testimonial-text-mini">{t.text}</div>
                <div className="testimonial-footer">
                  <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                  <div className="testimonial-name">{t.name}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-track testimonial-track-reverse">
            {[...TESTIMONIALS_ROW_2, ...TESTIMONIALS_ROW_2].map((t, i) => (
              <div className="testimonial-mini-card" key={i}>
                <div className="testimonial-text-mini">{t.text}</div>
                <div className="testimonial-footer">
                  <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                  <div className="testimonial-name">{t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="percorsi-cta-block">
        <div className="percorsi-cta-inner">
          <div className="kicker" style={{ color: 'rgba(255,255,255,0.6)' }}>VUOI PARLARNE?</div>
          <h2 style={{ color: 'white' }}>Scopri qual è il percorso giusto per te.</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)' }}>
            Iniziando un percorso hai anche i videocorsi{inc.coursesValue ? ` (${inc.coursesValue})` : ''} e le guide PDF esclusive, senza costi aggiuntivi.
          </p>
          <div className="cta-perks">
            <span>🎬 Videocorsi</span>
            <span>📘 Guide PDF esclusive</span>
            <span>🤝 Un punto di riferimento</span>
          </div>
          <button className="add-btn percorsi-cta-btn" onClick={() => setModalOpen(true)}>
            Richiedi informazioni →
          </button>
          <p className="cta-note">Nessun impegno: la prima richiesta serve solo a capire da dove partire.</p>
        </div>
      </div>

      <Footer />

      <PercorsiModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
