import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
}))

function NoData (props) {
  const classes = useStyles()

  return (
    <Typography className={classes.root}>
      Không có dữ liệu
    </Typography>
  )
}

export { NoData }