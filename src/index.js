import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './app/store'


ReactDOM.render(
<Provider store={store}>
  <main className="App">
  <App />
  </main>
</Provider>,
document.getElementById('root')
);