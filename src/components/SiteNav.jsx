import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SiteNav({ isToolPage }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="site-nav">
      <div className="nav-left">
        {isToolPage && <Link to="/" className="nav-back">← tools</Link>}
        <Link to="/" className="nav-wordmark">Vellumere</Link>
      </div>

      <div className="nav-right">
        {!isToolPage && (
          <>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>

            <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
              <li><a href="#tools">tools</a></li>
              <li><a href="#about">about</a></li>
            </ul>
          </>
        )}
      </div>
    </nav>
  )
}
