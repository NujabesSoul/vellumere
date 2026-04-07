import { useState, useCallback } from 'react'
import { query } from '../../../services/api.js'
import { TIDE_READING_PROMPT, STORAGE_KEY } from '../prompt.js'

// The tide history — a horizontal timeline of recent states.
// No charts. No graphs. Just the record of what the water was doing.

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export default function TideHistory() {
  const [patternState, setPatternState] = useState('idle')
  const [patternData, setPatternData] = useState(null)
  const [patternError, setPatternError] = useState(null)

  const entries = loadEntries()

  // Show only last 14 days of entries
  const twoWeeksAgo = new Date()
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
  const recentEntries = entries.filter(e => new Date(e.timestamp) >= twoWeeksAgo)

  const hasEnoughForPattern = entries.length >= 7

  const handleReadPattern = useCallback(async () => {
    setPatternState('loading')
    setPatternError(null)
    setPatternData(null)

    const formatted = recentEntries
      .map(e => {
        const date = new Date(e.timestamp)
        const dateStr = date.toLocaleDateString('en-US', {
          weekday: 'short', month: 'short', day: 'numeric'
        })
        const timeStr = date.toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit'
        })
        return `${dateStr} at ${timeStr}: ${e.state}`
      })
      .join('\n')

    try {
      const raw = await query({
        systemPrompt: TIDE_READING_PROMPT,
        userMessage: `Here are my recent tide states:\n\n${formatted}`,
      })

      let jsonText = raw.trim()
      const codeBlockMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/)
      if (codeBlockMatch) {
        jsonText = codeBlockMatch[1].trim()
      }

      let result
      try {
        result = JSON.parse(jsonText)
      } catch {
        throw new Error('The almanac came back water-stained. Try again.')
      }

      if (!result.observation) {
        throw new Error('The pattern reader had nothing to say. Try again.')
      }

      setPatternData(result)
      setPatternState('results')
    } catch (err) {
      setPatternError(err.message)
      setPatternState('error')
    }
  }, [recentEntries])

  if (entries.length === 0) return null

  return (
    <div className="tide-history">
      <span className="tide-history-label">Recent Tides</span>

      <div className="tide-timeline">
        {recentEntries.map((entry, i) => {
          const date = new Date(entry.timestamp)
          const dayStr = date.toLocaleDateString('en-US', { weekday: 'short' })
          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

          return (
            <div key={i} className="tide-mark">
              <span className="tide-mark-state">{entry.state}</span>
              <span className="tide-mark-date">{dayStr} {dateStr}</span>
            </div>
          )
        })}
      </div>

      {recentEntries.length === 0 && entries.length > 0 && (
        <p className="tide-history-old">
          No entries in the last 14 days. The tide has been unread.
        </p>
      )}

      {/* Pattern reading — available after 7+ entries */}
      <div className="tide-pattern-section">
        {!hasEnoughForPattern && (
          <p className="tide-pattern-locked">
            Pattern reading available after 7 entries. You have {entries.length}.
          </p>
        )}

        {hasEnoughForPattern && patternState === 'idle' && (
          <button className="tide-pattern-btn" onClick={handleReadPattern}>
            Read My Pattern
          </button>
        )}

        {patternState === 'loading' && (
          <p className="tide-pattern-loading">The almanac is reading the tides...</p>
        )}

        {patternState === 'results' && patternData && (
          <div className="tide-pattern-result">
            <span className="tide-pattern-type">{patternData.pattern_type}</span>
            <p className="tide-pattern-observation">{patternData.observation}</p>
            <button className="tide-pattern-done" onClick={() => setPatternState('idle')}>
              Done
            </button>
          </div>
        )}

        {patternState === 'error' && (
          <div className="tide-pattern-error">
            <p className="tide-pattern-error-text">{patternError}</p>
            <button className="tide-pattern-btn" onClick={handleReadPattern}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
