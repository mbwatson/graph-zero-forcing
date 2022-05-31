import { Fragment } from 'react'
import { useGraph } from './context'
import { Container, Stack } from '@mui/material'
import { Graph } from './components/graph'
import { ColorStepper } from './components/color-stepper'
import { MatrixEditor } from './components/matrix-editor'

export const App = () => {
  const { graph } = useGraph()

  return (
    <Fragment>
      <Graph nodes={ graph.nodes } edges={ graph.edges } />

      <Stack sx={{ backgroundColor: '#a7b4cd'}}>
        <ColorStepper />
      </Stack>

      <Container maxWidth="lg" sx={{ padding: '2rem 1rem' }}>
        <MatrixEditor />
      </Container>

    </Fragment>
  )
}
