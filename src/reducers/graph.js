import { combineReducers } from 'redux'
import { SELECT_NODE, SELECT_COMUNITIES } from '../actions/types'


const selectedNode = ( state = null, { type, data }) => {
  switch (type) {
    case SELECT_NODE:
      return data
    default:
      return state
  }
}

const selectedComunities = ( state = null, { type, data }) => {
  switch (type) {
    case SELECT_COMUNITIES:
      return data
    default:
      return state
  }
}

export default combineReducers({
  selectedNode, selectedComunities
})