import { useState } from 'react'

// The input — a textarea, not a single line.
// People will paste paragraphs of jargon here.

const EXAMPLES = [
  "Docker containers package applications with their dependencies into isolated, portable units",
  "Object-relational mapping lets you query databases using your programming language instead of SQL",
  "Stoicism teaches that you can only control your reactions, not external events",
  "Sourdough fermentation uses wild yeast and lactobacilli to leaven and flavor bread over 12-24 hours",
  "The border gateway protocol is how autonomous systems on the internet decide where to route traffic",
]

export default function DecoderInput({ onSubmit, isLoading, onExampleClick }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim().length >= 10 && !isLoading) {
      onSubmit(value.trim())
    }
  }

  const handleExample = (example) => {
    setValue(example)
    if (onExampleClick) {
      onExampleClick(example)
    }
  }

  return (
    <form className="decoder-input-form" onSubmit={handleSubmit}>
      <textarea
        className="decoder-textarea"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Paste any concept, explanation, or jargon..."
        disabled={isLoading}
        rows={4}
        spellCheck={false}
      />
      <div className="decoder-input-actions">
        <button
          type="submit"
          className="decoder-submit"
          disabled={value.trim().length < 10 || isLoading}
        >
          Decode
        </button>
        {value.trim().length > 0 && value.trim().length < 10 && (
          <span className="decoder-input-warning">
            Give the decoder something to work with.
          </span>
        )}
      </div>

      {onExampleClick && (
        <div className="decoder-examples">
          <span className="decoder-examples-label">Try:</span>
          {EXAMPLES.map(example => (
            <button
              key={example}
              type="button"
              className="decoder-example"
              onClick={() => handleExample(example)}
              disabled={isLoading}
            >
              {example}
            </button>
          ))}
        </div>
      )}
    </form>
  )
}
