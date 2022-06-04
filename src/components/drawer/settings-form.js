import { CardContent, FormControl, FormLabel, Slider, Stack } from '@mui/material'
import { HexColorPicker } from 'react-colorful'
import { useGraph } from '../../graph-context'

export const SettingsForm = () => {
  const { graph } = useGraph()

  return (
    <CardContent>
      <Stack direction="column" spacing={ 4 }>

        <FormControl sx={{ flexDirection: 'row', gap: '1rem' }}>
          <FormLabel>Node Size</FormLabel>
          <Slider
            aria-label="Node size"
            step={ 1 } marks min={ 1 } max={ 20 }
            valueLabelDisplay="on"
            getAriaValueText={ () => `${ graph.settings.nodeSize } px node radius` }
            value={ graph.settings.nodeSize }
            onChange={ (event, newValue) => graph.settings.setNodeSize(newValue) }
            sx={{ width: '100%', maxWidth: '300px' }}
          />
        </FormControl>

        <FormControl sx={{
          gap: '1rem',
          '& .react-colorful': {
            width: '100%',
            height: '150px',
          }
        }}>
          <FormLabel>Node Color</FormLabel>
          <HexColorPicker
            color={ graph.settings.color }
            onChange={ graph.settings.setColor }
          />
        </FormControl>

      </Stack>
    </CardContent>
  )
}