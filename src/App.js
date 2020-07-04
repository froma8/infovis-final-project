import React from 'react'
import styled from 'styled-components'
import Menu from './components/menu/Menu'
import DrawingArea from './components/drawing-area/DrawingArea'

const App = () => {
  return (
    <Container>
      <Menu />
      <DrawingArea />
    </Container>
  )
}

export default App

//region Style

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

//endregion