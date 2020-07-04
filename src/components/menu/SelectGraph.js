import React from 'react'
import { connect } from 'react-redux'
import { loadRawGraph, loadGraph, setSelectGraphValue } from '../../actions'
import { getSelectValue } from '../../reducers'
import Select from 'react-select'
import contiguousUsa from '../../data/contiguous_usa.json'
import Dolphins from '../../data/dolphins.json'
import MorenoSheep from '../../data/moreno_sheep.json'
import MorenoTrain from '../../data/moreno_train.json'
import OpsahlSouthernWomen from '../../data/opsahl_southern_women.json'

const mapStateToProps = state => ({
  selectValue: getSelectValue(state)
})

const options = [
  { value: 'contiguous_usa', label: 'Contiguous Usa' },
  { value: 'dolphins', label: 'Dolphins' },
  { value: 'moreno_sheep', label: 'Moreno Sheep' },
  { value: 'moreno_train', label: 'Moreno Train' },
  { value: 'opsahl_southern_women', label: 'Opsahl Southern Women' }
]

const datasetsMap = new Map()
datasetsMap.set('contiguous_usa', contiguousUsa)
datasetsMap.set('dolphins', Dolphins)
datasetsMap.set('moreno_sheep', MorenoSheep)
datasetsMap.set('moreno_train', MorenoTrain)
datasetsMap.set('opsahl_southern_women', OpsahlSouthernWomen)

const SelectGraph = ({ loadRawGraph, loadGraph, selectValue, setSelectGraphValue }) => {

  const onChangeFunc = dataset => {
    setSelectGraphValue(dataset)
    loadRawGraph(datasetsMap.get(dataset.value))
    loadGraph()
  }

  return (
    <Select options={options} value={selectValue} onChange={onChangeFunc} />
  )
}

export default connect(mapStateToProps, { loadRawGraph, loadGraph, setSelectGraphValue })(SelectGraph)