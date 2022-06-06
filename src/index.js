import { App } from './app'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import { AppProvider } from './context'
import { GraphProvider } from './components/graph'
import { theme } from './theme'
import  './index.scss'
import ReactGA from 'react-ga4'

ReactGA.initialize([
  {
    trackingId: 'G-ZXC48NE5CE',
  },
])

const container = document.getElementById('root')
const root = createRoot(container)

const ProvisionedApp = () => {
  return (
    <ThemeProvider theme={ theme }>
      <AppProvider>
        <GraphProvider>
          <App />
        </GraphProvider>
      </AppProvider>
    </ThemeProvider>
  )
}
root.render(<ProvisionedApp />)
