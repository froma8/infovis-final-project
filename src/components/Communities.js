import React from 'react'
import { getSelectedCommunities } from '../reducers'
import { connect } from 'react-redux'
import Graph from './Graph'
import styled from 'styled-components'

const mapStateToProps = state => ({
  selectedCommunities: getSelectedCommunities(state)
})

const Communities = ({ width, height, selectedCommunities }) => {
  return (
    <Container>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
        {selectedCommunities.map(({ nodes, edges }, index) =>
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