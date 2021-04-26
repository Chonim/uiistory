import Head from 'next/head'
import { ReactElement, useEffect } from 'react'

const Home = (): ReactElement => {
  useEffect(() => {
    console.log('hhi')
  }, [])
  return (
    <div className="container">
      <Head>
        <title>uiistory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export default Home
