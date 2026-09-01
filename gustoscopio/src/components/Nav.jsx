import { useState } from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/alimenti', label: 'ALIMENTI' },
  { to: '/ricette', label: 'RICETTE' },
  { to: '/lab', label: 'LAB' },
  { to: '/strumenti', label: 'STRUMENTI' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>GUSTOSCOPIO</Link>

      <div className="nav-links">
        {LINKS.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
      </div>

      <div className="nav-cta nav-cta-desktop">
        <Link to="/percorsi-personalizzati">Percorsi personalizzati →</Link>
      </div>

      <button
        className={`nav-burger ${open ? 'open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
      >
        <span></span><span></span><span></span>
      </button>

      {open && (
        <div className="nav-mobile-menu">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <Link to="/percorsi-personalizzati" className="nav-mobile-cta" onClick={() => setOpen(false)}>
            Percorsi personalizzati →
          </Link>
        </div>
      )}
    </nav>
  );
}
