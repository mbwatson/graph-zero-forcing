import { useRef, useState } from 'react'
import {
  Box, Button, IconButton, Menu, MenuItem, Stack, TextField, Tooltip, Typography
} from '@mui/material'
import {
  RestartAlt as ResetIcon,
  KeyboardArrowDown as MenuOpenIcon,
} from '@mui/icons-material'
import { useGraph } from '../graph'
import { Matrix } from 'ml-matrix'
import matrices from '../../lib/matrices'

const matrixToInput = m => m.map(row => row.join()).join('\n')
const inputToMatrix = input => input
  .replace(/[^\S\r\n]/g, '')
  .split(/\n/)
  .map(row => row.split(',')
    .map(x => parseInt(x))
  )

export const MatrixEditor = () => {
  const { graph } = useGraph()
  const textElement = useRef()
  const [textContent, setTextContent] = useState(matrixToInput(graph.adjacencyMatrix.data))
  const [error, setError] = useState(null)
  const [showResetButton, setShowResetButton] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const menuOpen = Boolean(menuAnchorEl)

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
      graph.setMatrix(inputArray)
      graph.uncolorAllNodes()
      setShowResetButton(false)
    } catch (error) {
      setError(error)
    }
  }

  const handleChangeText = event => {
    setShowResetButton(true)
    setTextContent(event.target.value)
  }

  const handleClickResetMatrix = () => {
    setShowResetButton(false)
    setTextContent(matrixToInput(graph.adjacencyMatrix.data))
  }

  const handleSelectPresetMatrix = graphName => () => {
    setShowResetButton(true)
    handleCloseMenu()
    setTextContent(matrixToInput(matrices[graphName]))
  }

  const handleClickOpenMenu = event => setMenuAnchorEl(event.target)
  const handleCloseMenu = () => setMenuAnchorEl(null)

  return (
    <Stack spacing={ 2 } alignItems="stretch">
      <Stack direction="row" justifyContent="space-between" spacing={ 2 }>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          gap: '1rem',
        }}>
          <Typography variant="h2" sx={{ flex: 1, fontSize: '135%' }}>Adjacency Matrix</Typography>
          {
            showResetButton && (
              <Tooltip title="Reset matrix" placement="left">
                <IconButton
                  color="primary"
                  onClick={ handleClickResetMatrix }
                ><ResetIcon fontSize="small" /></IconButton>
              </Tooltip>
            )
          }
          <Button
            color="primary"
            variant="outlined"
            onClick={ handleClickOpenMenu }
            endIcon={ <MenuOpenIcon /> }
          >Presets</Button>
          <Menu
            value=""
            onChange={ handleSelectPresetMatrix }
            anchorEl={ menuAnchorEl }
            open={ menuOpen }
            onClose={ handleCloseMenu }
          >
            {
              Object.keys(matrices).map(name => (
                <MenuItem
                  key={ `matrix-option-${ name }` }
                  onClick={ handleSelectPresetMatrix(name) }
                >{ name }</MenuItem>
              ))
            }
          </Menu>
        </Box>
      </Stack>
      
      <Box>
        <TextField
          ref={ textElement }
          multiline
          fullWidth
          rows={ Math.min(20, textContent.split('\n').length) }
          value={ textContent }
          onChange={ handleChangeText }
          inputProps={{ sx: { fontFamily: 'monospace', lineHeight: 1.5, fontSize: '75%' } }}
        />
        <br />
        {
          error && <Typography color="pink">{ error.message }</Typography>
        }
        <br />
        <Button
          fullWidth
          variant="contained"
          onClick={ handleClickValidate }
        >Generate Graph</Button>
      </Box>
    </Stack>
  )
}
