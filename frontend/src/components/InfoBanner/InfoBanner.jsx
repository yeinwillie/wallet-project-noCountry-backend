import './infoBanner.css'
import join from '../../assets/enlace.png'
import cargar from '../../assets/cargar.png'
import pagar from '../../assets/pagar.png'
import Typography from '@mui/material/Typography'

const info = [{ name: 'Hace rendir tus ahorros', img: join }, { name: 'Enviar y recibir dinero', img: cargar }, { name: 'Pagar tus servicios', img: pagar }]

const InfoBanner = () => {
  return (
    <section style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
      {
        info.map((inf) => (
          <div className='info' key={inf.name}>
            <img width='90px' height='90px' style={{ objectFit: 'contain' }} src={inf.img} alt={inf.name} />
            <Typography variant='h6' color='secondary'>{inf.name}</Typography>
          </div>
        ))
      }
    </section>
  )
}

export default InfoBanner
