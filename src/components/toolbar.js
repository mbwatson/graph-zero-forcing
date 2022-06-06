import PropTypes from 'prop-types'
import { AppBar, IconButton, Stack, Tooltip, useTheme } from '@mui/material'
import {
  Close as CloseDrawerIcon,
  Settings as SettingsIcon,
  Download as DownloadIcon,
} from '@mui/icons-material'
import { useGraph } from './graph'

export const Toolbar = ({ drawerOpen, toggleDrawer }) => {
  const theme = useTheme()
  const { graph } = useGraph()

  const downloadCanvasPNG = () => {
    if (!graph) { return }
    const canvas = document.querySelector('.force-graph-container > canvas')
    if (!canvas) {
      return
    }
    const link = document.createElement('a')
    link.download = `graph - ${ new Date().toLocaleString()
      .replace(/\//g, '-')
      .replace(/:/g, '-')
      .replace(/,? /g, '_') }.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <AppBar sx={{ backgroundColor: '#a7b4cd', zIndex: 2 }}>
      <Stack
        spacing={ 1 }
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{
          padding: '1.5rem 1rem',
          position: 'relative',
          backgroundColor: theme.palette.grey[900],
        }}
      >
        <Tooltip title="Download graph as PNG" placement="bottom">
          <IconButton
            size="small"
            onClick={ downloadCanvasPNG }
            sx={{
              color: '#eee',
              transition: 'color 250ms',
              '&:hover': { color: theme.palette.primary.main }
            }}
          ><DownloadIcon /></IconButton>
        </Tooltip>
        <Tooltip title="Settings" placement="bottom">
          <IconButton
            size="small"
            onClick={ toggleDrawer }
            sx={{ color: drawerOpen ? theme.palette.primary.main : '#eee' }}
          >{ drawerOpen ? <CloseDrawerIcon /> : <SettingsIcon /> }</IconButton>
        </Tooltip>
      </Stack>
    </AppBar>
  )
}

Toolbar.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
}
