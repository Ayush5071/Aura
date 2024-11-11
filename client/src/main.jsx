import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/userContext.jsx'
import { RequestProvider } from './context/RequestProvider.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <RequestProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </RequestProvider>
  </UserProvider>
)
