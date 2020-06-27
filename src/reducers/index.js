import { combineReducers } from 'redux'
import graph from './graph'

export const getSelectedNode = state => state.graph.selectedNode
export const getselectedCommunities = state => state.graph.selectedCommunities

export default combineReducers({
  graph
})