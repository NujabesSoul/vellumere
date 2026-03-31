import { useState } from 'react'

// The two-domain selector — the heart of the Ars Combinatoria.
// Two wheels, side by side, with a collision point between them.
// Pick, type, or spin.

const PRESET_DOMAINS = [
  'Architecture', 'Beekeeping', 'Calligraphy', 'Cartography',
  'Chess', 'Cooking', 'Cryptography', 'Dance',
  'Forensics', 'Gardening', 'Glassblowing', 'Linguistics',
  'Locksmithing', 'Metallurgy', 'Mycology', 'Navigation',
  'Origami', 'Perfumery', 'Puppetry', 'Rhetoric',
  'Shipbuilding', 'Taxidermy', 'Typography', 'Watchmaking',
]

function pickRandom(exclude) {
  const available = PRESET_DOMAINS.filter(d => d !== exclude)
  return available[Math.floor(Math.random() * available.length)]
}

export default function DomainSelector({ onCollide, isLoading, initialDomainA = '' }) {
  const [domainA, setDomainA] = useState(initialDomainA)
  const [domainB, setDomainB] = useState('')

  const handleCollide = () => {
    const a = domainA.trim()
    const b = domainB.trim()
    if (a && b && !isLoading) {
      onCollide(a, b)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleCollide()
  }

  const handleRandomBoth = () => {
    const a = pickRandom()
    const b = pickRandom(a)
    setDomainA(a)
    setDomainB(b)
    if (!isLoading) {
      onCollide(a, b)
    }
  }

  const handleRandomA = () => {
    const a = pickRandom(domainB)
    setDomainA(a)
  }

  const handleRandomB = () => {
    const b = pickRandom(domainA)
    setDomainB(b)
  }

  const canCollide = domainA.trim() && domainB.trim() && !isLoading

  return (
    <form className="domain-selector" onSubmit={handleSubmit}>
      <div className="domain-wheels">
        <div className="domain-wheel">
          <label className="domain-label">Domain A</label>
          <div className="domain-input-row">
            <input
              type="text"
              className="domain-input"
              value={domainA}
              onChange={e => setDomainA(e.target.value)}
              placeholder="e.g., Origami"
              disabled={isLoading}
              spellCheck={false}
            />
            <button
              type="button"
              className="domain-random"
              onClick={handleRandomA}
              disabled={isLoading}
              title="Random domain"
            >
              ↻
            </button>
          </div>
        </div>

        <div className="domain-collision-symbol">
          ×
        </div>

        <div className="domain-wheel">
          <label className="domain-label">Domain B</label>
          <div className="domain-input-row">
            <input
              type="text"
              className="domain-input"
              value={domainB}
              onChange={e => setDomainB(e.target.value)}
              placeholder="e.g., Forensics"
              disabled={isLoading}
              spellCheck={false}
            />
            <button
              type="button"
              className="domain-random"
              onClick={handleRandomB}
              disabled={isLoading}
              title="Random domain"
            >
              ↻
            </button>
          </div>
        </div>
      </div>

      <div className="domain-actions">
        <button
          type="submit"
          className="collide-btn"
          disabled={!canCollide}
        >
          Collide
        </button>
        <button
          type="button"
          className="random-both-btn"
          onClick={handleRandomBoth}
          disabled={isLoading}
        >
          ↻ Spin Both
        </button>
      </div>
    </form>
  )
}
