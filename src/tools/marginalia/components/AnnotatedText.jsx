import { useState } from 'react'

// The two-column annotated reading.
// Center column: original text with highlighted passages.
// Margin column: scholar's notes anchored to the highlighted passages.
// On mobile: annotations expand inline after each passage.

const TYPE_LABELS = {
  'cross-domain': 'Cross-Domain',
  'tension': 'Tension',
  'different-reasons': 'Right, Different Reasons',
  'assumption': 'Assumption',
  'precedent': 'Precedent',
}

function findAnnotationPositions(sourceText, annotations) {
  // Find the position of each quoted phrase in the source text
  return annotations.map(ann => {
    const idx = sourceText.indexOf(ann.quote)
    return { ...ann, position: idx }
  }).sort((a, b) => {
    // Valid positions first, in order; unfound quotes at the end
    if (a.position === -1 && b.position === -1) return 0
    if (a.position === -1) return 1
    if (b.position === -1) return -1
    return a.position - b.position
  })
}

function splitTextWithAnnotations(sourceText, sortedAnnotations) {
  // Split the source text into segments, marking which have annotations
  const segments = []
  let cursor = 0

  for (const ann of sortedAnnotations) {
    if (ann.position === -1) continue

    // Text before this annotation
    if (ann.position > cursor) {
      segments.push({
        type: 'text',
        content: sourceText.slice(cursor, ann.position),
      })
    }

    // The annotated phrase
    segments.push({
      type: 'annotated',
      content: ann.quote,
      annotation: ann,
    })

    cursor = ann.position + ann.quote.length
  }

  // Remaining text
  if (cursor < sourceText.length) {
    segments.push({
      type: 'text',
      content: sourceText.slice(cursor),
    })
  }

  // Annotations that couldn't be matched — show them at the end
  const unmatched = sortedAnnotations.filter(a => a.position === -1)

  return { segments, unmatched }
}

export default function AnnotatedText({ sourceText, annotations, overallNote }) {
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [activeMargin, setActiveMargin] = useState(null)

  const sorted = findAnnotationPositions(sourceText, annotations)
  const { segments, unmatched } = splitTextWithAnnotations(sourceText, sorted)

  // For margin notes on desktop
  const matchedAnnotations = sorted.filter(a => a.position !== -1)

  const toggleInline = (idx) => {
    setExpandedIndex(prev => prev === idx ? null : idx)
  }

  let annotationCounter = 0

  return (
    <div className="annotated-text">
      {/* Two-column layout: text + margins */}
      <div className="annotated-columns">
        <div className="annotated-source">
          {segments.map((seg, i) => {
            if (seg.type === 'text') {
              return <span key={i}>{seg.content}</span>
            }

            const annIdx = annotationCounter
            annotationCounter++

            return (
              <span key={i}>
                <mark
                  className={`annotated-highlight type-${seg.annotation.type}`}
                  onClick={() => {
                    toggleInline(annIdx)
                    setActiveMargin(prev => prev === annIdx ? null : annIdx)
                  }}
                  data-annotation-index={annIdx}
                >
                  {seg.content}
                  <sup className="annotation-marker">{annIdx + 1}</sup>
                </mark>

                {/* Inline annotation for mobile */}
                {expandedIndex === annIdx && (
                  <span className="inline-annotation">
                    <span className="inline-annotation-type">
                      {TYPE_LABELS[seg.annotation.type] || seg.annotation.type}
                    </span>
                    <span className="inline-annotation-note">{seg.annotation.note}</span>
                  </span>
                )}
              </span>
            )
          })}
        </div>

        {/* Margin notes for desktop */}
        <aside className="annotated-margins">
          {matchedAnnotations.map((ann, i) => (
            <div
              key={i}
              className={`margin-note${activeMargin === i ? ' active' : ''}`}
              onClick={() => setActiveMargin(prev => prev === i ? null : i)}
            >
              <span className="margin-number">{i + 1}</span>
              <span className="margin-type">{TYPE_LABELS[ann.type] || ann.type}</span>
              <p className="margin-text">{ann.note}</p>
            </div>
          ))}
        </aside>
      </div>

      {/* Unmatched annotations — couldn't find exact quote */}
      {unmatched.length > 0 && (
        <div className="unmatched-annotations">
          <span className="unmatched-label">Additional Notes</span>
          {unmatched.map((ann, i) => (
            <div key={i} className="unmatched-note">
              <span className="unmatched-type">{TYPE_LABELS[ann.type] || ann.type}</span>
              <p className="unmatched-quote">"{ann.quote}"</p>
              <p className="unmatched-text">{ann.note}</p>
            </div>
          ))}
        </div>
      )}

      {/* Overall note */}
      {overallNote && (
        <div className="overall-note">
          <span className="overall-note-label">The Scholar's Verdict</span>
          <p>{overallNote}</p>
        </div>
      )}
    </div>
  )
}
