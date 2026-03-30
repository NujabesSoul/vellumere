import SiteNav from '../components/SiteNav.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import ToolCard from '../components/ToolCard.jsx'

const TOOLS = [
  {
    name: 'The Connessione Engine',
    description: 'Enter any topic. Discover techniques from other fields that can transform your approach. Cross-domain transfer, not cute similarities.',
    origin: 'Leonardo da Vinci · Connessione',
    route: '/connessione',
    status: 'live',
  },
  {
    name: 'The Permission Machine',
    description: 'A permission slip from history\'s autodidacts. For when you need someone to tell you it\'s okay to start.',
    origin: 'Renaissance autodidacts',
    route: '/permission',
    status: 'live',
  },
  {
    name: 'The Ars Combinatoria',
    description: 'A 13th-century combination wheel, rebuilt. Spin concepts together and see what emerges from the collision.',
    origin: 'Ramon Llull · 1305',
    route: '/combinatoria',
    status: 'live',
  },
  {
    name: 'The Diplomatic Decoder',
    description: 'Translate between disciplines. Take an idea from one field and render it legible to another.',
    origin: 'Medieval translators',
    route: '/decoder',
    status: 'live',
  },
  {
    name: 'The Examination',
    description: 'A structured reflection practice borrowed from monastic tradition. What did you learn? What did you miss? What changes?',
    origin: 'Monastic examination of conscience',
    route: '/examination',
    status: 'live',
  },
]

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

        <section className="tools-section" id="tools">
          <h2 className="tools-section-title">The Tools</h2>
          <div className="tools-grid">
            {TOOLS.map(tool => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <h2 className="about-title">About</h2>
          <p className="about-text">
            Vellumere is named after vellum — the material scholars used to preserve
            knowledge for centuries. These tools are experiments in cross-domain thinking:
            the belief that the best ideas come from connecting things that aren't
            supposed to be connected.
          </p>
          <p className="about-text">
            They're built by CK, a Renaissance Craftsman who reads too much and builds
            too many things. Some of these tools use AI. None of them are trying to
            replace your thinking. They're trying to help you see what you weren't
            looking at.
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
