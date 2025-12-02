import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'

// import i18n (needs to be bundled ;))
import './i18n.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
