// A single collision result — something that lives only
// at the intersection of two domains.
// Each card is a project that could not exist in either field alone.

const TYPE_LABELS = {
  existing: 'Exists',
  buildable: 'Buildable',
  concept: 'Concept',
}

export default function CollisionCard({ result, index }) {
  const typeLabel = TYPE_LABELS[result.type] || result.type

  return (
    <article className="collision-card" style={{ animationDelay: `${index * 0.15}s` }}>
      <header className="collision-card-header">
        <h3 className="collision-card-title">{result.title}</h3>
        <span className={`collision-card-type type-${result.type}`}>{typeLabel}</span>
      </header>

      <p className="collision-card-description">{result.what_it_is}</p>

      <div className="collision-card-sources">
        <div className="collision-source">
          <span className="collision-source-label">From A</span>
          <p>{result.from_domain_a}</p>
        </div>
        <div className="collision-source">
          <span className="collision-source-label">From B</span>
          <p>{result.from_domain_b}</p>
        </div>
      </div>

      <div className="collision-card-why">
        <span className="collision-card-label">Why It Works</span>
        <p>{result.why_it_works}</p>
      </div>

      <div className="collision-card-step">
        <span className="collision-card-label">First Step</span>
        <p>{result.first_step}</p>
      </div>

      {result.reference_url && (
        <a
          href={result.reference_url}
          className="collision-card-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {result.type === 'existing' ? 'Read more about this' : 'Start exploring'} →
        </a>
      )}
    </article>
  )
}
