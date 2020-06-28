import React, { useState, useEffect } from 'react'
import { getSelectedCommunities } from '../reducers'
import { connect } from 'react-redux'
import Graph from './Graph'
import styled from 'styled-components'

const mapStateToProps = state => ({
  selectedCommunities: getSelectedCommunities(state)
})

const getCommunityHeight = communityNodes => {
  const min = [...communityNodes].sort((a, b) => a.y - b.y)[0].y
  const max = [...communityNodes].sort((a, b) => b.y - a.y)[0].y
  return max - min + 100
}

const Communities = ({ width, height, selectedCommunities }) => {
  const [communities, setCommunities] = useState([])
  let overallHeight = 0
  selectedCommunities.forEach(community => {
    overallHeight += getCommunityHeight(community.nodes)
  })
  console.log(overallHeight)
  useEffect(() => {
    setCommunities(selectedCommunities.map((community, i) => {
      const multiplier = getCommunityHeight(community.nodes)
      const nodes = community.nodes.map(node => ({ ...node, y: node.y + (i * multiplier) }))
      const edges = community.edges.map(edge => ({ ...edge, y1: edge.y1 + (i * multiplier), y2: edge.y2 + (i * multiplier) }))
      return { nodes, edges }
    }))
  }, [selectedCommunities])
  return (
    <Container>
      <svg viewBox={`0 0 ${width} ${overallHeight}`} width="100%" height="100%">
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
`