import { useState } from 'react'

// Tesla's Layer — one input, one frequency.
// No forms. No dropdowns. No multi-step wizards.
// Type a concept. Press Enter. The resonance begins.

const PLACEHOLDERS = [
  "Type a concept... (e.g., 'sourdough fermentation')",
  "What are you curious about? (e.g., 'TCP/IP routing')",
  "Enter anything... (e.g., 'cathedral buttresses')",
  "A concept, a problem, a wonder... (e.g., '3D printing overhangs')",
  "What's on your mind? (e.g., 'mycelium networks')",
]

export default function ConceptInput({ onSubmit, isLoading }) {
  const [value, setValue] = useState('')
  const [placeholder] = useState(
    PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim() && !isLoading) {
      onSubmit(value.trim())
    }
  }

  return (
    <form className="concept-input-form" onSubmit={handleSubmit}>
      <div className="concept-input-wrapper">
        <input
          type="text"
          className="concept-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          autoFocus
          spellCheck={false}
        />
        <button
          type="submit"
          className="concept-submit"
          disabled={!value.trim() || isLoading}
          title="Begin the resonance"
        >
          ⟶
        </button>
      </div>
      <p className="concept-input-hint">
        Press Enter to activate the Engine
      </p>
    </form>
  )
}
