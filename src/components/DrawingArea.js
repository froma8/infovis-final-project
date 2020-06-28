import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import GlobalGraph from './GlobalGraph'
import Communities from './Communities'
import { connect } from 'react-redux'
import { getSelectedNode } from '../reducers'

const mapStateToProps = state => ({
  selectedNode: getSelectedNode(state)
})

const DrawingArea = ({ selectedNode }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const { width, height } = document.getElementById('cy').getBoundingClientRect()
    setDimensions({ width, height })
  }, [])

  return (
    <Container>
      {selectedNode
        ? (<Communities width={dimensions.width} height={dimensions.height} />)
        : (<GlobalGraph width={dimensions.width} height={dimensions.height} />)
      }
      <Cytoscape id="cy" />
    </Container>
  )
}

export default connect(mapStateToProps)(DrawingArea)

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