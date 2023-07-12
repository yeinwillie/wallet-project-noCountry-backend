import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'

import './App.css'
import theme from './config/temeConfig'
import Header from './components/Header/Header'
import Landing from './components/Landing/Landing'
import Login from './components/Login/Login'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import SignUp from './components/SignUp/SignUp'
import Settings from './components/Settings/Settings'
import Dashboard from './components/Dashboard/Dashboard'
import Profile from './components/Profile/Profile'

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />}>
            <Route path='/home/dashboard' element={<Dashboard />} />
            <Route path='/home/settings' element={<Settings />}>
              <Route path='/home/settings/profile' element={<Profile />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
