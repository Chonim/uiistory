import { ReactElement, useEffect } from 'react'
import axios from 'axios'

const MyZones = (): ReactElement => {
  const fetchMyZones = async () => {
    const result = await axios.get('https://www.strava.com/api/v3/athlete/zones')
    console.log(result)
  }

  useEffect(() => {
    fetchMyZones()
  })
 return (<div>MyZones</div>)
}


export default MyZones