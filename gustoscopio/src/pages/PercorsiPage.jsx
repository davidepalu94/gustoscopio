import { useState } from 'react';
import Nav from '../components/Nav';
import PercorsiModal from '../components/PercorsiModal';

const PHASES = [
  { num: '01', title: 'Analizziamo', desc: 'Partiamo dalla tua situazione reale: abitudini, obiettivi, vincoli di tempo e di vita quotidiana.' },
  { num: '02', title: 'Costruiamo', desc: 'Un percorso pensato su di te, non un modello standard applicato a chiunque.' },
  { num: '03', title: 'Adattiamo', desc: 'Il percorso si aggiusta nel tempo, in base a come risponde la tua vita reale, non solo la teoria.' },
  { num: '04', title: 'Consolidiamo', desc: 'L\'obiettivo non è un risultato temporaneo, ma un cambiamento che regge nel tempo.' },
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

      <header className="hero" style={{ paddingTop: 70 }}>
        <h1 style={{ fontSize: 'clamp(38px, 7vw, 68px)' }}>Non ti serve<br />un'altra dieta.</h1>
        <p className="sub">Ti serve un metodo che riesca a entrare nella tua vita e rimanerci.</p>
      </header>

      <div className="section" style={{ maxWidth: 900 }}>
        <div className="section-head">
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 46px)' }}>Il percorso, in 4 fasi.</h2>
        </div>
        <div className="phases-grid">
          {PHASES.map((p) => (
            <div className="phase-card" key={p.num}>
              <div className="phase-num">{p.num}</div>
              <div className="phase-title">{p.title}</div>
              <div className="phase-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section" style={{ maxWidth: 900 }}>
        <div className="section-head">
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}>Chi lo ha provato</h2>
        </div>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <div className="testimonial-text">"{t.text}"</div>
              <div className="testimonial-name">{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="teaser" style={{ paddingBottom: 90 }}>
        <div className="kicker">VUOI PARLARNE?</div>
        <h2>Scopri qual è il percorso giusto per te.</h2>
        <p>Nessun impegno: la prima richiesta serve solo a capire da dove partire.</p>
        <button className="add-btn" style={{ marginTop: 24, fontSize: 15, padding: '15px 28px' }} onClick={() => setModalOpen(true)}>
          Richiedi informazioni →
        </button>
      </div>

      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>

      <PercorsiModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
