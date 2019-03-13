import React, { useState } from 'react'
import Button from './components/Button'
import './App.scss'

const App = () => {
    const [text, setText] = useState('Bonjour depuis le hook')
    return (
        <main className="container">
            <h1>Boilerplate build with React & Webpack</h1>
            {
                text
            }
            <Button text="Changer le texte" emitEvent={setText} />
        </main>
    )
}

export default App
