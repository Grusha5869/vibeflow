import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter } from 'react-router'
import App from './App.jsx'


const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <HashRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </HashRouter>
)