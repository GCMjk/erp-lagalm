import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { lightTheme } from '@themes/index'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={ lightTheme }>
      <CssBaseline/>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
