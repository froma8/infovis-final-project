import React from 'react'
import Node from './Node'
import Edge from './Edge'

const GraphShadow = ({ nodes, edges, compressed }) => {
  return (
    <>
      {edges.length && edges.map(edge =>
        <Edge key={edge.key} x1={edge.x1} y1={edge.y1 + 75} x2={edge.x2} y2={edge.y2 + 75} />
      )}
      {nodes.length && nodes.map(({ x, y, size }) =>
        <ellipse
        cx={x}
        cy={y + 75}
        rx={size}
        ry={compressed ? size * 0.7 : size}
        fill={'rgba(0,0,0,0.1)'}
      />
      )}
    </>
  )
}

export default GraphShadow