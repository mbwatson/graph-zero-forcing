import { Fragment } from 'react'
import { Graph } from './components/graph'
import { useGraph } from './context'
import { Button, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material'
import {
  SkipNext as StepIcon,
} from '@mui/icons-material'
import matrices from './lib/matrices'
import { Matrix } from './components/matrix'

export const App = () => {
  const theme = useTheme()
  const { graph, setGraphName, colorStep } = useGraph()

  const handleSelectGraph = event => {
    setGraphName(event.target.value)
    graph.uncolorAllNodes()
  }

  return (
    <Fragment>
      <Stack
        sx={{ padding: theme.spacing(2) }}
        direction="row"
        spacing={ 2 }
        align="center"
        justifyContent="center"
      >
        <Select value={ graph.name } onChange={ handleSelectGraph } sx={{ width: '200px' }}>
          {
            Object.keys(matrices).map(key => (
              <MenuItem key={ `option-${ key }` } value={ key }>{ key }</MenuItem>
            ))
          }
        </Select>
        <Button onClick={ colorStep } variant="outlined" color="primary" size="small"><StepIcon /></Button>
      </Stack>

      <hr />
      <Graph nodes={ graph.nodes } edges={ graph.edges } />
      <hr />
      
      <Stack spacing={ 2 } sx={{ padding: theme.spacing(2) }}>
        <Stack spacing={ 1 } direction="row">
          <Typography variant="h6">ADJACENCY MATRIX:</Typography>
          <Matrix matrix={ graph.adjacencyMatrix.data } />
        </Stack>

        <Stack
          spacing={ 1 }
          direction="row"
          align="center"

        >
          <Typography variant="h6">COLORED NODES:</Typography>
          <code style={{
            color: graph.coloredNodes.size === graph.nodes.length
              ? theme.palette.secondary.dark
              : theme.palette.text.primary
          }}>{ `{ ${ [...graph.coloredNodes].join(', ') } }` }</code>
        </Stack>
      </Stack>

    </Fragment>
  )
}
