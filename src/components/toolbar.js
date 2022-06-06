import { useCallback } from 'react'
import PropTypes from 'prop-types'
import { AppBar, IconButton, FormGroup, FormControlLabel, Label, Stack, Switch, Tooltip, useTheme } from '@mui/material'
import {
  Close as CloseDrawerIcon,
  Settings as SettingsIcon,
  Download as DownloadIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material'
import { useGraph } from './graph'
import { useApp } from '../context'

export const Toolbar = ({ drawerOpen, toggleDrawer }) => {
  const theme = useTheme()
  const { graph } = useGraph()
  const { MODES, mode, otherMode, toggleMode } = useApp()

  const switchStyle = {
    transform: 'rotate(-90deg)',
    width: 62,
    height: 34,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.background.default,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.primary.dark,
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="m 1.9340366,14.434036 c 0,1.82 0.5,3.53 1.35,5 1.73,-2.99 4.95,-5 8.6500004,-5 3.7,0 6.92,2.01 8.65,5 0.85,-1.47 1.35,-3.18 1.35,-5 0,-5.5199995 -4.48,-9.9999995 -10,-9.9999995 -5.5200004,0 -10.0000004,4.48 -10.0000004,9.9999995 z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.background.default,
      borderRadius: 20 / 2,
    },
  }
  const ModeIcon = useCallback(() => (
    mode === MODES.light ? <LightModeIcon /> : <DarkModeIcon />
  ), [mode])

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
    <AppBar sx={{ backgroundColor: theme.palette.background.paper, zIndex: 2 }}>
      <Stack
        spacing={ 1 }
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{
          padding: '1.5rem 1rem',
          position: 'relative',
        }}
      >
        <Tooltip title={ `Switch to ${ otherMode[0].toUpperCase() + otherMode.slice(1).toLowerCase() } Mode` } placement="bottom">
          <Switch
            value={ mode === MODES.light ? 'on' : 'off' }
            onChange={ toggleMode }
            sx={ switchStyle }
          />
        </Tooltip>
        <Tooltip title="Download Graph as PNG" placement="bottom">
          <IconButton
            size="small"
            onClick={ downloadCanvasPNG }
            sx={{
              color: theme.palette.text.primary,
              transition: 'color 250ms',
              '&:hover': { color: theme.palette.primary.main }
            }}
          ><DownloadIcon /></IconButton>
        </Tooltip>
        <Tooltip title="View Settings" placement="bottom">
          <IconButton
            size="small"
            onClick={ toggleDrawer }
            sx={{ color: drawerOpen ? theme.palette.primary.main : theme.palette.text.primary }}
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
