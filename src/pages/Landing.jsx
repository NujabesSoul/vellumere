import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

const CHAMBERS = [
  {
    id: 'threshold',
    name: 'The Threshold',
    question: 'I can\'t begin.',
    purpose: 'For when you can\'t begin.',
    description: 'For when you need permission, direction, or a collision to shake something loose.',
    instruments: [
      {
        name: 'The Permission Machine',
        useWhen: 'You want to do something but feel like you need credentials, permission, or proof you\'re allowed.',
        origin: 'Renaissance autodidacts',
        route: '/permission',
      },
      {
        name: 'The Cognitive Tide Chart',
        useWhen: 'You don\'t know what kind of work fits the state you\'re in right now.',
        origin: 'Tidal charts · lunar calendars · the Old Farmer\'s Almanac',
        route: '/tide',
      },
      {
        name: 'The Collision Lab',
        useWhen: 'You\'re staring at a blank page and need two unrelated ideas to crash into each other.',
        origin: 'Ramon Llull · 1305',
        route: '/combinatoria',
      },
    ],
  },
  {
    id: 'workshop',
    name: 'The Workshop',
    question: 'I\'m in the work.',
    purpose: 'For when you\'re in the work.',
    description: 'For when you\'re building, capturing, or following a thread that\'s already moving.',
    instruments: [
      {
        name: 'The Apprenticeship',
        useWhen: 'You want to learn something new and need a phase-based roadmap from week one to confidence.',
        origin: 'Medieval guild progression · Apprentice → Master',
        route: '/apprenticeship',
      },
      {
        name: 'The Commonplace Engine',
        useWhen: 'You just read, heard, or thought something worth keeping, and want to see what it connects to.',
        origin: 'John Locke · Erasmus · commonplace tradition',
        route: '/commonplace',
      },
      {
        name: 'The Thread Lab',
        useWhen: 'You\'re working on something and want techniques stolen from a completely different field.',
        origin: 'Leonardo da Vinci · Connessione',
        route: '/connessione',
      },
    ],
  },
  {
    id: 'scriptorium',
    name: 'The Scriptorium',
    question: 'I need to make sense of this.',
    purpose: 'For when you need to make sense.',
    description: 'For when you have material and need to digest it, translate it, or reflect on what it means.',
    instruments: [
      {
        name: 'The Marginalia Reader',
        useWhen: 'You just read something interesting and want a Renaissance scholar to annotate the margins.',
        origin: 'Fermat\'s marginalia · monastic scribes',
        route: '/marginalia',
      },
      {
        name: 'The Decoder',
        useWhen: 'You have a complex idea and need to explain it three ways: for an expert, a beginner, and a skeptic.',
        origin: 'Medieval translators',
        route: '/decoder',
      },
      {
        name: 'The Examination',
        useWhen: 'Your day is ending and you want five honest questions to find what it meant.',
        origin: 'Monastic examination of conscience',
        route: '/examination',
      },
    ],
  },
]

function DiagnosticCard({ chamber }) {
  return (
    <a href={`#${chamber.id}`} className="diagnostic-card">
      <p className="diagnostic-question">{chamber.question}</p>
      <h3 className="diagnostic-chamber">{chamber.name}</h3>
      <p className="diagnostic-description">{chamber.description}</p>
    </a>
  )
}

function InstrumentCard({ name, useWhen, origin, route }) {
  return (
    <Link to={route} className="instrument-card">
      <h4 className="instrument-card-name">{name}</h4>
      <p className="instrument-card-usewhen">
        <span className="instrument-card-label">Use this when:</span>{' '}
        {useWhen}
      </p>
      <span className="instrument-card-origin">{origin}</span>
    </Link>
  )
}

function ChamberSection({ chamber }) {
  return (
    <section className="chamber-section" id={chamber.id}>
      <h2 className="chamber-title">{chamber.name}</h2>
      <p className="chamber-purpose">{chamber.purpose}</p>
      <div className="instrument-cards">
        {chamber.instruments.map(instrument => (
          <InstrumentCard key={instrument.name} {...instrument} />
        ))}
      </div>
    </section>
  )
}

export default function Landing() {
  return (
    <div className="landing">
      <SiteNav />

      <main className="landing-main">
        <section className="hero">
          <h1 className="hero-title">Vellumere</h1>
          <p className="hero-subtitle">
            Instruments for thinking. For the kind of mind that has too many interests to fit one box.
          </p>
          <p className="hero-intro">
            Most people use AI to skip the work of thinking. These instruments help you do the
            work better. Each one is a single-purpose cognitive tool. Pick it up, use it,
            put it down. No system to adopt. No workflow to maintain. Just nine ways to
            unstick your mind.
          </p>
        </section>

        <section className="diagnostic-router">
          <h2 className="diagnostic-title">Where are you right now?</h2>
          <div className="diagnostic-cards">
            {CHAMBERS.map(chamber => (
              <DiagnosticCard key={chamber.id} chamber={chamber} />
            ))}
          </div>
        </section>

        {CHAMBERS.map(chamber => (
          <ChamberSection key={chamber.id} chamber={chamber} />
        ))}

        <section className="about-section" id="about">
          <h2 className="about-title">About</h2>
          <p className="about-text">
            These tools exist because the best ideas come from connecting things that
            aren't supposed to be connected. Each one borrows a technique from history
            (medieval guilds, Renaissance workshops, monastic reflection) and makes
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
