import * as t from './types'
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
      dispatch({ type: t.LOAD_GRAPH, data: graph })
    })
}

export const selectCommunities = data => {
  if (!data) {
    return { type: t.SELECT_COMMUNITIES, data: null }
  }
  //forse dovrei tener conto dei filtri
  const label = data.label
  const graphEdges = data.edges
  const communitiesNodes = data.communities.filter(community => community.some(communityNode => communityNode.label === label))
  let communities = communitiesNodes.map(communityNodes => {
    let communityEdges = graphEdges.filter(edge => {
      const [first, second] = edge.key.split('-')
      return communityNodes.some(node => node.label === first) && communityNodes.some(node => node.label === second)
    })
    return { nodes: communityNodes, edges: communityEdges }
  })
  return { type: t.SELECT_COMMUNITIES, data: communities }
}

export const applyFilters = data => ({ type: t.APPLY_FILTERS, data })