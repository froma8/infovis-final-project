import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getNodes, getEdges } from '../reducers'
import Node from './Node'
import Edge from './Edge'


const mapStateToProps = state => ({
  nodes: getNodes(state),
  edges: getEdges(state)
})

const Graph = ({ nodes, edges }) => {

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const { width, height } = document.getElementById('cy').getBoundingClientRect()
    setDimensions({ width, height })
  }, [])

  return (
    <Container>
      <svg viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} width="100%" height="100%">
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

export default connect(mapStateToProps)(Graph)

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
`