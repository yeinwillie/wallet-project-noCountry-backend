import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import avatar from '../../assets/avatar.png'

const SidebarPerfil = () => {
  return (
    <div style={{ display: 'flex', gap: '14px', marginTop: '79px' }}>
      <Avatar alt='Francisco Ledesma' src={avatar} sx={{ width: 55, height: 55 }} />
      <div>
        <Typography variant='p' color='secondary'>Francisco Ledesma</Typography>
        <a href='#' style={{ textDecoration: 'underline', color: '#F1F0EA', fontWeight: '300' }}>Ver mi perfil</a>
      </div>
    </div>
  )
}

export default SidebarPerfil
