import React from 'react'
import styled from 'styled-components'
import DropArea from './DropArea'


const Menu = () => {

  return (
    <Container>
      <DropArea />
    </Container>
  )
}

export default Menu

//region Style

const Container = styled.div`
  box-sizing: border-box;
  width: 300px;
  background: #ececec;
  height: 100%;
  padding: 10px 15px;
`

//endregion