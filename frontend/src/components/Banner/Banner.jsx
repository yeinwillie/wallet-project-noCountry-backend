import Typography from '@mui/material/Typography'
import celular from '../../assets/celular.png'
import './banner.css'

const Banner = () => {
  return (
    <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <Typography variant='p' color='secondary' style={{ width: '40%', fontSize: '4rem', fontWeight: '700' }}>La mejor manera de llevar tu dinero</Typography>
      <img src={celular} alt=' ' className='cel' />
    </section>
  )
}

export default Banner
