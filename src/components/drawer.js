import PropTypes from 'prop-types'
import {
  Drawer as MuiDrawer, CardContent,
} from '@mui/material'
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
