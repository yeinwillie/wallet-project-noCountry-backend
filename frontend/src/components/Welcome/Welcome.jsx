import { Typography } from '@mui/material'
import icon1 from '../../assets/fi-sr-eye.png'
import icon2 from '../../assets/fi-sr-copy.png'
import './welcome.css'

const iconCard1 = [{ img: icon1 }]
const iconCard2 = [{ img: icon2 }]
const Welcome = () => {
  return (
    <section style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '150px', margin: 'auto' }}>
      <div>
        <p className='greetings'>Hola Francisco,</p>
        <p className='welcome'>Bienvenido</p>
      </div>
      <div className='cardSaldo' style={{ color: '#f1f0ea', display: 'flex', flexDirection: 'column', gap: '1rem', width: '324px', heigt: '160px', background: '#6D5D6E', padding: '16px', borderRadius: '10px' }}>
        <div className='containerCuentas'>
          <div>
            <div style={{ color: '#F1F0EA', fontWeight: '600', fontSize: '14px' }}>Cuentas</div>
            <div style={{ color: '#F1F0EA', fontWeight: '500', fontSize: '12px' }}>Saldos totales</div>
          </div>
          {
              iconCard1.map((icon) => (
                <div className='icon-image1' style={{ color: '#FFFFFF', width: '24px', height: '24px' }} key={icon.name}>
                  <img style={{ objectFit: 'contain' }} src={icon.img} alt={icon.name} />
                  <Typography variant='p' color='secondary'>{icon.name}</Typography>
                </div>
              ))
          }
        </div>
        <div style={{ color: '#F1F0EA', display: 'flex', fontSize: '48px', fontWeight: '700' }}>
          <span>$ </span>
          <span>0,00</span>
        </div>
        <div className='containerCVU'>
          <div className='cvu' style={{ fontSize: '14px' }}>Tu CVU</div>
          {
              iconCard2.map((icon) => (
                <div className='icon-image2' style={{ color: '#FFFFFF', width: '24px', height: '24px' }} key={icon.name}>
                  <img style={{ objectFit: 'contain' }} src={icon.img} alt={icon.name} />
                  <Typography variant='p' color='secondary'>{icon.name}</Typography>
                </div>
              ))
          }
        </div>
      </div>
    </section>
  )
}

export default Welcome
