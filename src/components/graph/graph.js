import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { useTheme } from '@mui/material'
import { useGraph } from '../../graph-context'

const ForceGraph2D = loadable(() => import('./force-graph'))

export const Graph = ({ nodes, edges, height, width }) => {
  const theme = useTheme()
  const { graph } = useGraph()

  // "active" here indicates it's being hovered
  const [activeNode, setActiveNode] = useState(null)

  const handleClickNode = useCallback((node, ) => {
    graph.toggleNodeColor(node.id)
  }, [graph.coloredNodes])

  const nodeColor = useCallback(node => graph.coloredNodes.size
    ? graph.coloredNodes.has(node.id)
      ? theme.palette.secondary.dark
      : '#a7b4cd'
  : '#a7b4cd', [graph.coloredNodes])

  const highlightedNodes = useMemo(() => {
    return activeNode !== null
      ? graph.neighbors(activeNode)
      : new Set()
  }, [activeNode])

  const nodeHighlight = useCallback(({ x, y, id }, context) => {
    context.fillStyle = '#fff'
    context.beginPath()
    context.arc(x, y, 5, 0, 2 * Math.PI, false)
    context.lineWidth = activeNode === id ? 3 : 1
    context.strokeStyle = theme.palette.primary.light
    context.stroke()
    context.fill()
  }, [activeNode])

  const handleHoverNode = useCallback((node, prevNode) => {
    if (node) {
      setActiveNode(node.id)
    } else {
      setActiveNode(null)
    }
  }, [])

  const nodedHighlightPlacement = useCallback(node => {
    return highlightedNodes.has(node.id) ? 'before' : undefined
  }, [highlightedNodes])

  return (
    <ForceGraph2D
      height={ height }
      width={ width }
      graphData={{ nodes, links: edges }}
      enablePointerInteraction={ true }
      onNodeClick={ handleClickNode }
      nodeColor={ nodeColor }
      linkColor={ () => '#aaa' }
      nodeCanvasObjectMode={ nodedHighlightPlacement }
      nodeCanvasObject={ nodeHighlight }
      onNodeHover={ handleHoverNode }
      onNodeDrag={ handleHoverNode }
      linkWidth={ 1 }
      linkOpacity="1.0"
      nodeLabel={ node => `${ node.id }` }
      autoPauseRedraw={ false }
    />
  )
}

Graph.propTypes = {
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}
