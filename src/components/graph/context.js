import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocalStorage } from '../../hooks'
import { Matrix } from 'ml-matrix'

const initialGraph = [
  [0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0],
]

const GraphContext = createContext({})

export const useGraph = () => useContext(GraphContext)

export const GraphProvider = ({ children }) => {
  // matrix will be the 2d array
  const [matrix, setMatrix] = useLocalStorage('adjacency-matrix', initialGraph)
  // adjacencyMatrix will be the instance of the Matrix object,
  // which provides all those calculation helpers.
  const adjacencyMatrix = useMemo(() => new Matrix(matrix), [matrix])
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [coloredNodes, setColoredNodes] = useState(new Set())
  const [color, setColor] = useLocalStorage('node-color', '#a14f92')
  const [nodeSize, setNodeSize] = useLocalStorage('node-size', 4)
  
  useEffect(() => {
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

  const toggleNeighborhoodColor = useCallback(id => {
    const _coloredNodes = new Set([...coloredNodes])
    if (_coloredNodes.has(id)) {
      [...neighbors(id)].forEach(i => _coloredNodes.delete(i))
      setColoredNodes(new Set(_coloredNodes))
      return
    }
    setColoredNodes(new Set([...coloredNodes, id, ...neighbors(id)]))
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
    adjacencyMatrix.data[i].forEach((entry, j) => {
      if (entry === 1) {
        neighbors.add(j)
      }
    })
    return neighbors
  }, [adjacencyMatrix, coloredNodes])

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

  const matrixToggle = useCallback((row, col) => {
    if (row === col) {
      return
    }
    const _m = [...matrix]
    _m[row][col] = (_m[row][col] + 1) % 2
    _m[col][row] = _m[row][col]
    setMatrix(_m)
  }, [adjacencyMatrix])

  return (
    <GraphContext.Provider value={{
      graph: {
        nodes,
        edges,
        adjacencyMatrix,
        setMatrix,
        colorNode,
        coloredNodes,
        toggleNodeColor,
        toggleNeighborhoodColor,
        uncolorAllNodes,
        neighbors,
        matrixToggle,
        settings: {
          color,
          setColor,
          nodeSize,
          setNodeSize,
        },
      },
      colorStep,
      matrix,
      setMatrix,
    }}>
      { children }
    </GraphContext.Provider>
  )
}

GraphProvider.propTypes = { children: PropTypes.node }
