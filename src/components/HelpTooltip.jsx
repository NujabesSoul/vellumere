import { useState } from 'react'

export default function HelpTooltip({ text }) {
  const [show, setShow] = useState(false)

  return (
    <span className="help-tooltip-container">
      <span
        className="help-tooltip-trigger"
        tabIndex={0}
        onClick={() => setShow(prev => !prev)}
        onMouseEnter={() => { if (window.innerWidth > 768) setShow(true) }}
        onMouseLeave={() => { if (window.innerWidth > 768) setShow(false) }}
      >?</span>
      {show && (
        <span className="help-tooltip">{text}</span>
      )}
    </span>
  )
}
