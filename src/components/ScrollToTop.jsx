import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Le SPA con react-router-dom NON riportano lo scroll in cima da sole quando
// cambi pagina: il browser mantiene la posizione di scroll precedente.
// Questo componente ascolta il cambio di percorso e forza lo scroll a (0,0),
// a meno che l'URL non contenga un'ancora (#sezione), nel qual caso scorre
// fino a quell'elemento (es. i link "/#plate-builder" dall'hub Strumenti).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Piccolo ritardo: aspettiamo che la nuova pagina sia montata e il
      // layout stabile (font, immagini) prima di calcolare la posizione,
      // altrimenti lo scroll può "sbagliare" di qualche decina di pixel.
      const id = window.setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 80);
      return () => window.clearTimeout(id);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
