import { useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import SiteNav from '../../components/SiteNav.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import HelpTooltip from '../../components/HelpTooltip.jsx'
import JourneyLink from '../../components/JourneyLink.jsx'
import TextInput from './components/TextInput.jsx'
import AnnotatedText from './components/AnnotatedText.jsx'
import CounterArgument from './components/CounterArgument.jsx'
import RecentReadings from './components/RecentReadings.jsx'
import MarginaliaLoader from './components/MarginaliaLoader.jsx'
import { query } from '../../services/api.js'
import { MARGINALIA_PROMPT, STORAGE_KEY, MAX_RECENT } from './prompt.js'
import './marginalia.css'

// The Marginalia Reader
// The margins are sometimes more interesting than the books themselves.
// Paste in someone else's text. Get a Renaissance scholar's annotations.

function loadReadings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function saveReading(reading) {
  const readings = loadReadings()
  readings.unshift(reading)
  // Keep only the last MAX_RECENT
  if (readings.length > MAX_RECENT) {
    readings.length = MAX_RECENT
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(readings))
}

export default function Marginalia() {
  const [state, setState] = useState('idle')
  const [sourceText, setSourceText] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const copiedTimeout = useRef(null)

  const handleSubmit = useCallback(async (text) => {
    setSourceText(text)
    setState('loading')
    setError(null)
    setData(null)

    try {
      const raw = await query({
        systemPrompt: MARGINALIA_PROMPT,
        userMessage: text,
        maxTokens: 4096,
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
        throw new Error('The scholar\'s handwriting was illegible. Even Fermat had bad days. Try again.')
      }

      if (!result.annotations || result.annotations.length === 0) {
        throw new Error('The scholar found nothing worth annotating. Try a longer or more substantive text.')
      }

      // Save to recent readings
      saveReading({
        title: result.title,
        sourceText: text.slice(0, 500),
        annotations: result.annotations,
        overall_note: result.overall_note,
        timestamp: new Date().toISOString(),
      })

      setData(result)
      setState('results')
    } catch (err) {
      setError(err.message)
      setState('error')
    }
  }, [])

  const handleRecent = useCallback((reading) => {
    setSourceText(reading.sourceText)
    setData({
      title: reading.title,
      annotations: reading.annotations,
      overall_note: reading.overall_note,
    })
    setState('results')
  }, [])

  const handleReset = () => {
    setState('idle')
    setSourceText('')
    setData(null)
    setError(null)
  }

  const handleCopy = useCallback(() => {
    if (!data) return
    const lines = [
      `# ${data.title}`,
      '',
      '---',
      '',
    ]
    data.annotations.forEach((ann, i) => {
      lines.push(`**[${i + 1}]** "${ann.quote}"`)
      lines.push(`*${ann.type}* — ${ann.note}`)
      lines.push('')
    })
    if (data.overall_note) {
      lines.push('---')
      lines.push('')
      lines.push(`**Scholar's Verdict:** ${data.overall_note}`)
      lines.push('')
    }
    lines.push(`*Annotated by The Marginalia Reader — Vellumere*`)
    navigator.clipboard.writeText(lines.join('\n'))
    setCopied(true)
    clearTimeout(copiedTimeout.current)
    copiedTimeout.current = setTimeout(() => setCopied(false), 2000)
  }, [data])

  return (
    <div className="the-marginalia">
      <SiteNav isToolPage />

      <header className="marginalia-header">
        <h1 className="marginalia-title" onClick={handleReset} style={{ cursor: state !== 'idle' ? 'pointer' : 'default' }}>
          The Marginalia Reader
        </h1>
        <p className="marginalia-subtitle">
          Paste someone else's text. A Renaissance scholar annotates the margins.
          <HelpTooltip text="Inspired by Fermat's marginalia, monastic scribes annotating sacred texts, and every working library where the margins are more interesting than the books. Paste any text and receive annotations: cross-domain connections, unexamined assumptions, historical precedents, and tensions the author didn't notice. 'Make It Stronger' argues against the main claim from a craftsman's perspective." />
        </p>
      </header>

      <main className="marginalia-main">
        {/* Recent readings — visible in idle state */}
        {state === 'idle' && (
          <RecentReadings onSelect={handleRecent} />
        )}

        {/* Input — visible unless showing results */}
        {state !== 'results' && (
          <TextInput onSubmit={handleSubmit} isLoading={state === 'loading'} />
        )}

        {/* Loading */}
        {state === 'loading' && <MarginaliaLoader />}

        {/* Results */}
        {state === 'results' && data && (
          <div className="marginalia-results">
            <div className="marginalia-results-header">
              <button className="marginalia-back-btn" onClick={handleReset}>
                ← Read Something Else
              </button>
              <span className="marginalia-reading-title">{data.title}</span>
            </div>

            <AnnotatedText
              sourceText={sourceText}
              annotations={data.annotations}
              overallNote={data.overall_note}
            />

            <CounterArgument sourceText={sourceText} />

            <div className="marginalia-copy">
              <button className="marginalia-copy-btn" onClick={handleCopy}>
                {copied ? '✓ Copied to clipboard' : '⟢ Keep These Annotations'}
              </button>
              <span className="marginalia-copy-hint">Copy as markdown</span>
            </div>
          </div>
        )}

        {/* Error */}
        {state === 'error' && (
          <div className="marginalia-error">
            <p className="marginalia-error-text">{error}</p>
            <button className="marginalia-retry-btn" onClick={() => handleSubmit(sourceText)}>
              Try Again
            </button>
            <button className="marginalia-back-btn" onClick={handleReset} style={{ display: 'block', margin: '0.5rem auto' }}>
              ← Start Over
            </button>
          </div>
        )}

        {/* Idle empty state */}
        {state === 'idle' && (
          <div className="marginalia-empty">
            <p className="marginalia-empty-text">
              Paste an article, essay, or passage. The scholar will read it with a pen in hand.
            </p>
          </div>
        )}
      </main>

      {state === 'results' && data && (
        <>
          <div className="contextual-link-container">
            <Link to="/commonplace" className="contextual-link">
              Save what stayed with you →
            </Link>
          </div>
          <JourneyLink currentRoute="/marginalia" />
        </>
      )}
      <SiteFooter />
    </div>
  )
}
