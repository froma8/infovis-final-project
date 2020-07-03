let seed = 1

export default (graph, width, height, parameters) => {
  let communitiesNodes = [...new Set(graph.communities.flat())].map(node => node.toString())

  const [nodes, edges] = mapData(communitiesNodes, graph.edges, width, height)

  const charge = parameters.charge
  const linkStrength = parameters.linkStrength
  const linkDistance = parameters.linkDistance
  const gravity = parameters.gravity
  const iterations = parameters.iterations

  const mainStep = (k_e, k_sf, k_sl, gravity) => {
    // forze repulsive
    for (let o = 0; o < nodes.length; o++) {
      for (let l = 0; l < nodes.length; l++) {
        if (o !== l) {
          const v = nodes[o]
          const u = nodes[l]
          const distx = (v.x) - (u.x)
          const disty = (v.y) - (u.y)

          const dist = Math.sqrt(distx * distx + disty * disty)
          v.dispx += (k_e / dist) * (distx / dist)
          v.dispy += (k_e / dist) * (disty / dist)
        }
      }
    }

    for (let h = 0; h < edges.length; h++) {
      let v = edges[h].source
      let u = edges[h].target
      let vx = v.x
      let vy = v.y
      let ux = u.x
      let uy = u.y
      let distx = vx - ux
      let disty = vy - uy
      if (distx < 1 && distx > -1) distx = 1
      if (disty < 1 && disty > -1) disty = 1
      const dist = Math.sqrt(Math.pow(distx, 2) + Math.pow(disty, 2))
      v.dispx -= k_sf * (dist - k_sl) * (distx / dist)
      v.dispy -= k_sf * (dist - k_sl) * (disty / dist)

      u.dispx += k_sf * (dist - k_sl) * (distx / dist)
      u.dispy += k_sf * (dist - k_sl) * (disty / dist)
    }

    for (let j = 0; j < nodes.length; j++) {
      const xp = nodes[j].x
      const xd = nodes[j].dispx
      const yp = nodes[j].y
      const yd = nodes[j].dispy
      const a = xp + xd
      const b = yp + yd

      const distx = a - (width / 2)     // distanza x dal centro dello schermo
      const disty = b - (height / 2)    // distanza y dal centro dello schermo
      const dist = Math.sqrt(distx * distx + disty * disty) // distanza assoluta dal centro dello schermo

      nodes[j].dispx -= (dist * gravity) * (distx / dist)  // sommo allo spostamento uno spostamento di gravità
      nodes[j].dispy -= (dist * gravity) * (disty / dist)

      nodes[j].x += nodes[j].dispx
      nodes[j].y += nodes[j].dispy
      nodes[j].dispx = 0
      nodes[j].dispy = 0
    }
  }

  for (let k = 0; k < iterations; k++) {
    mainStep(charge, linkStrength, linkDistance, gravity)
  }

  return new Map(nodes.map(node => ([node.label, node])))
}

const mapData = (graphNodes, graphEdges, width, height) => {
  
  const nodes = graphNodes.map(graphNode => {
    return {
      x: random() * width,
      y: random() * height,
      dispx: 0,
      dispy: 0,
      links: 0,
      label: graphNode.toString()
    }
  })

  const edges = graphEdges.map(grapEdge => {
    const [source, target] = grapEdge.split('-')
    return { source: nodes.find(n => n.label === source), target: nodes.find(n => n.label === target) }
  }).filter(edge => edge.source && edge.target)

  return [nodes, edges]
}

const random = () => {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}