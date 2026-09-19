import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

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
        <div className="corso-hero corsi-hub-hero">
          <span className="corso-hero-kicker">IL LAB</span>
          <h1 className="corso-hero-title">Metti alla prova quello che sai</h1>
          <p className="corso-hero-hook">
            Strumenti interattivi per esplorare la nutrizione, non solo
            per leggerla.
          </p>
        </div>
        <div className="tools-grid">
          {LAB_TOOLS.map((t, i) => (
            <Link to={t.to} key={t.title} className="tool-card" style={{ '--card-i': i }}>
              <div className="tool-icon">{t.icon}</div>
              <div className="tool-title">{t.title}</div>
              <div className="tool-desc">{t.desc}</div>
              <div className="tool-cta">Prova <span className="tool-cta-arrow">→</span></div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
