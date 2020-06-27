import { combineReducers } from 'redux'
import { SELECT_NODE, LOAD_GRAPH, SELECT_COMMUNITIES } from '../actions/types'


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

const nodes = ( state = [], { type, data } ) => {
  switch (type) {
    case LOAD_GRAPH:
      return data.nodes
    default:
      return state
  }
}

const edges = ( state = [], { type, data } ) => {
  switch (type) {
    case LOAD_GRAPH:
      return data.edges
    default:
      return state
  }
}

const communities = ( state = [], { type, data } ) => {
  switch (type) {
    case LOAD_GRAPH:
      return data.communities
    default:
      return state
  }
}

export default combineReducers({
  selectedNode,
  nodes,
  edges,
  communities,
  selectedCommunities
})