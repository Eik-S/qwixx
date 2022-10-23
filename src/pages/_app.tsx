import { AppProps } from 'next/app'
import Head from 'next/head'
import '../index.scss'
export default function NextApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="description" content="The qwixx game to play online" />
        <title>Qwixx</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
