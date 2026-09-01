import { useState } from 'react';

// ATTENZIONE: sostituire con l'indirizzo email reale prima della pubblicazione.
const CONTACT_EMAIL = 'info@gustoscopio.it';

const PACKAGES = [
  { id: 'visita', icon: '🎯', label: 'Prima visita', desc: 'Un incontro iniziale per valutare la tua situazione e i tuoi obiettivi.' },
  { id: '3m', icon: '🌱', label: 'Percorso 3 mesi', desc: 'La base per costruire le prime abitudini sostenibili.' },
  { id: '6m', icon: '🔄', label: 'Percorso 6 mesi', desc: 'Il tempo per consolidare i risultati e adattare il percorso.' },
  { id: '12m', icon: '🏆', label: 'Percorso 12 mesi', desc: 'Un accompagnamento esteso, pensato per cambiamenti duraturi.' },
];

const ADDONS = [
  { id: 'allenamento', label: 'Scheda di allenamento personalizzata' },
  { id: 'manuali', label: 'Pacchetto PDF con manuali e guide' },
];

export default function PercorsiModal({ isOpen, onClose }) {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [addOns, setAddOns] = useState([]);

  if (!isOpen) return null;

  function toggleAddon(id) {
    setAddOns((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));
  }

  const pkg = PACKAGES.find((p) => p.id === selectedPackage);
  const addonLabels = ADDONS.filter((a) => addOns.includes(a.id)).map((a) => a.label);

  const subject = 'Richiesta informazioni - Percorsi personalizzati';
  const body =
    `Percorso di interesse: ${pkg ? pkg.label : '(da specificare)'}\n` +
    `Extra richiesti: ${addonLabels.length ? addonLabels.join(', ') : 'nessuno'}\n\n` +
    `Scrivi qui eventuali domande o dettagli aggiuntivi:\n`;
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <h3 className="modal-title">Scegli il tuo percorso</h3>
        <p className="modal-subtitle">Seleziona un'opzione: potrai comunque parlarne prima di decidere.</p>

        <div className="modal-package-grid">
          {PACKAGES.map((p) => (
            <button
              key={p.id}
              className={`modal-package-card ${selectedPackage === p.id ? 'active' : ''}`}
              onClick={() => setSelectedPackage(p.id)}
            >
              <div className="modal-package-icon">{p.icon}</div>
              <div className="modal-package-label">{p.label}</div>
              <div className="modal-package-desc">{p.desc}</div>
            </button>
          ))}
        </div>

        <div className="modal-addons">
          <div className="modal-addons-title">Vuoi aggiungere qualcosa?</div>
          {ADDONS.map((a) => (
            <label key={a.id} className="modal-addon-row">
              <input type="checkbox" checked={addOns.includes(a.id)} onChange={() => toggleAddon(a.id)} />
              <span>{a.label}</span>
            </label>
          ))}
        </div>

        <a
          href={mailtoHref}
          className={`add-btn modal-submit-btn ${!selectedPackage ? 'disabled' : ''}`}
          onClick={(e) => { if (!selectedPackage) e.preventDefault(); }}
        >
          Invia richiesta via email →
        </a>
        <p className="modal-note">
          Si aprirà il tuo programma di posta con una email precompilata: potrai rileggerla e modificarla prima di inviarla.
        </p>
      </div>
    </div>
  );
}
