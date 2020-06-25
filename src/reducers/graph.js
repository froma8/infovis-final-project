import { combineReducers } from 'redux'
import { SELECT_NODE } from '../actions/types'


const selectedNode = ( state = null, { type, data }) => {
  switch (type) {
    case SELECT_NODE:
      return data
    default:
      return state
  }
}

export default combineReducers({
  selectedNode
})