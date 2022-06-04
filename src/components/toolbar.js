import PropTypes from 'prop-types'
import { AppBar, Button, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import {
  Check as CheckIcon,
  RestartAlt as ResetIcon,
  SkipNext as StepIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material'
import { useGraph } from '../graph-context'

export const Toolbar = ({ toggleDrawer }) => {
  const theme = useTheme()
  const { colorStep, graph } = useGraph()

  return (
    <AppBar sx={{ backgroundColor: '#a7b4cd', zIndex: 2 }}>
      <Stack
        spacing={ 1 }
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          padding: '1rem',
          position: 'relative',
          backgroundColor: theme.palette.grey[900],
          '&::before': {
            position: 'absolute',
            left: '1rem',
            top: '-1.5rem',
            content: '"Select nodes to color"',
            color: '#999',
            fontSize: '75%',
            transform: graph.coloredNodes.size === 0 ? 'translateY(0)' : 'translateY(2rem)',
            filter: graph.coloredNodes.size === 0 ? 'opacity(1.0)' : 'opacity(0.0)',
            transition: 'transform 250ms, filter 250ms',
            zIndex: -1,
          }
        }}
      >
        <Stack spacing={ 1 } direction="row" alignItems="center">
          <Typography component={ Stack } justifyContent="center">
            { graph.coloredNodes.size } of { graph.nodes.length } colored nodes:
          </Typography>
          <Typography component="code" sx={{
            backgroundColor: theme.palette.common.black,
            fontFamily: 'monospace',
          }}>
            { `{${ [...graph.coloredNodes].join(', ') }}` }
          </Typography>
          {
            graph.coloredNodes.size === graph.nodes.length && (
              <Tooltip title="All nodes are colored!" placement="bottom">
                <CheckIcon color="secondary" />
              </Tooltip>
            )
          }
        </Stack>

        <Stack spacing={ 1 } direction="row">
          <Tooltip title="Clear coloring" placement="bottom">
            <span>
              <IconButton
                color="secondary"
                size="small"
                onClick={ graph.uncolorAllNodes }
                disabled={ graph.coloredNodes.size === 0 }
              ><ResetIcon fontSize="small" /></IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Apply coloring rule" placement="bottom">
            <Button
              variant="contained"
              color="secondary"
              size="small"
              endIcon={ <StepIcon /> }
              onClick={ colorStep }
            >Step</Button>
          </Tooltip>
          <Tooltip title="Settings" placement="bottom">
            <IconButton
              color="primary"
              size="small"
              onClick={ toggleDrawer }
            ><SettingsIcon fontSize="small" /></IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </AppBar>
  )
}

Toolbar.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
}
