import React from 'react'
import graph from './data/dolphins.json'
import Graph from './components/Graph'


const App = () => {
  return (
    <Graph
      dataset={graph}
    />
  )
}

export default App
