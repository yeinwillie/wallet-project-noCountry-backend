import card from '../../assets/card.png'
import './requestCard.css'
import Typography from '@mui/material/Typography'
import BtnGradient from '../BtnGradient/BtnGradient'

const RequestCard = () => {
  const descargar = { text: 'Descargar App' }
  const tarjeta = { text: 'Pedí tu tarjeta' }
  return (
    <section style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <img src={card} alt='Tarjeta Pocketpal' className='cardLanding' />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '250px' }}>
        <Typography variant='p' color='secondary' fontSize='1.5rem' lineHeight='45px' fontWeight='500' width='295px' height='135px'>Pagá en cuotas y disfruta de promociones exclusivas</Typography>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <BtnGradient prop={descargar} />
          <BtnGradient prop={tarjeta} />
        </div>
      </div>
    </section>
  )
}

export default RequestCard
