import { useRef, useState } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { useGraph } from '../context'
import { Matrix } from 'ml-matrix'

const matrixToInput = m => m.map(row => row.join()).join('\n')
const inputToMatrix = input => input
  .replace(/[^\S\r\n]/g, '')
  .split(/\n/)
  .map(row => row.split(',')
  .map(x => parseInt(x)))

export const MatrixEditor = () => {
  const { adjMatrix, setAdjMatrix } = useGraph()
  const textElement = useRef()
  const [textContent, setTextContent] = useState(matrixToInput(adjMatrix.data))
  const [error, setError] = useState(null)

  const handleClickValidate = () => {
    setError(null)
    try {
      if (!textElement.current) {
        throw new Error('Could not locate text input field.')
      }
      const inputArray = inputToMatrix(textElement.current.textContent)
      const newMatrix = new Matrix(inputArray)
      if (!newMatrix.isSquare()) {
        throw new Error('Matrix must be square')
      }
      if (!newMatrix.isSymmetric()) {
        throw new Error('Matrix must be symmetric')
      }
      setAdjMatrix(newMatrix)
    } catch (error) {
      setError(error)
    }
  }

  const handleChangeText = event => {
    setTextContent(event.target.value)
  }

  return (
    <Stack spacing={ 2 } align="center">
      <Typography component={ Stack } justifyContent="center">
        ADJACENCY MATRIX
      </Typography>
      <TextField
        ref={ textElement }
        multiline
        value={ textContent }
        onChange={ handleChangeText }
      />
      <Button
        variant="contained"
        onClick={ handleClickValidate }
      >Generate Graph</Button>
      {
        error && <Typography color="darkred">{ error.message }</Typography>
      }
    </Stack>
  )
}
