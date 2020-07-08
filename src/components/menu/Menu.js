import React from 'react'
import styled from 'styled-components'
import DropArea from './DropArea'
import Filters from './Filters'
import SelectGraph from './SelectGraph'
import { connect } from 'react-redux'
import { getSelectedCommunities } from '../../reducers'


const mapStateToProps = state => ({
  selectedCommunities: getSelectedCommunities(state)
})

const Menu = ({ selectedCommunities }) => {

  return (
    <Container>
      <AboveArea>
        {!selectedCommunities &&
          <ContainerSelectGraph>
            <Title>Choose a default graph</Title>
            <SelectGraph />
          </ContainerSelectGraph>
        }
        {!selectedCommunities &&
          <Title>
            Or upload yours
          </Title> &&
          <DropArea />
        }
        {selectedCommunities && <Filters selectedCommunities={selectedCommunities} />}
      </AboveArea>
      <Credits>
        <Title>Credits</Title>
        <p>Marco Moauro - Federico Roma</p>
        <p>July 2020 @ Roma Tre University</p>
      </Credits>
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
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const AboveArea = styled.div`
  box-sizing: border-box;
`

const ContainerSelectGraph = styled.div`
  margin-bottom: 20px;
`

const Credits = styled.div`
 font-size: 0.8rem;
`

const Title = styled.div`
 font-size: 1.1rem;
 margin: 10px 0;
 opacity: 0.8;
`
//endregion