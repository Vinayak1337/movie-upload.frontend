import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App/App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from './Redux/Store'

ReactDOM.render(
  <Provider store={Store}>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorkerRegistration.register()

reportWebVitals()
