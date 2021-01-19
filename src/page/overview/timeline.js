import React from 'react'
import {
  Timeline as MaterialTimeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent
} from '@material-ui/lab'
import {
  Typography,
  Paper
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  Receipt as ReceiptIcon,
  Person as PersonIcon
} from '@material-ui/icons'
import { useQuery } from 'react-apollo'
import moment from 'moment'
import { GET_HISTORY } from './queries'
import Title from '../../components/title'
import { CircularIndeterminate } from '../../components'
import './styles.css'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px'
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main
  }
}))

const ACTION = {
  LOCK: 'khóa',
  UNLOCK: 'mở khóa',
  APPROVE: 'duyệt'
}

const TYPE = {
  POST: 'bài viết',
  USER: 'tài khoản'
}

function Timeline (props) {
  const classes = useStyles()
  const { data, loading } = useQuery(GET_HISTORY)

  if (loading) {
    return (
      <CircularIndeterminate />
    )
  }

  if (!data) {
    return (
      <div>Error</div>
    )
  }

  return (
    <>
      <Title>Timeline</Title>
      <MaterialTimeline>
        {data.history.map(his => (
          <TimelineItem key={his._id} classes={{ missingOppositeContent: classes.timelineItem }}>
            <TimelineSeparator>
              <TimelineDot color='primary'>
                {his.type === 'POST' ? <ReceiptIcon /> : <PersonIcon />}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography color='textSecondary'>
                  {`${his.actionBy.account.username || his.actionBy.name} đã ${ACTION[his.action]} ${TYPE[his.type]} ${his.content.name}`}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {moment(his.createdAt).format('DD-MM-YYYY hh:mm')}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </MaterialTimeline>
    </>
  )
}

export default Timeline