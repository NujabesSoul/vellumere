import { useState } from 'react'

// Paste in someone else's text.
// The scholar will read it with a pen in hand.

export default function TextInput({ onSubmit, isLoading }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim() || isLoading) return
    onSubmit(text.trim())
  }

  return (
    <form className="marginalia-input" onSubmit={handleSubmit}>
      <textarea
        className="marginalia-textarea"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Paste an article, essay, book passage, or blog post..."
        rows={8}
        disabled={isLoading}
      />
      <div className="marginalia-submit-row">
        <button
          className="marginalia-submit-btn"
          type="submit"
          disabled={!text.trim() || isLoading}
        >
          {isLoading ? 'Reading...' : 'Annotate'}
        </button>
        <span className="marginalia-word-count">
          {text.trim() ? `${text.trim().split(/\s+/).length} words` : ''}
        </span>
      </div>
    </form>
  )
}
