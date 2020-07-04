import React from 'react'
import ReactMarkdown from 'react-markdown'
//import CodeBlock from './CodeBlock'

const input = `
# Communities Visualizer
Easy tool for visualizing communities in graphs. 
You can load a JSON file so formatted:
\`\`\`json
{
  "communities": [[1,2,3]],
  "edges": ["1-2", "2-3"],
  "nodes": [1,2,3,4]
}
\`\`\`
You can obtain such file using [this](https://github.com/froma8/infovis-final-project/blob/master/scripts/2plexesToJSON.js) script, giving as input two files:
\`\`\`bash
node 2plexesToJSON.js <path-to-communities-file> <path-to-edges-file> <output-file>.json
\`\`\`
Where the two input files are so made:  
**communities file:** (one community per row)
\`\`\`
[33, 34, 35, 37]
[8, 19, 33, 36]
[11, 14, 15, 38]
...
\`\`\`
**edges file:** (one edge per row, source and target separeted by a space character)
\`\`\`
source target
source target
...
\`\`\`
`

const Informations = () => {

  return (
    <ReactMarkdown source={input} />
  )
}

export default Informations

//region Style

//endregion