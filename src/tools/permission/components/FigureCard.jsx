// A single historical figure who didn't wait for permission.
// The reading experience is sequential — you meet one person at a time.
// Like turning pages in a book someone left open for you.

export default function FigureCard({ figure, index }) {
  return (
    <article className="figure-card" style={{ animationDelay: `${index * 0.15}s` }}>
      <header className="figure-header">
        <h3 className="figure-name">{figure.name}</h3>
        <span className="figure-lived">{figure.lived}</span>
      </header>

      <p className="figure-accomplishment">{figure.what_they_did}</p>

      <div className="figure-barrier">
        <span className="figure-label">The Barrier</span>
        <p>{figure.the_barrier}</p>
      </div>

      <div className="figure-how">
        <span className="figure-label">How Anyway</span>
        <p>{figure.how_anyway}</p>
      </div>

      <div className="figure-permission">
        <p>{figure.permission_line}</p>
      </div>

      {figure.wikipedia_url && (
        <a
          href={figure.wikipedia_url}
          className="figure-wiki-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more about {figure.name} →
        </a>
      )}
    </article>
  )
}
