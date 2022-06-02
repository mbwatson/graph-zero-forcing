import PropTypes from 'prop-types'
import {
  Drawer as MuiDrawer, CardContent,
  IconButton, useMediaQuery,
} from '@mui/material'
import {
  Close as CloseIcon,
} from '@mui/icons-material'
import { MatrixEditor } from './matrix-editor'

export const Drawer = ({ open, closeHandler }) => {
  return (
    <MuiDrawer
      open={ open }
      onClose={ closeHandler }
      anchor="top"
      sx={{ zIndex: 1 }}
      PaperProps={{
        style: {
          backgroundColor: '#eee',
          paddingTop: '5rem',
        }
      }}
    >
      <CardContent>
        <MatrixEditor />
      </CardContent>
    </MuiDrawer>
  )
}

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
}
