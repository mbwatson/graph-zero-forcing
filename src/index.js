import { App } from './app'
import { createRoot } from 'react-dom/client'
import { GraphProvider } from './context'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

const ProvisionedApp = () => {
  return (
    <GraphProvider>
      <App />
    </GraphProvider>
  )
}
root.render(<ProvisionedApp />)
