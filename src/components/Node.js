import React from 'react'
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
  selectCommunities({ label, edges, communities })
}

const Node = ({ x, y, size = 2, label, selectedNode, selectNode, selectCommunities, edges, communities, compressed }) => {
  return (
    <g style={{ cursor: 'pointer'}} onClick={() => selectNodeAndCommunities(label, selectNode, selectCommunities, edges, communities)} >
      <ellipse
        cx={x}
        cy={y}
        rx={size}
        ry={compressed ? size * 0.7 : size}
        fill={selectedNode === label ? 'red' : 'black'}
      />
      <text
        x={x}
        y={compressed ? y + 5 : y + 4.5}
        fill="white"
        textAnchor="middle"
        style={{ fontSize: compressed ? '0.85rem' : '1rem'}}
      >{label}</text>
    </g>
  )
}

export default connect(mapStateToProps, { selectNode, selectCommunities })(Node)