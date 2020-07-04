import { combineReducers } from 'redux'
import { SELECT_GRAPH_VALUE } from '../actions/types'

const value = ( state = null, { type, data }) => {
  switch (type) {
    case SELECT_GRAPH_VALUE:
      return data
    default:
      return state
  }
}

export default combineReducers({
  value
})