import { Link } from 'react-router-dom';
import { GUIDE } from '../guide';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Guide() {
  return (
    <div>
      <Nav />
      <div className="corsi-page">
        <div className="corso-hero corsi-hub-hero">
          <span className="corso-hero-kicker">GUIDE PDF</span>
          <h1 className="corso-hero-title">Approfondisci, con calma</h1>
          <p className="corso-hero-hook">
            Guide pratiche da leggere, stampare e compilare. Costruite sugli
            stessi dati degli strumenti di Gustoscopio: niente teoria fine a sé stessa.
          </p>
        </div>

        <div className="corsi-grid">
          {GUIDE.map((g, i) => (
            <Link key={g.id} to={`/guide/${g.id}`} className="corso-card" style={{ '--card-i': i }}>
              <span className="corso-emoji">{g.coverEmoji}</span>
              <h2>{g.title}</h2>
              <p>{g.subtitle}</p>
              <p style={{ marginTop: 10, fontSize: 12.5 }}>{g.pages} pagine · PDF</p>
              <span
                className="corso-price-badge"
                style={!g.salesOpen ? { background: '#575a68' } : undefined}
              >
                {g.salesOpen ? g.priceLabel : 'Prossimamente'}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
