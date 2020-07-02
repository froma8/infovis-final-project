import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import GlobalGraph from './GlobalGraph'
import Communities from './Communities'
import { connect } from 'react-redux'
import { getSelectedNode, getWidth, getHeight } from '../reducers'
import { selectNode, selectCommunities } from '../actions'
import imgBack from '../images/arrow.png'

const mapStateToProps = state => ({
  selectedNode: getSelectedNode(state),
  width: getWidth(state),
  height: getHeight(state)

})

const DrawingArea = ({ selectedNode, selectNode, selectCommunities, width, height }) => {

  const goBack = () => {
    selectNode(null)
    selectCommunities(null)
  }

  return (
    <Container id='drawing-area'>
      {selectedNode
        ? (<Communities width={width} />)
        : (<GlobalGraph width={width} height={height} />)
      }
      { selectedNode && <Image src={imgBack} onClick={goBack}/>}
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