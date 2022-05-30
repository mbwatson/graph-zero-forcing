import { App } from './app'
import { createRoot } from 'react-dom/client'
import { GraphProvider } from './context'
import { ThemeProvider } from '@mui/material/styles'
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
