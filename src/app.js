import { Fragment, useState } from 'react'
import ReactResizeDetector from 'react-resize-detector';
import { useGraph } from './graph-context'
import { Graph } from './components/graph'
import { Toolbar } from './components/toolbar'
import { Colorbar } from './components/colorbar'
import { Drawer } from './components/drawer'

export const App = () => {
  const { graph } = useGraph()
  const [dialogOpen, setDialogOpen] = useState(false)

  const toggleDrawer = () => setDialogOpen(!dialogOpen)

  return (
    <Fragment>
      <Toolbar drawerOpen={ dialogOpen } toggleDrawer={ toggleDrawer } />
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

      <Colorbar />

    </Fragment>
  )
}
