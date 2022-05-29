import { useCallback } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
const ForceGraph2D = loadable(() => import('./force-graph'))
import { SizeMe } from 'react-sizeme'
import { useGraph } from '../../context'

export const Graph = ({ nodes, edges }) => {
  const { graph } = useGraph()

  const handleClickNode = useCallback((node, ) => {
    graph.toggleNodeColor(node.id)
  }, [graph.coloredNodes])

  const nodeColor = useCallback(node => graph.coloredNodes.size
    ? graph.coloredNodes.has(node.id)
      ? '#0ac'
      : '#aaa'
  : '#aaa', [graph.coloredNodes])

  return (
    <SizeMe>
      {
        ({ size }) => (
          <ForceGraph2D
            width={ size.width }
            height={ 500 }
            graphData={{ nodes, links: edges }}
            enablePointerInteraction={ true }
            onNodeClick={ handleClickNode }
            nodeColor={ nodeColor }
          />
        )
      }
    </SizeMe>
  )
}

Graph.propTypes = {
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
}
