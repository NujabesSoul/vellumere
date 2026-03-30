import { useRef, useState } from 'react'
import { STORAGE_KEY } from '../prompt.js'

// Export and import entries as JSON.
// Your reflections live in your browser. Export them to keep them safe.

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

export default function DataPortability({ onImport }) {
  const fileRef = useRef(null)
  const [status, setStatus] = useState(null)

  const handleExport = () => {
    const entries = loadEntries()
    if (entries.length === 0) {
      setStatus('Nothing to export yet.')
      setTimeout(() => setStatus(null), 2000)
      return
    }

    const today = new Date().toISOString().split('T')[0]
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `vellumere-examination-${today}.json`
    a.click()
    URL.revokeObjectURL(url)

    setStatus('Exported.')
    setTimeout(() => setStatus(null), 2000)
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result)
        if (!Array.isArray(imported)) throw new Error('not an array')

        // Merge by date — newer timestamp wins on conflict
        const existing = loadEntries()
        const byDate = {}
        existing.forEach(entry => { byDate[entry.date] = entry })
        imported.forEach(entry => {
          if (!entry.date || !entry.answers) return
          const current = byDate[entry.date]
          if (!current || entry.timestamp > current.timestamp) {
            byDate[entry.date] = entry
          }
        })

        const merged = Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date))
        saveEntries(merged)

        const newCount = merged.length - existing.length
        setStatus(`Imported. ${newCount > 0 ? `${newCount} new entries added.` : 'All entries already existed.'}`)
        setTimeout(() => setStatus(null), 3000)
        if (onImport) onImport()
      } catch {
        setStatus('Could not read that file.')
        setTimeout(() => setStatus(null), 3000)
      }
    }
    reader.readAsText(file)
    // Reset so the same file can be re-selected
    e.target.value = ''
  }

  return (
    <div className="data-portability">
      <div className="data-portability-actions">
        <button className="data-portability-btn" onClick={handleExport}>
          Export Entries
        </button>
        <button className="data-portability-btn" onClick={() => fileRef.current?.click()}>
          Import Entries
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />
      </div>
      {status && <p className="data-portability-status">{status}</p>}
      <p className="data-portability-note">
        Your reflections live in your browser. Export them to keep them safe.
      </p>
    </div>
  )
}
