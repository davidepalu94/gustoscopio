import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Nav from '../components/Nav';

export default function Login() {
  const [mode, setMode] = useState('accedi'); // 'accedi' | 'registrati'
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [busy, setBusy] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const emailsMatch = mode === 'accedi' || (email.length > 0 && email === emailConfirm);
  const emailConfirmTouched = emailConfirm.length > 0;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);

    const { error } =
      mode === 'accedi'
        ? await signIn(email, password)
        : await signUp(email, password);

    setBusy(false);

    if (error) {
      setError(traduciErrore(error.message));
      return;
    }

    navigate('/corsi');
  }

  return (
    <div>
      <Nav />
      <div className="login-page">
        <div className="login-card">
          <h1>{mode === 'accedi' ? 'Accedi' : 'Crea il tuo account'}</h1>
          <p className="login-subtitle">
            {mode === 'accedi'
              ? 'Entra per accedere ai tuoi corsi.'
              : 'Registrati per acquistare e accedere ai corsi.'}
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </label>

            {mode === 'registrati' && (
              <label>
                Conferma email
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
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete={mode === 'accedi' ? 'current-password' : 'new-password'}
                />
              </label>
            )}

            {error && <p className="login-error">{error}</p>}
            {info && <p className="login-info">{info}</p>}

            <button type="submit" className="login-submit" disabled={busy || !emailsMatch}>
              {busy ? 'Un momento...' : mode === 'accedi' ? 'Accedi' : 'Registrati'}
            </button>
          </form>

          <button
            type="button"
            className="login-toggle"
            onClick={() => {
              setMode(mode === 'accedi' ? 'registrati' : 'accedi');
              setError(null);
              setInfo(null);
              setEmailConfirm('');
            }}
          >
            {mode === 'accedi'
              ? 'Non hai un account? Registrati'
              : 'Hai già un account? Accedi'}
          </button>
        </div>
      </div>
    </div>
  );
}

function traduciErrore(msg) {
  if (msg.includes('Invalid login credentials')) {
    return 'Email o password non corrette.';
  }
  if (msg.includes('already registered') || msg.includes('User already registered')) {
    return 'Esiste già un account con questa email.';
  }
  if (msg.includes('Password should be')) {
    return 'La password deve avere almeno 6 caratteri.';
  }
  return 'Qualcosa è andato storto. Riprova.';
}
