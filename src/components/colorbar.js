import PropTypes from 'prop-types'
import { Box, Button, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import {
  CheckCircle as CheckIcon,
  Undo as ResetIcon,
  SkipNext as StepIcon,
} from '@mui/icons-material'
import { useGraph } from '../graph-context'

export const Colorbar = () => {
  const theme = useTheme()
  const { colorStep, graph } = useGraph()

  return (
    <Box sx={{
      position: 'absolute',
      bottom: '2rem',
      left: '2rem',
      width: 'calc(100% - 4rem)',
      boxSizing: 'border-box',
      backgroundColor: '#3333',
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius / 2,
      color: theme.palette.primary.main,
      zIndex: 9,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <Stack spacing={ 2 } direction="row" alignItems="center">
        <Typography component={ Stack } justifyContent="center" color="secondary">
          { graph.coloredNodes.size } of { graph.nodes.length } colored nodes
        </Typography>
        {
          graph.coloredNodes.size === graph.nodes.length && (
            <Tooltip title="All nodes are colored!" placement="bottom">
              <CheckIcon color="secondary" />
            </Tooltip>
          )
        }
      </Stack>
      <Stack spacing={ 2 } direction="row">
        <Tooltip title="Reset coloring" placement="top">
          <Stack justifyContent="center">
            <IconButton
              color="secondary"
              size="small"
              onClick={ graph.uncolorAllNodes }
              disabled={ graph.coloredNodes.size === 0 }
            ><ResetIcon fontSize="small" /></IconButton>
          </Stack>
        </Tooltip>
        <Tooltip title="Apply coloring rule" placement="top">
          <Button
            variant="contained"
            color="secondary"
            endIcon={ <StepIcon /> }
            onClick={ colorStep }
            sx={{ padding: '1rem' }}
          >Step</Button>
        </Tooltip>
      </Stack>
    </Box>
  )
}

Colorbar.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
}
