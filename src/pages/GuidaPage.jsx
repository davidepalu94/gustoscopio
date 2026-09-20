import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getGuidaById } from '../guide';
import { useAuth } from '../AuthContext';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function GuidaPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const guida = getGuidaById(slug);
  const { user, session, loading: authLoading, hasPurchased } = useAuth();

  const [purchased, setPurchased] = useState(false);
  const [checking, setChecking] = useState(true);
  const [buying, setBuying] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);

  const checkPurchase = useCallback(async () => {
    if (!user || !guida) {
      setPurchased(false);
      setChecking(false);
      return false;
    }
    const ok = await hasPurchased(guida.id);
    setPurchased(ok);
    setChecking(false);
    return ok;
  }, [user, guida, hasPurchased]);

  useEffect(() => {
    if (authLoading) return;
    checkPurchase();
  }, [authLoading, checkPurchase]);

  // Di ritorno da Stripe il webhook può impiegare un istante: ricontrolliamo qualche volta.
  useEffect(() => {
    if (searchParams.get('acquisto') !== 'ok') return;
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts += 1;
      const ok = await checkPurchase();
      if (ok || attempts >= 6) clearInterval(interval);
    }, 2000);
    return () => clearInterval(interval);
  }, [searchParams, checkPurchase]);

  async function handleBuy() {
    if (!guida || !user) return;
    setBuying(true);
    setError(null);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'guida',
          courseId: guida.id,
          courseTitle: guida.title,
          priceEur: guida.price,
          userId: user.id,
          userEmail: user.email,
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError('Non è stato possibile avviare il pagamento. Riprova.');
    } catch {
      setError('Non è stato possibile avviare il pagamento. Riprova.');
    } finally {
      setBuying(false);
    }
  }

  async function handleDownload() {
    if (!guida || !session) return;
    setDownloading(true);
    setError(null);
    try {
      const res = await fetch('/api/guide-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ guideId: guida.id }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || 'Non è stato possibile scaricare la guida. Riprova.');
    } catch {
      setError('Non è stato possibile scaricare la guida. Riprova.');
    } finally {
      setDownloading(false);
    }
  }

  if (!guida) {
    return (
      <div>
        <Nav />
        <div className="corsi-page">
          <p>Guida non trovata.</p>
          <Link to="/guide" className="corsi-login-link">← Torna alle guide</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="corsi-page">
        <Link to="/guide" className="breadcrumb">← Torna alle guide</Link>

        <div className="corso-hero">
          <span className="corso-hero-kicker">GUIDA PDF</span>
          <h1 className="corso-hero-title">{guida.title}</h1>
          <p className="corso-hero-hook">{guida.hook}</p>
          {guida.salesOpen && <span className="corso-hero-price">{guida.priceLabel}</span>}
        </div>

        <div className="corso-module-block" style={{ marginBottom: 24 }}>
          <h3>Cosa c'è dentro · {guida.pages} pagine</h3>
          <ol className="guida-chapters">
            {guida.chapters.map((c) => <li key={c}>{c}</li>)}
          </ol>
          <p className="corsi-empty" style={{ marginTop: 12 }}>
            Le informazioni hanno scopo divulgativo e non sostituiscono il parere di un professionista.
          </p>
        </div>

        {!guida.salesOpen ? (
          <div className="corso-panel">
            <h2>In arrivo</h2>
            <p>Questa guida sarà acquistabile a breve. Torna a trovarci presto.</p>
          </div>
        ) : authLoading || checking ? (
          <p className="corsi-empty">Verifica accesso...</p>
        ) : !user ? (
          <div className="corso-panel">
            <h2>Accedi per continuare</h2>
            <p>Serve un account gratuito per acquistare e ritrovare la guida quando vuoi.</p>
            <Link to={`/accedi?next=/guide/${guida.id}`} className="corso-panel-btn">
              Accedi o registrati
            </Link>
          </div>
        ) : !purchased ? (
          <div className="corso-panel">
            <h2>{guida.priceLabel}</h2>
            <p>Pagamento unico. Dopo l'acquisto scarichi il PDF da questa pagina, quando vuoi.</p>
            {error && <p className="login-error" style={{ marginBottom: 12 }}>{error}</p>}
            <button
              className="corso-panel-btn"
              onClick={handleBuy}
              disabled={buying}
              style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              {buying ? 'Un momento...' : `Acquista — ${guida.priceLabel}`}
            </button>
          </div>
        ) : (
          <div className="corso-panel">
            <h2>La guida è tua</h2>
            <p>Uso personale: il PDF non può essere copiato, rivenduto o ridistribuito.</p>
            {error && <p className="login-error" style={{ marginBottom: 12 }}>{error}</p>}
            <button
              className="corso-panel-btn"
              onClick={handleDownload}
              disabled={downloading}
              style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              {downloading ? 'Un momento...' : 'Scarica il PDF'}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
