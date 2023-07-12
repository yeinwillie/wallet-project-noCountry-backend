import React from 'react'
import './cardBalance.css'

import Sidebar from '../Sidebar/Sidebar'
import Divider from '@mui/material/Divider'
import { Outlet } from 'react-router-dom'

export const Home = () => {
  return (
    <article className='home'>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Divider orientation='vertical' flexItem className='divider' />
        <Outlet />
      </div>
    </article>
  )
}

export default Home
