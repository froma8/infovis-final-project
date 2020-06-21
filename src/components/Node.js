import React from 'react'
import '../css/graph.css'


const Node = ({ x, y, size = 2, label }) => {
  return (
    <>
      <circle cx={x} cy={y} r={size} />
      <text x={x} y={y + 4.5 } fill="white" textAnchor="middle" style={{ fontSize: '1rem' }}>{label}</text>
    </>
  )
}

export default Node