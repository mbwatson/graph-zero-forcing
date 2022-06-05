import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useMediaQuery } from '@mui/material'

const AppContext = createContext({})

export const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const compact = useMediaQuery('(max-width: 600px)')

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  return (
    <AppContext.Provider value={{
      drawerOpen, toggleDrawer, compact,
    }}>
      { children }
    </AppContext.Provider>
  )
}

AppProvider.propTypes = { children: PropTypes.node }
