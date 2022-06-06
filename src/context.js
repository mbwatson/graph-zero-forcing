import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useMediaQuery } from '@mui/material'
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
// import { theme } from './theme'

const AppContext = createContext({})

const LIGHT = 'light'
const DARK = 'dark'

export const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const compact = useMediaQuery('(max-width: 600px)')
  const [mode, setMode] = useState(LIGHT)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  const otherMode = useMemo(() => mode === LIGHT ? DARK : LIGHT, [mode])
  const toggleMode = () => setMode(otherMode)
  const ModeIcon = useCallback(() => {
    return mode === LIGHT
      ? <LightModeIcon />
      : <DarkModeIcon />
  }, [mode])

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    }
  }), [mode])

  return (
    <AppContext.Provider value={{
      compact,
      mode, toggleMode, otherMode, ModeIcon,
      drawerOpen, toggleDrawer,
    }}>
      <ThemeProvider theme={ theme }>
        { children }
      </ThemeProvider>
    </AppContext.Provider>
  )
}

AppProvider.propTypes = { children: PropTypes.node }
