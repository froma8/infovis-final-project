import React, { useState, useEffect } from 'react'
import {getSelectedCommunities, getSelectedNode} from '../reducers'
import { connect } from 'react-redux'
import Graph from './Graph'
import styled from 'styled-components'

const mapStateToProps = state => ({
  selectedCommunities: getSelectedCommunities(state),
  selectedNode: getSelectedNode(state)
})

const getCommunityHeight = communityNodes => {
  const sortedNodes = [...communityNodes].sort((a, b) => a.y - b.y)
  const min = sortedNodes[0].y
  const max = sortedNodes[sortedNodes.length - 1].y
  return max - min
}

const Communities = ({ width, height, selectedCommunities, selectedNode }) => {
  const [communities, setCommunities] = useState([])
  const [overallHeight, setOverallHeight] = useState(0)

  useEffect(() => {
    const newCommunities = [selectedCommunities[0]]

    for (let i = 1; i < selectedCommunities.length; i++) {
      const prev = newCommunities[i - 1].nodes
      const curr = selectedCommunities[i].nodes
      const selected = curr.find(n => n.label === selectedNode)
      const maxPrev = [...prev].sort((a, b) => b.y - a.y)[0]
      const minCurr = [...curr].sort((a, b) => a.y - b.y)[0]
      const partialOffset = selected.y - minCurr.y
      const offset = maxPrev.y + partialOffset - 250

      const nodes = curr.map(node => ({ ...node, y: node.y + offset}))
      newCommunities.push({
        nodes,
        edges: selectedCommunities[i].edges.map(edge => ({ ...edge, y1: edge.y1 + offset, y2: edge.y2 + offset }))
      })
      if (i === selectedCommunities.length - 1) {
        const maxCurr = [...nodes].sort((a, b) => b.y - a.y)[0]
        setOverallHeight(maxCurr.y + 10)
      }
    }
    console.log(newCommunities)
    setCommunities(newCommunities)
  }, [selectedCommunities])
  return (
    <Container>
      <svg viewBox={`0 0 ${width} ${overallHeight}`} width="100%" height={`${overallHeight}px`}>
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