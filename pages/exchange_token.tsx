import { ReactElement, useEffect, useCallback } from 'react'
import axios from 'axios'
import Config from "@src/config";
import Cookies from "js-cookie";
import { CookieConst } from "@src/components/consts";
import { useRouter } from "next/router";

const ExchangeToken = (): ReactElement => {
  const router = useRouter();

  const refreshToken = async () => {
    const payload = {
      client_id: Config.STRAVA_CLIENT_ID,
      client_secret: Config.STRAVA_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: Cookies.get(CookieConst.Refresh)
    }
    const { data } = await axios.post('https://www.strava.com/oauth/token', payload)
    handleTokenReceive(data)
  }

  const postToken = async () => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code') 
    const payload = {
      client_id: Config.STRAVA_CLIENT_ID,
      client_secret: Config.STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    }
    const { data } = await axios.post('https://www.strava.com/oauth/token', payload)
    handleTokenReceive(data)
  }
  
  const handleTokenReceive = useCallback((data) => {
    const {
      access_token,
      refresh_token,
      token_type,
    } = data
    Cookies.set(CookieConst.Access, access_token)
    Cookies.set(CookieConst.Refresh, refresh_token)

    fetchAthlete()
  }, [])

  const fetchAthlete = async () => {
    const { data } = await axios.get('https://www.strava.com/api/v3/athlete')
    const {
      // firstname,
      // lastname,
      // profile_medium,
      id,
    } = data
    console.log(data)
    Cookies.set(CookieConst.StravaId, id)
    router.replace('/clubs')
  }

  useEffect(() => {
    const accessToken = Cookies.get(CookieConst.Access);
    if (accessToken) {
      refreshToken()
      return
    }
    postToken()
  }, [])
  return (<div></div>)
}

export default ExchangeToken