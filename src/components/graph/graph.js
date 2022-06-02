import { useCallback } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
const ForceGraph2D = loadable(() => import('./force-graph'))
import { useTheme } from '@mui/material'
import { useGraph } from '../../graph-context'

export const Graph = ({ nodes, edges, height, width }) => {
  const theme = useTheme()
  const { graph } = useGraph()

  const handleClickNode = useCallback((node, ) => {
    graph.toggleNodeColor(node.id)
  }, [graph.coloredNodes])

  const nodeColor = useCallback(node => graph.coloredNodes.size
    ? graph.coloredNodes.has(node.id)
      ? theme.palette.secondary.dark
      : '#a7b4cd'
  : '#a7b4cd', [graph.coloredNodes])

  return (
    <ForceGraph2D
      height={ height }
      width={ width }
      graphData={{ nodes, links: edges }}
      enablePointerInteraction={ true }
      onNodeClick={ handleClickNode }
      nodeColor={ nodeColor }
      linkColor={ () => '#aaa' }
      linkWidth={ 1 }
      linkOpacity="1.0"
      nodeLabel={ node => `${ node.id }` }
    />
  )
}

Graph.propTypes = {
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}
