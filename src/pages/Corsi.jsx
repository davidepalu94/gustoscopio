import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

export default function Corsi() {
  return (
    <div>
      <Nav />
      <div className="corsi-page">
        <header className="corsi-header">
          <h1>Corsi</h1>
        </header>
        <p className="corsi-empty">
          I primi corsi sono in preparazione. Torna presto per scoprirli.
        </p>
        <Link to="/valutazione" className="corsi-login-link">
          Scopri la tua valutazione dello stato nutrizionale →
        </Link>
        <br />
        <Link to="/accedi" className="corsi-login-link">
          Hai già un account? Accedi
        </Link>
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
