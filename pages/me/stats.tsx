import { ReactElement, useEffect } from 'react'
import axios from 'axios'
import Cookies from "js-cookie";
import { CookieConst } from "@src/components/consts";

const MyStats = (): ReactElement => {
  const fetchMyStats = async () => {
    const athleteId = Cookies.get(CookieConst.StravaId)
    const result = await axios.get(`https://www.strava.com/api/v3/athletes/${athleteId}/stats`)
    console.log(result)
  }

  useEffect(() => {
    fetchMyStats()
  })
 return (<div>MyStats</div>)
}


export default MyStats