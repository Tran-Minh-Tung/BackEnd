import React from 'react'
import {
  Typography,
  Chip
} from '@material-ui/core'
import {
  Event as EventIcon
} from '@material-ui/icons'
import moment from 'moment'
import { useStyles } from './styles'
import { POST_TAG } from '../../constants'

function Content (props) {
  const classes = useStyles()

  const { post } = props

  return (
    <>
      <div
        className={classes.imagePost}
        style={{
          backgroundImage: `url('${post.imageUrlPost}')`
        }}
      >
        <div>
          <h1 className={classes.titlePost}>{post.title}</h1>
          <div>
            {POST_TAG.filter(obj => post.tags.includes(obj.value)).map(tag => <Chip className={classes.tag} color='primary' label={tag.title} />)}
          </div>
          <div className={classes.createDateWrapper}>
            <EventIcon className={classes.icon} />
            <Typography className={classes.createDate}>
              Ngày đăng: &nbsp;
              {post && moment(post.publishedAt).format('DD-MM-YYYY hh:mm')}
            </Typography>
          </div>
        </div>
      </div>
      <div className='main-post-container'>
        <div className='ql-container content-container'>
          <div className='summary-content'>{post.summary}</div>
          <div className='ql-editor' dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </>
  )
}

export default Content