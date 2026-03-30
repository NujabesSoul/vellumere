import { useState, useEffect } from 'react'
import QuestionCard from './QuestionCard.jsx'
import { QUESTIONS, STORAGE_KEY } from '../prompt.js'

// The daily five-question form.
// 60 seconds. No one sees this but you.

function getToday() {
  return new Date().toISOString().split('T')[0]
}

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export default function DailyExamen({ onEntrySaved }) {
  const today = getToday()
  const [answers, setAnswers] = useState({})
  const [todayEntry, setTodayEntry] = useState(null)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const entries = loadEntries()
    const existing = entries.find(e => e.date === today)
    if (existing) {
      setTodayEntry(existing)
      setAnswers(existing.answers)
    }
  }, [today])

  const handleChange = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    const entry = {
      date: today,
      answers: { ...answers },
      timestamp: new Date().toISOString(),
    }

    const entries = loadEntries()
    const idx = entries.findIndex(e => e.date === today)
    if (idx >= 0) {
      entries[idx] = entry
    } else {
      entries.push(entry)
    }
    saveEntries(entries)

    setTodayEntry(entry)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    if (onEntrySaved) onEntrySaved()
  }

  const hasAnyAnswer = QUESTIONS.some(q => answers[q.key]?.trim())
  const isReadOnly = todayEntry && !editing

  return (
    <div className="daily-examen">
      {todayEntry && !editing && (
        <div className="examen-today-banner">
          <span className="examen-today-text">Already reflected today.</span>
          <button className="examen-edit-btn" onClick={() => setEditing(true)}>
            Edit
          </button>
        </div>
      )}

      <div className="examen-questions">
        {QUESTIONS.map(q => (
          <QuestionCard
            key={q.key}
            question={q.question}
            principle={q.principle}
            value={answers[q.key] || ''}
            onChange={val => handleChange(q.key, val)}
            readOnly={isReadOnly}
          />
        ))}
      </div>

      {!isReadOnly && (
        <div className="examen-submit-area">
          <button
            className="examen-submit"
            onClick={handleSubmit}
            disabled={!hasAnyAnswer}
          >
            {todayEntry ? 'Update Today\'s Examination' : 'Complete Today\'s Examination'}
          </button>
          <p className="examen-submit-note">
            Takes 60 seconds. No one sees this but you.
          </p>
        </div>
      )}

      {saved && (
        <p className="examen-saved-message">Saved.</p>
      )}
    </div>
  )
}
