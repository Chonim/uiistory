import { ReactElement } from 'react'
import Head from 'next/head'
import Config from "@src/config";

console.log(Config)

const Home = (): ReactElement => {

  return (
    <div className="container">
      <Head>
        <title>uiistory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <a href={`http://www.strava.com/oauth/authorize?client_id=${Config.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read`}>스트라바 인증</a>
    </div>
  )
}

export default Home
