import { useState, useEffect } from 'react';
import { PACKAGES, MODALITA_LABEL, perMonth } from '../percorsiData';

// Indirizzo a cui arriva la richiesta.
const CONTACT_EMAIL = 'davidepalumbo.nutrizione@gmail.com';

const MODES = [
  { id: 'presenza', label: '📍 In presenza (Roma)' },
  { id: 'online', label: '💻 Online' },
];

const TRAINING_FREQ = [
  { id: 'no', label: 'Non mi alleno' },
  { id: '1-2', label: '1-2 volte a settimana' },
  { id: '3-4', label: '3-4 volte a settimana' },
  { id: '5+', label: '5+ volte a settimana' },
];

export default function PercorsiModal({ isOpen, onClose, initialPackage = null }) {
  const [selectedPackage, setSelectedPackage] = useState(initialPackage);
  const [mode, setMode] = useState(null);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [trainingFreq, setTrainingFreq] = useState(null);

  useEffect(() => {
    if (isOpen) setSelectedPackage(initialPackage);
  }, [isOpen, initialPackage]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pkg = PACKAGES.find((p) => p.id === selectedPackage);
  const modeObj = MODES.find((m) => m.id === mode);
  const freqObj = TRAINING_FREQ.find((f) => f.id === trainingFreq);

  const subject = 'Richiesta informazioni - Percorsi personalizzati';
  const body =
    `Nome: ${name.trim() || '(da specificare)'}\n` +
    `Percorso di interesse: ${pkg ? `${pkg.label} (${pkg.price}€)` : '(da specificare)'}\n` +
    `Modalità preferita: ${modeObj ? modeObj.label.replace(/^\S+\s/, '') : '(da specificare)'}\n` +
    `Si allena: ${freqObj ? freqObj.label : '(da specificare)'}\n` +
    `Il mio obiettivo: ${goal.trim() || '(da specificare)'}\n\n` +
    `Scrivi qui eventuali domande o dettagli aggiuntivi:\n`;
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel pm-panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Chiudi">✕</button>

        <div className="pm-head">
          <div className="pm-kicker">PERCORSI PERSONALIZZATI</div>
          <h3 className="pm-title">Comincia da qui.</h3>
          <p className="pm-sub">
            Scegli come partire. Poi ne parliamo, senza impegno: la richiesta serve solo a capire dove sei.
          </p>
          <div className="pm-modality">📍 {MODALITA_LABEL}</div>
        </div>

        <div className="pm-body">
          <div className="pm-step"><span className="pm-step-num">1</span> Scegli da dove partire</div>
          <div className="pm-pkg-grid">
            {PACKAGES.map((p) => (
              <button
                type="button"
                key={p.id}
                className={`pm-pkg ${selectedPackage === p.id ? 'active' : ''}`}
                onClick={() => setSelectedPackage(p.id)}
                aria-pressed={selectedPackage === p.id}
              >
                <span className="pm-pkg-check">✓</span>
                <span className="pm-pkg-icon">{p.icon}</span>
                <span className="pm-pkg-label">{p.label}</span>
                <span className="pm-pkg-price">
                  {p.price}€{perMonth(p) ? <small> · ≈{perMonth(p)}€ al mese</small> : null}
                </span>
                <span className="pm-pkg-desc">{p.desc}</span>
              </button>
            ))}
          </div>
          <p className="pm-price-note">La prima visita è inclusa in ogni percorso: non la paghi due volte.</p>

          <div className="pm-step"><span className="pm-step-num">2</span> Raccontaci qualcosa <span className="pm-opt">(facoltativo)</span></div>
          <div className="pm-mode-row" role="group" aria-label="Modalità">
            {MODES.map((m) => (
              <button
                type="button"
                key={m.id}
                className={`pm-mode ${mode === m.id ? 'active' : ''}`}
                aria-pressed={mode === m.id}
                onClick={() => setMode(mode === m.id ? null : m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>
          <label className="pm-field">
            <span>Come ti chiami?</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
          </label>
          <label className="pm-field" style={{ marginBottom: 14 }}>
            <span>Il tuo obiettivo, in una riga</span>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Es. mangiare meglio con i turni di lavoro"
            />
          </label>

          <div className="pm-field-label">Ti alleni? Quante volte a settimana?</div>
          <div className="pm-mode-row" role="group" aria-label="Frequenza di allenamento" style={{ marginBottom: 22 }}>
            {TRAINING_FREQ.map((f) => (
              <button
                type="button"
                key={f.id}
                className={`pm-mode ${trainingFreq === f.id ? 'active' : ''}`}
                aria-pressed={trainingFreq === f.id}
                onClick={() => setTrainingFreq(trainingFreq === f.id ? null : f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <a
            href={mailtoHref}
            className={`add-btn pm-submit ${!selectedPackage ? 'disabled' : ''}`}
            onClick={(e) => { if (!selectedPackage) e.preventDefault(); }}
          >
            {selectedPackage ? 'Richiedi informazioni →' : 'Scegli prima da dove partire'}
          </a>
          <p className="modal-note">
            Nessun impegno. Si aprirà il tuo programma di posta con una email già scritta: potrai rileggerla e modificarla prima di inviarla.
          </p>
        </div>
      </div>
    </div>
  );
}
