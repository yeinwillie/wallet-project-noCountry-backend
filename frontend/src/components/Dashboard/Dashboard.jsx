import React from 'react'
import Welcome from '../Welcome/Welcome'
import CardsHome from '../CardsHome/CardsHome'

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', margin: 'auto', justifyContent: 'center' }}>
      <Welcome />
      <CardsHome />
    </div>
  )
}

export default Dashboard
