import { useState, useCallback } from 'react'
import { QUESTIONS, MONTHLY_REFLECTION_PROMPT, STORAGE_KEY } from '../prompt.js'
import { query, hasApiKey } from '../../../services/api.js'

// Monthly Reflection — the ONE place this tool uses the AI.
// Available after 7+ entries. Finds patterns, not summaries.

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export default function MonthlyReflection({ onOpenSettings }) {
  const [state, setState] = useState('idle')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const entries = loadEntries()
  const hasEnough = entries.length >= 7

  const handleReflect = useCallback(async () => {
    if (!hasApiKey()) {
      setState('no_key')
      return
    }

    setState('loading')
    setError(null)
    setData(null)

    // Format entries for the AI
    const formatted = entries
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(e => {
        const lines = [`Date: ${e.date}`]
        QUESTIONS.forEach(q => {
          lines.push(`  ${q.principle}: ${e.answers[q.key] || '(empty)'}`)
        })
        return lines.join('\n')
      })
      .join('\n\n')

    try {
      const raw = await query({
        systemPrompt: MONTHLY_REFLECTION_PROMPT,
        userMessage: `Here are my daily examination entries:\n\n${formatted}`,
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
        throw new Error('The reflection came back unclear. Try again.')
      }

      setData(result)
      setState('results')
    } catch (err) {
      if (err.message === 'NO_API_KEY') {
        setState('no_key')
      } else {
        setError(err.message)
        setState('error')
      }
    }
  }, [entries])

  if (!hasEnough) {
    return (
      <div className="monthly-reflection">
        <div className="monthly-locked">
          <span className="monthly-locked-label">Monthly Reflection</span>
          <p>Available after 7 entries. You have {entries.length}.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="monthly-reflection">
      {state === 'idle' && (
        <div className="monthly-prompt">
          <span className="monthly-label">Monthly Reflection</span>
          <p className="monthly-description">
            Let the patterns speak. Based on your {entries.length} entries,
            the examination looks for what you feed and what you starve.
          </p>
          <button className="monthly-reflect-btn" onClick={handleReflect}>
            Reflect on My Entries
          </button>
        </div>
      )}

      {state === 'loading' && (
        <div className="monthly-loading">
          <p className="monthly-loading-text">Reading your entries...</p>
        </div>
      )}

      {state === 'results' && data && (
        <div className="monthly-results">
          <span className="monthly-label">Reflection</span>
          <p className="monthly-period">{data.period} · {data.entries_analyzed} entries</p>

          <div className="monthly-principles">
            <div className="monthly-principle strongest">
              <span className="monthly-principle-label">Strongest</span>
              <p>{data.strongest_principle}</p>
            </div>
            <div className="monthly-principle quietest">
              <span className="monthly-principle-label">Quietest</span>
              <p>{data.quietest_principle}</p>
            </div>
          </div>

          {data.patterns && data.patterns.map((p, i) => (
            <div key={i} className="monthly-pattern">
              <span className="monthly-pattern-principle">{p.principle}</span>
              <p className="monthly-pattern-observation">{p.observation}</p>
              <p className="monthly-pattern-evidence">{p.evidence}</p>
            </div>
          ))}

          {data.reflection && (
            <div className="monthly-final">
              <p>{data.reflection}</p>
            </div>
          )}

          <button className="monthly-reflect-btn" onClick={() => setState('idle')} style={{ marginTop: '1.5rem' }}>
            Done
          </button>
        </div>
      )}

      {state === 'no_key' && (
        <div className="monthly-error">
          <p className="monthly-nokey">Reflection needs an API key. Click the gear icon above.</p>
          <button className="monthly-reflect-btn" onClick={onOpenSettings}>
            Open Settings
          </button>
        </div>
      )}

      {state === 'error' && (
        <div className="monthly-error">
          <p className="monthly-error-text">{error}</p>
          <button className="monthly-reflect-btn" onClick={handleReflect}>
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
