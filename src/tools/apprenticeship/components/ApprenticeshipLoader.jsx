import { useState, useEffect } from 'react'

const LOADING_MESSAGES = [
  'Drafting your apprenticeship...',
  'Consulting the guild masters...',
  'Phase 1 is always the hardest to write honestly...',
  'Checking that every step is actually doable...',
  'A master craftsman is reviewing the path...',
]

export default function ApprenticeshipLoader() {
  const [messageIndex, setMessageIndex] = useState(
    () => Math.floor(Math.random() * LOADING_MESSAGES.length)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => {
        let next
        do {
          next = Math.floor(Math.random() * LOADING_MESSAGES.length)
        } while (next === prev)
        return next
      })
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="apprenticeship-loader">
      <div className="apprenticeship-loader-dots">
        <span className="apprenticeship-dot" />
        <span className="apprenticeship-dot" />
        <span className="apprenticeship-dot" />
      </div>
      <p className="apprenticeship-loader-message">
        {LOADING_MESSAGES[messageIndex]}
      </p>
    </div>
  )
}
