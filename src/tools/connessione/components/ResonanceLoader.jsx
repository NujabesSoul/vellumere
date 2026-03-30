import { useState, useEffect } from 'react'

// Tesla's loading state.
// He'd hate a spinner. He'd want resonance.
// Concentric circles expanding from center, like a signal finding its frequency.

const LOADING_MESSAGES = [
  "Searching across domains...",
  "Importing techniques from unexpected fields...",
  "Testing transfers for practical value...",
  "Franklin is checking if these are actually useful...",
  "Mapping connections the specialists missed...",
  "Finding what the generalists already know...",
]

export default function ResonanceLoader() {
  const [messageIndex, setMessageIndex] = useState(
    Math.floor(Math.random() * LOADING_MESSAGES.length)
  )
  const [rippleKey, setRippleKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => {
        let next
        do {
          next = Math.floor(Math.random() * LOADING_MESSAGES.length)
        } while (next === prev && LOADING_MESSAGES.length > 1)
        return next
      })
      setRippleKey(prev => prev + 1)
    }, 2800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="resonance-loader">
      <div className="resonance-rings">
        <svg viewBox="0 0 200 200" className="resonance-svg">
          {/* Concentric ripples — Tesla's frequency visualization */}
          {[0, 1, 2, 3].map(i => (
            <circle
              key={`${rippleKey}-${i}`}
              cx="100"
              cy="100"
              r="10"
              className="resonance-ring"
              style={{
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
          {/* Center dot — the concept, vibrating */}
          <circle cx="100" cy="100" r="4" className="resonance-center" />
        </svg>
      </div>
      <p className="resonance-message">{LOADING_MESSAGES[messageIndex]}</p>
    </div>
  )
}
