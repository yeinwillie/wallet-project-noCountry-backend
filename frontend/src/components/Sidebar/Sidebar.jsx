import React from 'react'
import { Divider } from '@mui/material'
import SidebarPerfil from '../SidebarPerfil/SidebarPerfil'
import panel from '../../assets/panel.png'
import cards from '../../assets/tarjetas-de-credito.png'
import manos from '../../assets/apreton-de-manos.png'
import moves from '../../assets/iconoir_hand-cash.png'
import SidebarComponent from '../SidebarComponent/SidebarComponent'
import noti from '../../assets/zondicons_notification.png'
import term from '../../assets/basil_document-solid.png'
import help from '../../assets/ph_headset-fill.png'
import tarjeta from '../../assets/tarjeta.png'

const sidebarUp = [{ name: 'Mi panel', img: panel, path: '/home/dashboard' }, { name: 'Transacciones', img: tarjeta }, { name: 'Mis tarjetas', img: cards }, { name: 'Servicios', img: manos }, { name: 'Movimientos', img: moves }]
const sidebarDown = [{ name: 'Ayuda y soporte', img: help }, { name: 'Notificaciones', img: noti }, { name: 'Configuracion', img: term, path: '/home/settings/profile' }]

const Sidebar = () => {
  return (
    <section style={{ width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
        <SidebarComponent sidebar={sidebarUp} />
        <SidebarComponent sidebar={sidebarDown} />
      </div>
      <Divider className='divider' style={{ width: '219px', marginTop: '2rem', marginBottom: '2rem' }} />
      <SidebarPerfil />
    </section>
  )
}

export default Sidebar
