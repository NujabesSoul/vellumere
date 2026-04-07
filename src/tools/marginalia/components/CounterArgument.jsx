import { useState, useCallback } from 'react'
import { query } from '../../../services/api.js'
import { COUNTER_ARGUMENT_PROMPT } from '../prompt.js'

// "Make It Stronger" — argue against the author.
// The best way to honor an argument is to test it.

export default function CounterArgument({ sourceText }) {
  const [state, setState] = useState('idle')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const handleGenerate = useCallback(async () => {
    setState('loading')
    setError(null)
    setData(null)

    try {
      const raw = await query({
        systemPrompt: COUNTER_ARGUMENT_PROMPT,
        userMessage: sourceText,
      })

      let jsonText = raw.trim()
      const codeBlockMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/)
      if (codeBlockMatch) {
        jsonText = codeBlockMatch[1].trim()
      }

      let result
      try {
        result = JSON.parse(jsonText)
      } catch {
        throw new Error('The counter-argument came back illegible. The craftsman blames the quill. Try again.')
      }

      if (!result.counter_argument) {
        throw new Error('The argument was empty. Try again.')
      }

      setData(result)
      setState('results')
    } catch (err) {
      setError(err.message)
      setState('error')
    }
  }, [sourceText])

  return (
    <div className="counter-argument">
      {state === 'idle' && (
        <button className="counter-btn" onClick={handleGenerate}>
          Make It Stronger
        </button>
      )}

      {state === 'loading' && (
        <p className="counter-loading">The craftsman is sharpening the argument...</p>
      )}

      {state === 'results' && data && (
        <div className="counter-result">
          <span className="counter-label">Counter-Argument</span>
          <div className="counter-claim">
            <span className="counter-claim-label">The Author's Claim</span>
            <p>{data.main_claim}</p>
          </div>
          <div className="counter-body">
            <p>{data.counter_argument}</p>
          </div>
          {data.question && (
            <div className="counter-question">
              <span className="counter-question-label">A Question for the Author</span>
              <p>{data.question}</p>
            </div>
          )}
        </div>
      )}

      {state === 'error' && (
        <div className="counter-error">
          <p className="counter-error-text">{error}</p>
          <button className="counter-btn" onClick={handleGenerate}>
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
