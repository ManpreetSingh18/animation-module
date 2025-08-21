import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import WavesModule from './components/WavesModule'
import OpticsModule from "./components/OpticsModule"; // adjust path if needed

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WavesModule />
  </React.StrictMode>
)
