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
        <div className="corso-hero corsi-hub-hero">
          <span className="corso-hero-kicker">CORSI</span>
          <h1 className="corso-hero-title">Impara facendo, non leggendo</h1>
          <p className="corso-hero-hook">
            Videocorsi brevi, diretti, collegati agli strumenti veri di
            Gustoscopio — niente teoria fine a sé stessa.
          </p>

          {!loading && (
            user ? (
              <button className="corsi-hub-auth-btn" onClick={signOut}>Esci ({user.email})</button>
            ) : (
              <Link to="/accedi" className="corsi-hub-auth-btn">Accedi</Link>
            )
          )}
        </div>

        <div className="corsi-grid">
          {CORSI.map((corso, i) => {
            const done = countAvailableVideos(corso);
            const total = corso.totalPlannedVideos || done;
            const pct = total ? Math.round((done / total) * 100) : 100;
            return (
              <Link
                key={corso.id}
                to={`/corsi/${corso.id}`}
                className="corso-card"
                style={{ '--card-i': i }}
              >
                <span className="corso-emoji">{corso.coverEmoji}</span>
                <h2>{corso.title}</h2>
                <p>{corso.subtitle}</p>

                {corso.totalPlannedVideos && (
                  <div className="corso-card-progress">
                    <div className="corso-card-progress-bar">
                      <div className="corso-card-progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="corso-card-progress-label">{done} di {total} video</span>
                  </div>
                )}

                <span className="corso-price-badge" style={!corso.salesOpen ? { background: '#575a68' } : undefined}>
                  {corso.salesOpen ? corso.priceLabel : 'Prossimamente'}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
