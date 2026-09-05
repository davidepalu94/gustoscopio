import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getCorsoBySlug, getBunnyEmbedUrl } from '../corsi';
import { calculateBMI, calculateEnergyNeeds } from '../calculators';
import { useAuth } from '../AuthContext';
import Nav from '../components/Nav';

export default function CorsoPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const corso = getCorsoBySlug(slug);
  const { user, loading: authLoading, hasPurchased } = useAuth();

  const [purchased, setPurchased] = useState(false);
  const [checkingPurchase, setCheckingPurchase] = useState(true);
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState(null);
  const [activeVideo, setActiveVideo] = useState(
    corso?.modules?.[0]?.videos?.[0] ?? null
  );

  const [age, setAge] = useState(30);
  const [sex, setSex] = useState('M');
  const [weightKg, setWeightKg] = useState(70);
  const [heightCm, setHeightCm] = useState(175);

  const bmi = useMemo(
    () => calculateBMI({ weightKg: +weightKg, heightCm: +heightCm }),
    [weightKg, heightCm]
  );
  const energy = useMemo(
    () => calculateEnergyNeeds({ age: +age, sex, weightKg: +weightKg, heightCm: +heightCm, activityLevel: 'sedentario' }),
    [age, sex, weightKg, heightCm]
  );

  const checkPurchase = useCallback(async () => {
    if (!user || !corso) {
      setPurchased(false);
      setCheckingPurchase(false);
      return false;
    }
    const result = await hasPurchased(corso.id);
    setPurchased(result);
    setCheckingPurchase(false);
    return result;
  }, [user, corso, hasPurchased]);

  useEffect(() => {
    if (authLoading) return;
    checkPurchase();
  }, [authLoading, checkPurchase]);

  // Se torniamo da Stripe con ?acquisto=ok, il webhook potrebbe impiegare
  // un istante a registrare l'acquisto: ricontrolliamo qualche volta.
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
    if (!corso || !user) return;
    setBuying(true);
    setBuyError(null);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: corso.id,
          courseTitle: corso.title,
          priceEur: corso.price,
          userId: user.id,
          userEmail: user.email,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setBuyError('Non è stato possibile avviare il pagamento. Riprova.');
      }
    } catch (err) {
      setBuyError('Non è stato possibile avviare il pagamento. Riprova.');
    } finally {
      setBuying(false);
    }
  }

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

        {authLoading || checkingPurchase ? (
          <p className="corsi-empty">Verifica accesso...</p>
        ) : !user ? (
          <div className="premium-gate">
            <h2>Accedi per acquistare</h2>
            <p>Serve un account per comprare e guardare questo corso.</p>
            <Link to="/accedi" className="premium-gate-btn premium-gate-btn-primary">Accedi</Link>
          </div>
        ) : !purchased ? (
          <div className="premium-gate" style={{ maxWidth: 560 }}>
            <h2>Prima, la tua valutazione rapida</h2>
            <p>
              Inserisci qualche dato per vedere subito BMI e metabolismo
              basale stimati — fanno parte della valutazione inclusa
              nell'acquisto.
            </p>

            <div className="calc-form" style={{ textAlign: 'left', marginBottom: 20 }}>
              <label className="calc-field">
                <span style={{ color: 'rgba(248,247,243,0.75)' }}>Età</span>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} min={14} max={100} />
              </label>
              <label className="calc-field">
                <span style={{ color: 'rgba(248,247,243,0.75)' }}>Sesso</span>
                <select value={sex} onChange={(e) => setSex(e.target.value)}>
                  <option value="M">Uomo</option>
                  <option value="F">Donna</option>
                </select>
              </label>
              <label className="calc-field">
                <span style={{ color: 'rgba(248,247,243,0.75)' }}>Peso (kg)</span>
                <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} min={30} max={250} />
              </label>
              <label className="calc-field">
                <span style={{ color: 'rgba(248,247,243,0.75)' }}>Altezza (cm)</span>
                <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} min={120} max={230} />
              </label>
            </div>

            <div className="corso-video-list" style={{ marginBottom: 22 }}>
              <div className="calc-result-box">
                <div className="calc-result-box-lbl">📏 BMI</div>
                <div className="calc-result-box-val">{bmi.bmi} · {bmi.category}</div>
              </div>
              <div className="calc-result-box" style={{ marginTop: 8 }}>
                <div className="calc-result-box-lbl">🔥 METABOLISMO BASALE</div>
                <div className="calc-result-box-val">{energy.bmr} kcal / giorno</div>
              </div>
            </div>

            <p style={{ fontSize: 12.5, color: 'rgba(248,247,243,0.6)', marginBottom: 22 }}>
              Stime automatiche a scopo informativo. La valutazione scritta
              da un biologo nutrizionista arriva dopo l'acquisto.
            </p>

            {buyError && <p className="login-error" style={{ marginBottom: 12 }}>{buyError}</p>}
            <button
              className="premium-gate-btn premium-gate-btn-primary"
              onClick={handleBuy}
              disabled={buying}
              style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              {buying ? 'Un momento...' : `Acquista — ${corso.priceLabel}`}
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
