import { Link } from 'react-router-dom'

// The journey continues. Each tool suggests the next step.
// This is guidance, not requirement — tools still work standalone.

const JOURNEY_ORDER = [
  { name: 'The Permission Machine', route: '/permission' },
  { name: 'The Apprenticeship', route: '/apprenticeship' },
  { name: 'The Thread Lab', route: '/connessione' },
  { name: 'The Collision Lab', route: '/combinatoria' },
  { name: 'The Decoder', route: '/decoder' },
  { name: 'The Examination', route: '/examination' },
  { name: 'The Commonplace Engine', route: '/commonplace' },
  { name: 'The Cognitive Tide Chart', route: '/tide' },
  { name: 'The Marginalia Reader', route: '/marginalia' },
]

export default function JourneyLink({ currentRoute }) {
  const currentIndex = JOURNEY_ORDER.findIndex(t => t.route === currentRoute)
  if (currentIndex === -1) return null
  const next = JOURNEY_ORDER[(currentIndex + 1) % JOURNEY_ORDER.length]

  return (
    <div className="journey-link-container">
      <Link to={next.route} className="journey-link">
        Continue the journey → {next.name}
      </Link>
    </div>
  )
}
