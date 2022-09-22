import React from 'react'
import ReactDOM from 'react-dom/client'
// import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store/index'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react"
import persistStore from 'redux-persist/es/persistStore'

const persistor = persistStore(store)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
// ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
  // document.getElementById('root')
)

reportWebVitals()
