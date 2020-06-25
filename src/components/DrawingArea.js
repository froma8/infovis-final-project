import React from 'react'
import styled from 'styled-components'
import graph from '../data/dolphins.json'
import Graph from './Graph'


const DrawingArea = () => {
  return (
    <Container>
      <Graph dataset={graph} />
      <Cytoscape id="cy" />
    </Container>
  )
}

export default DrawingArea

//region Style

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const Cytoscape = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`
//endregion