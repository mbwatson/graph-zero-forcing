import { Button, CardContent, Typography } from '@mui/material'
import { HexColorPicker } from 'react-colorful'
import { useGraph } from '../graph-context'

export const SettingsForm = () => {
  const { graph } = useGraph()

  return (
    <CardContent>
      <Typography>Node Color</Typography>
      <HexColorPicker
        color={ graph.settings.color }
        onChange={ graph.settings.setColor }
      />
    </CardContent>
  )
}