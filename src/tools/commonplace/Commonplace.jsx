import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SiteNav from '../../components/SiteNav.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import HelpTooltip from '../../components/HelpTooltip.jsx'
import JourneyLink from '../../components/JourneyLink.jsx'
import EntryInput from './components/EntryInput.jsx'
import EntryCard from './components/EntryCard.jsx'
import CommonplaceLoader from './components/CommonplaceLoader.jsx'
import { query } from '../../services/api.js'
import { COMMONPLACE_PROMPT, STORAGE_KEY } from './prompt.js'
import './commonplace.css'

// The Commonplace Engine
// A digital commonplace book in the Renaissance scholarly tradition.
// Capture. Connect. Let the collection think.

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

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export default function Commonplace() {
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [filterTag, setFilterTag] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setEntries(loadEntries())
  }, [])

  const handleToggle = useCallback((id, wasDeleted) => {
    if (wasDeleted) {
      setEntries(loadEntries())
      setExpandedId(null)
      return
    }
    setExpandedId(prev => prev === id ? null : id)
  }, [])

  const handleSubmit = useCallback(async ({ text, source }) => {
    setIsLoading(true)
    setError(null)

    const currentEntries = loadEntries()
    const newId = generateId()

    // Build context of existing entries for the AI
    const existingFormatted = currentEntries.length > 0
      ? currentEntries.map(e =>
          `[ID: ${e.id}] "${e.text.slice(0, 200)}"${e.source ? ` (${e.source})` : ''}${e.tags ? ` — tags: ${e.tags.join(', ')}` : ''}`
        ).join('\n')
      : '(No existing entries yet)'

    const userMessage = [
      `NEW ENTRY: "${text}"`,
      source ? `SOURCE: ${source}` : '',
      '',
      `EXISTING COLLECTION (${currentEntries.length} entries):`,
      existingFormatted,
    ].filter(Boolean).join('\n')

    try {
      const raw = await query({
        systemPrompt: COMMONPLACE_PROMPT,
        userMessage,
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
        throw new Error('The librarian returned a smudged index card. Try again.')
      }

      const newEntry = {
        id: newId,
        text,
        source: source || null,
        tags: result.tags || [],
        connected_ids: result.connected_ids || [],
        scholarly_note: result.scholarly_note || null,
        timestamp: new Date().toISOString(),
      }

      const updated = [newEntry, ...currentEntries]
      saveEntries(updated)
      setEntries(updated)
      setExpandedId(newId)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Collect all unique tags for the filter
  const allTags = [...new Set(entries.flatMap(e => e.tags || []))].sort()

  const filteredEntries = filterTag
    ? entries.filter(e => e.tags && e.tags.includes(filterTag))
    : entries

  return (
    <div className="the-commonplace">
      <SiteNav isToolPage />

      <header className="commonplace-header">
        <h1 className="commonplace-title">The Commonplace Engine</h1>
        <p className="commonplace-subtitle">
          Capture passages, quotes, and half-thoughts. The collection finds the connections.
          <HelpTooltip text="A digital commonplace book in the tradition of John Locke, Erasmus, and Francis Bacon. Every serious reader kept one — a personal index of ideas, cross-referenced and revisited. Add entries from your reading and life. The engine tags them, finds connections to your existing collection, and writes scholarly notes placing new ideas in conversation with old ones. The Essay Seed grows a short reflection from any entry and its connections." />
        </p>
      </header>

      <main className="commonplace-main">
        <EntryInput onSubmit={handleSubmit} isLoading={isLoading} />

        {isLoading && <CommonplaceLoader />}

        {error && (
          <div className="commonplace-error">
            <p className="commonplace-error-text">{error}</p>
          </div>
        )}

        {saved && (
          <p className="commonplace-saved-message">Added to the collection.</p>
        )}

        {entries.length > 0 && (
          <div className="commonplace-collection">
            <div className="collection-header">
              <span className="collection-count">
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
              </span>
              {allTags.length > 0 && (
                <div className="collection-filters">
                  <button
                    className={`filter-tag${!filterTag ? ' active' : ''}`}
                    onClick={() => setFilterTag(null)}
                  >
                    All
                  </button>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      className={`filter-tag${filterTag === tag ? ' active' : ''}`}
                      onClick={() => setFilterTag(prev => prev === tag ? null : tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="collection-entries">
              {filteredEntries.map(entry => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  allEntries={entries}
                  isExpanded={expandedId === entry.id}
                  onToggle={handleToggle}
                />
              ))}
              {filteredEntries.length === 0 && filterTag && (
                <p className="collection-empty-filter">
                  No entries tagged "{filterTag}."
                </p>
              )}
            </div>
          </div>
        )}

        {entries.length === 0 && !isLoading && (
          <div className="commonplace-empty">
            <p className="commonplace-empty-text">
              The book is open. The pages are blank.
            </p>
            <p className="commonplace-empty-hint">
              Add your first passage, quote, or observation above.
            </p>
          </div>
        )}
      </main>

      {entries.length > 0 && (
        <>
          <div className="contextual-link-container">
            <Link to="/connessione" className="contextual-link">
              See cross-domain connections for your ideas →
            </Link>
          </div>
          <JourneyLink currentRoute="/commonplace" />
        </>
      )}
      <SiteFooter />
    </div>
  )
}
