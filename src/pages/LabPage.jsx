import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

const LAB_TOOLS = [
  { icon: '⚔️', title: 'Food Battle', desc: 'Confronta due alimenti su kcal, proteine, carboidrati, grassi e fibre.', to: '/confronta' },
  { icon: '🧠', title: 'Mito o Verità', desc: 'Metti alla prova quello che pensi di sapere sulla nutrizione.', to: '/mito-o-verita' },
  { icon: '📖', title: 'Articoli', desc: 'Scienza, alimentazione e metabolismo spiegati senza complicazioni.', to: '/articoli' },
];

export default function LabPage() {
  return (
    <div>
      <Nav />
      <div className="section">
        <div className="section-head">
          <h2>Il Lab.</h2>
          <p>Strumenti interattivi per esplorare la nutrizione, non solo per leggerla.</p>
        </div>
        <div className="tools-grid">
          {LAB_TOOLS.map((t) => (
            <Link to={t.to} key={t.title} className="tool-card">
              <div className="tool-icon">{t.icon}</div>
              <div className="tool-title">{t.title}</div>
              <div className="tool-desc">{t.desc}</div>
              <div className="tool-cta">Prova →</div>
            </Link>
          ))}
        </div>
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
