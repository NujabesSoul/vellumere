import { useState, useMemo } from 'react'
import { QUESTIONS, STORAGE_KEY } from '../prompt.js'

// Past entries — most recent first. Simple, clean list.
// Each entry shows abbreviated answers, expandable on click.

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

export default function PastEntries() {
  const [expandedDate, setExpandedDate] = useState(null)

  const entries = useMemo(() => {
    return loadEntries().sort((a, b) => b.date.localeCompare(a.date))
  }, [])

  if (entries.length === 0) {
    return (
      <div className="past-entries-empty">
        <p>No entries yet. Complete your first examination.</p>
      </div>
    )
  }

  return (
    <div className="past-entries">
      {entries.map(entry => {
        const isExpanded = expandedDate === entry.date
        return (
          <div
            key={entry.date}
            className={`past-entry${isExpanded ? ' expanded' : ''}`}
            onClick={() => setExpandedDate(isExpanded ? null : entry.date)}
          >
            <div className="past-entry-header">
              <span className="past-entry-date">{formatDate(entry.date)}</span>
              <span className="past-entry-toggle">{isExpanded ? '−' : '+'}</span>
            </div>

            {!isExpanded && (
              <p className="past-entry-preview">
                {QUESTIONS.map(q => entry.answers[q.key]?.slice(0, 40)).filter(Boolean).join(' · ') || '—'}
              </p>
            )}

            {isExpanded && (
              <div className="past-entry-full">
                {QUESTIONS.map(q => (
                  <div key={q.key} className="past-entry-answer">
                    <span className="past-entry-principle">{q.principle}</span>
                    <p>{entry.answers[q.key] || '—'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
