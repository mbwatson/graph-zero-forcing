import { Button, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import {
  RestartAlt as ResetIcon,
  SkipNext as StepIcon,
} from '@mui/icons-material'
import { useGraph } from '../context'

export const ColorStepper = () => {
const theme = useTheme()
  const { colorStep, graph } = useGraph()

  return (
    <Stack
      spacing={ 1 }
      direction="row"
      align="center"
      justifyContent="space-between"
      sx={{ padding: '1rem' }}
    >
      <Stack spacing={ 1 } direction="row">
        <Typography component={ Stack } justifyContent="center">
          COLORED NODES:
        </Typography>
        <code style={{
          color: graph.coloredNodes.size === graph.nodes.length
            ? theme.palette.secondary.dark
            : theme.palette.text.primary
        }}>{ `{ ${ [...graph.coloredNodes].join(', ') } }` }</code>
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
          <Button
            variant="outlined"
            color="primary"
            size="small"
            endIcon={ <ResetIcon /> }
            onClick={ graph.uncolorAllNodes }
            disabled={ graph.coloredNodes.size === 0 }
          >Reset</Button>
        </Tooltip>
      </Stack>
    </Stack>
  )
}