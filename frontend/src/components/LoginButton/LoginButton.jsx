import Button from '@mui/material/Button'
import React from 'react'
import { Link } from 'react-router-dom'

const LoginButton = () => {
  return (
    <Link to='/login'>
      <Button color='secondary'>
        Iniciar sesión
      </Button>
    </Link>
  )
}

export default LoginButton
