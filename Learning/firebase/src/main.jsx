import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { firebaseProvider } from './context/firebase.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <firebaseProvider>
    <App />
    </firebaseProvider>
  </StrictMode>,
)
