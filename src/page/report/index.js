import React, { useState } from 'react'
import {
  Tabs,
  Tab,
  Paper,
  Grid
} from '@material-ui/core'
import { useStyles } from './styles'
import { TabPanel } from '../../components'
import Post from './post'
import User from './user'

function Report (props) {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChangeTab = (e, valueTab) => {
    setValue(valueTab)
  }

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChangeTab}
          aria-label='tab-content'
          variant='fullWidth'
        >
          <Tab label='Bài viết' />
          <Tab label='Tài khoản' />
        </Tabs>
        <TabPanel index={0} value={value}>
          <Post />
        </TabPanel>
        <TabPanel index={1} value={value}>
          <User />
        </TabPanel>
      </Paper>
    </Grid>
  )
}

export default Report