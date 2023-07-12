import { Typography } from '@mui/material'
import face from '../../assets/facebook.png'
import linkedin from '../../assets/linkedin.png'
import insta from '../../assets/instagram.png'
import './footer.css'

const Footer = () => {
  return (
    <section style={{ width: '100vw', background: '#4f4557', marginTop: '4rem', height: '268px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: '90%' }}>
        <div className='listFooter'>
          <Typography variant='h6' color='secondary'>
            Acerca de nosotros
          </Typography>
        </div>
        <div className='listFooter'>
          <Typography variant='h6' color='secondary'>
            Acerca de nosotros
          </Typography>
        </div>
        <div className='listFooter'>
          <Typography variant='h6' color='secondary'>
            Acerca de nosotros
          </Typography>
        </div>
        <div className='listFooter'>
          <Typography variant='h6' color='secondary'>
            Seguinos en nuestras redes:
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <img src={face} alt='facebook' width='32px' />
            <img src={linkedin} alt='linkedin' width='32px' />
            <img src={insta} alt='instagram' width='32px' />
          </div>
        </div>
      </div>
      <Typography variant='p' color='secondary'>   © 2023 Pocketpal</Typography>
    </section>
  )
}

export default Footer
