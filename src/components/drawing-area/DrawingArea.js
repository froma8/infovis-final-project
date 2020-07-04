import React, { useState } from 'react'
import styled from 'styled-components'
import GlobalGraph from './GlobalGraph'
import Communities from './Communities'
import { connect } from 'react-redux'
import Rodal from 'rodal'
import GraphParameters from './GraphParameters'
import Informations from './Informations'
import { getSelectedNode, getWidth, getHeight } from '../../reducers'
import { selectNode, selectCommunities } from '../../actions'
import imgBack from '../../images/arrow.png'
import imgSettings from '../../images/settings.svg'
import imgInfo from '../../images/info.svg'

import 'rodal/lib/rodal.css'

const mapStateToProps = state => ({
  selectedNode: getSelectedNode(state),
  width: getWidth(state),
  height: getHeight(state)

})

const DrawingArea = ({ selectedNode, selectNode, selectCommunities, width, height }) => {

  const [ showSettings, setShowSettings ] = useState(false)
  const [ showInfo, setShowInfo ] = useState(false)

  const goBack = () => {
    selectNode(null)
    selectCommunities(null)
  }

  const switchShowSettings = () => {
    setShowSettings(!showSettings)
  }

  const switchShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <Container id='drawing-area'>
      {selectedNode
        ? (<Communities width={width} />)
        : (<GlobalGraph width={width} height={height} />)
      }
      { selectedNode && <GoBack src={imgBack} onClick={goBack}/>}
      { !selectedNode && <Settings src={imgSettings} onClick={switchShowSettings}/>}
      { !selectedNode && <Info src={imgInfo} onClick={switchShowInfo}/>}
      <Rodal visible={showSettings} onClose={switchShowSettings}>
        <SettingsTitle>Parameters</SettingsTitle>
        <GraphParameters closeModal={switchShowSettings}/>
      </Rodal>
      <Rodal visible={showInfo} onClose={switchShowInfo}>
        <Informations />
      </Rodal>
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

const GoBack = styled.img`
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

const Settings = styled.img`
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 99999;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transform: scale(1.1);
  }
`

const Info = styled.img`
  position: absolute;
  bottom: 5px;
  right: 10px;
  z-index: 99999;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transform: scale(1.1);
  }
`

const SettingsTitle = styled.h1`
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`
//endregion