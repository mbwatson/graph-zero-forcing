import { Fragment } from 'react'
import { Graph } from './components/graph'
import matrices from './lib/matrices'
import { useGraph } from './context'
import { Box, Button, MenuItem, Select, Stack } from '@mui/material'
import {
  SkipNext as StepIcon,
} from '@mui/icons-material'

export const App = () => {
  const { graph, setGraphName, colorStep } = useGraph()

  const handleSelectGraph = event => {
    setGraphName(event.target.value)
    graph.uncolorAllNodes()
  }

  return (
    <Fragment>
      <Box sx={{ padding: '1rem' }}>
        <Stack
          direction="row"
          spacing={ 2 }
          align="center"
          justifyContent="center"
        >
          <Select value={ graph.name } onChange={ handleSelectGraph }>
            {
              Object.keys(matrices).map(key => (
                <MenuItem key={ `option-${ key }` } value={ key }>{ key }</MenuItem>
              ))
            }
          </Select>
          <Button onClick={ colorStep } variant="outlined" size="small"><StepIcon /></Button>
        </Stack>

        <br />

        <Stack spacing={ 2 }>
          <Stack
            spacing={ 1 }
            direction="row"
            align="center"
            sx={{ color: graph.coloredNodes.size === graph.nodes.length ? '#0ac' : '#222' }}
          >
            <strong>colored nodes:</strong>
            <code>{ graph.coloredNodes.size > 0 ? `{${ [...graph.coloredNodes].join(', ') }}` : '∅' }</code>
          </Stack>

          <Stack spacing={ 1 } direction="row">
            <strong>adjacency matrix:</strong>
            <code>{ JSON.stringify(graph.adjacencyMatrix, null, 0) }</code>
          </Stack>
        </Stack>
      </Box>

      <div style={{ border: 'solid #999', borderWidth: '1px 0 1px 0' }}>
        <Graph nodes={ graph.nodes } edges={ graph.edges } />
      </div>
      
    </Fragment>
  )
}
