import { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { useTheme } from '@mui/material'
import { useGraph } from './context'

const ForceGraph2D = loadable(() => import('./force-graph'))

export const Graph = ({ nodes, edges, height, width }) => {
  const theme = useTheme()
  const { graph } = useGraph()
  const fgRef = useRef()
  const [highlightedNodes, setHighlightedNodes] = useState(new Set())

  const updateHighlight = () => {
    setHighlightedNodes(highlightedNodes)
  }

  const handleHoverNode = node => {
    highlightedNodes.clear()
    if (node) {
      highlightedNodes.add(node.id)
      graph.neighbors(node.id)
        .forEach(i => highlightedNodes.add(i))
    }
    updateHighlight()
  }

  const paintRing = useCallback((node, ctx) => {
    ctx.beginPath()
    ctx.arc(node.x, node.y, graph.settings.nodeSize + 1.5, 0, 2 * Math.PI, false)
    ctx.strokeStyle = `${ graph.settings.color }66`
    ctx.lineWidth = 3
    ctx.stroke()
  }, [graph.settings])

  const handleClickNode = useCallback((node, event) => {
    if (event.ctrlKey) {
      graph.toggleNeighborhoodColor(node.id)
      return
    }
    graph.toggleNodeColor(node.id)
  }, [graph.coloredNodes])

  const nodeCanvasObject = useCallback(({ x, y, id }, context) => {
    if (highlightedNodes.has(id)) {
      paintRing({ x, y }, context)
    }
    context.fillStyle = graph.coloredNodes.has(id)
      ? graph.settings.color
      : '#fff'
    context.beginPath()
    context.arc(x, y, graph.settings.nodeSize, 0, 2 * Math.PI, false)
    context.lineWidth = 1
    context.strokeStyle = theme.palette.grey[800]
    context.stroke()
    context.fill()
  }, [graph.coloredNodes, graph.settings])

  const nodePaint = ({ x, y }, color, context) => {
    context.fillStyle = color
    context.beginPath()
    context.arc(x, y, graph.settings.nodeSize, 0, 2 * Math.PI, false)
    context.fill()
  }

  useEffect(() => {
    if (!fgRef.current) {
      return
    }
    const handleKeyPress = event => {
      if (event.keyCode === 70) {
        fgRef.current.zoomToFit(250)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [fgRef.current])

  return (
    <ForceGraph2D
      ref={ fgRef }
      height={ height }
      width={ width }
      graphData={{ nodes, links: edges }}
      enablePointerInteraction={ true }
      nodePointerAreaPaint={ nodePaint }
      nodeCanvasObject={ nodeCanvasObject }
      onNodeClick={ handleClickNode }
      onNodeHover={ handleHoverNode  }
      onNodeDrag={ handleHoverNode }
      linkColor={ () => theme.palette.grey[500] }
      linkWidth={ 2 }
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
