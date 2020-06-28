import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getCommunities } from '../../reducers'


const mapStateToProps = state => ({
  communities: getCommunities(state)
})

const CommunitiesList = ({ communities }) => {
  console.log(communities)
  return (
    <>
      <Title>Communities:</Title>
      <Container>
        { communities && communities.map(community =>
          <div>[{community.map(node => node.label).join()}]</div>
        )}
      </Container>
    </>
  )
}

export default connect(mapStateToProps)(CommunitiesList)

//region Style

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 500px;
  overflow-y: auto;
  margin: 20px 0;
`

const Title = styled.div`
  font-size: 1.2rem;
  color: #767272;
`

//endregion