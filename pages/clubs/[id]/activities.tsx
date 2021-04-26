import { ReactElement, useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { StyleSheet, css } from "aphrodite";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Activities = (): ReactElement => {
  const classes = useStyles();

  const [activities, setActivities] = useState([])
  const clubId = 112383
  const fetchClubs = async () => {
    const { data } = await axios.get(`https://www.strava.com/api/v3/clubs/${clubId}/activities`)
    setActivities(data)
  }
  const formatNumber = num => num > 10 ? num : `0${num}`
  const parseTime = (time: number) => {
    const hour = parseInt(time / 3600)
    const min = formatNumber(parseInt((time % 3600) / 60))
    const sec = formatNumber(parseInt(time % 60 ))
    return [hour, min, sec].join(':')
  }
  useEffect(() => {
    fetchClubs()
  }, [])
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>이름</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>거리</TableCell>
              <TableCell>평속</TableCell>
              <TableCell>획고</TableCell>
              <TableCell>경과시간</TableCell>
              <TableCell>이동시간</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity, i) => {
              const {
                athlete,
                name,
                distance,
                total_elevation_gain,
                elapsed_time,
                moving_time,
              } = activity
              const { firstname, lastname } = athlete
              return (
              <TableRow key={activity.name}>
                <TableCell>{`${lastname} ${firstname}`}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{(distance / 1000).toFixed(1)}km</TableCell>
                <TableCell>{((distance / moving_time) * 3600 / 1000).toFixed(1)}km</TableCell>
                <TableCell>{total_elevation_gain}m</TableCell>
                <TableCell>{parseTime(elapsed_time)}</TableCell>
                <TableCell>{parseTime(moving_time)}</TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const useStylesheet = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        row: {
          marginBottom: '2rem',
        },
        // first: {
        //   width: '10rem'
        // },
      }),
    []
  );
};

export default Activities
