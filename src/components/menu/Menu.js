import React from 'react'
import styled from 'styled-components'
import DropArea from './DropArea'
import Filters from './Filters'
import { connect } from 'react-redux'
import { getSelectedCommunities } from '../../reducers'


const mapStateToProps = state => ({
  selectedCommunities: getSelectedCommunities(state)
})

const Menu = ({ selectedCommunities }) => {

  return (
    <Container>
      <DropArea />
      { selectedCommunities && <Filters selectedCommunities={selectedCommunities}/> }
    </Container>
  )
}

export default connect(mapStateToProps)(Menu)

//region Style

const Container = styled.div`
  box-sizing: border-box;
  width: 300px;
  background: #ececec;
  height: 100%;
  padding: 10px 15px;
`

//endregion