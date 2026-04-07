import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import SiteNav from '../../components/SiteNav.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import HelpTooltip from '../../components/HelpTooltip.jsx'
import JourneyLink from '../../components/JourneyLink.jsx'
import StateSelector from './components/StateSelector.jsx'
import TideReading from './components/TideReading.jsx'
import TideHistory from './components/TideHistory.jsx'
import TideLoader from './components/TideLoader.jsx'
import { query } from '../../services/api.js'
import { TIDE_PROMPT, STORAGE_KEY } from './prompt.js'
import './tide.css'

// The Cognitive Tide Chart
// A scattered mind is not a broken focused mind.
// It is a different tide, good for different work.

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export default function Tide() {
  const [state, setState] = useState('idle')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSubmit = useCallback(async (selectedState) => {
    setState('loading')
    setError(null)
    setData(null)

    try {
      const raw = await query({
        systemPrompt: TIDE_PROMPT,
        userMessage: `My current working state: ${selectedState}`,
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
        throw new Error('The tide chart came back smudged. The almanac blames the rain. Try again.')
      }

      if (!result.instruments || !result.reading) {
        throw new Error('The reading was incomplete. Try again.')
      }

      // Save the state check to history
      const entries = loadEntries()
      entries.unshift({
        state: selectedState,
        timestamp: new Date().toISOString(),
      })
      saveEntries(entries)

      setData(result)
      setState('results')
      setRefreshKey(k => k + 1)
    } catch (err) {
      setError(err.message)
      setState('error')
    }
  }, [])

  const handleReset = () => {
    setState('idle')
    setData(null)
    setError(null)
  }

  return (
    <div className="the-tide">
      <SiteNav isToolPage />

      <header className="tide-header">
        <h1 className="tide-title" onClick={handleReset} style={{ cursor: state !== 'idle' ? 'pointer' : 'default' }}>
          The Cognitive Tide Chart
        </h1>
        <p className="tide-subtitle">
          Not a mood tracker. A reader of working states.
          <HelpTooltip text="Inspired by tidal charts, lunar calendars, and the Old Farmer's Almanac. A scattered mind is not a broken focused mind — it's a different tide, good for different work. Select your current state and see what kinds of work (digital and analog) suit the water you're in. Over time, the chart reads your patterns." />
        </p>
      </header>

      <main className="tide-main">
        {/* Input — visible unless showing results */}
        {state !== 'results' && (
          <StateSelector onSubmit={handleSubmit} isLoading={state === 'loading'} />
        )}

        {/* Loading */}
        {state === 'loading' && <TideLoader />}

        {/* Results */}
        {state === 'results' && data && (
          <TideReading data={data} onReset={handleReset} />
        )}

        {/* Error */}
        {state === 'error' && (
          <div className="tide-error">
            <p className="tide-error-text">{error}</p>
            <button className="tide-retry-btn" onClick={handleReset}>
              ← Try Again
            </button>
          </div>
        )}

        {/* History — always visible when there are entries */}
        <TideHistory key={refreshKey} />
      </main>

      {state === 'results' && data && (
        <>
          <div className="contextual-link-container">
            <Link to="/examination" className="contextual-link">
              Reflect on what you did with this tide →
            </Link>
          </div>
          <JourneyLink currentRoute="/tide" />
        </>
      )}
      <SiteFooter />
    </div>
  )
}
