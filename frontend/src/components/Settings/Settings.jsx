import React from 'react'
import SidebarComponent from '../SidebarComponent/SidebarComponent'
import portrait from '../../assets/fi-sr-portrait.png'
import padlock from '../../assets/padlock.png'
import notification from '../../assets/fi-sr-bell.png'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { Outlet } from 'react-router-dom'

const sidebar = [{ name: 'Perfil', img: portrait, path: '/home/settings/profile' }, { name: 'Contraseña', img: padlock }, { name: 'Notificaciones', img: notification }]

const Settings = () => {
  return (
    <>
      <div style={{ width: '20%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <Typography variant='h5' color='secondary' fontSize='1.25rem'>Configuracion de cuenta</Typography>
          <SidebarComponent sidebar={sidebar} />
        </div>
      </div>
      <Divider orientation='vertical' flexItem className='divider' />
      <Outlet />
    </>

  )
}

export default Settings
