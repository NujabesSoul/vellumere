// A single question with its principle tag and text input.
// Each question should breathe — the whitespace matters.

export default function QuestionCard({ question, principle, value, onChange, readOnly }) {
  return (
    <div className="question-card">
      <label className="question-text">{question}</label>
      <span className="question-principle">{principle}</span>
      {readOnly ? (
        <p className="question-answer-readonly">{value || '—'}</p>
      ) : (
        <textarea
          className="question-input"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Be honest. Be brief."
          rows={2}
          spellCheck={false}
        />
      )}
    </div>
  )
}
