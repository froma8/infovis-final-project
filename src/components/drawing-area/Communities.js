import React, { useState, useEffect } from 'react'
import { getSelectedCommunities, getFilters } from '../../reducers'
import { connect } from 'react-redux'
import Graph from '../graph/Graph'
import GraphContainer from '../graph/GraphContainer'
import styled from 'styled-components'

const COMMUNITIES_DISTANCE = 150
const SCALE_Y_FACTOR = 0.7
const DEFAULT_NODE_SIZE = 15
const PADDING = 100

const mapStateToProps = state => ({
  selectedCommunities: getSelectedCommunities(state),
  filters: getFilters(state)
})

const isBetweenMinMax = (filters, nodes) => {
  if (filters.min && filters.max) {
    return filters.min <= nodes.length && filters.max >= nodes.length;
  } else {
    return true
  }
}

const scaleValue = (value, from, to = [DEFAULT_NODE_SIZE, DEFAULT_NODE_SIZE * 1.35]) => {
  const scale = (to[1] - to[0]) / (from[1] - from[0])
  const capped = Math.min(from[1], Math.max(from[0], value)) - from[0]
  return ~~(capped * scale + to[0])
}

const Communities = ({ width, height, selectedCommunities, filters, selectNode }) => {
  const [communities, setCommunities] = useState([])
  const [nodesX, setNodesX] = useState([])
  const [overallHeight, setOverallHeight] = useState(0)

  const setDefaultValues = () => {
    setOverallHeight(0)
    setCommunities([])
    setNodesX([])
  }

  useEffect(() => {
    if (!selectedCommunities) return
    const allNodes = selectedCommunities.map(c => c.nodes).flat()

    const sortByX = [...allNodes].sort((a, b) => a.x - b.x)
    const sortByY = [...allNodes].sort((a, b) => a.y - b.y)

    const minX = sortByX[0].x
    const maxX = sortByX[allNodes.length - 1].x
    const minY = sortByY[0].y
    const maxY = sortByY[allNodes.length - 1].y

    const scaleX = value => scaleValue(value, [minX, maxX], [PADDING, width - PADDING])
    const scaleY = value =>  scaleValue(value, [minY, maxY], [PADDING, height - PADDING])

    const out = n => n.x <= PADDING || n.x > width - PADDING || n.y < PADDING || n.y > height - PADDING

    // Applies filters on communities and scales nodes and edges coordinates
    const filteredCommunities = [...selectedCommunities]
      .filter(({ nodes }) => isBetweenMinMax(filters, nodes))
      .map(({ nodes, edges }) => ({
        nodes: nodes.map(n => ({...n, x: out(n) ? scaleX(n.x): n.x, y: out(n) ? scaleY(n.y) : n.y })) ,
        edges: edges.map(e => ({
          ...e,
          x1: out({x: e.x1, y: e.y1}) ? scaleX(e.x1) : e.x1,
          y1: out({x: e.x1, y: e.y1}) ? scaleY(e.y1) : e.y1,
          x2: out({x: e.x2, y: e.y2}) ? scaleX(e.x2) : e.x2,
          y2: out({x: e.x2, y: e.y2}) ? scaleY(e.y2) : e.y2
        }))
      }))
      .map(({ nodes, edges }) => {
        const sortedNodes = nodes.sort((a, b) => a.y - b.y)
        const minY = sortedNodes[0].y
        const maxY = sortedNodes[sortedNodes.length - 1].y
        let nodesComputed = nodes.map(n => {
          return { ...n, y: n.y * SCALE_Y_FACTOR, size: scaleValue(n.y, [minY, maxY]) }
        })
        return {
          nodes: nodesComputed,
          edges: edges.map(e => ({ ...e, y1: e.y1 * SCALE_Y_FACTOR, y2: e.y2 * SCALE_Y_FACTOR }))
        }
      })

    if (filteredCommunities.length === 0) return setDefaultValues()
    let newCommunities = [filteredCommunities[0]]
    const nodesUnique = new Map()
    for (let i = 1; i < filteredCommunities.length; i++) {
      const prev = newCommunities[i - 1].nodes
      const curr = filteredCommunities[i].nodes
      const maxPrev = [...prev].sort((a, b) => b.y - a.y)[0]
      const minCurr = [...curr].sort((a, b) => a.y - b.y)[0]
      const offset = maxPrev.y - minCurr.y + COMMUNITIES_DISTANCE
      const nodes = curr.map(node => ({ ...node, y: node.y + offset }))
      newCommunities.push({
        nodes,
        edges: filteredCommunities[i].edges.map(edge => ({ ...edge, y1: edge.y1 + offset, y2: edge.y2 + offset }))
      })
    }
    const maxCurr = [...newCommunities[newCommunities.length - 1].nodes].sort((a, b) => b.y - a.y)[0]
    setOverallHeight(maxCurr.y + 50)
    setCommunities(newCommunities)
    newCommunities.forEach(community => {
      community.nodes.forEach(node => {
        const n = nodesUnique.get(node.label)
        if (n) {
          if (node.y <= n.minY) {
            nodesUnique.set(n.label, { label: n.label, x: n.x, minY: node.y, maxY: n.maxY })
          }
          if (node.y >= n.maxY) {
            nodesUnique.set(n.label, { label: n.label, x: n.x, minY: n.minY, maxY: node.y })
          }
        } else {
          nodesUnique.set(node.label, { label: node.label, x: node.x, minY: node.y, maxY: node.y })
        }
      })
    })
    setNodesX([...nodesUnique.values()])
  }, [selectedCommunities, filters])

  return (
    <Container>
      <svg viewBox={`0 0 ${width} ${overallHeight}`} width="100%" height={`${overallHeight + 150}px`}>
        {nodesX.map(node =>
          <line key={node.label} x1={node.x} y1={node.minY} x2={node.x} y2={node.maxY} stroke="#000000" strokeWidth={0.3} strokeDasharray="4" />
        )}
        {communities.map(({ nodes, edges }, index) =>
          <g key={index}>
            <GraphContainer nodes={nodes} width={width}/>
            <Graph nodes={nodes} edges={edges} compressed />
          </g>
        )}
      </svg>
    </ Container>
  )
}

export default connect(mapStateToProps)(Communities)

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  overflow-y: auto;
`