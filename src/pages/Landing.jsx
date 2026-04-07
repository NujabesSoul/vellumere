import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

const JOURNEY_STEPS = [
  {
    step: 1,
    name: 'The Permission Machine',
    journeyDescription: 'Type what you want to do or become. Meet three people from history who did it without permission, credentials, or training.',
    origin: 'Renaissance autodidacts',
    route: '/permission',
    status: 'live',
  },
  {
    step: 2,
    name: 'The Apprenticeship',
    journeyDescription: 'Type what you want to learn. Get a phase-based roadmap from your first week to confident practitioner.',
    origin: 'Medieval guild progression · Apprentice → Master',
    route: '/apprenticeship',
    status: 'live',
  },
  {
    step: 3,
    name: 'The Thread Lab',
    journeyDescription: 'Type any topic you\'re learning or working on. Get techniques from completely different fields that can improve your approach.',
    origin: 'Leonardo da Vinci · Connessione',
    route: '/connessione',
    status: 'live',
  },
  {
    step: 4,
    name: 'The Collision Lab',
    journeyDescription: 'Pick two random subjects. Discover ideas, projects, and insights that only exist where they collide.',
    origin: 'Ramon Llull · 1305',
    route: '/combinatoria',
    status: 'live',
  },
  {
    step: 5,
    name: 'The Decoder',
    journeyDescription: 'Paste any complex idea. See it explained three ways — for an expert, a curious beginner, and an impatient skeptic.',
    origin: 'Medieval translators',
    route: '/decoder',
    status: 'live',
  },
  {
    step: 6,
    name: 'The Examination',
    journeyDescription: 'Five questions about your day. Sixty seconds. No scores, no streaks. Patterns emerge over time.',
    origin: 'Monastic examination of conscience',
    route: '/examination',
    status: 'live',
  },
  {
    step: 7,
    name: 'The Cognitive Tide Chart',
    journeyDescription: 'Select your working state. See what kinds of work suit the tide you\'re in — and what to leave for another day.',
    origin: 'Tidal charts · lunar calendars · the Old Farmer\'s Almanac',
    route: '/tide',
    status: 'live',
  },
  {
    step: 8,
    name: 'The Commonplace Engine',
    journeyDescription: 'Capture passages, quotes, and half-thoughts from your reading and life. The collection finds the connections you missed.',
    origin: 'John Locke · Erasmus · commonplace tradition',
    route: '/commonplace',
    status: 'live',
  },
]

function JourneyStep({ step, name, journeyDescription, origin, route, status }) {
  const isLive = status === 'live'

  return (
    <div className="journey-step">
      <span className="journey-step-number">{step}</span>
      <div className="journey-step-content">
        {isLive ? (
          <Link to={route} className="journey-step-name">{name}</Link>
        ) : (
          <span className="journey-step-name coming-soon">{name}</span>
        )}
        <p className="journey-step-description">{journeyDescription}</p>
        <span className="journey-step-origin">{origin}</span>
      </div>
    </div>
  )
}

export default function Landing() {
  return (
    <div className="landing">
      <SiteNav />

      <main className="landing-main">
        <section className="hero">
          <h1 className="hero-title">Vellumere</h1>
          <p className="hero-subtitle">Renaissance thinking tools for the curious.</p>
          <p className="hero-intro">
            Each tool borrows a technique from history and wires it to a modern AI.
            A 13th-century combination wheel. A cross-domain pattern engine.
            A permission slip from Leonardo da Vinci.
            They're built to help you think differently — or at least
            think about why you're not.
          </p>
        </section>

        <section className="journey-section" id="tools">
          <h2 className="journey-section-title">The Journey</h2>
          <p className="journey-section-subtitle">
            Nine instruments. One path. From permission to practice.
          </p>
          <div className="journey-steps">
            {JOURNEY_STEPS.map(step => (
              <JourneyStep key={step.name} {...step} />
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <h2 className="about-title">About</h2>
          <p className="about-text">
            These tools exist because the best ideas come from connecting things that
            aren't supposed to be connected. Each one borrows a technique from history
            — medieval guilds, Renaissance workshops, monastic reflection — and makes
            it useful today.
          </p>
          <p className="about-text">
            They're free. They're experiments. And they're getting better with every
            person who tries them and tells me what's broken.
          </p>
          <a href="https://heyheyitsck.com" className="about-link" target="_blank" rel="noopener noreferrer">
            More about CK →
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
