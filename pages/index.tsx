import { ReactElement } from 'react'
import Head from 'next/head'
import Config from "@src/config";
import { Button } from '@material-ui/core';

console.log(Config)

const Home = (): ReactElement => {

  return (
    <div className="container">
      <Head>
        <title>uiistory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button
        color="secondary"
        variant="outlined"
        size="medium"
        href={`http://www.strava.com/oauth/authorize?client_id=${Config.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${Config.APP_URL}/exchange_token&approval_prompt=force&scope=read`}
      >스트라바 인증</Button>
    </div>
  )
}

export default Home
