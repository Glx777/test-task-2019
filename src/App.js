import React from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'

import Home from './home/components/home'
import Refill from './refill/components/refill'

const App = () => (
    <BrowserRouter>
        <ToastContainer position="top-right" hideProgressBar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/refill" component={Refill} />
        </Switch>
    </BrowserRouter>
)

export default App
