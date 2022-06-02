import { Fragment, Suspense, useState } from 'react'
import ReactResizeDetector from 'react-resize-detector';
import { useGraph } from './graph-context'
import { AppBar, Box, Container, Dialog, IconButton, Tooltip,  } from '@mui/material'
import {
  Settings as SettingsIcon,
} from '@mui/icons-material'
import { Graph } from './components/graph'
import { Toolbar } from './components/toolbar'
import { Drawer } from './components/drawer'

export const App = () => {
  const { graph } = useGraph()
  const [dialogOpen, setDialogOpen] = useState(false)

  const toggleDrawer = () => setDialogOpen(!dialogOpen)

  return (
    <Fragment>
      <Toolbar toggleDrawer={ toggleDrawer } />

      <Drawer
        open={ dialogOpen }
        closeHandler={ () => setDialogOpen(false) }
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

    </Fragment>
  )
}
