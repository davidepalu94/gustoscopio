import { Link } from 'react-router-dom';
import { ARTICLES } from '../articles';
import Nav from '../components/Nav';

export default function ArticlesPage() {
  return (
    <div>
      <Nav />
      <div className="section">
        <div className="section-head">
          <h2>Il Lab.</h2>
          <p>Scienza, alimentazione e metabolismo spiegati senza complicazioni.</p>
        </div>
        <div className="article-grid">
          {ARTICLES.map((a) => (
            <Link to={`/articoli/${a.id}`} key={a.id} className="article-card">
              <div className="article-card-emoji">{a.emoji}</div>
              <div className="article-card-category">{a.category.toUpperCase()}</div>
              <div className="article-card-title">{a.title}</div>
              <div className="article-card-excerpt">{a.excerpt}</div>
              <div className="article-card-time">{a.readingTime} min di lettura</div>
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
