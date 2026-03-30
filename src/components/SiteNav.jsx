import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SiteNav({ onOpenSettings, isToolPage }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="site-nav">
      <div className="nav-left">
        {isToolPage && <Link to="/" className="nav-back">← tools</Link>}
        <Link to="/" className="nav-wordmark">Vellumere</Link>
      </div>

      <div className="nav-right">
        <button
          className="settings-gear"
          onClick={onOpenSettings}
          title="API Key Settings"
          aria-label="Open settings"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>

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
