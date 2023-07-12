/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import './btnGradient.css'

const BtnGradient = (props) => {
  if (props.prop.path === null) {
    return (
      <Button variant='contained' className='btnGradient'>
        {props.prop.text}
      </Button>
    )
  } else {
    return (
      <Link to={props.prop.path}>
        <Button variant='contained' className='btnGradient'>
          {props.prop.text}
        </Button>
      </Link>
    )
  }
}

export default BtnGradient
