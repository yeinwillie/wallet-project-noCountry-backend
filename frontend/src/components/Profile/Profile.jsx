import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import provincias from '../../data/provincias.json'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { es } from 'dayjs/locale/es'
import localeData from 'dayjs/plugin/localeData'

const Profile = () => {
  dayjs.locale('es')
  dayjs.extend(localeData)
  dayjs.extend(customParseFormat)

  const [provincia, setProvincia] = useState(1)
  const [date, setDate] = useState(dayjs())

  const handleChange = (event) => {
    setProvincia(event.target.value)
  }

  return (
    <section>
      <div>
        <p>J</p>
        <div>
          <Button>Subir Foto</Button>
          <Button>Quitar</Button>
        </div>
      </div>
      <FormControl>
        <div>
          <FormLabel id='firstName'>Nombres* <TextField id='firstName' label='Francisco' /></FormLabel>
          <FormLabel id='lastname'>Apellidos* <TextField id='lastname' label='Ledesma' /></FormLabel>
        </div>
        <div>
          <FormLabel id='email'>Correo electronico* <TextField id='email' label='Franciscoledesma@gmail.com' /></FormLabel>
          <FormLabel id='nacionality'>Nacionalidad* <TextField id='nacionality' label='Argentina' /></FormLabel>
        </div>
        <div>
          <FormLabel id='province'>Provincia*</FormLabel>
          <Select id='province' value={provincia} displayEmpty onChange={handleChange}>
            {
                  provincias.map(provincia => (
                    <MenuItem value={provincia.id} key={provincia.id}>{provincia.nombre}</MenuItem>
                  ))
            }
          </Select>
          <FormLabel id='zipCode'>Codigo Postal* <TextField id='zipCode' label='1000' /></FormLabel>
        </div>
        <div>
          <FormLabel id='address'>Dirección* <TextField id='address' label='Calle' /></FormLabel>
          <FormLabel id='number'>Número* <TextField id='number' label='123' /></FormLabel>

        </div>
        <div>
          <FormLabel id='dateOfBirth'>Fecha de Nacimiento*</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker defaultValue={date} onChange={(newDate) => setDate(newDate.format('DD/MM/YYYY'))} />
          </LocalizationProvider>
          <FormLabel id='dni'>DNI*<TextField id='dni' label='12345678' /></FormLabel>
        </div>
        <div />
      </FormControl>
    </section>
  )
}

export default Profile
