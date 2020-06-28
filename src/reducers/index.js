import { combineReducers } from 'redux'
import graph from './graph'

export const getSelectedNode = state => state.graph.selectedNode
export const getNodes = state => state.graph.nodes
export const getEdges = state => state.graph.edges
export const getCommunities = state => state.graph.communities
export const getSelectedCommunities = state => state.graph.selectedCommunities

export default combineReducers({
  graph
})