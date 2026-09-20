import { Link, useParams } from 'react-router-dom';
import { getGuidaById } from '../guide';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function GuidaPage() {
  const { slug } = useParams();
  const guida = getGuidaById(slug);

  if (!guida) {
    return (
      <div>
        <Nav />
        <div className="corsi-page">
          <p>Guida non trovata.</p>
          <Link to="/guide" className="corsi-login-link">← Torna alle guide</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="corsi-page">
        <Link to="/guide" className="breadcrumb">← Torna alle guide</Link>

        <div className="corso-hero">
          <span className="corso-hero-kicker">GUIDA ESCLUSIVA</span>
          <h1 className="corso-hero-title">{guida.title}</h1>
          <p className="corso-hero-hook">{guida.hook}</p>
          <span className="corso-hero-price">Inclusa nei Percorsi personalizzati</span>
        </div>

        <div className="corso-module-block" style={{ marginBottom: 24 }}>
          <h3>Cosa c'è dentro · {guida.pages} pagine</h3>
          <ol className="guida-chapters">
            {guida.chapters.map((c) => <li key={c}>{c}</li>)}
          </ol>
          <p className="corsi-empty" style={{ marginTop: 12 }}>
            Le informazioni hanno scopo divulgativo e non sostituiscono il parere di un professionista.
          </p>
        </div>

        <div className="corso-panel">
          <h2>Riservata a chi segue un percorso</h2>
          <p>
            Questa guida fa parte del materiale dei Percorsi personalizzati: la ricevi
            insieme al tuo percorso, con un professionista a cui fare domande.
          </p>
          <Link to="/percorsi-personalizzati" className="corso-panel-btn">
            Scopri i Percorsi personalizzati
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
