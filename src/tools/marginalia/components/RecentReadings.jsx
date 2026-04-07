import { STORAGE_KEY } from '../prompt.js'

// Recent readings — the last 10 texts you annotated.
// A small shelf of borrowed books with your notes still in them.

function loadReadings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export default function RecentReadings({ onSelect }) {
  const readings = loadReadings()

  if (readings.length === 0) return null

  return (
    <div className="recent-readings">
      <span className="recent-readings-label">Recent Readings</span>
      <div className="recent-readings-list">
        {readings.map((reading, i) => (
          <button
            key={i}
            className="recent-reading-item"
            onClick={() => onSelect(reading)}
          >
            <span className="recent-reading-title">{reading.title}</span>
            <span className="recent-reading-meta">
              {reading.annotations.length} notes · {new Date(reading.timestamp).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric'
              })}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
