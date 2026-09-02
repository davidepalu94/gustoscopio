import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { calculateBMI } from '../calculators';
import Nav from '../components/Nav';

const RANGES = [
  { label: 'Sottopeso', range: '< 18.5' },
  { label: 'Normopeso', range: '18.5 – 24.9' },
  { label: 'Sovrappeso', range: '25 – 29.9' },
  { label: 'Obesità', range: '≥ 30' },
];

export default function BmiPage() {
  const [weightKg, setWeightKg] = useState(70);
  const [heightCm, setHeightCm] = useState(175);

  const result = useMemo(() => calculateBMI({ weightKg: +weightKg, heightCm: +heightCm }), [weightKg, heightCm]);

  return (
    <div>
      <Nav />
      <div className="section" style={{ maxWidth: 640 }}>
        <Link to="/strumenti" className="breadcrumb">← Torna agli strumenti</Link>
        <div className="section-head" style={{ textAlign: 'left', marginBottom: 30 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 46px)' }}>Calcola il tuo BMI</h2>
        </div>

        <div className="panel-block">
          <div className="calc-form">
            <label className="calc-field">
              <span>Peso (kg)</span>
              <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} min={30} max={250} />
            </label>
            <label className="calc-field">
              <span>Altezza (cm)</span>
              <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} min={120} max={230} />
            </label>
          </div>
        </div>

        <div className="panel-block">
          <div style={{ textAlign: 'center' }}>
            <div className="calc-result-label">IL TUO BMI</div>
            <div className="calc-result-big">{result.bmi}</div>
            <div className="bmi-category-tag">{result.category}</div>
          </div>

          <div className="bmi-ranges">
            {RANGES.map((r) => (
              <div className={`bmi-range-row ${r.label === result.category ? 'active' : ''}`} key={r.label}>
                <span>{r.label}</span>
                <span>{r.range}</span>
              </div>
            ))}
          </div>

          <p className="calc-disclaimer">
            Il BMI è un indicatore generico basato solo su peso e altezza: non distingue massa
            muscolare da massa grassa e non descrive lo stato di salute di una persona. È un dato,
            non un giudizio.
          </p>
        </div>

        <div className="teaser" style={{ padding: '30px 0' }}>
          <p style={{ fontSize: 14 }}>Per un quadro reale della tua composizione corporea serve altro che un numero.</p>
          <Link to="/percorsi-personalizzati" className="teaser-cta" style={{ fontSize: 14 }}>Scopri i percorsi personalizzati →</Link>
        </div>
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
