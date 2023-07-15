import PageHeader from '@/components/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/_app.css'
import { SessionProvider } from "next-auth/react"
import Footer from '@/components/Footer'
import Head from 'next/head'


export default function App({ Component, pageProps: { session, ...pageProps }}: AppProps) {
  return ( 
  <SessionProvider session={session}>
  <>
  <Head>
  <title>Blinkart</title>
  </Head>
  <PageHeader />
  <Component {...pageProps} />
  <Footer />
  </>
  </SessionProvider>
  )
}
