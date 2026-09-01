import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MYTHS } from '../myths';
import Nav from '../components/Nav';

export default function MitoOVeritaPage() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = MYTHS[index];
  const isLast = index === MYTHS.length - 1;
  const flipped = selected !== null;
  const isCorrect = flipped && selected === current.answer;

  function answer(choice) {
    if (flipped) return;
    setSelected(choice);
    if (choice === current.answer) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <div className="myth-section">
      <Nav />
      <div className="section" style={{ maxWidth: 640 }}>
        <Link to="/lab" className="breadcrumb myth-breadcrumb">← Torna al Lab</Link>

        <div className="section-head">
          <h2 className="myth-title">Mito<br />o Verità?</h2>
        </div>

        {!finished ? (
          <>
            <div className="myth-progress">Affermazione {index + 1} di {MYTHS.length}</div>

            <div className="myth-card-container">
              <div className={`myth-card-inner ${flipped ? 'flipped' : ''}`}>
                <div className="myth-card-face myth-card-front">
                  <div className="myth-claim">"{current.claim}"</div>
                  <div className="myth-buttons">
                    <button className="myth-btn myth-btn-mito" onClick={() => answer('mito')}>MITO</button>
                    <button className="myth-btn myth-btn-verita" onClick={() => answer('verita')}>VERITÀ</button>
                  </div>
                </div>
                <div className="myth-card-face myth-card-back">
                  <div className="myth-result-icon">{isCorrect ? '✓' : '✕'}</div>
                  <div className="myth-result-label">{current.answer === 'mito' ? 'MITO' : 'VERITÀ'}</div>
                  <div className="myth-explanation">{current.explanation}</div>
                </div>
              </div>
            </div>

            {flipped && (
              <div style={{ textAlign: 'center', marginTop: 28 }}>
                <button className="add-btn myth-next-btn" onClick={next}>
                  {isLast ? 'Vedi il punteggio' : 'Prossima affermazione →'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="myth-finish">
            <div className="myth-finish-score">{score}/{MYTHS.length}</div>
            <div className="myth-finish-label">affermazioni indovinate</div>
            <button className="add-btn myth-next-btn" style={{ marginTop: 24 }} onClick={restart}>
              Ricomincia
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
