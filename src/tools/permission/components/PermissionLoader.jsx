import { useState, useEffect } from 'react'

// Loading state for The Permission Machine.
// No resonance rings here — this tool is about people, not patterns.
// A simple pulsing dot and rotating messages about searching the archives.

const LOADING_MESSAGES = [
  "Searching the archives for people who didn't wait...",
  "Finding the ones who started without permission...",
  "Consulting history's unauthorized practitioners...",
  "Three figures found. Verifying they were real...",
  "Checking credentials. Found none. That's the point.",
]

export default function PermissionLoader() {
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
    <div className="permission-loader">
      <div className="permission-loader-dots">
        <span className="loader-dot" />
        <span className="loader-dot" />
        <span className="loader-dot" />
      </div>
      <p className="permission-loader-message">{LOADING_MESSAGES[messageIndex]}</p>
    </div>
  )
}
