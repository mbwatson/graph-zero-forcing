import { Button, Stack, Typography, useTheme } from '@mui/material'
import {
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

      <Button onClick={ colorStep } variant="outlined" color="primary" size="small">
        <StepIcon />
      </Button>
    </Stack>
  )
}