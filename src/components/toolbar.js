import PropTypes from 'prop-types'
import { AppBar, IconButton, Stack, Tooltip, useTheme } from '@mui/material'
import {
  Close as CloseDrawerIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material'

export const Toolbar = ({ drawerOpen, toggleDrawer }) => {
  const theme = useTheme()

  return (
    <AppBar sx={{ backgroundColor: '#a7b4cd', zIndex: 2 }}>
      <Stack
        spacing={ 1 }
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{
          padding: '1.5rem 1rem',
          position: 'relative',
          backgroundColor: theme.palette.grey[900],
        }}
      >
        <Tooltip title="Settings" placement="left">
          <IconButton
            size="small"
            onClick={ toggleDrawer }
            sx={{ color: drawerOpen ? theme.palette.primary.main : '#eee' }}
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
