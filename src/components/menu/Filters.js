import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import { applyFilters } from '../../actions'
import { connect } from 'react-redux'

const Filters = ({ selectedCommunities, applyFilters }) => {

  const [value, setValue] = useState({ min: 0, max: 10 })
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)

  useEffect(() => {
    const nodesLengths = selectedCommunities.map(c => c.nodes).map(n => n.length).sort((a, b) => a - b)
    const minValue = nodesLengths[0]
    const maxValue = nodesLengths[nodesLengths.length - 1]
    setValue({ min: minValue, max: maxValue })
    setMin(minValue)
    setMax(maxValue)

  }, [selectedCommunities])

  return (
    <Container>
      <Title>Nodes numbers:</Title>
      <InputRange
        allowSameValues={true}
        minValue={min}
        maxValue={max}
        step={1}
        onChange={(x) => setValue(x)}
        onChangeComplete={x => applyFilters(x)}
        value={value}
      />
    </Container>
  )
}

export default connect(null, { applyFilters })(Filters)

//region Style

const Container = styled.div`
  box-sizing: border-box;
  padding: 30px 10px;
`

const Title = styled.div`
  font-size: 1.2rem;
  color: #555555;
  margin-bottom: 30px;
`

//endregion