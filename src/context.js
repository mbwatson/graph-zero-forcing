import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import matrices from './lib/matrices'

const GraphContext = createContext({})

export const useGraph = () => useContext(GraphContext)

export const GraphProvider = ({ children }) => {
  // const availableGraphs = useMemo(() => {
  //   return Object.keys(matrices)
  // }, [])

  const [graphName, setGraphName] = useState('C_5')
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [coloredNodes, setColoredNodes] = useState(new Set())
  
  const adjacencyMatrix = useMemo(() => matrices[graphName], [graphName])

  useEffect(() => {
    if (!adjacencyMatrix || !adjacencyMatrix.isSquare() || !adjacencyMatrix.isSymmetric()) {
      return { nodes: [], edges: [] }
    }
    setNodes([...Array(adjacencyMatrix.rows).keys()].map(i => ({ id: i })))
    let _edges = []
    adjacencyMatrix.data.forEach((row, i) => {
      for (let j = 0; j < i; j += 1) {
        if (row[j] === 1) {
          _edges.push({ source: i, target: j })
        }
      }
    })
    setEdges(_edges)
  }, [adjacencyMatrix])

  const toggleNodeColor = useCallback(i => {
    if (coloredNodes.has(i)) {
      uncolorNode(i)
    } else {
      colorNode(i)
    }
  }, [coloredNodes])

  const colorNode = useCallback(i => {
    setColoredNodes(new Set([...coloredNodes, i]))
  }, [coloredNodes])

  const uncolorNode = useCallback(i => {
    let _coloredNodes = new Set([...coloredNodes])
    if (_coloredNodes.has(i)) {
      _coloredNodes.delete(i)
    }
    setColoredNodes(_coloredNodes)
  }, [coloredNodes])

  const uncolorAllNodes = () => setColoredNodes(new Set())

  const neighbors = useCallback(i => {
    let neighbors = []
    adjacencyMatrix.data[i].forEach((entry, j) => {
      if (entry === 1) {
        neighbors.push(j)
      }
    })
    return neighbors
  }, [coloredNodes])

  const colorStep = useCallback(() => {
    const nextColoredNodes = new Set();
    [...coloredNodes].forEach(i => {
      const uncoloredNeighbors = neighbors(i).filter(i =>  !coloredNodes.has(i))
      if (uncoloredNeighbors.length === 1) {
        nextColoredNodes.add(uncoloredNeighbors[0])
      }
    })
    setColoredNodes(new Set([...coloredNodes, ...nextColoredNodes]))
  }, [coloredNodes])

  return (
    <GraphContext.Provider value={{
      graph: {
        name: graphName,
        nodes,
        edges,
        adjacencyMatrix,
        coloredNodes,
        toggleNodeColor,
        uncolorAllNodes,
      },
      setGraphName,
      colorStep,
    }}>
      { children }
    </GraphContext.Provider>
  )
}

GraphProvider.propTypes = { children: PropTypes.node }
