import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { ApolloProvider } from '@apollo/client'

import { lightTheme } from '@themes'
import { client } from '@conf'
import { AuthProvider } from '@context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ApolloProvider client={client}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </AuthProvider>
    </SessionProvider>
  )
}

export default MyApp
