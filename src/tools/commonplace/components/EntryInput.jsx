import { useState } from 'react'

// Where new entries are born.
// A passage, a quote, a half-thought — and where it came from.

const EXAMPLES = [
  { text: '"The noblest pleasure is the joy of understanding."', source: 'Leonardo da Vinci' },
  { text: 'Noticed today that the best woodworkers talk about listening to the grain — the same way good writers talk about listening to a sentence.', source: 'Workshop journal' },
  { text: '"We are what we repeatedly do. Excellence, then, is not an act, but a habit."', source: 'Will Durant (often misattributed to Aristotle)' },
]

export default function EntryInput({ onSubmit, isLoading }) {
  const [text, setText] = useState('')
  const [source, setSource] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim() || isLoading) return
    onSubmit({ text: text.trim(), source: source.trim() })
    setText('')
    setSource('')
  }

  const handleExample = (example) => {
    if (isLoading) return
    setText(example.text)
    setSource(example.source)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleSubmit(e)
    }
  }

  return (
    <form className="entry-input" onSubmit={handleSubmit}>
      <textarea
        className="entry-text-input"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="A passage, a quote, a half-thought..."
        rows={4}
        disabled={isLoading}
      />
      <input
        className="entry-source-input"
        type="text"
        value={source}
        onChange={e => setSource(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Source — a book, a conversation, a walk (optional)"
        disabled={isLoading}
      />
      <div className="entry-submit-row">
        <button
          className="entry-submit-btn"
          type="submit"
          disabled={!text.trim() || isLoading}
        >
          {isLoading ? 'Cataloguing...' : 'Add to Collection'}
        </button>
        <span className="entry-submit-hint">⌘ + Enter</span>
      </div>

      {!isLoading && (
        <div className="entry-examples">
          <span className="entry-examples-label">Try one:</span>
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              type="button"
              className="entry-example-btn"
              onClick={() => handleExample(ex)}
            >
              {ex.text.length > 50 ? ex.text.slice(0, 50) + '...' : ex.text}
            </button>
          ))}
        </div>
      )}
    </form>
  )
}
