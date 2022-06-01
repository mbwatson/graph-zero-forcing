import { App } from './app'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import { GraphProvider } from './graph-context'
import { theme } from './theme'
import  './index.scss'

const container = document.getElementById('root')
const root = createRoot(container)

const ProvisionedApp = () => {
  return (
    <ThemeProvider theme={ theme }>
      <GraphProvider>
        <App />
      </GraphProvider>
    </ThemeProvider>
  )
}
root.render(<ProvisionedApp />)
