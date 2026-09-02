import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function RequirePremium({ children }) {
  const { user, isPremium, loading } = useAuth();

  if (loading) {
    return (
      <div className="premium-gate">
        <p className="premium-gate-loading">Verifica accesso...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="premium-gate">
        <h2>Contenuto riservato</h2>
        <p>Accedi con il tuo account per continuare.</p>
        <Link to="/accedi" className="premium-gate-btn premium-gate-btn-primary">
          Accedi
        </Link>
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="premium-gate">
        <h2>I corsi fanno parte dei Percorsi Personalizzati</h2>
        <p>
          Se hai già acquistato un Percorso e non vedi ancora i contenuti,
          scrivici e verifichiamo insieme.
        </p>
        <Link to="/percorsi-personalizzati" className="premium-gate-btn premium-gate-btn-secondary">
          Scopri i Percorsi Personalizzati
        </Link>
      </div>
    );
  }

  return children;
}
