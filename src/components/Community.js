import React, {useState, useEffect} from 'react'
import * as p from '../constants/positions'

const Community = ({ nodes }) => {

  const [ avg, setAvg ] = useState(0)
  const [ path, setPath ] = useState('')

  useEffect(() => {
    setPath(getPath())
  }, [])

  /**
   * Ritorna la posizione di b rispetto ad a
   * @param a {Object} rappresenta il nodo a
   * @param a.x {number} ascissa del nodo a
   * @param a.y {number} ordinata del nodo a
   * @param b {Object} rappresenta il nodo b
   * @param b.x {number} ascissa del nodo b
   * @param b.y {number} ordinata del nodo b
   * @returns {string} una delle posizioni costanti
   */
  const findRelativePosition = (a, b) => {
    if (a.x === b.x && a.y > b.y) {
      return p.top
    }
    if (a.x === b.x && a.y <= b.y) {
      return p.bottom
    }
    if (a.y === b.y && a.x > b.x) {
      return p.left
    }
    if (a.x === b.x && a.x <= b.x) {
      return p.right
    }
    if (a.x <= b.x && a.y <= b.y) {
      return p.top_right
    }
    if (a.x <= b.x && a.y >= b.y) {
      return p.bottom_right
    }
    if (a.x >= b.x && a.y >= b.y) {
      return p.bottom_left
    }
    if (a.x >= b.x && a.y <= b.y) {
      return p.top_left
    }
  }

  /**
   * Aggiunge 4 punti ad ogni nodo che rappresentano dove agganciare il path
   * @param nodes
   * @returns {(*|{top: {x: *, y: number}, left: {x: number, y: *}, bottom: {x: *, y: *}, right: {x: *, y: *}})[]}
   */
  const addAnchors = (nodes) => {
    return [...nodes].map((node) => ({
      top: { x: node.x, y: node.y - 20 },
      right: { x: node.x + 20, y: node.y },
      bottom: { x: node.x, y: node.y + 20 },
      left: { x: node.x - 20, y: node.y },
      ...node
    }))
  }

  const sortToCicleClockwise = () => {
    const sortByX = [...nodes].sort((a, b) => a.x - b.x)
    const start = sortByX[0]
    const rest = sortByX.slice(1)
    const avgY = rest.reduce((acc, curr) => acc + curr.y, 0) / rest.length
    setAvg(avgY)
    const isAbove = (node) => {
      if (node.y <= avgY - 20) {
        return true
      } else if (node.y <= avgY && node.y > avgY - 20) {
        return start.y > node.y
      } else {
        return false
      }
    }
    const above = rest.filter(isAbove)
    const under = rest.filter(n => !above.find(a => a.label === n.label)).sort((a, b) => b.x - a.x)
    return [start, ...above, ...under]
  }

  /**
   * Costruisce la stringa del path che definisce la comunita inglobando tutti i nodi
   * @returns {string}
   */
  const getPath = () => {
    let path = ''
    const sortedNodes = addAnchors(sortToCicleClockwise(nodes))
    for (let i = 0; i < sortedNodes.length; i++) {
      const a = sortedNodes[i]
      const b = sortedNodes[i + 1 === sortedNodes.length ? 0 : i + 1]
      const position = findRelativePosition(a, b)
      let fx, fy, x1, y1, sx, sy

      switch (position) {
        case p.top:
          fx = a.left.x
          fy = a.left.y
          x1 = 0
          y1 = 0
          sx = b.left.x
          sy = b.left.y
          break
        case p.right:
          fx = a.top.x
          fy = a.top.y
          x1 = 0
          y1 = 0
          sx = b.top.x
          sy = b.top.y
          break
        case p.bottom:
          fx = a.right.x
          fy = a.right.y
          x1 = 0
          y1 = 0
          sx = b.right.x
          sy = b.right.y
          break
        case p.left:
          fx = a.bottom.x
          fy = a.bottom.y
          x1 = 0
          y1 = 0
          sx = b.bottom.x
          sy = b.bottom.y
          break
        case p.top_right:
          fx = a.top.x
          fy = a.top.y
          x1 = 0
          y1 = 0
          sx = b.top.x
          sy = b.top.y
          break
        case p.bottom_right:
          fx = a.top.x
          fy = a.top.y
          x1 = ((b.x - a.x) / 2) + 1
          y1 = ((b.x - a.x) / 2) + 1
          sx = b.top.x
          sy = b.top.y
          break
        case p.bottom_left:
          fx = a.bottom.x
          fy = a.bottom.y
          x1 = ((a.x - b.x) / 2)
          y1 = ((b.x - a.x) / 2) + 1
          sx = b.bottom.x
          sy = b.bottom.y
          break
        case p.top_left:
          fx = a.bottom.x
          fy = a.bottom.y
          x1 = ((a.x - b.x) / 2) - 1
          y1 = ((a.x - b.x) / 2) - 1
          sx = b.bottom.x
          sy = b.bottom.y
          break
        default:
          fx = 0
          fy = 0
          x1 = 0
          y1 = 0
          sx = 0
          sy = 0
      }
      if (i === 0) {
        path += `M ${fx} ${fy} L ${sx} ${sy} L `
      } else {
        path += `${fx} ${fy} L ${sx} ${sy} `
        if (i !== sortedNodes.length - 1) {
          path += 'L '
        }
      }

    }
    path += 'Z'
    return path
  }

  const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const randomByte = () => randomNumber(0, 255)
  const randomPercent = () => (randomNumber(50, 100) * 0.01).toFixed(2)
  const randomCssRgba = () => `rgba(${[randomByte(), randomByte(), randomByte(), 1].join(',')})`

  return (
    <g>
      {nodes && nodes.map(node =>
        <circle key={node.label} cx={node.x} cy={node.y} r={4} fill="white" />
      )}
      <path fill={randomCssRgba()} d={path} />
      {/*<line stroke="red" strokeWidth="1px" x1={0} y1={avg} x2={162} y2={avg} />*/}
    </g>
  )
}

export default Community