import React, { useState, useEffect } from 'react'
import { getSelectedCommunities, getSelectedNode, getFilters } from '../reducers'
import { connect } from 'react-redux'
import Graph from './Graph'
import styled from 'styled-components'


const mapStateToProps = state => ({
  selectedCommunities: getSelectedCommunities(state),
  selectedNode: getSelectedNode(state),
  filters: getFilters(state)
})

const visualize_community = (filters, nodes) => {
  if (filters.min && filters.max) {
    if (filters.min <= nodes.length && filters.max >= nodes.length) {
      return true
    } else return false
  } else {
    return true
  }
}

const Communities = ({ width, selectedCommunities, selectedNode, filters }) => {
  const [communities, setCommunities] = useState([])
  const [nodesX, setNodesX] = useState([])
  const [overallHeight, setOverallHeight] = useState(0)

  useEffect(() => {
    const filteredCommunities = [...selectedCommunities].filter(({ nodes }) => visualize_community(filters, nodes))
    let newCommunities = [filteredCommunities[0]]
    const nodesUnique = new Map()
    for (let i = 1; i < filteredCommunities.length; i++) {
      const prev = newCommunities[i - 1].nodes
      const curr = filteredCommunities[i].nodes
      const selected = curr.find(n => n.label === selectedNode)
      const maxPrev = [...prev].sort((a, b) => b.y - a.y)[0]
      const minCurr = [...curr].sort((a, b) => a.y - b.y)[0]
      const partialOffset = selected.y - minCurr.y
      const offset = maxPrev.y + partialOffset

      const nodes = curr.map(node => ({ ...node, y: node.y + offset }))
      newCommunities.push({
        nodes,
        edges: filteredCommunities[i].edges.map(edge => ({ ...edge, y1: edge.y1 + offset, y2: edge.y2 + offset }))
      })
    }
    const maxCurr = [...newCommunities[newCommunities.length - 1].nodes].sort((a, b) => b.y - a.y)[0]
    setOverallHeight(maxCurr.y + 10)
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
      <svg viewBox={`0 0 ${width} ${overallHeight}`} width="100%" height={`${overallHeight}px`}>
        {nodesX.map(node =>
          <line key={node.label} x1={node.x} y1={node.minY} x2={node.x} y2={node.maxY} stroke="#000000" strokeWidth={0.3} strokeDasharray="4" />
        )}
        {communities.map(({ nodes, edges }, index) =>
          <Graph key={index} nodes={nodes} edges={edges} />
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