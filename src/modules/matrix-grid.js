import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import * as d3 from 'd3'
import { Resizable } from 're-resizable'
import { useGraph } from '../components/graph'

export const Matrix = ({ size }) => {
  const { graph } = useGraph()
  const matrixContainer = useRef()

  const data = useMemo(() => {
    let _data = []
    graph.adjacencyMatrix.data.forEach((row, i) => {
      row.forEach((value, j) => _data.push({ row: i, col: j, value: value }))
    })
    return _data
  }, [graph.adjacencyMatrix.data])

  const handleClickRect = (event, { row, col, value }) => graph.matrixToggle(row, col)

  const unit = useCallback(d3.scaleLinear()
    .domain([0, graph.adjacencyMatrix.rows])
    .range([0, size]), [size])

  useEffect(() => {
    if (!matrixContainer.current) {
      return
    }

    const grid = d3.select(matrixContainer.current)
      .style('width', size)
      .style('height', size)

    grid.selectAll('.cell')
      .data(data)
      .enter()
      .append('div')
      .attr('class', 'cell')
      .style('background-color', d => graph.adjacencyMatrix.data[d.row][d.col] === 1 ? '#333' : '#ccc')
      .on('click', handleClickRect)
  }, [data, matrixContainer.current])

  return (
    <Box
      key={ JSON.stringify(data) }
      className="grid"
      ref={ matrixContainer }
      sx={{
        width: `100%`,
        height: `100%`,
        position: 'relative',
        display: 'grid',
        gridTemplateRows: `repeat(${ graph.adjacencyMatrix.rows }, 1fr)`,
        gridTemplateColumns: `repeat(${ graph.adjacencyMatrix.rows }, 1fr)`,
        '& .cell': {
          cursor: 'pointer',
        },
        filter: 'opacity(0.75)',
        transition: 'filter 250ms',
        '&:hover': {
          filter: 'opacity(1.0)',
          '& .cell:hover': {
            border: '1px solid crimson',
          },
        },
      }}
    />
  )
}

Matrix.propTypes = {
  size: PropTypes.number.isRequired,
}

//

export const MatrixGrid = () => {
  const [size, setSize] = useState(180)
  const { graph } = useGraph()

  const handleResizeStop = (event, dir, ref, d) => {
    setSize(size + d.width)
  }

  return (
    <Box sx={{
      position: 'fixed',
      left: '2rem',
      top: '7rem',
      padding: '1rem',
      backgroundColor: '#000a',
    }}>
      <Resizable
        size={{ width: size, height: size }}
        enable={{ top: false, right: true, bottom: true, left: false, topRight: false, bottomRight: true, bottomLeft: false, topLeft: false }}
        onResizeStop={ handleResizeStop }
        lockAspectRatio
      >
        <Matrix />
      </Resizable>
    </Box>
  )
}
