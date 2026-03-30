import { Link } from 'react-router-dom'

export default function ToolCard({ name, description, origin, route, status }) {
  const isLive = status === 'live'

  const content = (
    <>
      <div className="tool-card-header">
        <span className="tool-card-name">{name}</span>
        {!isLive && <span className="tool-card-badge">coming soon</span>}
      </div>
      <p className="tool-card-description">{description}</p>
      <span className="tool-card-origin">{origin}</span>
    </>
  )

  if (isLive) {
    return (
      <Link to={route} className="tool-card live">
        {content}
      </Link>
    )
  }

  return (
    <div className="tool-card coming-soon">
      {content}
    </div>
  )
}
