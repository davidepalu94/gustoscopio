import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getCorsoBySlug, getEmbedUrl, countAvailableVideos } from '../corsi';
import { calculateBMI, calculateEnergyNeeds } from '../calculators';
import { useAuth } from '../AuthContext';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function traduciErroreAuth(msg) {
  if (msg.includes('Invalid login credentials')) return 'Email o password non corrette.';
  if (msg.includes('already registered') || msg.includes('User already registered')) return 'Esiste già un account con questa email — prova ad accedere.';
  if (msg.includes('Password should be')) return 'La password deve avere almeno 6 caratteri.';
  return 'Qualcosa è andato storto. Riprova.';
}

export default function CorsoPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const corso = getCorsoBySlug(slug);
  const { user, loading: authLoading, hasPurchased, signIn, signUp } = useAuth();

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

  const [authMode, setAuthMode] = useState('registrati'); // 'accedi' | 'registrati'
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(null);
  const [authInfo, setAuthInfo] = useState(null);
  const [authBusy, setAuthBusy] = useState(false);

  const emailsMatch = authMode === 'accedi' || (email.length > 0 && email === emailConfirm);
  const emailConfirmTouched = emailConfirm.length > 0;
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const canSubmitAuth = authMode === 'accedi' || (emailsMatch && privacyAccepted);

  const bmi = useMemo(
    () => calculateBMI({ weightKg: +weightKg, heightCm: +heightCm }),
    [weightKg, heightCm]
  );
  const energy = useMemo(
    () => calculateEnergyNeeds({ age: +age, sex, weightKg: +weightKg, heightCm: +heightCm, activityLevel: 'sedentario' }),
    [age, sex, weightKg, heightCm]
  );

  async function handleAuthSubmit(e) {
    e.preventDefault();
    setAuthError(null);
    setAuthInfo(null);
    setAuthBusy(true);

    const { error } =
      authMode === 'accedi' ? await signIn(email, password) : await signUp(email, password);

    setAuthBusy(false);

    if (error) {
      setAuthError(traduciErroreAuth(error.message));
      return;
    }

    if (authMode === 'registrati') {
      // Con la conferma email disattivata, AuthContext si aggiorna da solo
      // non appena la sessione è pronta, e questo pannello sparisce.
      setAuthInfo('Un momento...');
    }
  }

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

        <div className="corso-hero">
          <span className="corso-hero-kicker">VIDEOCORSO</span>
          <h1 className="corso-hero-title">{corso.title}</h1>
          {corso.hook && <p className="corso-hero-hook">{corso.hook}</p>}
          <span className="corso-hero-price">{corso.priceLabel}</span>

          {corso.highlights && (
            <div className="corso-highlights-row">
              {corso.highlights.map((h, i) => (
                <div className="corso-highlight-chip" key={i} style={{ '--chip-i': i }}>
                  <span className="corso-highlight-icon">{h.icon}</span>
                  <span>{h.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {!corso.salesOpen ? (
          <div className="corso-panel" key="in-arrivo">
            <h2>In arrivo</h2>
            <p>
              {countAvailableVideos(corso)} di {corso.totalPlannedVideos} video sono già pronti.
              Il corso sarà acquistabile appena sarà completo — torna a trovarci presto.
            </p>
          </div>
        ) : authLoading || checkingPurchase ? (
          <p className="corsi-empty">Verifica accesso...</p>
        ) : !user ? (
          <div className="corso-panel" style={{ maxWidth: 400 }} key={authMode}>
            <h2>{authMode === 'accedi' ? 'Accedi per continuare' : 'Crea il tuo account per continuare'}</h2>
            <p>
              {authMode === 'accedi'
                ? 'Accedi per vedere la tua valutazione e acquistare.'
                : 'Bastano email e password — entri subito, senza dover confermare nulla via mail.'}
            </p>

            <form onSubmit={handleAuthSubmit} className="login-form" style={{ textAlign: 'left' }}>
              <label>
                <span>Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
              </label>

              {authMode === 'registrati' && (
                <label>
                  <span>Conferma email</span>
                  <input
                    type="email"
                    value={emailConfirm}
                    onChange={(e) => setEmailConfirm(e.target.value)}
                    required
                    autoComplete="email"
                    onPaste={(e) => e.preventDefault()}
                  />
                  {emailConfirmTouched && !emailsMatch && (
                    <span style={{ color: '#C94B3C', fontSize: 12.5, fontWeight: 600 }}>
                      Le due email non coincidono.
                    </span>
                  )}
                </label>
              )}

              {emailsMatch && (
                <label>
                  <span>Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete={authMode === 'accedi' ? 'current-password' : 'new-password'}
                  />
                </label>
              )}

              {authMode === 'registrati' && (
                <label style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, fontWeight: 400 }}>
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    style={{ width: 'auto', marginTop: 3 }}
                    required
                  />
                  <span style={{ fontSize: 13, fontWeight: 400, color: '#575a68' }}>
                    Ho letto e accetto la{' '}
                    <Link to="/privacy" target="_blank" style={{ color: '#3155FF' }}>Privacy Policy</Link>.
                  </span>
                </label>
              )}

              {authError && <p className="login-error">{authError}</p>}
              {authInfo && <p className="login-info">{authInfo}</p>}

              <button type="submit" className="login-submit" disabled={authBusy || !canSubmitAuth}>
                {authBusy ? 'Un momento...' : authMode === 'accedi' ? 'Accedi' : 'Continua'}
              </button>
            </form>

            <button
              type="button"
              className="login-toggle"
              onClick={() => {
                setAuthMode(authMode === 'accedi' ? 'registrati' : 'accedi');
                setAuthError(null);
                setAuthInfo(null);
                setEmailConfirm('');
              }}
              style={{ color: '#3155FF' }}
            >
              {authMode === 'accedi' ? 'Non hai un account? Registrati' : 'Hai già un account? Accedi'}
            </button>
          </div>
        ) : !purchased ? (
          <div className="corso-panel" style={{ maxWidth: 560 }} key="valutazione">
            <h2>Prima, la tua valutazione rapida</h2>
            <p>
              Inserisci qualche dato per vedere subito BMI e metabolismo
              basale stimati — fanno parte della valutazione inclusa
              nell'acquisto.
            </p>

            <div className="calc-form" style={{ textAlign: 'left', marginBottom: 20 }}>
              <label className="calc-field">
                <span>Età</span>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} min={14} max={100} />
              </label>
              <label className="calc-field">
                <span>Sesso</span>
                <select value={sex} onChange={(e) => setSex(e.target.value)}>
                  <option value="M">Uomo</option>
                  <option value="F">Donna</option>
                </select>
              </label>
              <label className="calc-field">
                <span>Peso (kg)</span>
                <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} min={30} max={250} />
              </label>
              <label className="calc-field">
                <span>Altezza (cm)</span>
                <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} min={120} max={230} />
              </label>
            </div>

            <div className="corso-video-list" style={{ marginBottom: 22 }}>
              <div className="calc-result-box">
                <div className="calc-result-box-lbl">📏 BMI</div>
                <div className="calc-result-box-val" key={`bmi-${bmi.bmi}`}>{bmi.bmi} · {bmi.category}</div>
              </div>
              <div className="calc-result-box" style={{ marginTop: 8 }}>
                <div className="calc-result-box-lbl">🔥 METABOLISMO BASALE</div>
                <div className="calc-result-box-val" key={`bmr-${energy.bmr}`}>{energy.bmr} kcal / giorno</div>
              </div>
            </div>

            <p style={{ fontSize: 12.5, color: '#575a68', marginBottom: 22 }}>
              Stime automatiche a scopo informativo. La valutazione scritta
              da un biologo nutrizionista arriva dopo l'acquisto.
            </p>

            {buyError && <p className="login-error" style={{ marginBottom: 12 }}>{buyError}</p>}
            <button
              className="corso-panel-btn"
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
              <div className="corso-player-frame">
                <div className="corso-player-header">
                  <span className="corso-player-header-logo">GUSTOSCOPIO</span>
                  <span style={{ opacity: 0.6, fontSize: 13 }}>· {activeVideo.title}</span>
                </div>
                <div className="corso-player-wrap">
                  <iframe
                    src={getEmbedUrl(activeVideo)}
                    loading="lazy"
                    style={{ border: 0, width: '100%', height: '100%' }}
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    title={activeVideo.title}
                  />
                </div>
              </div>
            )}

            <div className="corso-modules">
              {corso.totalPlannedVideos && (
                <p className="corsi-empty" style={{ margin: '0 0 4px' }}>
                  {countAvailableVideos(corso)} di {corso.totalPlannedVideos} video disponibili — nuovi contenuti in arrivo, già inclusi nell'acquisto.
                </p>
              )}
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
      <Footer />
    </div>
  );
}
