import { combineReducers } from 'redux'
import { APPLY_FILTERS, SELECT_COMMUNITIES } from '../actions/types'


const min = ( state = null, { type, data }) => {
  switch (type) {
    case APPLY_FILTERS:
      return data.min
    case SELECT_COMMUNITIES:
      return null
    default:
      return state
  }
}

const max = ( state = null, { type, data }) => {
  switch (type) {
    case APPLY_FILTERS:
      return data.max
    case SELECT_COMMUNITIES:
      return null
    default:
      return state
  }
}


export default combineReducers({
  min,
  max
})