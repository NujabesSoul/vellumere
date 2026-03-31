import { useState, useRef, useEffect } from 'react'

const EXAMPLES = [
  'play guitar',
  'write fiction',
  'cook Japanese food',
  'build a website',
  'speak Spanish',
  'draw from observation',
]

export default function SkillInput({ onSubmit, isLoading, onExampleClick, initialValue }) {
  const [value, setValue] = useState(initialValue || '')
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (value.trim() && !isLoading) {
      onSubmit(value.trim())
    }
  }

  const handleExample = (example) => {
    setValue(example)
    if (onExampleClick) {
      onExampleClick(example)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit(e)
  }

  return (
    <div className="skill-input-form">
      <div className="skill-input-wrapper">
        <span className="skill-input-prefix">I want to learn</span>
        <input
          ref={inputRef}
          type="text"
          className="skill-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="..."
          disabled={isLoading}
          spellCheck="false"
        />
        <button
          className="skill-submit"
          onClick={handleSubmit}
          disabled={!value.trim() || isLoading}
          aria-label="Generate roadmap"
        >
          ⟶
        </button>
      </div>
      <p className="skill-input-hint">Press Enter to map the path</p>

      {onExampleClick && (
        <div className="skill-examples">
          {EXAMPLES.map(example => (
            <button
              key={example}
              className="skill-example"
              onClick={() => handleExample(example)}
              disabled={isLoading}
            >
              {example}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
