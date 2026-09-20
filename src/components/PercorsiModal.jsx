import { useState, useEffect } from 'react';
import { getIncludedContent } from '../percorsiBonus';
import { PACKAGES, MODALITA_LABEL, ACCESSO_GENERICO, perMonth } from '../percorsiData';

// Indirizzo a cui arriva la richiesta.
const CONTACT_EMAIL = 'davidepalumbo.nutrizione@gmail.com';

const MODES = [
  { id: 'presenza', label: '📍 In presenza (Roma)' },
  { id: 'online', label: '💻 Online' },
];

export default function PercorsiModal({ isOpen, onClose, initialPackage = null }) {
  const [selectedPackage, setSelectedPackage] = useState(initialPackage);
  const [mode, setMode] = useState(null);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');

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

  const inc = getIncludedContent();
  const pkg = PACKAGES.find((p) => p.id === selectedPackage);
  const modeObj = MODES.find((m) => m.id === mode);

  const subject = 'Richiesta informazioni - Percorsi personalizzati';
  const body =
    `Nome: ${name.trim() || '(da specificare)'}\n` +
    `Percorso di interesse: ${pkg ? `${pkg.label} (${pkg.price}€)` : '(da specificare)'}\n` +
    `Modalità preferita: ${modeObj ? modeObj.label.replace(/^\S+\s/, '') : '(da specificare)'}\n` +
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

          <div className="pm-step"><span className="pm-step-num">2</span> Cosa ricevi</div>
          <div className="pm-included">
            <div className="pm-included-head">
              <span>Fin dalla prima visita, in più hai</span>
              <span className="pm-included-tag">INCLUSO</span>
            </div>

            <div className="pm-inc-row">
              <span className="pm-inc-icon">🎬</span>
              <div className="pm-inc-text">
                <div className="pm-inc-title">Accesso ai videocorsi</div>
                <div className="pm-inc-desc">{inc.courses.map((c) => c.title).join(' · ')}</div>
                <div className="pm-inc-desc">Accesso: {pkg ? (pkg.months ? pkg.access : `${pkg.access} dalla prima visita`) : ACCESSO_GENERICO}</div>
              </div>
              {inc.coursesValue && (
                <div className="pm-inc-value">
                  {inc.strike ? (
                    <><s className="pm-strike">{inc.coursesTotal}€</s> <span>{inc.coursesPathTotal}€ con il percorso</span></>
                  ) : inc.coursesValue}
                </div>
              )}
            </div>

            <div className="pm-inc-row">
              <span className="pm-inc-icon">📘</span>
              <div className="pm-inc-text">
                <div className="pm-inc-title">Guide PDF esclusive</div>
                <div className="pm-inc-desc">{inc.guides.map((g) => g.title).join(' · ')}. Non in vendita: restano tue.</div>
              </div>
              <div className="pm-inc-value">Valore {inc.guidesValue}€</div>
            </div>

            <div className="pm-inc-row">
              <span className="pm-inc-icon">🏋️</span>
              <div className="pm-inc-text">
                <div className="pm-inc-title">Scheda di allenamento personalizzata</div>
                <div className="pm-inc-desc">Costruita su di te, insieme al piano nutrizionale.</div>
              </div>
            </div>

            <div className="pm-inc-row">
              <span className="pm-inc-icon">🤝</span>
              <div className="pm-inc-text">
                <div className="pm-inc-title">Un punto di riferimento diretto</div>
                <div className="pm-inc-desc">Per le tue domande, lungo tutto il percorso.</div>
              </div>
            </div>
          </div>

          <div className="pm-step"><span className="pm-step-num">3</span> Raccontaci qualcosa <span className="pm-opt">(facoltativo)</span></div>
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
          <label className="pm-field" style={{ marginBottom: 22 }}>
            <span>Il tuo obiettivo, in una riga</span>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Es. mangiare meglio con i turni di lavoro"
            />
          </label>

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
