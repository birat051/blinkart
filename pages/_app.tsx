import PageHeader from '@/components/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/_app.css'
import { SessionProvider } from "next-auth/react"
import Footer from '@/components/Footer'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { persistor, store } from '../stateManagement/store';
import { PersistGate } from 'redux-persist/integration/react'


export default function App({ Component, pageProps: { session, ...pageProps }}: AppProps) {
  return ( 
  <SessionProvider session={session}>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <>
  <Head>
  <title>Blinkart</title>
  </Head>
  <PageHeader />
  <Component {...pageProps} />
  <Footer />
  </>
  </PersistGate>
  </Provider>
  </SessionProvider>
  )
}
