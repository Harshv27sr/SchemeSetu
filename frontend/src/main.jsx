import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'  // ← add karo

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>   {/* ← yahan wrap karo */}
      <App />
    </AuthProvider>
  </StrictMode>,
)