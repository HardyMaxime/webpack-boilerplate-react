import React, { useState } from 'react'
import './App.scss'

const App = () => {
    const [text, setText] = useState('Bonjour depuis le hook')
    return (
        <main className='container'>
            <h1>Boilerplate build with React & Webpack</h1>
            {
                text
            }
            <button onClick={() => setText('Changé ! ')}>Changer le texte</button>
        </main>
    )
}

export default App
