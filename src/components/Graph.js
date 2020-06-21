import React, {useState, useEffect} from 'react'
import Node from './Node'
import Edge from './Edge'
import Community from './Community'


const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const Graph = ({dataset}) => {

  const [vertexes, setVertexes] = useState(new Map())
  const [edges, setEdges] = useState(new Map())
  const [plexes, setPlexes] = useState([])

  useEffect(() => {
    const newVertexes = new Map()
    const newEdges = new Map()
    dataset.vertexes.forEach(vertex => {
      newVertexes.set(vertex, {
        x: getRandomInt(15, 1900),
        y: getRandomInt(15, 850),
        label: vertex
      })
    })
    setVertexes(newVertexes)

    dataset.edges.forEach(edge => {
      const [first, second] = edge.split('-')
      const { x: x1, y: y1 } = newVertexes.get(parseInt(first))
      const { x: x2, y: y2 } = newVertexes.get(parseInt(second))
      newEdges.set(edge, { x1, y1, x2, y2, key: edge })
    })
    setEdges(newEdges)

    dataset.plexes.forEach((plex) => {
      plexes.push(plex.map(node => newVertexes.get(node)))
    })
    setPlexes(plexes)
  }, [dataset])

  return (
    <svg viewBox="0 0 1920 900" width="100%" height="100%">
      {plexes.slice(0, 1).map((plex, i) =>
        <Community key={i} nodes={plex} />
      )}
      {[...edges.values()].map(({key, ...rest}) =>
        <Edge key={key} {...rest} />
      )}
      {[...vertexes.values()].map(({label, x, y}) =>
        <Node key={label} label={label} x={x} y={y} size={15}/>
      )}
    </svg>
  )
}

export default Graph