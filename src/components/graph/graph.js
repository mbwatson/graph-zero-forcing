import { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { useTheme } from '@mui/material'
import { useGraph } from '../../graph-context'

const ForceGraph2D = loadable(() => import('./force-graph'))

export const Graph = ({ nodes, edges, height, width }) => {
  const theme = useTheme()
  const { graph } = useGraph()
  const fgRef = useRef()

  // "active" here indicates it's being hovered
  // const [activeNode, setActiveNode] = useState(null)

  const handleClickNode = useCallback((node, ) => {
    graph.toggleNodeColor(node.id)
  }, [graph.coloredNodes])

  const nodeColor = useCallback(node => graph.coloredNodes.size
    ? graph.coloredNodes.has(node.id)
      ? theme.palette.secondary.dark
      : '#b7c4dd'
  : '#b7c4dd', [graph.coloredNodes])

  // const highlightedNodes = useMemo(() => {
  //   return activeNode !== null
  //     ? graph.neighbors(activeNode)
  //     : new Set()
  // }, [activeNode])

  // const nodeHighlight = useCallback(({ x, y, id }, context) => {
  //   context.fillStyle = '#fff'
  //   context.beginPath()
  //   context.arc(x, y, 5, 0, 2 * Math.PI, false)
  //   context.lineWidth = activeNode === id ? 3 : 1
  //   context.strokeStyle = theme.palette.primary.light
  //   context.stroke()
  //   context.fill()
  // }, [activeNode])

  // const handleHoverNode = useCallback((node, ) => {
  //   if (node) {
  //     setActiveNode(node.id)
  //   } else {
  //     setActiveNode(null)
  //   }
  // }, [])

  // const nodedHighlightPlacement = useCallback(node => {
  //   return highlightedNodes.has(node.id) ? 'before' : undefined
  // }, [highlightedNodes])

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
      onNodeClick={ handleClickNode }
      nodeColor={ nodeColor }
      linkColor={ () => '#aaa' }
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
