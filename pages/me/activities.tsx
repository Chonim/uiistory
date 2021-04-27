import { ReactElement, useEffect } from 'react'
import axios from 'axios'

const MyActivities = (): ReactElement => {
  const fetchMyActivities = async () => {
    const result = await axios.get('https://www.strava.com/api/v3/athlete/activities?before=&after=&page=&per_page=')
    console.log(result)
  }

  useEffect(() => {
    fetchMyActivities()
  })
 return (<div>MyActivities</div>)
}


export default MyActivities