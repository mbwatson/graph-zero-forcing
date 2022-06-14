import { Box, useTheme } from '@mui/material'
import ReactResizeDetector from 'react-resize-detector';
import { useApp } from './context'
import { Graph, useGraph } from './components/graph'
import { Toolbar } from './components/toolbar'
import { Colorbar, MatrixGrid } from './modules'
import { Drawer } from './components/drawer'

export const App = () => {
  const theme = useTheme()
  const { graph } = useGraph()
  const { drawerOpen, toggleDrawer } = useApp()

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      backgroundColor: theme.palette.background.default,
    }}>
      <Toolbar drawerOpen={ drawerOpen } toggleDrawer={ toggleDrawer } />

      <Drawer
        open={ drawerOpen }
        closeHandler={ toggleDrawer }
      />

      <ReactResizeDetector handleWidth handleheight>
        {
          ({ width, height }) => (
            <Graph
              width={ width }
              height={ height }
              nodes={ graph.nodes }
              edges={ graph.edges }
            />
          )
        }
      </ReactResizeDetector>

      <Colorbar />

      <MatrixGrid />

    </Box>
  )
}
