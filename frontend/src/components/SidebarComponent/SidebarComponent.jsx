/* eslint-disable react/prop-types */
import Typography from '@mui/material/Typography'
import './sidebarComponent.css'
import { NavLink } from 'react-router-dom'

const SidebarComponent = ({ sidebar }) => {
  return (
    <ul style={{ gap: '20px' }}>
      {
            sidebar.map((list) => (
              <li key={list.name}>
                <NavLink className='btnSidebar' to={list.path}>
                  <img src={list.img} alt={list.name} className='iconSidebar' />
                  <Typography variant='p' color='secondary' fontSize='1rem'>{list.name}</Typography>
                </NavLink>
              </li>
            ))
        }
    </ul>
  )
}

export default SidebarComponent
