import { combineReducers } from 'redux'
import graph from './graph'
import filters from './filters'
import select from './select'

export const getSelectedNode = state => state.graph.selectedNode
export const getRawGraph = state => state.graph.raw
export const getNodes = state => state.graph.nodes
export const getEdges = state => state.graph.edges
export const getCommunities = state => state.graph.communities
export const getSelectedCommunities = state => state.graph.selectedCommunities
export const getWidth = state => state.graph.width
export const getHeight = state => state.graph.height
export const getParameters = state => state.graph.parameters
export const getFilters = state => state.filters
export const getMin = state => state.filters.min
export const getMax = state => state.filters.max
export const getSelectValue = state => state.select.value

export default combineReducers({
  graph,
  filters,
  select
})