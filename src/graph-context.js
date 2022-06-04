import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocalStorage } from './hooks'
import { Matrix } from 'ml-matrix'

const initialGraph = new Matrix([
  [0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0],
])

const GraphContext = createContext({})

export const useGraph = () => useContext(GraphContext)

export const GraphProvider = ({ children }) => {
  const [adjMatrix, setAdjMatrix] = useState(initialGraph)
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [coloredNodes, setColoredNodes] = useState(new Set())
  const [color, setColor] = useLocalStorage('node-color', '#a14f92')
  const [nodeSize, setNodeSize] = useLocalStorage('node-size', 4)
  
  useEffect(() => {
    setNodes([...Array(adjMatrix.rows).keys()].map(i => ({ id: i })))
    let _edges = []
    adjMatrix.data.forEach((row, i) => {
      for (let j = 0; j < i; j += 1) {
        if (row[j] === 1) {
          _edges.push({ source: i, target: j })
        }
      }
    })
    setEdges(_edges)
  }, [adjMatrix])

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
    let neighbors = new Set([i])
    adjMatrix.data[i].forEach((entry, j) => {
      if (entry === 1) {
        neighbors.add(j)
      }
    })
    return neighbors
  }, [coloredNodes])

  const colorStep = useCallback(() => {
    const nextColoredNodes = new Set();
    [...coloredNodes].forEach(i => {
      const uncoloredNeighbors = [...neighbors(i)].filter(i =>  !coloredNodes.has(i))
      if (uncoloredNeighbors.length === 1) {
        nextColoredNodes.add(uncoloredNeighbors[0])
      }
    })
    setColoredNodes(new Set([...coloredNodes, ...nextColoredNodes]))
  }, [coloredNodes])

  return (
    <GraphContext.Provider value={{
      graph: {
        nodes,
        edges,
        adjMatrix,
        coloredNodes,
        toggleNodeColor,
        uncolorAllNodes,
        neighbors,
        settings: {
          color,
          setColor,
          nodeSize,
          setNodeSize,
        },
      },
      colorStep,
      adjMatrix,
      setAdjMatrix,
    }}>
      { children }
    </GraphContext.Provider>
  )
}

GraphProvider.propTypes = { children: PropTypes.node }
