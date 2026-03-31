import ResourceItem from './ResourceItem.jsx'

export default function PhaseCard({ phase, index }) {
  return (
    <div
      className="phase-card"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="phase-number-circle">
        {phase.number}
      </div>

      <h3 className="phase-name">{phase.name}</h3>
      <p className="phase-subtitle">{phase.subtitle}</p>

      {phase.safety && (
        <div className="phase-safety">
          <span className="phase-safety-label">Safety First</span>
          <p className="phase-safety-text">{phase.safety}</p>
        </div>
      )}

      <ol className="phase-actions">
        {phase.actions.map((action, i) => (
          <li key={i} className="phase-action">{action}</li>
        ))}
      </ol>

      {phase.avoid && (
        <div className="phase-avoid">
          <span className="phase-avoid-label">Avoid This</span>
          <p className="phase-avoid-text">{phase.avoid}</p>
        </div>
      )}

      {phase.ready_when && (
        <div className="phase-ready">
          <span className="phase-ready-label">You'll Know You're Ready</span>
          <p className="phase-ready-text">{phase.ready_when}</p>
        </div>
      )}

      {phase.resources && phase.resources.length > 0 && (
        <div className="phase-resources">
          <span className="phase-resources-label">Resources</span>
          <div className="phase-resources-list">
            {phase.resources.map((resource, i) => (
              <ResourceItem key={i} resource={resource} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
