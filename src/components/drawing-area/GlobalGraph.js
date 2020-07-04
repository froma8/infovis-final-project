import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getNodes, getEdges } from '../../reducers'
import Node from '../graph/Node'
import Edge from '../graph/Edge'

const mapStateToProps = state => ({
  nodes: getNodes(state),
  edges: getEdges(state)
})

const GlobalGraph = ({ nodes, edges, width, height }) => {

  return (
    <Container>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
        { edges.length && edges.map(({ key, ...rest }) =>
          <Edge key={key} {...rest} />
        )}
        { nodes.length && nodes.map(({ label, x, y }) =>
          <Node key={label} label={label} x={x} y={y} size={15} />
        )}
      </svg>
    </Container>
  )
}

export default connect(mapStateToProps)(GlobalGraph)

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`