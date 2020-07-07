import React, {useRef, useEffect} from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {getNodes, getEdges, getCommunities} from '../../reducers'
import { selectNode, selectCommunities } from '../../actions'


const mapStateToProps = state => ({
  nodes: getNodes(state),
  edges: getEdges(state),
  communities: getCommunities(state)
})

const GlobalGraph = ({nodes, edges, width, height, selectNode, selectCommunities, communities }) => {

  const ref = useRef()

  useEffect(() => {
    const svgElement = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("id", "svg")

    const checkContainer = document.getElementById('container')
    if (checkContainer) checkContainer.parentNode.removeChild(checkContainer)
    const container = svgElement.append("g").attr("id", "container")

    const zoom = d3.zoom()
      .scaleExtent([0.01, 10])
      .on("zoom", () => {
        container.attr("transform", d3.event.transform)
      })

    svgElement.call(zoom)


    const link = container.selectAll("line")
      .data(edges, (d) => d.key)
      .attr("x1", (d) => d.x1)
      .attr("y1", (d) => d.y1)
      .attr("x2", (d) => d.x2)
      .attr("y2", (d) => d.y2)

    link.enter()
      .append("line")
      .attr("id", (d) => d.key)
      .attr("x1", (d) => d.x1)
      .attr("y1", (d) => d.y1)
      .attr("x2", (d) => d.x2)
      .attr("y2", (d) => d.y2)
      .attr("stroke-width", "0.1")
      .attr("stroke", "#000000")

    const node = container.selectAll(".node")
      .data(nodes, (d) => d.label.toString())

    const nodeEnter = node.enter()
      .append("g")
      .attr("class", "node")
      .attr("id", (d) => d.label.toString())
      .style("cursor", "pointer")
      .on('click', (d) => selectNodeAndCommunities(d.label))


    nodeEnter.append('circle')
      .attr("fill", "#000000")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", "15")

    nodeEnter.append('text')
      .text((d) => d.label)
      .attr("fill", "#FFFFFF")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + 4.5)
      .attr("text-anchor", "middle")
      .style("font-size", "1rem")


    node.append("title")
      .text(function (d) {
        return d.name;
      })
  }, [nodes, edges])

  const selectNodeAndCommunities = (label) => {
    selectNode(label)
    selectCommunities({label, edges, communities})
  }


  return (
    <Container>
      <svg
        ref={ref}
      />
    </Container>
  )
}

export default connect(mapStateToProps, { selectNode, selectCommunities })(GlobalGraph)

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`