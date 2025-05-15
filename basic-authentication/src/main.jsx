
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import config from './aws-exports'
import { Router } from 'react-router'
import 'antd/dist/reset.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import './index.css'
// main.jsx or App.jsx
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);


Amplify.configure(config)

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
)
