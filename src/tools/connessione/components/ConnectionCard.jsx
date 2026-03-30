import { getUnexpectednessColor } from '../utils/graph-layout.js'

// A single connection card.
// Part Leonardo (the observation), part Franklin (the utility),
// part Tesla (the invisible pattern binding them together).

export default function ConnectionCard({ connection, index, isExpanded, onToggle, onExploreDeeper }) {
  const accentColor = getUnexpectednessColor(connection.unexpectedness || 3)
  // Accept both "transfer" (new prompt) and "pattern" (legacy/fallback)
  const threadText = connection.transfer || connection.pattern || ''

  return (
    <div
      className={`connection-card ${isExpanded ? 'expanded' : ''}`}
      onClick={onToggle}
      style={{ '--accent': accentColor }}
    >
      <div className="card-header">
        <span className="card-domain">{connection.domain}</span>
        <div className="card-header-right">
          {isExpanded && onExploreDeeper && (
            <button
              className="explore-deeper-btn"
              onClick={(e) => {
                e.stopPropagation()
                onExploreDeeper(connection.domain)
              }}
              title="Make this the new center concept"
            >
              ↝ Explore Deeper
            </button>
          )}
          <span className="card-unexpectedness">
            {'●'.repeat(connection.unexpectedness || 3)}
            {'○'.repeat(5 - (connection.unexpectedness || 3))}
          </span>
        </div>
      </div>

      <h3 className="card-title">{connection.title}</h3>

      {isExpanded && (
        <div className="card-details">
          <div className="card-pattern">
            <span className="card-label">The Thread</span>
            <p>{threadText}</p>
          </div>

          <div className="card-so-what">
            {/* Franklin's contribution — always practical, slightly different ink */}
            <span className="card-label franklin-label">So What? — Franklin insists</span>
            <p>{connection.so_what}</p>
          </div>

          {connection.leonardo_note && (
            <div className="card-leonardo-note">
              {/* Leonardo's margin scribble — italic, faded, centuries old */}
              <p>✎ {connection.leonardo_note}</p>
            </div>
          )}
        </div>
      )}

      {!isExpanded && (
        <p className="card-preview">{threadText.slice(0, 100)}...</p>
      )}
    </div>
  )
}
