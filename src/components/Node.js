import React from 'react'
import '../css/graph.css'
import { connect } from 'react-redux'
import { getSelectedNode } from '../reducers'
import { selectNode } from '../actions'

const mapStateToProps = state => ({
  selectedNode: getSelectedNode(state)
})

const Node = ({ x, y, size = 2, label, selectedNode, selectNode }) => {
  return (
    <>
      <circle cx={x} cy={y} r={size} fill={selectedNode ===  label ? 'red' : 'black'} onClick={() => selectNode(label)}/>
      <text x={x} y={y + 4.5 } fill="white" textAnchor="middle" style={{ fontSize: '1rem' }}>{label}</text>
    </>
  )
}

export default connect(mapStateToProps, { selectNode })(Node)