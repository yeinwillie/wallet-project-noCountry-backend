import { Typography } from '@mui/material'
import icon1 from '../../assets/fluent_arrow-sort-16-filled.png'
import icon2 from '../../assets/mdi_cash-sync.png'
import icon3 from '../../assets/basil_document-solid.png'
import icon4 from '../../assets/streamline_money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow.png'
import './cardsHome.css'

const iconCards = [{ name: 'Transacciones', img: icon1 }, { name: 'Recargar Dinero', img: icon2 }, { name: 'Pago de servicios', img: icon3 }, { name: 'Inversiones', img: icon4 }]
const CardsHome = () => {
  return (
    <div className='gridCards'>
      {
            iconCards.map((icon) => (
              <div className='card' key={icon.name}>
                <img className='cardImage' style={{ width: '24px', objectFit: 'contain' }} src={icon.img} alt={icon.name} />
                <Typography variant='p' color='secondary'>{icon.name}</Typography>
              </div>
            ))
        }
    </div>
  )
}
// fsda
//  
export default CardsHome
