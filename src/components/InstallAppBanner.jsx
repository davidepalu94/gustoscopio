import { useState, useEffect } from 'react';

const DISMISS_KEY = 'gustoscopio-install-banner-dismissed';

function isStandalone() {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

function isIOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

// Banner discreto che invita a installare Gustoscopio come app.
// - Su Android/Chrome: intercetta l'evento nativo "beforeinstallprompt" e
//   mostra un pulsante che apre il prompt di installazione del browser.
// - Su iPhone/iPad (Safari non espone un evento nativo): mostra invece le
//   istruzioni manuali (Condividi → Aggiungi a Home).
// - Non compare affatto se l'app è già installata, su desktop, o se
//   l'utente l'ha già chiuso in precedenza (ricordato in localStorage).
export default function InstallAppBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY) === '1') {
      setDismissed(true);
      return;
    }
    if (isStandalone()) return;

    function handleBeforeInstallPrompt(e) {
      e.preventDefault();
      setDeferredPrompt(e);
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Su iOS non esiste l'evento sopra: mostriamo le istruzioni manuali
    // solo se il dispositivo è un iPhone/iPad e siamo su un mobile.
    if (isIOS()) {
      setShowIOSInstructions(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  function handleDismiss() {
    localStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
  }

  async function handleInstallClick() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    handleDismiss();
  }

  if (dismissed) return null;
  if (!deferredPrompt && !showIOSInstructions) return null;

  return (
    <div className="install-banner">
      <span className="install-banner-icon">📲</span>
      <div className="install-banner-text">
        {deferredPrompt ? (
          <>
            <strong>Installa Gustoscopio</strong> sul telefono per aprirlo come un'app, anche offline.
          </>
        ) : (
          <>
            <strong>Aggiungi Gustoscopio alla Home</strong> — tocca <strong>Condividi</strong> {' '}
            <span aria-hidden>⬆️</span> qui sotto, poi <strong>"Aggiungi a Home"</strong>.
          </>
        )}
      </div>
      {deferredPrompt && (
        <button className="install-banner-cta" onClick={handleInstallClick}>Installa</button>
      )}
      <button className="install-banner-close" onClick={handleDismiss} aria-label="Chiudi">✕</button>
    </div>
  );
}
