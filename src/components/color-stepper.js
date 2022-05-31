import { Button, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import {
  Check as CheckIcon,
  RestartAlt as ResetIcon,
  SkipNext as StepIcon,
} from '@mui/icons-material'
import { useGraph } from '../context'

export const ColorStepper = () => {
  const { colorStep, graph } = useGraph()

  return (
    <Stack
      spacing={ 1 }
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        padding: '0.5rem 1rem',
        position: 'relative',
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
        <code>{ `{ ${ [...graph.coloredNodes].join(', ') } }` }</code>
        {
          graph.coloredNodes.size === graph.nodes.length && (
            <Tooltip title="All nodes are colored!" placement="top">
              <CheckIcon color="success" />
            </Tooltip>
          )
        }
      </Stack>

      <Stack spacing={ 1 } direction="row">
        <Tooltip title="Apply coloring rule" placement="top">
          <Button
            variant="contained"
            color="primary"
            size="small"
            endIcon={ <StepIcon /> }
            onClick={ colorStep }
            disabled={ graph.coloredNodes.size === 0 || graph.coloredNodes.size === graph.nodes.length }
          >Step</Button>
        </Tooltip>
        <Tooltip title="Clear coloring" placement="top">
          <IconButton
            variant="outlined"
            color="primary"
            size="small"
            onClick={ graph.uncolorAllNodes }
            disabled={ graph.coloredNodes.size === 0 }
          ><ResetIcon fontSize="small" /></IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  )
}