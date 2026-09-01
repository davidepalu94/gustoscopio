import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { calculateEnergyNeeds, ACTIVITY_LEVELS } from '../calculators';
import Nav from '../components/Nav';

export default function FabbisognoPage() {
  const [age, setAge] = useState(30);
  const [sex, setSex] = useState('M');
  const [weightKg, setWeightKg] = useState(70);
  const [heightCm, setHeightCm] = useState(175);
  const [activityLevel, setActivityLevel] = useState('moderato');

  const result = useMemo(
    () => calculateEnergyNeeds({ age: +age, sex, weightKg: +weightKg, heightCm: +heightCm, activityLevel }),
    [age, sex, weightKg, heightCm, activityLevel]
  );

  return (
    <div>
      <Nav />
      <div className="section" style={{ maxWidth: 640 }}>
        <Link to="/strumenti" className="breadcrumb">← Torna agli strumenti</Link>
        <div className="section-head" style={{ textAlign: 'left', marginBottom: 30 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 46px)' }}>Quante calorie ti servono?</h2>
        </div>

        <div className="panel-block">
          <div className="calc-form">
            <label className="calc-field">
              <span>Età</span>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} min={14} max={100} />
            </label>
            <label className="calc-field">
              <span>Sesso</span>
              <select value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="M">Uomo</option>
                <option value="F">Donna</option>
              </select>
            </label>
            <label className="calc-field">
              <span>Peso (kg)</span>
              <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} min={30} max={250} />
            </label>
            <label className="calc-field">
              <span>Altezza (cm)</span>
              <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} min={120} max={230} />
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
            <div className="calc-result-label">MANTENIMENTO STIMATO</div>
            <div className="calc-result-big">{result.maintenance}<span> kcal / giorno</span></div>
          </div>
          <div className="calc-result-row">
            <div className="calc-result-box">
              <div className="calc-result-box-lbl">⬇️ DEFICIT</div>
              <div className="calc-result-box-val">{result.deficit} kcal</div>
            </div>
            <div className="calc-result-box">
              <div className="calc-result-box-lbl">🔥 MANTENIMENTO</div>
              <div className="calc-result-box-val">{result.maintenance} kcal</div>
            </div>
            <div className="calc-result-box">
              <div className="calc-result-box-lbl">⬆️ SURPLUS</div>
              <div className="calc-result-box-val">{result.surplus} kcal</div>
            </div>
          </div>
          <p className="calc-disclaimer">
            I risultati sono stime a scopo informativo, calcolate con la formula di Mifflin-St Jeor,
            e non sostituiscono una valutazione nutrizionale personalizzata.
          </p>
        </div>

        <div className="teaser" style={{ padding: '30px 0' }}>
          <p style={{ fontSize: 14 }}>Vuoi un calcolo costruito sulla tua situazione specifica, non su una formula generica?</p>
          <div className="teaser-cta" style={{ fontSize: 14 }}>Scopri i percorsi personalizzati →</div>
        </div>
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
