import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

const TOOLS = [
  { icon: '🔥', title: 'Fabbisogno calorico', desc: 'Scopri una stima del tuo dispendio energetico giornaliero.', to: '/strumenti/fabbisogno', cta: 'Inizia' },
  { icon: '💪', title: 'Proteine', desc: 'Scopri un intervallo indicativo in base a peso e attività.', to: '/strumenti/proteine', cta: 'Calcola' },
  { icon: '🍽️', title: 'Costruisci il piatto', desc: 'Componi un pasto e scopri kcal e macronutrienti in tempo reale.', to: '/#plate-builder', cta: 'Inizia' },
  { icon: '⚖️', title: 'BMI', desc: 'Calcola il tuo indice di massa corporea.', to: '/strumenti/bmi', cta: 'Calcola' },
  { icon: '💧', title: 'Fabbisogno idrico', desc: 'Stima quanta acqua ti serve al giorno, in base a peso, attività e clima.', to: '/strumenti/fabbisogno-idrico', cta: 'Calcola' },
  { icon: '📏', title: 'Quanto pesa una porzione?', desc: 'Scopri il peso di riferimento di una porzione per ogni categoria di alimento.', to: '/strumenti/porzioni', cta: 'Scopri' },
];

export default function StrumentiPage() {
  return (
    <div>
      <Nav />
      <div className="section">
        <div className="section-head">
          <h2>Strumenti.</h2>
          <p>Calcolatori semplici, basati su formule note, per orientarti — non per sostituire un professionista.</p>
        </div>
        <div className="tools-grid">
          {TOOLS.map((t) => (
            <Link to={t.to} key={t.title} className="tool-card">
              <div className="tool-icon">{t.icon}</div>
              <div className="tool-title">{t.title}</div>
              <div className="tool-desc">{t.desc}</div>
              <div className="tool-cta">{t.cta} →</div>
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
