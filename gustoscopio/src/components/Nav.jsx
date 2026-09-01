import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">GUSTOSCOPIO</Link>
      <div className="nav-links">
        <span>ALIMENTI</span>
        <span>RICETTE</span>
        <span>LAB</span>
        <span>STRUMENTI</span>
      </div>
      <div className="nav-cta">Percorsi personalizzati →</div>
    </nav>
  );
}
