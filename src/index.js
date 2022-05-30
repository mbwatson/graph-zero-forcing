import { App } from './app'
import { createRoot } from 'react-dom/client'
import { GraphProvider } from './context'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

const container = document.getElementById('root')
const root = createRoot(container)

const ProvisionedApp = () => {
  return (
    <ThemeProvider theme={ theme }>
      <GraphProvider>
        <CssBaseline />
        <App />
      </GraphProvider>
    </ThemeProvider>
  )
}
root.render(<ProvisionedApp />)
