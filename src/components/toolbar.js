import PropTypes from 'prop-types'
import { AppBar, IconButton, Stack, Tooltip, useTheme } from '@mui/material'
import {
  Settings as SettingsIcon,
} from '@mui/icons-material'

export const Toolbar = ({ toggleDrawer }) => {
  const theme = useTheme()

  return (
    <AppBar sx={{ backgroundColor: '#a7b4cd', zIndex: 2 }}>
      <Stack
        spacing={ 1 }
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{
          padding: '1rem',
          position: 'relative',
          backgroundColor: theme.palette.grey[900],
        }}
      >
        <Tooltip title="Settings" placement="bottom">
          <IconButton
            color="primary"
            size="small"
            onClick={ toggleDrawer }
          ><SettingsIcon fontSize="small" /></IconButton>
        </Tooltip>
      </Stack>
    </AppBar>
  )
}

Toolbar.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
}
