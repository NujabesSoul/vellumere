import { useState } from 'react'

// One input. One desire. No forms, no dropdowns.
// Just tell us what you want permission to do.

const EXAMPLES = [
  "become a writer without an MFA",
  "change careers at 35",
  "teach myself philosophy",
  "call myself an artist",
  "build something without a CS degree",
]

export default function PermissionInput({ onSubmit, isLoading, onExampleClick }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim() && !isLoading) {
      onSubmit(value.trim())
    }
  }

  return (
    <form className="permission-input-form" onSubmit={handleSubmit}>
      <div className="permission-input-wrapper">
        <span className="permission-input-prefix">I want to</span>
        <input
          type="text"
          className="permission-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="..."
          disabled={isLoading}
          autoFocus
          spellCheck={false}
        />
        <button
          type="submit"
          className="permission-submit"
          disabled={!value.trim() || isLoading}
          title="Find your permission"
        >
          ⟶
        </button>
      </div>
      <p className="permission-input-hint">
        Press Enter to search the archives
      </p>

      {onExampleClick && (
        <div className="permission-examples">
          {EXAMPLES.map(example => (
            <button
              key={example}
              type="button"
              className="permission-example"
              onClick={() => {
                setValue(example)
                onExampleClick(example)
              }}
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
