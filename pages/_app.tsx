import PageHeader from '@/components/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/_app.css'

export default function App({ Component, pageProps }: AppProps) {
  return ( 
  <>
  <PageHeader />
  <Component {...pageProps} />
  </>
  )
}
