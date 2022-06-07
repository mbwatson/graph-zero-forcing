import { Box, Divider, Stack, Tooltip, Typography } from '@mui/material'
import { GitHub as GitHubIcon } from '@mui/icons-material'

export const About = () => {
  return (
    <Stack spacing={ 4 }>
      <Box>
        <Typography variant="h2" sx={{ fontSize: '135%' }}>
          Why does this exist?
        </Typography>
        <br />
        <Typography paragraph>
          First and foremost, this application exists because it{ `'` }s
          fun to work on, and it{ `'` }s fun to play with.
          It was created to supplement thinking about zero forcing on graphs,
          particularly as it relates to the inverse eigenvalue problem.
        </Typography>
        <Typography paragraph>
          <strong>Zero forcing</strong> is an iterative graph coloring process, during
          which a coloring rule is applied. Our coloring rule says that, given
          a set of colored vertices, any colored vertex with a single uncolored
          neighbor causes that neighbor to be colored.
          A <strong>zero forcing set</strong> is a set of initially colored vertices which,
          after iteratively applying the coloring rule, eventually colors the entire graph.
          Of particular interest, is identifying <strong>minimal</strong> zero forcing sets.
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h2" sx={{ fontSize: '135%' }}>
          How is this tool used?
        </Typography>
        <br />
        <Typography paragraph>
          Click nodes in the graph to color and uncolor them.
          The STEP button invokes one iteration of the coloring rule
          described above, which will color any uncolored nodes,
          based on the coloring rule described above.
          Checking to see if a zero forcing set has been found amounts to
          coloring the nodes of your initial set and clicking the STEP button
          to see whether it does indeed force the whole graph to become colored.
        </Typography>
        <Typography paragraph>
          Within this drawer resides the text you{`'`}re viewing now.
          Additionally, the rendered graph can be customized by entering any
          adjacency matrix into the text field under the Matrix tab.
          A few preset matrices are available for convenience.
          Click the Generate Graph button to render a new graph with the
          entered adjacency matrix.
          Lastly, a minimal set of settings lives in the Settings tab to
          allow a bit of customization.
        </Typography>
        <Typography paragraph>
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
