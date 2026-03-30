// Graph Layout Utilities
// Leonardo would have used compass and straightedge.
// We use Math.sin and Math.cos.
// Same energy, different century.

/**
 * Calculate positions for nodes in a radial layout.
 * The input concept sits at center. Connections orbit like planets
 * around the sun — or like apprentices around a master's workbench.
 */
export function calculateRadialLayout(connectionCount, centerX, centerY, radius) {
  const positions = []
  const angleStep = (2 * Math.PI) / connectionCount
  // Start from the top (-PI/2) because Leonardo always started his sketches from the top
  const startAngle = -Math.PI / 2

  for (let i = 0; i < connectionCount; i++) {
    const angle = startAngle + (i * angleStep)
    // Add slight irregularity — notebooks aren't grids
    const jitterRadius = radius + (seededRandom(i * 7) * 30 - 15)
    const jitterAngle = angle + (seededRandom(i * 13) * 0.15 - 0.075)

    positions.push({
      x: centerX + Math.cos(jitterAngle) * jitterRadius,
      y: centerY + Math.sin(jitterAngle) * jitterRadius,
      angle: jitterAngle,
    })
  }

  return positions
}

/**
 * Generate a quadratic bezier curve path between two points.
 * The control point is offset perpendicular to the line,
 * giving that hand-drawn, organic feel Leonardo would approve of.
 */
export function generateCurvePath(x1, y1, x2, y2, index) {
  const midX = (x1 + x2) / 2
  const midY = (y1 + y2) / 2

  // Perpendicular offset for the control point
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)

  // Normalize and rotate 90 degrees
  const nx = -dy / len
  const ny = dx / len

  // Offset amount — varies per connection for visual variety
  // Like how Leonardo never drew two lines the same way
  const offset = (seededRandom(index * 31) * 40 - 20) + (index % 2 === 0 ? 15 : -15)

  const cx = midX + nx * offset
  const cy = midY + ny * offset

  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
}

/**
 * Deterministic pseudo-random based on seed.
 * Because true randomness would make the graph jump around on re-render,
 * and Tesla was very particular about consistent frequencies.
 */
function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/**
 * Get the color for a connection based on its unexpectedness rating.
 * Higher unexpectedness = warmer ink color.
 * Leonardo used different inks for different levels of importance.
 */
export function getUnexpectednessColor(rating) {
  const colors = {
    1: '#708090',   // Slate — "yes, we know"
    2: '#4A5F4F',   // Sage — "mildly interesting"
    3: '#C9A961',   // Honey — "now we're talking"
    4: '#BC544B',   // Auburn — "Leonardo underlined this twice"
    5: '#6B2C2C',   // Burgundy — "this changes everything"
  }
  return colors[Math.min(5, Math.max(1, Math.round(rating)))] || colors[3]
}
