import { useState, useEffect } from 'react'

const LOADING_MESSAGES = [
  "Reading the original text...",
  "Translating for the expert...",
  "Finding the right analogy for the curious...",
  "The skeptic is already impatient...",
  "Checking what gets lost in translation...",
  "Three versions ready. Same idea, different lenses.",
]

export default function DecoderLoader() {
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
    <div className="decoder-loader">
      <div className="decoder-loader-bars">
        <span className="loader-bar bar-1" />
        <span className="loader-bar bar-2" />
        <span className="loader-bar bar-3" />
      </div>
      <p className="decoder-loader-message">{LOADING_MESSAGES[messageIndex]}</p>
    </div>
  )
}
