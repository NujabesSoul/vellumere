// Loading state — reading the tide.

const MESSAGES = [
  'Reading the current...',
  'Consulting the almanac...',
  'Checking the lunar tables...',
  'The tide reader squints at the water...',
]

export default function TideLoader() {
  const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]

  return (
    <div className="tide-loader">
      <div className="tide-loader-dots">
        <span className="loader-dot" />
        <span className="loader-dot" />
        <span className="loader-dot" />
      </div>
      <p className="tide-loader-text">{message}</p>
    </div>
  )
}
