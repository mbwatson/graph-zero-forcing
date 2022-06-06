import { createContext, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useMediaQuery } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const AppContext = createContext({})

const MODES = {
  light: 'light',
  dark: 'dark',
}

const lightTheme = {
  palette: {
    primary: {
      main: '#773755',
    },
    secondary: {
      main: '#468',
    },
    background: {
      default: '#ddd',
      paper: '#eee',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
  },
}

const darkTheme = {
  palette: {
    primary: {
      main: '#773755',
    },
    secondary: {
      main: '#468',
    },
    background: {
      default: '#333',
      paper: '#222',
    },
    text: {
      primary: '#fff',
      secondary: '#666',
    },
  },
}

export const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const compact = useMediaQuery('(max-width: 600px)')
  const [mode, setMode] = useState(MODES.light)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  const otherMode = useMemo(() => mode === MODES.light ? MODES.dark : MODES.light, [mode])
  const toggleMode = () => setMode(otherMode)

  const theme = useMemo(() => createTheme({
    palette: { mode },
    ...(mode === MODES.light ? lightTheme : darkTheme),
  }), [mode])

  console.log(theme.palette)

  return (
    <AppContext.Provider value={{
      compact,
      MODES, mode, toggleMode, otherMode,
      drawerOpen, toggleDrawer,
    }}>
      <ThemeProvider theme={ theme }>
        { children }
      </ThemeProvider>
    </AppContext.Provider>
  )
}

AppProvider.propTypes = { children: PropTypes.node }
