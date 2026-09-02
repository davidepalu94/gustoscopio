import { useState } from 'react';

export default function Login() {
  const [mode, setMode] = useState('accedi'); // 'accedi' | 'registrati'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    // In questo passo il form non è ancora collegato a nulla:
    // serve solo per vedere e testare l'interfaccia online.
    // Il collegamento vero arriva nel prossimo passo.
    setMessage('Accesso non ancora attivo: stiamo completando questa parte.');
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>{mode === 'accedi' ? 'Accedi' : 'Crea il tuo account'}</h1>
        <p className="login-subtitle">
          {mode === 'accedi'
            ? 'Entra per accedere ai tuoi corsi.'
            : 'Serve un account solo se hai già un Percorso Personalizzato attivo.'}
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

          {message && <p className="login-info">{message}</p>}

          <button type="submit" className="login-submit">
            {mode === 'accedi' ? 'Accedi' : 'Registrati'}
          </button>
        </form>

        <button
          type="button"
          className="login-toggle"
          onClick={() => {
            setMode(mode === 'accedi' ? 'registrati' : 'accedi');
            setMessage(null);
          }}
        >
          {mode === 'accedi'
            ? 'Non hai un account? Registrati'
            : 'Hai già un account? Accedi'}
        </button>
      </div>
    </div>
  );
}
