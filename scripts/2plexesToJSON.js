const { readFileSync, writeFileSync } = require('fs')
const { Console } = require('console')

const plexesPath = process.argv[2]
const edgesPath = process.argv[3]
const output = process.argv[4]

if (!plexesPath) {
    console.error('Must provide a path to a .2-plexes file')
    process.exit(1)
}

if (!edgesPath) {
    console.error('Must provide a path to a .edges file')
    process.exit(1)
}

if (!output) {
    console.error('Must provide output file')
    process.exit(1)
}

const parsePlexes = () => {
    let plexesString

    try {
        plexesString = readFileSync(plexesPath).toString()
    } catch (e) {
        console.error(`File not found in ${plexesPath}`)
        process.exit(1)
    }
    return JSON.parse(`[${plexesString.split('\n').filter(x => !!x).join(',')}]`)
}

const parseEdges = () => {
    let edgesString
    
    try {
        edgesString = readFileSync(edgesPath).toString()
    } catch (e) {
        console.error(`File not found in ${edgesPath}`)
        process.exit(1)
    }
    
    return edgesString.split('\n').filter(x => !!x).map(row => row.split(' '))
}
console.log(`Parsing 2-plexes file at ${plexesPath}...`)
const plexes = parsePlexes()
console.log(`Parsing edges file at ${edgesPath}...`)
const edges = parseEdges()
console.log(`Creating vertexes array...`)
const vertexes = [...new Set(edges.flat())].map(x => parseInt(x)).sort((a, b) => a - b)

console.log(`Writing file into ${output}...`)
try {
    writeFileSync(output, JSON.stringify({
        communities: plexes,
        edges: edges.map(([first, second]) => [`${first}-${second}`, `${second}-${first}`]).flat(),
        nodes: vertexes,
    }))
} catch (e) {
    console.error(`Could not write file into ${output}`)
    process.exit(1)
}
console.log('Done')
process.exit(0)