import { ReactElement, useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const Clubs = (): ReactElement => {
  const [clubs, setClubs] = useState([])
  const classes = useStyles();
  const fetchClubs = async () => {
    const { data } = await axios.get('https://www.strava.com/api/v3/athlete/clubs')
    setClubs(data)
  }
  useEffect(() => {
    fetchClubs()
  }, [])

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">내가 가입한 클럽</ListSubheader>
        </GridListTile>
        {clubs.map((club) => (
          <GridListTile key={club.cover_photo_small}>
          <img src={club.cover_photo_small} alt={club.name}/>
            <GridListTileBar
              title={club.name}
              subtitle={<span>{club.city}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${club.name}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default Clubs
