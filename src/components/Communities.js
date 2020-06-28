import React, { useState, useEffect } from 'react'
import { getSelectedCommunities } from '../reducers'
import { connect } from 'react-redux'
import Graph from './Graph'
import styled from 'styled-components'

const mapStateToProps = state => ({
  selectedCommunities: getSelectedCommunities(state)
})

const getCommunityHeight = communityNodes => {
  const sortedNodes = [...communityNodes].sort((a, b) => a.y - b.y)
  const min = sortedNodes[0].y
  const max = sortedNodes[sortedNodes.length - 1].y
  return max - min + 200
}

const Communities = ({ width, height, selectedCommunities }) => {
  const [communities, setCommunities] = useState([])
  const [overallHeight, setOverallHeight] = useState(0)
  useEffect(() => {
    let multiplier = 0
    setCommunities(selectedCommunities.map((community) => {
      console.log('----------------------------------')
      const nodes = community.nodes.map(node => {
        console.log(node.y + multiplier)
        return { ...node, y: node.y + multiplier }
      })
      const edges = community.edges.map(edge => ({ ...edge, y1: edge.y1 + multiplier, y2: edge.y2 + multiplier }))
      multiplier += getCommunityHeight(community.nodes)
      return { nodes, edges }
    }))
    setOverallHeight(multiplier)
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