import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Node from './Node'
import Edge from './Edge'
import Community from './Community'
import { getCoordinates } from '../helpers'

const Graph = ({ dataset }) => {

  const [vertexes, setVertexes] = useState(new Map())
  const [edges, setEdges] = useState(new Map())
  const [plexes, setPlexes] = useState([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const { width, height } = document.getElementById('cy').getBoundingClientRect()
    setDimensions({ width, height })

    getCoordinates(dataset)
      .then(vertexesCoordinates => {
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
        const newPlexes = []
        dataset.plexes.forEach((plex) => {
          newPlexes.push(plex.map(node => vertexesCoordinates.get(node.toString())))
        })
        setPlexes(newPlexes)

      })
  }, [])

  return (
    <Container>
      <svg viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} width="100%" height="100%">
        {[...edges.values()].map(({ key, ...rest }) =>
          <Edge key={key} {...rest} />
        )}
        {[...vertexes.values()].map(({ label, x, y }) =>
          <Node key={label} label={label} x={x} y={y} size={15} />
        )}
      </svg>
    </Container>
  )
}

export default Graph

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
`