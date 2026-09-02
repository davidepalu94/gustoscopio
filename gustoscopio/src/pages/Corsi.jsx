import { Link } from 'react-router-dom';
import { CORSI } from '../corsi';
import { useAuth } from '../AuthContext';

export default function Corsi() {
  const { signOut } = useAuth();

  return (
    <div className="corsi-page">
      <header className="corsi-header">
        <h1>I tuoi corsi</h1>
        <button className="corsi-logout" onClick={signOut}>
          Esci
        </button>
      </header>

      {CORSI.length === 0 ? (
        <p className="corsi-empty">
          I primi corsi sono in preparazione. Torna presto.
        </p>
      ) : (
        <div className="corsi-grid">
          {CORSI.map((corso) => (
            <Link key={corso.id} to={`/corsi/${corso.id}`} className="corso-card">
              <span className="corso-emoji">{corso.coverEmoji}</span>
              <h2>{corso.title}</h2>
              <p>{corso.subtitle}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
