import cytoscape from 'cytoscape'
import cola from 'cytoscape-cola'

cytoscape.use(cola)

export const getCoordinates = dataset => {
  let plexesNodes = [...new Set(dataset.plexes.flat())].map(node => node.toString())

  const nodes = plexesNodes.map((vertex) => {
    return {
      data: { id: vertex }
    }
  })

  const edges = dataset.edges.map((edge) => {
    const [source, target] = edge.split('-')
    if (plexesNodes.includes(source) && plexesNodes.includes(target)) {
      return {
        data: { id: edge, source, target }
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
    console.log(vertexes)
  }

  const cy = cytoscape(
    {
      container: document.getElementById('cy'),
      elements: { nodes, edges }
    }
  )

  const layout = cy.layout(
    { name: 'cola', ready: ({layout}) => setCoordinates(layout) }
  )


  cy.unmount()
  layout.run()
  console.log(layout)
  

  
  
  return vertexes
}