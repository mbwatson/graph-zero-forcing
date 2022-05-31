import { useRef, useState } from 'react'
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Tooltip, Typography } from '@mui/material'
import {
  RestartAlt as ResetIcon,
} from '@mui/icons-material'
import { useGraph } from '../context'
import { Matrix } from 'ml-matrix'

const matrixToInput = m => m.map(row => row.join()).join('\n')
const inputToMatrix = input => input
  .replace(/[^\S\r\n]/g, '')
  .split(/\n/)
  .map(row => row.split(',')
  .map(x => parseInt(x)))

const fontSizes = [...Array(14).keys()].map(x => x + 7)

export const MatrixEditor = () => {
  const { adjMatrix, setAdjMatrix } = useGraph()
  const textElement = useRef()
  const [textContent, setTextContent] = useState(matrixToInput(adjMatrix.data))
  const [error, setError] = useState(null)
  const [fontSize, setFontSize] = useState(12)

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

  const handleChangeFontSize = event => {
    setFontSize(event.target.value)
  }

  const handleClickResetMatrix = () => {
    setTextContent(matrixToInput(adjMatrix.data))
  }

  return (
    <Stack spacing={ 2 } alignItems="stretch">
      <Stack direction="row" justifyContent="space-between" spacing={ 2 }>
        <Stack direction="row" spacing={ 2 } alignItems="center">
          <Typography component={ Stack } justifyContent="center">
            ADJACENCY MATRIX
          </Typography>
          <Tooltip title="Reset adjacency matrix" placement="right">
            <IconButton
              size="small"
              variant="outlined"
              onClick={ handleClickResetMatrix }
            ><ResetIcon fontSize="small" /></IconButton>
          </Tooltip>
        </Stack>
        <Stack direction="row" spacing={ 2 }>
          <FormControl>
            <InputLabel id="font-size-select-label">Font size</InputLabel>
            <Select value={ fontSize } onChange={ handleChangeFontSize } size="small" label="Font size" sx={{ width: '80px' }}>
              {
                fontSizes.map(size => (
                  <MenuItem
                    key={ `font-size-option-${ size }` }
                    value={ size }
                  >{ `${ size }pt` }</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <TextField
        ref={ textElement }
        multiline
        value={ textContent }
        onChange={ handleChangeText }
        maxRows={ 15 }
        inputProps={{ sx: { fontSize, fontFamily: 'monospace', lineHeight: 1 } }}
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
