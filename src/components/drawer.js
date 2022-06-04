import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CardContent, Drawer as MuiDrawer,
  Tab, Tabs, useTheme,
} from '@mui/material'
import { MatrixEditor } from './matrix-editor'
import { SettingsForm } from './settings-form'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={ value !== index }
      id={ `config-tabpanel-${ index }` }
      aria-labelledby={`config-tab-${ index }`}
      { ...other }
    >
      { value === index && children }
    </div>
  )
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

//

export const Drawer = ({ open, closeHandler }) => {
  const theme = useTheme()
  const [currentTab, setCurrentTab] = useState(0)

  const handleClickTab = (event, newTab) => {
    setCurrentTab(newTab)
  }

  return (
    <MuiDrawer
      open={ open }
      onClose={ closeHandler }
      anchor="top"
      sx={{ zIndex: 1 }}
      PaperProps={{
        style: {
          backgroundColor: '#eee',
          paddingTop: theme.spacing(9),
          margin: '0 1rem',
        }
      }}
    >
      <CardContent>
        <Tabs value={ currentTab } onChange={ handleClickTab } aria-label="settings tabs">
          <Tab label="Adjacency Matrix" />
          <Tab label="Graph Settings" />
        </Tabs>
        <br />
        <TabPanel value={ currentTab } index={ 0 }>
          <MatrixEditor />
        </TabPanel>
        <TabPanel value={ currentTab } index={ 1 }>
          <SettingsForm />
        </TabPanel>
      </CardContent>
    </MuiDrawer>
  )
}

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
}
