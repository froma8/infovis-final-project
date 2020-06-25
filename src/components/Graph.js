import React, { useState, useEffect } from 'react'
import Node from './Node'
import Edge from './Edge'
import Community from './Community'
import { getCoordinates } from '../helpers'

const Graph = ({ dataset }) => {

  const [vertexes, setVertexes] = useState(new Map())
  const [edges, setEdges] = useState(new Map())
  const [plexes, setPlexes] = useState([])

  useEffect(() => {
    const vertexesCoordinates = getCoordinates(dataset)
    setVertexes(vertexesCoordinates)

    const newEdges = new Map()
    dataset.edges.forEach(edge => {
      const [first, second] = edge.split('-')
      const nodeA = vertexesCoordinates.get(first)
      const nodeB = vertexesCoordinates.get(second)
      if (nodeA && nodeB) {
        newEdges.set(edge, { x1: nodeA.x, y1: nodeA.y, x2: nodeB.x, y2: nodeB.y, key: edge })
      }
    })
    setEdges(newEdges)

    dataset.plexes.forEach((plex) => {
      plexes.push(plex.map(node => vertexesCoordinates.get(node)))
    })
    setPlexes(plexes)

  }, [])

  return (
    <>
      <svg viewBox="0 0 1920 900" width="100%" height="100%">
      {[...edges.values()].map(({ key, ...rest }) =>
        <Edge key={key} {...rest} />
      )}
      {[...vertexes.values()].map(({ label, x, y }) =>
        <Node key={label} label={label} x={x} y={y} size={15} />
      )}
    </svg>
    <div id='cy'></div>
    </>
  )
}

export default Graph