import React from 'react'
import {
  Grid,
  Paper
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Info from './info'
import Timeline from './timeline'
import Chart from './chart'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 360
  }
}))

function Overview (props) {
  const classes = useStyles()
  const { userProfile } = props

  return (
    <>
      <Grid item xs={12} md={6} lg={5}>
        <Paper className={classes.paper}>
          <Info userProfile={userProfile} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={7}>
        <Paper className={classes.paper} style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
          <Timeline />
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <Chart />
        </Paper>
      </Grid>
    </>
  )
}

export default Overview