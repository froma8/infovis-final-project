import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import GlobalGraph from './GlobalGraph'
import Communities from './Communities'
import { connect } from 'react-redux'
import { getSelectedNode } from '../reducers'
import { selectNode, selectCommunities } from '../actions'
import imgBack from '../images/arrow.png'

const mapStateToProps = state => ({
  selectedNode: getSelectedNode(state)
})

const DrawingArea = ({ selectedNode, selectNode, selectCommunities }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const { width, height } = document.getElementById('cy').getBoundingClientRect()
    setDimensions({ width, height })
  }, [])

  const goBack = () => {
    selectNode(null)
    selectCommunities(null)
  }

  return (
    <Container>
      {selectedNode
        ? (<Communities width={dimensions.width} />)
        : (<GlobalGraph width={dimensions.width} height={dimensions.height} />)
      }
      { selectedNode && <Image src={imgBack} onClick={goBack}/>}
      <Cytoscape id="cy" />
    </Container>
  )
}

export default connect(mapStateToProps, { selectNode, selectCommunities })(DrawingArea)

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

const Image = styled.img`
  position: absolute;
  top: 5px;
  left: 10px;
  z-index: 99999;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transform: scale(1.1);
  }
`
//endregion