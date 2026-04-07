import { useState } from 'react'
import { CURATED_STATES } from '../prompt.js'

// Select a state or describe your own.
// The tide is what it is.

export default function StateSelector({ onSubmit, isLoading }) {
  const [selected, setSelected] = useState(null)
  const [custom, setCustom] = useState('')

  const handleSubmit = () => {
    const state = selected || custom.trim()
    if (!state || isLoading) return
    onSubmit(state)
    setSelected(null)
    setCustom('')
  }

  const handleSelect = (state) => {
    if (isLoading) return
    setSelected(prev => prev === state ? null : state)
    setCustom('')
  }

  const handleCustomChange = (e) => {
    setCustom(e.target.value)
    setSelected(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && custom.trim()) {
      handleSubmit()
    }
  }

  const hasSelection = selected || custom.trim()

  return (
    <div className="state-selector">
      <p className="state-selector-prompt">How is your mind working right now?</p>

      <div className="state-options">
        {CURATED_STATES.map(state => (
          <button
            key={state}
            className={`state-option${selected === state ? ' selected' : ''}`}
            onClick={() => handleSelect(state)}
            disabled={isLoading}
          >
            {state}
          </button>
        ))}
      </div>

      <div className="state-custom">
        <span className="state-custom-label">Or describe it:</span>
        <input
          className="state-custom-input"
          type="text"
          value={custom}
          onChange={handleCustomChange}
          onKeyDown={handleKeyDown}
          placeholder="wired but directionless, Sunday-afternoon restless..."
          disabled={isLoading}
        />
      </div>

      <button
        className="state-submit-btn"
        onClick={handleSubmit}
        disabled={!hasSelection || isLoading}
      >
        {isLoading ? 'Reading the tide...' : 'Read My Tide'}
      </button>
    </div>
  )
}
