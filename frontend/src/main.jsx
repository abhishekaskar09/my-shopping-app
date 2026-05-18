import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
 import { RouterProvider } from 'react-router-dom';
import { router } from './Routes';
import { persistor, store } from './app/store';
import axios from 'axios';

   
ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router} />
    </PersistGate>
  </Provider>

);