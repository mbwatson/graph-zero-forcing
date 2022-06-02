import { Box, Tooltip } from '@mui/material'
import { GitHub as GitHubIcon } from '@mui/icons-material'

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        padding: '0.5rem 1rem',
        backgroundColor: '#fff4'
      }}
    >
      <Tooltip title="View this project on GitHub" placement="left">
        <a
          href="https://github.com/mbwatson/graph-zero-forcing"
          target="_blank"
          rel="noopener noreferrer"><GitHubIcon sx={{ color: '#999' }} fontSize="small" /></a>
      </Tooltip>
    </Box>
  )
}