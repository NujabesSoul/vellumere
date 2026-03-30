import { useState, useCallback } from 'react'
import SiteNav from '../../components/SiteNav.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import HelpTooltip from '../../components/HelpTooltip.jsx'
import DailyExamen from './components/DailyExamen.jsx'
import PastEntries from './components/PastEntries.jsx'
import ExamCalendar from './components/ExamCalendar.jsx'
import MonthlyReflection from './components/MonthlyReflection.jsx'
import DataPortability from './components/DataPortability.jsx'
import './examination.css'

// The Examination
// Five questions. 60 seconds. No one sees this but you.
// The insight comes from the accumulation, not the measurement.

export default function Examination() {
  const [view, setView] = useState('today')
  const [refreshKey, setRefreshKey] = useState(0)

  const handleEntrySaved = useCallback(() => {
    // Force re-render of calendar and past entries after save
    setRefreshKey(k => k + 1)
  }, [])

  return (
    <div className="the-examination">
      <SiteNav isToolPage />

      <header className="examination-header">
        <h1 className="examination-title">The Examination</h1>
        <p className="examination-subtitle">
          Five questions. 60 seconds. Be honest.
          <HelpTooltip text="A daily reflection practice borrowed from the monastic Examen, practiced since the 6th century. Five questions rooted in Renaissance principles: creation, curiosity, physical engagement, cross-domain thinking, and comfort with the unfinished. No streaks, no scores. Just questions and honest answers. The insight comes from the accumulation." />
        </p>
      </header>

      <main className="examination-main">
        <div className="exam-tabs">
          <button
            className={`exam-tab${view === 'today' ? ' active' : ''}`}
            onClick={() => setView('today')}
          >
            Today
          </button>
          <button
            className={`exam-tab${view === 'history' ? ' active' : ''}`}
            onClick={() => setView('history')}
          >
            History
          </button>
          <button
            className={`exam-tab${view === 'calendar' ? ' active' : ''}`}
            onClick={() => setView('calendar')}
          >
            Calendar
          </button>
        </div>

        {view === 'today' && (
          <DailyExamen key={refreshKey} onEntrySaved={handleEntrySaved} />
        )}

        {view === 'history' && (
          <PastEntries key={refreshKey} />
        )}

        {view === 'calendar' && (
          <div key={refreshKey}>
            <ExamCalendar />
            <MonthlyReflection />
            <DataPortability onImport={() => setRefreshKey(k => k + 1)} />
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
