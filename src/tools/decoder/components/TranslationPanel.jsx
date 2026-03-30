// A single translation panel — Expert, Curious, or Skeptic.
// Each is a genuinely different explanation, not a dumbed-down version of the other.

const PANEL_CONFIG = {
  expert: {
    title: 'The Expert',
    subLabel: 'assumes',
    colorClass: 'panel-expert',
  },
  curious: {
    title: 'The Curious',
    subLabel: 'analogy',
    colorClass: 'panel-curious',
  },
  skeptic: {
    title: 'The Skeptic',
    subLabel: 'bottom line',
    colorClass: 'panel-skeptic',
  },
}

export default function TranslationPanel({ type, translation, isActive }) {
  const config = PANEL_CONFIG[type]
  const subValue = type === 'expert' ? translation.assumes
    : type === 'curious' ? translation.analogy
    : translation.bottom_line

  return (
    <div className={`translation-panel ${config.colorClass}${isActive ? ' panel-visible' : ''}`}>
      <header className="panel-header">
        <h3 className="panel-title">{config.title}</h3>
        {subValue && (
          <p className="panel-subline">
            <span className="panel-sub-label">{config.subLabel}:</span> {subValue}
          </p>
        )}
      </header>
      {translation.direct_quote && (
        <blockquote className="panel-quote">
          "{translation.direct_quote}"
        </blockquote>
      )}
      <div className="panel-body">
        {translation.text.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}
