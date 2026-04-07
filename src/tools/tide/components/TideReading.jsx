import { Link } from 'react-router-dom'

// The result of a tide reading.
// What suits this state, what doesn't, and what it means.

export default function TideReading({ data, onReset }) {
  if (!data) return null

  return (
    <div className="tide-reading">
      <div className="tide-reading-header">
        <button className="tide-back-btn" onClick={onReset}>
          ← Check Again
        </button>
        <span className="tide-state-label">{data.state_name}</span>
      </div>

      {/* The Reading — the poetic paragraph */}
      <div className="tide-paragraph">
        <p>{data.reading}</p>
      </div>

      {/* Instruments for this state */}
      <div className="tide-section">
        <span className="tide-section-label">Instruments for This Tide</span>
        <div className="tide-instruments">
          {data.instruments.map((inst, i) => (
            <Link key={i} to={inst.route} className="tide-instrument-link">
              <span className="tide-instrument-name">{inst.name}</span>
              <span className="tide-instrument-why">{inst.why}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Analog work */}
      <div className="tide-section">
        <span className="tide-section-label">Analog Work</span>
        <div className="tide-items">
          {data.analog_work.map((item, i) => (
            <div key={i} className="tide-item">
              <span className="tide-item-activity">{item.activity}</span>
              <span className="tide-item-why">{item.why}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Avoid */}
      <div className="tide-section">
        <span className="tide-section-label">Not Now</span>
        <div className="tide-items avoid">
          {data.avoid.map((item, i) => (
            <div key={i} className="tide-item">
              <span className="tide-item-activity">{item.activity}</span>
              <span className="tide-item-why">{item.why}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
