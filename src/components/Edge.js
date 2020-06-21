import React, { useEffect, useState } from 'react'

const Edge = ({ points }) => {
  const [lines, setLines] = useState([])
  useEffect(() => {
    const newLines = []
    for (let i = 0; i < points.length - 1; i++) {
      newLines.push(
        <line key={i} x1={points[i].x} y1={points[i].y} x2={points[i + 1].x} y2={points[i + 1].y} stroke="black" strokeWidth={1} />
      )
      setLines(newLines)
    }
  }, [points])


  return (<g>{lines}</g>)
}

export default Edge