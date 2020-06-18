import React from 'react'
import '../css/graph.css'


const Node = ({ x, y, size = 2, label }) => {
  return (
    <>
      <circle cx={x} cy={y} r={size} />
      <text x={x} y={y + 0.7 } fill="white" textAnchor="middle" style={{ fontSize: '0.15rem' }}>{label}</text>
    </>
  )
}

export default Node