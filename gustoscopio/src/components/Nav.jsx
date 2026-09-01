import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">GUSTOSCOPIO</Link>
      <div className="nav-links">
        <span>ALIMENTI</span>
        <Link to="/ricette">RICETTE</Link>
        <Link to="/confronta">LAB</Link>
        <Link to="/strumenti">STRUMENTI</Link>
      </div>
      <div className="nav-cta">Percorsi personalizzati →</div>
    </nav>
  );
}
