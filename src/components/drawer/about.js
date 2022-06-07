import { Box, Divider, Stack, Tooltip, Typography } from '@mui/material'
import { GitHub as GitHubIcon } from '@mui/icons-material'

export const About = () => {
  return (
    <Stack spacing={ 4 }>
      <Box>
        <Typography variant="h2" sx={{ fontSize: '135%' }}>
          What is this?
        </Typography>

        <br />

        <Typography paragraph>
          This application was created to supplement thinking about zero forcing on graphs,
          particularly as it relates to the inverse eigenvalue problem.
          This application continues to exist and is under active development (when time is available)
          simply because it{ `'` }s fun to work on, and it{ `'` }s fun to play with.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h2" sx={{ fontSize: '135%' }}>
          Some Background
        </Typography>

        <br />

        <Typography paragraph>
          <strong>Zero forcing</strong> is an iterative graph coloring process, during
          which a coloring rule is applied. Our coloring rule says that, given
          a set of colored vertices, any colored vertex with a single uncolored
          neighbor causes that neighbor to be colored.
        </Typography>
        <Typography paragraph>
          A <strong>zero forcing set</strong> is a set of initially colored vertices which,
          after applying the coloring rule some number of times, eventually colors the entire graph.
          Of particular interest, is identifying <strong>minimal</strong> zero forcing sets.
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'flex-end' }}>
        <Tooltip title="View the source code on GitHub" placement="left">
          <a
            href="https://github.com/mbwatson/graph-zero-forcing"
            target="_blank"
            rel="noreferrer noopener"
          ><GitHubIcon /></a>
        </Tooltip>
      </Box>
    </Stack>
  )
}
