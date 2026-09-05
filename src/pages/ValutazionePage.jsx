import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  calculateBMI,
  calculateEnergyNeeds,
  calculateProteinRange,
  calculateWaterNeeds,
  ACTIVITY_LEVELS,
} from '../calculators';
import Nav from '../components/Nav';

export default function ValutazionePage() {
  const [age, setAge] = useState(30);
  const [sex, setSex] = useState('M');
  const [weightKg, setWeightKg] = useState(70);
  const [heightCm, setHeightCm] = useState(175);
  const [activityLevel, setActivityLevel] = useState('moderato');
  const [hotClimate, setHotClimate] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const bmi = useMemo(
    () => calculateBMI({ weightKg: +weightKg, heightCm: +heightCm }),
    [weightKg, heightCm]
  );
  const energy = useMemo(
    () => calculateEnergyNeeds({ age: +age, sex, weightKg: +weightKg, heightCm: +heightCm, activityLevel }),
    [age, sex, weightKg, heightCm, activityLevel]
  );
  const protein = useMemo(
    () => calculateProteinRange({ weightKg: +weightKg, activityLevel }),
    [weightKg, activityLevel]
  );
  const water = useMemo(
    () => calculateWaterNeeds({ weightKg: +weightKg, activityLevel, hotClimate }),
    [weightKg, activityLevel, hotClimate]
  );

  return (
    <div>
      <Nav />
      <div className="section" style={{ maxWidth: 640 }}>
        <Link to="/corsi" className="breadcrumb">← Torna ai corsi</Link>
        <div className="section-head" style={{ textAlign: 'left', marginBottom: 30 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 46px)' }}>La tua valutazione dello stato nutrizionale</h2>
          <p style={{ marginTop: 10 }}>
            Inserisci i tuoi dati per una prima stima automatica. Fa parte del
            pacchetto che include l'accesso al videocorso: dopo l'acquisto,
            riceverai anche una valutazione scritta personalmente da un
            biologo nutrizionista.
          </p>
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
            <label className="calc-field calc-field-full" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={hotClimate} onChange={(e) => setHotClimate(e.target.checked)} style={{ width: 'auto' }} />
              <span style={{ fontWeight: 500 }}>Vivo in un clima caldo o sudo molto durante la giornata</span>
            </label>
          </div>
        </div>

        <div className="panel-block">
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div className="calc-result-label">FABBISOGNO CALORICO STIMATO</div>
            <div className="calc-result-big">{energy.maintenance}<span> kcal / giorno</span></div>
          </div>

          <div className="calc-result-row">
            <div className="calc-result-box">
              <div className="calc-result-box-lbl">📏 BMI</div>
              <div className="calc-result-box-val">{bmi.bmi} · {bmi.category}</div>
            </div>
            <div className="calc-result-box">
              <div className="calc-result-box-lbl">🥩 PROTEINE / GIORNO</div>
              <div className="calc-result-box-val">{protein.low}–{protein.high} g</div>
            </div>
            <div className="calc-result-box">
              <div className="calc-result-box-lbl">💧 ACQUA / GIORNO</div>
              <div className="calc-result-box-val">{water.lowL}–{water.highL} L</div>
            </div>
          </div>

          <p className="calc-disclaimer">
            Questi sono valori stimati con formule standard (Mifflin-St Jeor
            e riferimenti generici), a scopo puramente informativo. Non
            sostituiscono la valutazione scritta da un professionista, che
            riceverai dopo l'acquisto del corso.
          </p>
        </div>

        <div className="panel-block" style={{ textAlign: 'center' }}>
          {!submitted ? (
            <button className="login-submit" style={{ maxWidth: 320, margin: '0 auto' }} onClick={() => setSubmitted(true)}>
              Continua all'acquisto del corso
            </button>
          ) : (
            <p style={{ fontSize: 14 }}>
              Dati salvati. Il collegamento all'acquisto del corso arriva nel
              prossimo passo — per ora questa pagina si ferma qui.
            </p>
          )}
        </div>
      </div>
      <footer className="foot">
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </footer>
    </div>
  );
}
