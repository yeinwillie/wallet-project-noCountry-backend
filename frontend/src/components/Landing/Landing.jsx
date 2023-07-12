import Typography from '@mui/material/Typography'
import InfoBanner from '../InfoBanner/InfoBanner'
import './landing.css'
import RequestCard from '../RequestCard/RequestCard'
import Banner from '../Banner/Banner'
import Benefits from '../Benefits/Benefits'

const Landing = () => {
  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: '6rem', width: '80%', margin: 'auto', marginTop: '150px' }}>
      <Banner />
      <Typography variant='h4' color='secondary' textAlign='center'>Con Pocketpal podes</Typography>
      <InfoBanner />
      <RequestCard />
      <Typography variant='h4' color='secondary' textAlign='center'>Tenemos estos beneficios para vos</Typography>
      <Benefits />
    </article>
  )
}

export default Landing
