import { useMemo } from 'react'
import { Box, Button, IconButton, Stack, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import {
  CheckCircle as CheckIcon,
  Circle as CircleIcon,
  Undo as ResetIcon,
  SkipNext as StepIcon,
} from '@mui/icons-material'
import { useGraph } from '../graph-context'

export const Colorbar = () => {
  const theme = useTheme()
  const { colorStep, graph } = useGraph()
  const compact = useMediaQuery('(max-width: 600px)')

  const conditionalStyles = useMemo(() => compact ? ({
      bottom: 0,
      left: 0,
      width: '100%',
      borderRadius: 0,
    }) : ({
      bottom: '2rem',
      left: '2rem',
      width: 'calc(100% - 4rem)',
      borderRadius: theme.shape.borderRadius / 2,  
    }), [compact])

  return (
    <Box sx={{
      position: 'absolute',
      boxSizing: 'border-box',
      backgroundColor: '#3333',
      transition: 'background-color 250ms',
      '&:hover': {
        backgroundColor: '#3336',
      },
      padding: theme.spacing(2),
      zIndex: 9,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...conditionalStyles,
    }}>
      <Stack spacing={ 2 } direction="row" alignItems="center">
        <Box sx={{ width: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {
            graph.coloredNodes.size === graph.nodes.length ? (
              <Tooltip title="All nodes are colored!" placement="bottom">
                <CheckIcon sx={{ color: '#fff' }} fontSize="medium" />
              </Tooltip>
            ) : <CircleIcon sx={{ color: '#8888' }} fontSize="small" />
          }
        </Box>
        <Typography component={ Stack } justifyContent="center" color="#fff">
          { graph.coloredNodes.size } of { graph.nodes.length } colored nodes
        </Typography>
      </Stack>
      <Stack spacing={ 2 } direction="row">
        <Tooltip title="Reset coloring" placement="top">
          <Stack justifyContent="center">
            <IconButton
              color="primary"
              size="small"
              onClick={ graph.uncolorAllNodes }
              disabled={ graph.coloredNodes.size === 0 }
            ><ResetIcon fontSize="small" /></IconButton>
          </Stack>
        </Tooltip>
        <Tooltip title="Apply coloring rule" placement="top">
          <Button
            variant="contained"
            color="primary"
            endIcon={ <StepIcon /> }
            onClick={ colorStep }
            sx={{ padding: '1rem' }}
          >Step</Button>
        </Tooltip>
      </Stack>
    </Box>
  )
}
