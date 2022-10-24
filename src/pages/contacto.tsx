import type { NextPage } from 'next'
import { Typography } from '@mui/material';

import { WebLayout } from '@components/layouts';

const ContactoPage: NextPage = () => {
  return (
    <WebLayout title='Inicio' pageDescription='Página de Incio'>
      <Typography variant='h1' component='h1'>Contacto</Typography>
    </WebLayout>
  )
}

export default ContactoPage