import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useMediaQuery } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useLocalStorage } from './hooks'
import * as availableModules from './modules'

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
      main: '#975775',
    },
    secondary: {
      main: '#468',
    },
    background: {
      default: '#666',
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
  const [mode, setMode] = useLocalStorage('mode', MODES.light)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modules, setModules] = useState({})

  useEffect(() => {
    const _modules = Object.keys(availableModules).reduce((obj, key) => {
      return {
        ...obj,
        [key]: {
          module: availableModules[key],
          active: true,
        },
      }
    }, {})
    setModules({ ..._modules })
  }, [availableModules])

  useEffect(() => console.table(modules), [modules])

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  const otherMode = useMemo(() => mode === MODES.light ? MODES.dark : MODES.light, [mode])

  const toggleMode = useCallback(() => setMode(otherMode), [otherMode])

  const theme = useMemo(() => createTheme({
    palette: { mode },
    ...(mode === MODES.light ? lightTheme : darkTheme),
  }), [mode])

  const toggleModuleActivation = key => {
    setModules({
      ...modules,
      [key]: {
        ...modules[key],
        active: !modules[key].active,
      },
    })
  }

  return (
    <AppContext.Provider value={{
      compact,
      MODES, mode, setMode, toggleMode, otherMode,
      drawerOpen, toggleDrawer,
      modules,
      toggleModuleActivation,
    }}>
      <ThemeProvider theme={ theme }>
        { children }
      </ThemeProvider>
    </AppContext.Provider>
  )
}

AppProvider.propTypes = { children: PropTypes.node }
