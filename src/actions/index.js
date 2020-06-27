import * as t from './types'
import graph from '../data/dolphins.json'
import { getCoordinates } from '../helpers'


export const selectNode = (data) => ({ type: t.SELECT_NODE, data })

export const loadGraph = (data) => (dispatch) => {
    const graph = {}
    getCoordinates(data)
      .then(nodesCoordinates => {
          graph.nodes = [...nodesCoordinates.values()]

          const newEdges = new Map()
          data.edges.forEach(edge => {
              const [first, second] = edge.split('-')
              const nodeA = nodesCoordinates.get(first)
              const nodeB = nodesCoordinates.get(second)
              if (nodeA && nodeB) {
                  newEdges.set(edge, { x1: nodeA.x, y1: nodeA.y, x2: nodeB.x, y2: nodeB.y, key: edge })
              }
          })
          graph.edges = [...newEdges.values()]
          graph.communities = []
          data.communities.forEach((plex) => {
              graph.communities.push(plex.map(node => nodesCoordinates.get(node.toString())))
          })
          dispatch({ type: t.LOAD_GRAPH, data: graph})
      })
}

export const selectCommunities = data => {
    //forse dovrei tener conto dei filtri
    let communities = graph.communities.filter(community => community.includes(parseInt(data)))
    return { type: t.SELECT_COMMUNITIES, data: communities }
}
