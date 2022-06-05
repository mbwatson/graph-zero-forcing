import { Fragment } from 'react'
import ReactResizeDetector from 'react-resize-detector';
import { useGraph } from './graph-context'
import { useApp } from './app-context'
import { Graph } from './components/graph'
import { Toolbar } from './components/toolbar'
import { Colorbar } from './components/colorbar'
import { Drawer } from './components/drawer'

export const App = () => {
  const { graph } = useGraph()
  const { drawerOpen, toggleDrawer } = useApp()

  return (
    <Fragment>
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

    </Fragment>
  )
}
