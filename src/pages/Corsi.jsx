import { Link } from 'react-router-dom';

export default function Corsi() {
  return (
    <div className="corsi-page">
      <header className="corsi-header">
        <h1>Corsi</h1>
      </header>
      <p className="corsi-empty">
        I primi corsi sono in preparazione. Torna presto per scoprirli.
      </p>
      <Link to="/accedi" className="corsi-login-link">
        Hai già un account? Accedi
      </Link>
    </div>
  );
}
