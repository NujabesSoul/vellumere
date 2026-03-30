import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/foundation.css'
import './styles/nav.css'
import './styles/footer.css'
import './styles/shared.css'
import './styles/landing.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
