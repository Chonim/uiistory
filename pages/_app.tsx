import React from "react";
import App from "next/app";
import { ReactElement } from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";

import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Head from "next/head";
import axios from "axios";
import { CookieConst } from "@src/components/consts";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  const router = useRouter();

  axios.interceptors.request.use((config) => {
    // config.baseURL = Config.API_ENDPOINT;
    const accessToken = Cookies.get(CookieConst.Access);
    const payload = accessToken
      ? {
          ...config.headers,
          authorization: `Bearer ${accessToken}`,
        }
      : config.headers;
    config.headers = payload;
    // log a message before any HTTP request is sent
    console.log("Request was sent");

    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // if (error.response.status === 401) {
      //   Cookies.remove(CookieConst.Access);
      //   Cookies.remove(CookieConst.Refresh);
      //   router.replace("/");
      // }
    }
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default MyApp;
