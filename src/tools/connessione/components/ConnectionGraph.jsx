import { useState, useRef, useEffect } from 'react'
import { calculateRadialLayout, generateCurvePath, getUnexpectednessColor } from '../utils/graph-layout.js'
import ConnectionCard from './ConnectionCard.jsx'

// Leonardo's Layer — The Eye.
// Everything visual. Connections rendered as hand-drawn lines
// between concept nodes on a notebook page.
// SVG because Leonardo would have loved vector graphics.
// (He basically invented them, just with a quill instead of code.)

const NODE_RADIUS = 38
const CENTER_RADIUS = 48

export default function ConnectionGraph({ data, onExploreDeeper }) {
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [animatedLines, setAnimatedLines] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({
          width: Math.max(rect.width, 400),
          height: Math.max(Math.min(rect.width * 0.75, 700), 450),
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Animate lines drawing in one by one
  useEffect(() => {
    setAnimatedLines(0)
    const count = data.connections.length
    let current = 0
    const interval = setInterval(() => {
      current++
      setAnimatedLines(current)
      if (current >= count) clearInterval(interval)
    }, 300)
    return () => clearInterval(interval)
  }, [data])

  const { width, height } = dimensions
  const centerX = width / 2
  const centerY = height / 2
  const orbitRadius = Math.min(width, height) * 0.35

  const positions = calculateRadialLayout(
    data.connections.length, centerX, centerY, orbitRadius
  )

  return (
    <div className="connection-graph" ref={containerRef}>
      <div className="graph-core-pattern">
        <span className="core-pattern-label">Core Pattern</span>
        <p>{data.core_pattern}</p>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="graph-svg"
        style={{ width: '100%', height: height }}
      >
        {/* SVG filter for that hand-drawn ink feel */}
        <defs>
          <filter id="ink-rough">
            <feTurbulence baseFrequency="0.04" numOctaves="4" seed="2" />
            <feDisplacementMap in="SourceGraphic" scale="1.5" />
          </filter>
          <filter id="ink-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines — quadratic beziers, slightly wobbly, like pen strokes */}
        {data.connections.map((conn, i) => {
          if (i >= animatedLines) return null
          const pos = positions[i]
          const path = generateCurvePath(centerX, centerY, pos.x, pos.y, i)
          const color = getUnexpectednessColor(conn.unexpectedness)
          return (
            <path
              key={`line-${i}`}
              d={path}
              className="graph-connection-line"
              stroke={color}
              strokeWidth={expandedIndex === i ? 2.5 : 1.5}
              fill="none"
              strokeDasharray="1000"
              strokeDashoffset="0"
              style={{
                opacity: expandedIndex !== null && expandedIndex !== i ? 0.3 : 0.7,
                animation: `draw-line 0.8s ease-out forwards`,
              }}
            />
          )
        })}

        {/* Center node — the input concept, the sun of this system */}
        <g className="graph-center-node">
          <circle
            cx={centerX}
            cy={centerY}
            r={CENTER_RADIUS}
            className="center-circle"
          />
          <foreignObject
            x={centerX - CENTER_RADIUS + 5}
            y={centerY - CENTER_RADIUS + 5}
            width={CENTER_RADIUS * 2 - 10}
            height={CENTER_RADIUS * 2 - 10}
          >
            <div className="center-label">
              {data.input_concept}
            </div>
          </foreignObject>
        </g>

        {/* Connection nodes — orbiting planets of knowledge */}
        {data.connections.map((conn, i) => {
          const pos = positions[i]
          const color = getUnexpectednessColor(conn.unexpectedness)
          const isExpanded = expandedIndex === i
          return (
            <g
              key={`node-${i}`}
              className={`graph-node ${isExpanded ? 'node-expanded' : ''}`}
              onClick={() => setExpandedIndex(isExpanded ? null : i)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={NODE_RADIUS}
                className="node-circle"
                stroke={color}
                style={{
                  opacity: expandedIndex !== null && !isExpanded ? 0.5 : 1,
                }}
              />
              <foreignObject
                x={pos.x - NODE_RADIUS + 4}
                y={pos.y - NODE_RADIUS + 4}
                width={NODE_RADIUS * 2 - 8}
                height={NODE_RADIUS * 2 - 8}
              >
                <div className="node-label" title={conn.title}>
                  {conn.domain}
                </div>
              </foreignObject>
            </g>
          )
        })}
      </svg>

      {/* Expanded card — appears below graph when a node is clicked */}
      {expandedIndex !== null && (
        <div className="graph-expanded-card">
          <ConnectionCard
            connection={data.connections[expandedIndex]}
            index={expandedIndex}
            isExpanded={true}
            onToggle={() => setExpandedIndex(null)}
            onExploreDeeper={onExploreDeeper}
          />
        </div>
      )}

      {/* Mobile fallback — card list */}
      <div className="graph-card-list">
        {data.connections.map((conn, i) => (
          <ConnectionCard
            key={`card-${i}`}
            connection={conn}
            index={i}
            isExpanded={expandedIndex === i}
            onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
            onExploreDeeper={onExploreDeeper}
          />
        ))}
      </div>
    </div>
  )
}
