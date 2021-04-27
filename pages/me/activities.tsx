import { ReactElement, useState, useEffect } from 'react'
import axios from 'axios'

const MyActivities = (): ReactElement => {
  const [activities, setActivities] = useState([])
  const fetchMyActivities = async () => {
    const { data } = await axios.get('https://www.strava.com/api/v3/athlete/activities')
    setActivities(data)
  }

  useEffect(() => {
    fetchMyActivities()
  }, [])
 return (<div>
   {activities.map(activity => {
     return (
       <div key={activity.id}>
         <div>{activity.name}</div>
       </div>
     )
   })}
 </div>)
}


export default MyActivities