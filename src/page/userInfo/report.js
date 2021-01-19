import React from 'react'
import {
  Typography
} from '@material-ui/core'
import { useQuery } from 'react-apollo'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { CircularIndeterminate, NoData } from '../../components'
import { useStyles } from './styles'
import { GET_REPORT } from './queries'

function Report (props) {
  const classes = useStyles()
  const history = useHistory()

  const { data, loading, error } = useQuery(GET_REPORT, {
    variables: {
      idTarget: props.idUser
    }
  })

  if (loading) {
    return (
      <CircularIndeterminate />
    )
  }

  if (error) {
    return (
      <div>Error</div>
    )
  }

  return (
    <div className={classes.reportContentWrapper}>
      {data.report.length === 0 ? (
        <NoData />
      ) : data.report.map(item => (
        <div key={item._id} className={classes.itemReport}>
          <Typography color='primary' className={classes.reportAuthor} onClick={() => history.push(`/userInfo/${item.reportedBy._id}`)}>
            {item.reportedBy.name}
          </Typography>
          <Typography>&nbsp;tố cáo tài khoản này vi phạm:&nbsp;</Typography>
          <Typography color='secondary' className={classes.reportReason}>
            {item.content}
          </Typography>
          <Typography color='textSecondary'>
            {moment(item.createdAt).format('DD-MM-YYYY hh:mm')}
          </Typography>
        </div>
      ))}
    </div>
  )
}

export default Report