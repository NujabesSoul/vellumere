// Loading state — the scholar is cataloguing.

const MESSAGES = [
  'Cross-referencing the collection...',
  'The librarian is reading the margins...',
  'Locke is updating the index...',
  'Tracing threads between entries...',
]

export default function CommonplaceLoader() {
  const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]

  return (
    <div className="commonplace-loader">
      <div className="commonplace-loader-dots">
        <span className="loader-dot" />
        <span className="loader-dot" />
        <span className="loader-dot" />
      </div>
      <p className="commonplace-loader-text">{message}</p>
    </div>
  )
}
