import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { loadGraph, setDimensions } from './actions'
import store from './configureStore'
import dataset from './data/dolphins.json'

document.addEventListener('DOMContentLoaded', (event) => {
  const { width, height } = document.getElementById('drawing-area').getBoundingClientRect()
  store.dispatch(setDimensions({width, height}))
  if (process.env.REACT_APP_PRE_LOAD) {
    store.dispatch(loadGraph(dataset))
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()