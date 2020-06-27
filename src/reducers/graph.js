import { combineReducers } from 'redux'
import { SELECT_NODE, SELECT_COMMUNITIES } from '../actions/types'


const selectedNode = ( state = null, { type, data }) => {
  switch (type) {
    case SELECT_NODE:
      return data
    default:
      return state
  }
}

const selectedCommunities = ( state = null, { type, data }) => {
  switch (type) {
    case SELECT_COMMUNITIES:
      return data
    default:
      return state
  }
}

export default combineReducers({
  selectedNode, selectedCommunities
})