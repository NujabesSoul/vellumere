// The shared pattern — the thread that runs through all three figures.
// This is the moment the user sees the principle beneath the stories.

export default function PatternLine({ pattern }) {
  return (
    <div className="pattern-line">
      <span className="pattern-label">The Pattern</span>
      <p className="pattern-text">{pattern}</p>
      <span className="pattern-attribution">— The Permission Machine</span>
    </div>
  )
}
