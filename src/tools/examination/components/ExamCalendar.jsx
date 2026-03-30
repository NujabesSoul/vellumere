import { useState, useMemo } from 'react'
import { STORAGE_KEY } from '../prompt.js'

// A simple month calendar showing which days have entries.
// The gaps ARE the data. No judgment, just visibility.

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay()
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function ExamCalendar() {
  const now = new Date()
  const [viewYear, setViewYear] = useState(now.getFullYear())
  const [viewMonth, setViewMonth] = useState(now.getMonth())

  const entryDates = useMemo(() => {
    const entries = loadEntries()
    return new Set(entries.map(e => e.date))
  }, [viewYear, viewMonth])

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth)
  const todayStr = now.toISOString().split('T')[0]

  const goBack = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const goForward = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const days = []
  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="cal-cell cal-empty" />)
  }
  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const hasEntry = entryDates.has(dateStr)
    const isToday = dateStr === todayStr

    days.push(
      <div
        key={d}
        className={`cal-cell${isToday ? ' cal-today' : ''}${hasEntry ? ' cal-has-entry' : ''}`}
      >
        <span className="cal-day-number">{d}</span>
        {hasEntry && <span className="cal-dot" />}
      </div>
    )
  }

  return (
    <div className="exam-calendar">
      <div className="cal-header">
        <button className="cal-nav" onClick={goBack}>←</button>
        <span className="cal-month-label">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button className="cal-nav" onClick={goForward}>→</button>
      </div>
      <div className="cal-weekdays">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="cal-weekday">{d}</div>
        ))}
      </div>
      <div className="cal-grid">
        {days}
      </div>
    </div>
  )
}
