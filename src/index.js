import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'
import AuthProvider from './context/auth/AuthProvider'
import { ToastContainer } from "react-toastify";

//styles
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <App />
      <ToastContainer autoClose={2000}/>
    </AuthProvider>
  </Provider>,
)
