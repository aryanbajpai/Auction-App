import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './COMPONENTS/Header'
import { AdminForm } from './COMPONENTS/AdminForm'
import { BuyerForm } from './COMPONENTS/BuyerForm'
import { Footer } from './COMPONENTS/Footer'
import { Home } from './COMPONENTS/Home'
import { Register } from './COMPONENTS/Register'
import { Player } from './COMPONENTS/Register/Player'
import { team } from './COMPONENTS/Register/team'
import { TeamDetails } from './COMPONENTS/Details/TeamDetails'

function App() {

  return (
    <>
      <Router>
          <Header/>
          <Routes>
              <Route path='/' exact Component={Home} />
              <Route path='/admin' Component={AdminForm} />
              <Route path='/team' Component={BuyerForm} />
              <Route path='/register' Component={Register}/>
              <Route path='/teamReg' Component={team} />
              <Route path='/playerReg' Component={Player}/>
              <Route path='/teamDetails' Component={TeamDetails}/>
          </Routes>
      </Router>
    </>
  )
}

export default App
