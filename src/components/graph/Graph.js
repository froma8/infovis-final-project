import React from 'react'
import Node from './Node'
import Edge from './Edge'

const Graph = ({ nodes, edges, compressed }) => {
  return (
    <>
      {edges.length && edges.map(({ key, ...rest }) =>
        <Edge key={key} {...rest} />
      )}
      {nodes.length && nodes.map(({ label, x, y, size }) =>
        <Node key={label} label={label} x={x} y={y} size={size} compressed={compressed}/>
      )}
    </>
  )
}

export default Graph