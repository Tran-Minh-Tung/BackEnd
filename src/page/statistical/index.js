import React from 'react'
import { Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PostBarChart from './postBarChart'
import PostPieChart from './postPieChart'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 400
  }
}))

function Statistical () {
  const classes = useStyles()
  return (
    <>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <PostBarChart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        <Paper className={classes.paper}>
          <PostPieChart />
        </Paper>
      </Grid>
    </>
  )
}

export default Statistical