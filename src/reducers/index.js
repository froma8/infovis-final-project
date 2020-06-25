import { combineReducers } from 'redux'
import graph from './graph'

export const getSelectedNode = state => state.graph.selectedNode

export default combineReducers({
  graph
})