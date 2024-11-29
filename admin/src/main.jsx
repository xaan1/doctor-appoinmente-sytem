import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './contex/AdminContex.jsx'
import AppContextProvider from './contex/AppContex.jsx'
import DoctorContextProvider from './contex/DoctorContex.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AdminContextProvider>
      <AppContextProvider>
        <DoctorContextProvider>
        <App />
        </DoctorContextProvider>

      </AppContextProvider>


    </AdminContextProvider>

 
    
    </BrowserRouter>

  </StrictMode>,
)
