import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ARTICLES } from '../articles';
import { FOODS } from '../foods';
import Nav from '../components/Nav';
import InlineQuiz from '../components/InlineQuiz';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.id === slug);

  if (!article) {
    return (
      <div>
        <Nav />
        <div className="section" style={{ textAlign: 'center' }}>
          <h2>Articolo non trovato</h2>
          <Link to="/articoli" className="teaser-cta" style={{ marginTop: 20, display: 'inline-block' }}>← Torna al Lab</Link>
        </div>
      </div>
    );
  }

  const related = ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <div>
      <Nav />
      <div className="section" style={{ maxWidth: 700 }}>
        <Link to="/articoli" className="breadcrumb">← Torna al Lab</Link>

        <div className="article-header">
          <div className="article-header-category">{article.category.toUpperCase()} · {article.readingTime} MIN DI LETTURA</div>
          <h1 className="article-header-title">{article.title}</h1>
        </div>

        <div className="article-body">
          {article.blocks.map((block, i) => {
            if (block.type === 'quickAnswer') {
              return (
                <div className="in-breve-box" key={i}>
                  <div className="in-breve-label">IN BREVE</div>
                  <div className="in-breve-text">{block.text}</div>
                </div>
              );
            }
            if (block.type === 'paragraph') {
              return <p className="article-paragraph" key={i}>{block.text}</p>;
            }
            if (block.type === 'quiz') {
              return <InlineQuiz key={i} {...block} />;
            }
            if (block.type === 'foodLink') {
              const food = FOODS.find((f) => f.id === block.foodId);
              if (!food) return null;
              return (
                <Link to={`/alimenti/${food.id}`} key={i} className="content-link-card">
                  <span style={{ fontSize: 22 }}>{food.emoji}</span>
                  <span>{block.label}</span>
                  <span className="content-link-arrow">→</span>
                </Link>
              );
            }
            if (block.type === 'toolLink') {
              return (
                <Link to={block.to} key={i} className="content-link-card">
                  <span style={{ fontSize: 22 }}>🛠️</span>
                  <span>{block.label}</span>
                  <span className="content-link-arrow">→</span>
                </Link>
              );
            }
            return null;
          })}
        </div>

        {related.length > 0 && (
          <div className="panel-block">
            <h3 className="panel-title">Potrebbe interessarti</h3>
            <div className="related-grid">
              {related.map((a) => (
                <Link to={`/articoli/${a.id}`} key={a.id} className="related-card">
                  <span style={{ fontSize: 22 }}>{a.emoji}</span>
                  <span className="related-name">{a.title}</span>
                  <span className="related-kcal">{a.readingTime} min</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
