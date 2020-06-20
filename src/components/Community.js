import React from 'react'
import * as p from '../constants/positions'

const Community = ({ nodes }) => {

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
    if (a.y === b.y && a.y < b.y) {
      return p.top
    }
    if (a.y === b.y && a.y > b.y) {
      return p.bottom
    }
    if (a.x === b.x && a.x > b.y) {
      return p.left
    }
    if (a.x === b.x && a.x < b.y) {
      return p.right
    }
    if (a.x < b.x && a.y < b.y) {
      return p.top_right
    }
    if (a.x < b.x && a.y > b.y) {
      return p.bottom_right
    }
    if (a.x > b.x && a.y > b.y) {
      return p.bottom_left
    }
    if (a.x > b.x && a.y < b.y) {
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
      top: { x: node.x, y: node.y - 4 },
      right: { x: node.x + 4, y: node.y },
      bottom: { x: node.x, y: node.y + 4 },
      left: { x: node.x - 4, y: node.y },
      ...node
    }))
  }

  /**
   * Ordina l'array in modo da visitare i punti da quello piu a sinistra in senso orario
   * @returns {[T]}
   */
  const sortToCicleClockwise = () => {
    const start = [...nodes].sort((a, b) => a.x - b.x)[0]
    const sorted = [start]
    let rest = [...nodes].filter(n => n.label !== start.label)
    let latestNode = start

    const getNextNode = (rest, lastInserted) => {
      let nextNode
      // se ci sono nodi a destra, seleziona quello piu vicino e con y minore
      if (rest.some(n => n.x > lastInserted.x)) {
        const sortByX = [...rest].sort((a, b) => a.x - b.x)
        const nearest = sortByX[0]
        const restSorted = sortByX.slice(1)
        if (restSorted.some(n => n.y > nearest.y)) {
          nextNode = sortByX.sort((a, b) => a.y - b.y)[0]
        } else {
          nextNode = nearest
        }
      } else {
        // altrimenti seleziona quello piu lontano
        const sortByX = [...rest].sort((a, b) => b.x - a.x)
        nextNode = sortByX[0]
      }

      return nextNode
    }

    while (rest.length !== 0) {
      const nextNode = getNextNode(rest, latestNode)
      latestNode = nextNode
      sorted.push(nextNode)
      rest = rest.filter(n => n.label !== nextNode.label)
    }
    console.log(sorted)
    return sorted
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
        case p.top_right:
          fx = a.top.x
          fy = a.top.y
          x1 = ((b.x - a.x) / 2) - 1
          y1 = ((b.x - a.x) / 2) - 1
          sx = b.top.x
          sy = b.top.y
          break
        case p.bottom_right:
          fx = a.right.x
          fy = a.right.y
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
        path += `M ${fx} ${fy} Q ${x1} ${y1} ${sx} ${sy} L `
      } else {
        path += `${fx} ${fy} Q ${x1} ${y1} ${sx} ${sy} `
        if (i !== sortedNodes.length - 1) {
          path += 'L '
        }
      }

    }
    path += 'Z'
    return path
  }

  return (
    <g>
      {nodes && nodes.map(node =>
        <circle key={node.label} cx={node.x} cy={node.y} r={4} fill="rgba(12,15,234,0.3)" />
      )}
      <path fill="rgba(12,15,234,0.3)" d={getPath()} />
    </g>
  )
}

export default Community