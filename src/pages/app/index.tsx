import type { NextPage } from 'next'
import { Typography } from '@mui/material';

import { ErpLayout } from '@components/layouts';

const InicioWebPage: NextPage = () => {
  return (
    <ErpLayout title='Dashboard' pageDescription='Dashboard del ERP'>
      <Typography variant='h2' component='h2'>ERP</Typography>
    </ErpLayout>
  )
}

export default InicioWebPage