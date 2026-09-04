import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { calculateWaterNeeds, ACTIVITY_LEVELS } from '../calculators';
import Nav from '../components/Nav';

export default function FabbisognoIdricoPage() {
  const [weightKg, setWeightKg] = useState(70);
  const [activityLevel, setActivityLevel] = useState('moderato');
  const [hotClimate, setHotClimate] = useState(false);

  const result = useMemo(
    () => calculateWaterNeeds({ weightKg: +weightKg, activityLevel, hotClimate }),
    [weightKg, activityLevel, hotClimate]
  );

  return (
    <div>
      <Nav />
      <div className="section" style={{ maxWidth: 640 }}>
        <Link to="/strumenti" className="breadcrumb">← Torna agli strumenti</Link>
        <div className="section-head" style={{ textAlign: 'left', marginBottom: 30 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 46px)' }}>Quanta acqua ti serve?</h2>
        </div>

        <div className="panel-block">
          <div className="calc-form">
            <label className="calc-field">
              <span>Peso (kg)</span>
              <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} min={30} max={250} />
            </label>
            <label className="calc-field">
              <span>Livello di attività</span>
              <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                {ACTIVITY_LEVELS.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
              </select>
            </label>
            <label className="calc-field calc-field-full" style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <input
                type="checkbox"
                checked={hotClimate}
                onChange={(e) => setHotClimate(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: '#3155FF' }}
              />
              <span style={{ fontWeight: 600 }}>Clima caldo o sudorazione intensa</span>
            </label>
          </div>
        </div>

        <div className="panel-block">
          <div style={{ textAlign: 'center' }}>
            <div className="calc-result-label">FABBISOGNO STIMATO</div>
            <div className="calc-result-big">{result.lowL}–{result.highL}<span> L / giorno</span></div>
          </div>
          <div className="calc-result-row">
            <div className="calc-result-box">
              <div className="calc-result-box-lbl">⚖️ BASE (peso)</div>
              <div className="calc-result-box-val">30-35 ml/kg</div>
            </div>
            <div className="calc-result-box">
              <div className="calc-result-box-lbl">🏃 ATTIVITÀ</div>
              <div className="calc-result-box-val">+{result.bonusL} L</div>
            </div>
            <div className="calc-result-box">
              <div className="calc-result-box-lbl">🌡️ CLIMA</div>
              <div className="calc-result-box-val">+{result.climateBonusL} L</div>
            </div>
          </div>
          <p className="calc-disclaimer">
            L'intervallo è una stima generica basata su peso corporeo, attività fisica e clima.
            Include acqua da bevande e alimenti. Non tiene conto di condizioni cliniche specifiche
            (es. patologie renali o cardiache): in quei casi vale il parere del proprio medico.
          </p>
        </div>

        <div className="teaser" style={{ padding: '30px 0' }}>
          <p style={{ fontSize: 14 }}>Vuoi un piano costruito sulle tue abitudini reali, non su una formula generica?</p>
          <Link to="/percorsi-personalizzati" className="teaser-cta" style={{ fontSize: 14 }}>Scopri i percorsi personalizzati →</Link>
        </div>
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
