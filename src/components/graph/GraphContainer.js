import React from 'react'

const GraphContainer = ({ nodes, width }) => {
  const padding = 30

  const sortedNodesY = [...nodes].sort((a, b) => b.y - a.y)
  const sortedNodesX = [...nodes].sort((a, b) => b.x - a.x)
  const top = sortedNodesY[sortedNodesY.length - 1]
  const bottom = sortedNodesY[0]
  const left = sortedNodesX[sortedNodesX.length - 1]
  const right = sortedNodesX[0]
  const topLeft = { x: left.x - padding, y: top.y - padding }
  const topRight = { x: right.x + padding, y: top.y - padding }
  const bottomLeft = { x: left.x - padding, y: bottom.y + padding }
  const bottomRight = { x: right.x + padding, y: bottom.y + padding }
  const base = topRight.x - topLeft.x

  const getIncrement = () => {
    const outLeft = bottomLeft.x - (0.2 * base) < 0
    const outRight = bottomRight.x + (0.2 * base) > width
    const offsetLeft = Math.abs(bottomLeft.x - (0.2 * base))
    const offsetRight = bottomLeft.x + (0.2 * base) - width
    if (outLeft && outRight) {
      return Math.max(offsetLeft, offsetRight)
    } else if (outLeft) {
      return offsetLeft
    } else if (outRight) {
      return outRight
    } else {
      return 0
    }

  }

  const path = `M ${topLeft.x} ${topLeft.y} L ${topRight.x} ${topRight.y} L ${bottomRight.x + (0.2 * base) + getIncrement()} ${bottomRight.y} L ${bottomLeft.x - (0.2 * base) - getIncrement()} ${bottomLeft.y} Z`
  return (
    <path d={`${path}`} fillOpacity="0.2" strokeWidth="20" fill="lightgray"/>
  )
}

export default GraphContainer