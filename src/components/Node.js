import React from 'react'
import '../css/graph.css'
import { connect } from 'react-redux'
import { getSelectedNode, getEdges, getCommunities } from '../reducers'
import { selectNode, selectCommunities } from '../actions'

const mapStateToProps = state => ({
  selectedNode: getSelectedNode(state),
  edges: getEdges(state),
  communities: getCommunities(state)
})

const selectNodeAndCommunities = (label, selectNode, selectCommunities, edges, communities) => {
  selectNode(label)
  selectCommunities({label, edges, communities})
}

const Node = ({ x, y, size = 2, label, selectedNode, selectNode, selectCommunities, edges, communities }) => {
  return (
    <>
      <circle cx={x} cy={y} r={size} fill={selectedNode ===  label ? 'red' : 'black'} onClick={() => selectNodeAndCommunities(label, selectNode, selectCommunities, edges, communities)}/>
      <text x={x} y={y + 4.5 } fill="white" textAnchor="middle" style={{ fontSize: '1rem' }}>{label}</text>
    </>
  )
}

export default connect(mapStateToProps, { selectNode, selectCommunities })(Node)