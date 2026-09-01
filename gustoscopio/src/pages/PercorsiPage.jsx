import { useState } from 'react';
import Nav from '../components/Nav';
import PercorsiModal from '../components/PercorsiModal';

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
  'Possibilità di aggiungere scheda di allenamento e materiali extra',
];

const TESTIMONIALS = [
  { name: 'Marco, 34 anni', text: 'Avevo già provato diete rigide che duravano poche settimane. Qui il percorso si è adattato a me, non il contrario.' },
  { name: 'Giulia, 41 anni', text: 'Quello che mi ha convinta è stato non sentirmi giudicata per nessuna scelta alimentare, solo accompagnata.' },
  { name: 'Luca, 28 anni', text: 'Utile soprattutto la parte di adattamento: la mia vita è cambiata a metà percorso e il piano si è aggiustato con me.' },
];

export default function PercorsiPage() {
  const [modalOpen, setModalOpen] = useState(false);

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
              {INCLUDES.map((item) => (
                <div className="includes-row" key={item}>
                  <span className="includes-check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="includes-visual">
            <div className="includes-visual-num">4</div>
            <div className="includes-visual-label">fasi pensate per durare<br />oltre il percorso stesso</div>
          </div>
        </div>
      </div>

      <div className="section" style={{ maxWidth: 920 }}>
        <div className="section-head">
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}>Chi lo ha provato</h2>
        </div>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((t) => (
            <div className="testimonial-card testimonial-card-v2" key={t.name}>
              <div className="testimonial-quote-mark">"</div>
              <div className="testimonial-text">{t.text}</div>
              <div className="testimonial-name">{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="percorsi-cta-block">
        <div className="percorsi-cta-inner">
          <div className="kicker" style={{ color: 'rgba(255,255,255,0.6)' }}>VUOI PARLARNE?</div>
          <h2 style={{ color: 'white' }}>Scopri qual è il percorso giusto per te.</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)' }}>Nessun impegno: la prima richiesta serve solo a capire da dove partire.</p>
          <button className="add-btn percorsi-cta-btn" onClick={() => setModalOpen(true)}>
            Richiedi informazioni →
          </button>
        </div>
      </div>

      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>

      <PercorsiModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
