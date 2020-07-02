import React from 'react'

const GraphShadow = ({ nodes }) => {
  return (
    <>
      {
        nodes.length && nodes.map(({ x, y, size }) =>
          <ellipse
            cx={x}
            cy={y + 75}
            rx={size}
            ry={size * 0.7}
            fill={'rgba(0,0,0,0.1)'}
          />
        )
      }
    </>
  )
}

export default GraphShadow