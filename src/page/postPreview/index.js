import React, { useState, useEffect, useContext } from 'react'
import {
  Paper,
  Typography,
  Grid,
  IconButton,
  Snackbar,
  Button,
  CircularProgress,
  AppBar,
  Toolbar,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Tabs,
  Tab
} from '@material-ui/core'
import {
  ArrowBack as ArrowBackIcon
} from '@material-ui/icons'
import { useParams, useHistory } from 'react-router-dom'
import { useMutation, useQuery } from 'react-apollo'
import { CircularIndeterminate, Alert, TabPanel } from '../../components'
import { GET_POST, APPROVE_POST, LOCK_AND_UNLOCK_POST } from './queries'
import { useStyles } from './styles'
import Content from './content'
import Report from './report'

import 'react-quill/dist/quill.snow.css'
import './index.css'

function PostPreview (props) {
  const classes = useStyles()
  const params = useParams()
  const history = useHistory()

  const { loading, error, data, refetch } = useQuery(GET_POST, {
    variables: {
      _id: params.ID
    }
  })
  const [approvePost] = useMutation(APPROVE_POST)
  const [lockAndUnlockPost] = useMutation(LOCK_AND_UNLOCK_POST)

  const [state, setState] = useState({ isLoading: false, error: false, isSucess: false, isOpenAlert: false })
  const [reason, setReason] = useState('')
  const [openReasonModal, setOpenReasonModal] = useState(false)
  const [errorReasonInput, setErrorReasonInput] = useState('')
  const [value, setValue] = useState(0)

  const handleBackClick = () => {
    history.goBack()
  }

  const handleOpenReasonModal = () => {
    setReason('')
    setOpenReasonModal(true)
  }

  const handleCloseReasonModal = () => {
    setReason('')
    setOpenReasonModal(false)
  }

  const handleChangeReason = (e) => {
    if (e.target.value === '') {
      setErrorReasonInput('Vui lòng nhập lí do')
    } else {
      setErrorReasonInput('')
    }
    setReason(e.target.value)
  }

  const handleApprovePost = () => {
    setState({ ...state, isLoading: true })
    approvePost({
      variables: {
        _id: params.ID
      }
    }).then(res => {
      if (res.data && res.data.approvePost) {
        refetch()
        setState({ ...state, isLoading: false, isOpenAlert: true, isSucess: true })
      } else {
        setState({ ...state, isLoading: false, error: true, isOpenAlert: true, isSucess: false })
      }
    }).catch(err => {
      setState({ ...state, isLoading: false, error: true, isOpenAlert: true, isSucess: false })
    })
  }

  const handleLockAndUnlock = () => {
    setState({ ...state, isLoading: true })
    lockAndUnlockPost({
      variables: {
        _id: params.ID,
        reason
      }
    }).then(res => {
      if (res.data && res.data.lockAndUnlockPost) {
        refetch()
        setState({ ...state, isLoading: false, isOpenAlert: true, isSucess: true })
      } else {
        setState({ ...state, isLoading: false, error: true, isOpenAlert: true, isSucess: false })
      }
    }).catch(err => {
      setState({ ...state, isLoading: false, error: true, isOpenAlert: true, isSucess: false })
    })
  }

  const handleCloseAlert = (e, r) => {
    if (r === 'clickaway') {
      return
    }

    setState({ ...state, isOpenAlert: false })
  }

  const handleChangeTab = (e, valueTab) => {
    setValue(valueTab)
  }

  if (loading) {
    return (
      <Grid item xs={12}>
        <CircularIndeterminate />
      </Grid>
    )
  }

  if (error || !data) {
    return (
      <div>error</div>
    )
  }

  const { post } = data

  return (
    <>
      <Grid item xs={12}>
        <Paper>
          <AppBar className={classes.appBar} color='transparent'>
            <Toolbar>
              <IconButton edge='start' color='inherit' aria-label='close' onClick={handleBackClick}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant='h6' className={classes.title}>
                Bài viết
              </Typography>
              <div className={classes.approveButtonWrapper}>
                {post.status === 'WAIT_APPROVE' && (
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleApprovePost}
                    disabled={state.isLoading}
                  >
                    Duyệt bài
                  </Button>
                )}

                {post.status === 'PUBLISHED' && (
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleOpenReasonModal}
                    disabled={state.isLoading}
                  >
                    Khóa bài viết
                  </Button>
                )}
                {post.status === 'LOCKED' && (
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleLockAndUnlock}
                    disabled={state.isLoading}
                  >
                    Mở khóa
                  </Button>
                )}
                {state.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </Toolbar>
          </AppBar>
          {post.status === 'PUBLISHED' ? (
            <>
              <Paper className={classes.navTabsWrapper}>
                <Tabs
                  value={value}
                  indicatorColor='primary'
                  textColor='primary'
                  onChange={handleChangeTab}
                  aria-label='tab-content'
                  variant='fullWidth'
                >
                  <Tab label='Nội dung bài viết' />
                  <Tab label='Báo cáo vi phạm' />
                </Tabs>
              </Paper>
              <TabPanel index={0} value={value}>
                <Content post={post} />
              </TabPanel>
              <TabPanel index={1} value={value}>
                <Report idPost={post._id} />
              </TabPanel>
            </>
          ) : (
            <Content post={post} />
          )}
          {/* <div
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
          </div> */}
        </Paper>
      </Grid>
      <Dialog
        open={openReasonModal}
        onClose={handleCloseReasonModal}
      >
        <DialogTitle>
          Lí dó khóa bài viết
        </DialogTitle>
        <DialogContent>
          <TextField
            error={!!errorReasonInput}
            onChange={handleChangeReason}
            value={reason}
            autoFocus
            variant='outlined'
            label='Lí do'
            placeholder='Nhập lí do...'
            helperText={!!errorReasonInput ? errorReasonInput : null}
          />
        </DialogContent>
        <DialogActions>
          <Button color='primary' disabled={!reason} onClick={handleLockAndUnlock}>OK</Button>
          <Button color='primary' onClick={handleCloseReasonModal}>Đóng</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={state.isOpenAlert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        {state.isSucess
          ? (
            <Alert onClose={handleCloseAlert} severity='success'>
              Thao tác thành công
            </Alert>
          ) : (
            <Alert onClose={handleCloseAlert} severity='error'>
              Xảy ra lỗi!!!
            </Alert>
          )}
      </Snackbar>
    </>
  )
}

export default PostPreview