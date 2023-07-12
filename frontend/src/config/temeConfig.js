import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1b2c4a'
    },
    secondary: {
      main: '#f1f0ea'
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
})

export default theme
