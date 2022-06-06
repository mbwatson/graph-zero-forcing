import { App } from './app'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './context'
import { GraphProvider } from './components/graph'
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
    <AppProvider>
      <GraphProvider>
        <App />
      </GraphProvider>
    </AppProvider>
  )
}
root.render(<ProvisionedApp />)
