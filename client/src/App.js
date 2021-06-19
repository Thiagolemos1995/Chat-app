import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

//Cria o componente App e redireciona para outro componente
const App = () => (
    <Router>
        <Route path="/" exact component={Join}/>
        <Route path="/chat" component={Chat} />
    </Router>
)

export default App