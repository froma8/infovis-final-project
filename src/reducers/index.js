import { combineReducers } from 'redux'
import graph from './graph'
import filters from './filters'

export const getSelectedNode = state => state.graph.selectedNode
export const getNodes = state => state.graph.nodes
export const getEdges = state => state.graph.edges
export const getCommunities = state => state.graph.communities
export const getSelectedCommunities = state => state.graph.selectedCommunities
export const getFilters = state => state.filters
export const getMin = state => state.filters.min
export const getMax = state => state.filters.max


export default combineReducers({
  graph,
  filters
})