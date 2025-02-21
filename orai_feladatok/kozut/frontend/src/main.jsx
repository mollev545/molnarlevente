import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Regiok from './Regiok'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Regiok/>
  </StrictMode>,
)
