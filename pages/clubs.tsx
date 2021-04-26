import { ReactElement, useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { StyleSheet, css } from "aphrodite";

const Clubs = (): ReactElement => {
  const [clubs, setClubs] = useState([])
  const styles = useStylesheet();
  const fetchClubs = async () => {
    const { data } = await axios.get('https://www.strava.com/api/v3/athlete/clubs')
    setClubs(data)
  }
  useEffect(() => {
    fetchClubs()
  }, [])
  return (
    <main>{clubs.map(club => {
      return (
        <div className={css(styles.row)} key={club.id}>
          <img src={club.cover_photo_small} alt={club.name}/>
          <div>{club.id}</div>
          <div>{club.name}</div>
        </div>
      )
    })}</main>
  )
}

const useStylesheet = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        row: {
          display: "flex",
        },
      }),
    []
  );
};

export default Clubs
