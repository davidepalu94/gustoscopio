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
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
