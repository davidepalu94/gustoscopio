import { useState, useEffect } from 'react';
import { getIncludedContent } from '../percorsiBonus';

// Indirizzo a cui arriva la richiesta.
const CONTACT_EMAIL = 'davidepalumbo.nutrizione@gmail.com';

const PACKAGES = [
  { id: 'visita', icon: '🎯', label: 'Prima visita', desc: 'Un incontro iniziale per valutare la tua situazione e i tuoi obiettivi.', isPath: false },
  { id: '3m', icon: '🌱', label: 'Percorso 3 mesi', desc: 'La base per costruire le prime abitudini sostenibili.', isPath: true },
  { id: '6m', icon: '🔄', label: 'Percorso 6 mesi', desc: 'Il tempo per consolidare i risultati e adattare il percorso.', isPath: true },
  { id: '12m', icon: '🏆', label: 'Percorso 12 mesi', desc: 'Un accompagnamento esteso, pensato per cambiamenti duraturi.', isPath: true },
];

export default function PercorsiModal({ isOpen, onClose }) {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [wantsTraining, setWantsTraining] = useState(false);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const inc = getIncludedContent();
  const pkg = PACKAGES.find((p) => p.id === selectedPackage);
  const isVisit = pkg && !pkg.isPath;

  const subject = 'Richiesta informazioni - Percorsi personalizzati';
  const body =
    `Nome: ${name.trim() || '(da specificare)'}\n` +
    `Percorso di interesse: ${pkg ? pkg.label : '(da specificare)'}\n` +
    `Il mio obiettivo: ${goal.trim() || '(da specificare)'}\n` +
    `Mi interessa anche la scheda di allenamento personalizzata: ${wantsTraining ? 'sì' : 'no'}\n\n` +
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
                <span className="pm-pkg-desc">{p.desc}</span>
              </button>
            ))}
          </div>

          <div className="pm-step"><span className="pm-step-num">2</span> Cosa ricevi</div>
          <div className={`pm-included ${isVisit ? 'dim' : ''}`}>
            <div className="pm-included-head">
              <span>Iniziando un percorso, in più hai</span>
              <span className="pm-included-tag">INCLUSO</span>
            </div>

            <div className="pm-inc-row">
              <span className="pm-inc-icon">🎬</span>
              <div className="pm-inc-text">
                <div className="pm-inc-title">Accesso ai videocorsi</div>
                <div className="pm-inc-desc">{inc.courses.map((c) => c.title).join(' · ')}</div>
              </div>
              {inc.coursesValue && <div className="pm-inc-value">{inc.coursesValue}</div>}
            </div>

            <div className="pm-inc-row">
              <span className="pm-inc-icon">📘</span>
              <div className="pm-inc-text">
                <div className="pm-inc-title">Guide PDF esclusive</div>
                <div className="pm-inc-desc">{inc.guides.map((g) => g.title).join(' · ')}</div>
              </div>
              <div className="pm-inc-value">Non in vendita</div>
            </div>

            <div className="pm-inc-row">
              <span className="pm-inc-icon">🤝</span>
              <div className="pm-inc-text">
                <div className="pm-inc-title">Un punto di riferimento diretto</div>
                <div className="pm-inc-desc">Per le tue domande, lungo tutto il percorso.</div>
              </div>
            </div>

            {isVisit && (
              <p className="pm-included-note">
                La prima visita serve a capire da dove partire: videocorsi e guide si sbloccano con l'avvio di un percorso.
              </p>
            )}
          </div>

          <div className="pm-step"><span className="pm-step-num">3</span> Raccontaci qualcosa <span className="pm-opt">(facoltativo)</span></div>
          <label className="pm-field">
            <span>Come ti chiami?</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
          </label>
          <label className="pm-field">
            <span>Il tuo obiettivo, in una riga</span>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Es. mangiare meglio con i turni di lavoro"
            />
          </label>
          <label className="pm-check">
            <input type="checkbox" checked={wantsTraining} onChange={(e) => setWantsTraining(e.target.checked)} />
            <span>Mi interessa anche la scheda di allenamento personalizzata</span>
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
