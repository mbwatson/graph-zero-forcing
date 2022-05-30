import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'

export const Matrix = ({ matrix }) => {
  const theme = useTheme()
  return (
    <pre>
      { matrix.map(row => `[ ${ row.join(', ') } ]\n`) }
    </pre>
  )
}

Matrix.propTypes = {
  matrix: PropTypes.array.isRequired,
}
