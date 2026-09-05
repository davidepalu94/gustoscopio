import { Link } from 'react-router-dom';
import { CORSI } from '../corsi';
import { useAuth } from '../AuthContext';
import Nav from '../components/Nav';

export default function Corsi() {
  const { user, signOut, loading } = useAuth();

  return (
    <div>
      <Nav />
      <div className="corsi-page">
        <header className="corsi-header">
          <h1>Corsi</h1>
          {!loading && (
            user ? (
              <button className="corsi-logout" onClick={signOut}>Esci ({user.email})</button>
            ) : (
              <Link to="/accedi" className="corsi-login-link" style={{ marginTop: 0 }}>
                Accedi
              </Link>
            )
          )}
        </header>

        <div className="corsi-grid">
          {CORSI.map((corso) => (
            <Link key={corso.id} to={`/corsi/${corso.id}`} className="corso-card">
              <span className="corso-emoji">{corso.coverEmoji}</span>
              <h2>{corso.title}</h2>
              <p>{corso.subtitle}</p>
              <span className="corso-price-badge">{corso.priceLabel}</span>
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
