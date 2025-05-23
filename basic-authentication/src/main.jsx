import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import config from './aws-exports'
// import 'antd/dist/antd.css'
import 'antd/dist/reset.css'
import { Router } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import './index.css'
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);


Amplify.configure(config)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
