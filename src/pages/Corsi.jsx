import { Link } from 'react-router-dom';
import { CORSI, countAvailableVideos } from '../corsi';
import { useAuth } from '../AuthContext';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

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
              {corso.totalPlannedVideos && (
                <p style={{ fontSize: 12.5, color: '#3155FF', fontWeight: 600, margin: '4px 0 0' }}>
                  {countAvailableVideos(corso)} di {corso.totalPlannedVideos} video disponibili
                </p>
              )}
              <span className="corso-price-badge" style={!corso.salesOpen ? { background: '#575a68' } : undefined}>
                {corso.salesOpen ? corso.priceLabel : 'Prossimamente'}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
