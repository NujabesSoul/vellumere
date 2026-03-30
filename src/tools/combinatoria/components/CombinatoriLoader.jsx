import { useState, useEffect } from 'react'

// Loading state — the wheels are spinning.
// Two circles orbiting toward collision.

const LOADING_MESSAGES = [
  "Spinning the wheels...",
  "Llull would be proud. Or confused. Probably both.",
  "Searching for what lives at the intersection...",
  "Finding the things that neither field knows it has...",
  "Three collisions detected. Examining the debris...",
  "Combining what was never meant to be combined...",
]

export default function CombinatoriLoader() {
  const [messageIndex, setMessageIndex] = useState(
    Math.floor(Math.random() * LOADING_MESSAGES.length)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => {
        let next
        do {
          next = Math.floor(Math.random() * LOADING_MESSAGES.length)
        } while (next === prev && LOADING_MESSAGES.length > 1)
        return next
      })
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="combinatori-loader">
      <div className="combinatori-loader-animation">
        <svg viewBox="0 0 120 60" className="collision-svg">
          <circle cx="30" cy="30" r="14" className="orbit-circle orbit-a" />
          <circle cx="90" cy="30" r="14" className="orbit-circle orbit-b" />
          <circle cx="60" cy="30" r="3" className="collision-spark" />
        </svg>
      </div>
      <p className="combinatori-loader-message">{LOADING_MESSAGES[messageIndex]}</p>
    </div>
  )
}
