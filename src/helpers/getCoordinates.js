import cytoscape from 'cytoscape'
import cola from 'cytoscape-cola'

cytoscape.use(cola)

export const getCoordinates = dataset => {
  return new Promise(resolve => {
    let communitiesNodes = [...new Set(dataset.communities.flat())].map(node => node.toString())

    const nodes = communitiesNodes.map((vertex) => {
      return {
        data: {id: vertex}
      }
    })

    const edges = dataset.edges.map((edge) => {
      const [source, target] = edge.split('-')
      if (communitiesNodes.includes(source) && communitiesNodes.includes(target)) {
        return {
          data: {id: edge, source, target}
        }
      }
    }).filter(x => !!x)

    const vertexes = new Map()

    const setCoordinates = layout => {
      layout.options.eles.forEach(node => {
        const privateData = node._private
        if (!privateData.data.source || !privateData.data.target) {
          vertexes.set(privateData.data.id, {
            label: privateData.data.id,
            x: privateData.position.x,
            y: privateData.position.y
          })
        }
      })
      return resolve(vertexes)
    }

    const cy = cytoscape(
      {
        container: document.getElementById('cy'),
        elements: {nodes, edges}
      }
    )

    const layout = cy.layout(
      {name: 'cola', ready: ({layout}) => setCoordinates(layout)}
    )

    cy.unmount()
    layout.run()
  })
}