import * as t from './types'
import graph from '../data/dolphins.json'


export const selectNode = (data) => ({ type: t.SELECT_NODE, data })

export const selectCommunities = data => {
    //forse dovrei tener conto dei filtri
    let communities = graph.plexes.filter(plex => plex.includes(parseInt(data)))
    return { type: t.SELECT_COMMUNITIES, data: communities }
}
