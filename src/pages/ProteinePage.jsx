import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { calculateProteinRange, ACTIVITY_LEVELS } from '../calculators';
import Nav from '../components/Nav';

export default function ProteinePage() {
  const [weightKg, setWeightKg] = useState(70);
  const [activityLevel, setActivityLevel] = useState('moderato');

  const result = useMemo(
    () => calculateProteinRange({ weightKg: +weightKg, activityLevel }),
    [weightKg, activityLevel]
  );

  return (
    <div>
      <Nav />
      <div className="section" style={{ maxWidth: 640 }}>
        <Link to="/strumenti" className="breadcrumb">← Torna agli strumenti</Link>
        <div className="section-head" style={{ textAlign: 'left', marginBottom: 30 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 46px)' }}>Quante proteine ti servono?</h2>
        </div>

        <div className="panel-block">
          <div className="calc-form">
            <label className="calc-field">
              <span>Peso (kg)</span>
              <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} min={30} max={250} />
            </label>
            <label className="calc-field calc-field-full">
              <span>Livello di attività</span>
              <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                {ACTIVITY_LEVELS.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
              </select>
            </label>
          </div>
        </div>

        <div className="panel-block">
          <div style={{ textAlign: 'center' }}>
            <div className="calc-result-label">INTERVALLO INDICATIVO GIORNALIERO</div>
            <div className="calc-result-big">{result.low}–{result.high}<span> g / giorno</span></div>
          </div>
          <p className="calc-disclaimer">
            L'intervallo è una stima basata su peso e livello di attività, non una prescrizione clinica.
            Le esigenze reali variano da persona a persona.
          </p>
        </div>

        <div className="teaser" style={{ padding: '30px 0' }}>
          <p style={{ fontSize: 14 }}>Vuoi capire quanto ne assumi davvero con la tua alimentazione?</p>
          <Link to="/#plate-builder" className="teaser-cta" style={{ fontSize: 14 }}>Prova Costruisci il piatto →</Link>
        </div>
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
