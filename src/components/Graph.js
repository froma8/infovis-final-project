import React, {useState, useEffect} from 'react'
import Node from './Node'
import Edge from './Edge'
import Community from './Community'
import dagre from 'dagre'


const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const Graph = ({dataset}) => {

  const [vertexes, setVertexes] = useState([])
  const [edges, setEdges] = useState([])
  const [plexes, setPlexes] = useState([])

  const g = new dagre.graphlib.Graph()

  useEffect(() => {

    g.setGraph({})
    g.setDefaultEdgeLabel(function() { return {}; });

    dataset.vertexes.forEach(v => {
      g.setNode(v, { label: v, width: 30, height: 30})
    })
    dataset.edges.forEach(e => {
      const [first, second] = e.split('-')
      g.setEdge(first, second)
    })

    dagre.layout(g, {nodesep: 5, edgesep: 1, ranksep: 5, ranker: 'tight-tree'})

    const newVertexes = g.nodes().map((v) => g.node(v))
    setVertexes(newVertexes)
    const newEdges = g.edges().map((e) => g.edge(e))
    setEdges(newEdges)
    setPlexes(dataset.plexes.map(plexe => plexe.map(p => g.node(p)) ) )
  }, [dataset])

  return (
    <svg viewBox={`0 0 4695 2830`} width="100%" height="100%">
      {plexes.map((plex, i) =>
        <Community key={i} nodes={plex} />
      )}
      {console.log(g)}
      {edges.map(({key, ...rest}, index) =>
        <Edge key={index} {...rest} />
      )}
      {vertexes.map(({label, x, y}) =>
        <Node key={label} label={label} x={x} y={y} size={30}/>
      )}
    </svg>
  )
}

export default Graph