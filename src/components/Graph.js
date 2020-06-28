import React from 'react'
import Node from './Node'
import Edge from './Edge'

const Graph = ({ nodes, edges }) => {
  return (
    <>
      {edges.length && edges.map(({ key, ...rest }) =>
        <Edge key={key} {...rest} />
      )}
      {nodes.length && nodes.map(({ label, x, y }) =>
        <Node key={label} label={label} x={x} y={y} size={15} />
      )}
    </>
  )
}

export default Graph