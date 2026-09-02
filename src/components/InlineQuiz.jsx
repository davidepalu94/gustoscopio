import { useState } from 'react';

export default function InlineQuiz({ question, options, correctIndex, explanation }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="inline-quiz">
      <div className="inline-quiz-label">PROVA TU</div>
      <div className="inline-quiz-question">{question}</div>
      <div className="inline-quiz-options">
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === correctIndex;
          let cls = 'inline-quiz-option';
          if (selected !== null) {
            if (isCorrect) cls += ' correct';
            else if (isSelected) cls += ' incorrect';
          }
          return (
            <button key={i} className={cls} onClick={() => selected === null && setSelected(i)}>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="inline-quiz-result">
          <div className="inline-quiz-verdict">
            {selected === correctIndex ? '✓ Esatto.' : '✕ Non proprio.'}
          </div>
          <div className="inline-quiz-explanation">{explanation}</div>
        </div>
      )}
    </div>
  );
}
