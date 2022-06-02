import PropTypes from 'prop-types'
import {
  Drawer as MuiDrawer, DialogActions, DialogContent,
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
      PaperProps={{ style: { backgroundColor: '#eee' } }}
    >
      <DialogActions sx={{ padding: '0.5rem 1rem', minWidth: '300px' }}>
        <IconButton
          variant="contained"
          color="primary"
          size="small"
          onClick={ closeHandler }
        ><CloseIcon /></IconButton>
      </DialogActions>
      <DialogContent>
        <MatrixEditor />
      </DialogContent>
    </MuiDrawer>
  )
}

Drawer.propTypes = {
  open: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
}
