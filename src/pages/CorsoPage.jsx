import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCorsoBySlug, getBunnyEmbedUrl } from '../corsi';
import Nav from '../components/Nav';

export default function CorsoPage() {
  const { slug } = useParams();
  const corso = getCorsoBySlug(slug);
  const [activeVideo, setActiveVideo] = useState(
    corso?.modules?.[0]?.videos?.[0] ?? null
  );

  if (!corso) {
    return (
      <div>
        <Nav />
        <div className="corsi-page">
          <p>Corso non trovato.</p>
          <Link to="/corsi" className="corsi-login-link">← Torna ai corsi</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="corsi-page">
        <Link to="/corsi" className="breadcrumb">← Torna ai corsi</Link>

        <header className="corsi-header" style={{ marginTop: 16 }}>
          <div>
            <h1>{corso.title}</h1>
            <p className="corsi-empty">{corso.subtitle}</p>
          </div>
          <span className="corso-price-badge">{corso.priceLabel}</span>
        </header>

        {activeVideo && (
          <div className="corso-player-wrap">
            <iframe
              src={getBunnyEmbedUrl(activeVideo.id)}
              loading="lazy"
              style={{ border: 0, width: '100%', height: '100%' }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title={activeVideo.title}
            />
          </div>
        )}

        <div className="corso-modules">
          {corso.modules.map((modulo) => (
            <div key={modulo.id} className="corso-module-block">
              <h3>{modulo.title}</h3>
              {modulo.comingSoon || modulo.videos.length === 0 ? (
                <p className="corsi-empty">In preparazione.</p>
              ) : (
                <ul className="corso-video-list">
                  {modulo.videos.map((video) => (
                    <li key={video.id}>
                      <button
                        className={`corso-video-btn ${activeVideo?.id === video.id ? 'active' : ''}`}
                        onClick={() => setActiveVideo(video)}
                      >
                        {video.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
