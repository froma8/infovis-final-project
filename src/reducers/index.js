import { combineReducers } from 'redux'
import graph from './graph'

export const getSelectedNode = state => state.graph.selectedNode
export const getselectedComunities = state => state.graph.selectedComunities

export default combineReducers({
  graph
})