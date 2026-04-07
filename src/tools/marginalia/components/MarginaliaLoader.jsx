// Loading state — the scholar is reading.

const MESSAGES = [
  'The scholar is reading with a pen in hand...',
  'Annotating the margins...',
  'Cross-referencing with the library...',
  'Fermat is scribbling in the margins...',
]

export default function MarginaliaLoader() {
  const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]

  return (
    <div className="marginalia-loader">
      <div className="marginalia-loader-dots">
        <span className="loader-dot" />
        <span className="loader-dot" />
        <span className="loader-dot" />
      </div>
      <p className="marginalia-loader-text">{message}</p>
    </div>
  )
}
