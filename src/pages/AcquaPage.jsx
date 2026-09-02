import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { calculateWaterNeeds, ACTIVITY_LEVELS } from '../calculators';
import Nav from '../components/Nav';

export default function AcquaPage() {
  const [weightKg, setWeightKg] = useState(70);
  const [activityLevel, setActivityLevel] = useState('moderato');

  const result = useMemo(
    () => calculateWaterNeeds({ weightKg: +weightKg, activityLevel }),
    [weightKg, activityLevel]
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
            <div className="calc-result-label">STIMA INDICATIVA GIORNALIERA</div>
            <div className="calc-result-big">{result.totalLiters}<span> litri</span></div>
          </div>
          <p className="calc-disclaimer">
            La stima si basa su 35 ml per kg di peso corporeo, con un margine aggiuntivo per il
            livello di attività. Non tiene conto di clima, gravidanza/allattamento, febbre o
            condizioni mediche che modificano il fabbisogno reale — in quei casi parlane con un
            professionista. L'acqua contenuta negli alimenti (frutta, verdura, minestre) contribuisce
            comunque al totale giornaliero.
          </p>
        </div>

        <div className="teaser" style={{ padding: '30px 0' }}>
          <p style={{ fontSize: 14 }}>Vuoi sapere quanta acqua c'è già nei cibi che mangi?</p>
          <Link to="/alimenti" className="teaser-cta" style={{ fontSize: 14 }}>Esplora il database alimenti →</Link>
        </div>
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
