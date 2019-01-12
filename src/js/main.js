import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/App'
import { AppContainer } from 'react-hot-loader'

const renderApp = () => {
    ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>
    , document.getElementById('root'))
}

if (module.hot) {
    module.hot.accept('./src/App.js', renderApp)
}

renderApp()
