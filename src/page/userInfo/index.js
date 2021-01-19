import React, { useState, useEffect, useRef } from 'react'
import {
  Paper,
  Chip,
  Typography,
  Grid,
  IconButton,
  Snackbar,
  Button,
  CircularProgress,
  AppBar,
  Toolbar,
  Avatar,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Checkbox,
  Tab,
  Tabs
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
  ArrowBack as ArrowBackIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon
} from '@material-ui/icons'
import moment from 'moment'
import { useParams, useHistory } from 'react-router-dom'
import { useMutation } from 'react-apollo'
import { CircularIndeterminate, Alert, TabPanel } from '../../components'
import { Client } from '../../tools'
import { useStyles } from './styles'
import { USER, LOCK_AND_UNLOCK_ACCOUNT, CHANGE_PERMISSIONS } from './queries'
import Content from './content'
import Report from './report'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' color='primary' />

function UserInfo (props) {
  const { userProfile } = props
  const classes = useStyles()
  const params = useParams()
  const history = useHistory()

  const [lockAndUnlock] = useMutation(LOCK_AND_UNLOCK_ACCOUNT)
  const [changePermissions] = useMutation(CHANGE_PERMISSIONS)

  const [value, setValue] = useState(0)
  const [openReasonModal, setOpenReasonModal] = useState(false)
  const [reason, setReason] = useState('')
  const [openPermissionModal, setOpenPermissionModal] = useState(false)
  const [permissionsSelected, setPermissionsSelected] = useState([])
  const [messageError, setMessageError] = useState('')
  const [user, setUser] = useState(null)
  const [numberOfPost, setNumberOfPost] = useState(0)
  const [numberOfPlace, setNumberOfPlace] = useState(0)
  const [permissions, setPermissions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [messageNoitify, setMessageNoitify] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [dataStatistical, setDataStatistical] = useState([
    {
      key: '1',
      month: 'Tháng 1',
      count: 0
    },
    {
      key: '2',
      month: 'Tháng 2',
      count: 0
    },
    {
      key: '3',
      month: 'Tháng 3',
      count: 0
    },
    {
      key: '4',
      month: 'Tháng 4',
      count: 0
    },
    {
      key: '5',
      month: 'Tháng 5',
      count: 0
    },
    {
      key: '6',
      month: 'Tháng 6',
      count: 0
    },
    {
      key: '7',
      month: 'Tháng 7',
      count: 0
    },
    {
      key: '8',
      month: 'Tháng 8',
      count: 0
    },
    {
      key: '9',
      month: 'Tháng 9',
      count: 0
    },
    {
      key: '10',
      month: 'Tháng 10',
      count: 0
    },
    {
      key: '11',
      month: 'Tháng 11',
      count: 0
    },
    {
      key: '12',
      month: 'Tháng 12',
      count: 0
    }
  ])

  useEffect(() => {
    Client.query({    
      query: USER,
      variables: {
        _id: params.ID
      }
    }).then(res => {
      const { data } = res
      if (data && data.user) {
        setUser(data.user)
        const permissionsObj = data.user.account.permissions.map(per => {
          const index = data.permissions.findIndex(p => p.code === per)
          return { name: data.permissions[index].name, code: per }
        })
        setPermissionsSelected(permissionsObj)
      }

      if (data && data.numberOfPost) {
        setNumberOfPost(data.numberOfPost)
      }

      if (data && data.numberOfPlace) {
        setNumberOfPlace(data.numberOfPlace)
      }

      if (data && data.permissions) {
        setPermissions(data.permissions)
      }

      let newDataStatistical = [...dataStatistical]
      newDataStatistical = newDataStatistical.map(e => {
        const index = data.statisticalPost.findIndex(month => month._id === e.key)
        if (index > -1) {
          return { ...e, count: data.statisticalPost[index].count }
        } else {
          return { ...e }
        }
      })
      setDataStatistical([...newDataStatistical])
    })
  }, [])

  const handleBackClick = () => {
    history.goBack()
  }

  const handleCloseAlert = (e, r) => {
    if (r === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }

  const handleOpenReasonModal = () => {
    setOpenReasonModal(true)
    setReason('')
  }

  const handleCloseReasonModal = () => {
    setOpenReasonModal(false)
    setReason()
  }

  const handleOpenPermissionModal = () => {
    setOpenPermissionModal(true)
    const permissionsObj = user.account.permissions.map(per => {
      const index = permissions.findIndex(p => p.code === per)
      return { name: permissions[index].name, code: per }
    })
    setPermissionsSelected(permissionsObj)
  }
  
  const handleClosePermissionModal = () => {
    setOpenPermissionModal(false)
    const permissionsObj = user.account.permissions.map(per => {
      const index = permissions.findIndex(p => p.code === per)
      return { name: permissions[index].name, code: per }
    })
    setPermissionsSelected(permissionsObj)
  }

  const handleChangeReason = (e) => {
    if (e.target.value === '') {
      setMessageError('Vui lòng nhập lí do')
    } else {
      setMessageError('')
    }
    setReason(e.target.value)
  }

  const handleLockAndUnlock = () => {
    if (reason === '' && !user.account.isLocked) {
      setMessageError('Vui lòng nhập lí do')
      return
    }

    handleCloseReasonModal()
    setIsLoading(true)
    lockAndUnlock({
      variables: {
        _id: user.account._id,
        reason
      }
    }).then(res => {
      const { data } = res
      if (data && data.lockAndUnlockAccount) {
        setIsLoading(false)
        const newUser = { ...user }
        user.account.isLocked = !user.account.isLocked
        user.account.reason = reason
        setUser(newUser)
        setReason('')
        setOpenAlert(true)
        setIsSuccess(true)
        setMessageError('')
        setMessageNoitify('thao tác thành công')
      } else {
        setIsLoading(false)
        setReason('')
        setOpenAlert(true)
        setIsSuccess(false)
        setMessageError('')
        setMessageNoitify('Thao tác thất bại thất bại. Xảy ra lỗi')
      }
    })
  }

  const handleChangePermisionItem = (e, permission) => {
    setPermissionsSelected(permission)
  }

  const handleChangePermissions = () => {
    setOpenPermissionModal(false)
    setIsLoading(true)
    changePermissions({
      variables: {
        _id: user.account._id,
        permissions: permissionsSelected.map(per => per.code)
      }
    }).then(res => {
      const { data } = res
      if (data && data.changePermissions) {
        setIsLoading(false)
        const newUser = { ...user }
        user.account.permissions = permissionsSelected.map(per => per.code)
        setUser(newUser)
        setOpenAlert(true)
        setIsSuccess(true)
        setMessageNoitify('Thao tác thành công')
      } else {
        setIsLoading(false)
        setOpenAlert(true)
        const permissionsObj = user.account.permissions.map(per => {
          const index = permissions.findIndex(p => p.code === per)
          return { name: permissions[index].name, code: per }
        })
        setPermissionsSelected(permissionsObj)
        setIsSuccess(false)
        setMessageNoitify('Thao tác thất bại thất bại. Xảy ra lỗi')
      }
    })
  }

  const handleChangeTab = (e, valueTab) => {
    setValue(valueTab)
  }

  if (!user) {
    return (
      <Grid item xs={12}>
        <CircularIndeterminate />
      </Grid>
    )
  }

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
                Tài khoản
              </Typography>
              {userProfile.account.permissions.includes('AUTHORIZATION') && (user.account.username && (
                <div className={classes.buttonWrapper}>
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.buttonAction}
                    onClick={handleOpenPermissionModal}
                    disabled={isLoading}
                  >
                    Phân quyền
                  </Button>
                  {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
              ))}
              {userProfile.account.permissions.includes('ACCOUNT_LOCK_AND_UNLOCK') && (user.account.isLocked ? (
                <div className={classes.buttonWrapper}>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={handleLockAndUnlock}
                    className={classes.buttonAction}
                    disabled={isLoading}
                  >
                    Mở khóa tài khoản
                  </Button>
                  {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
              ) : (
                <div className={classes.buttonWrapper}>
                  <Button
                    variant='outlined'
                    color='secondary'
                    onClick={handleOpenReasonModal}
                    className={classes.buttonAction}
                    disabled={isLoading}
                  >
                    Khóa tài khoản
                  </Button>
                  {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
              ))}
            </Toolbar>
          </AppBar>
          <Paper className={classes.navTabsWrapper}>
            <Tabs
              value={value}
              indicatorColor='primary'
              textColor='primary'
              onChange={handleChangeTab}
              aria-label='tab-content'
              variant='fullWidth'
            >
              <Tab label='Thông tin tài khoản' />
              <Tab label='Báo cáo vi phạm' />
            </Tabs>
          </Paper>
          <TabPanel index={0} value={value}>
            <Content user={user} numberOfPost={numberOfPost} numberOfPlace={numberOfPlace} permissionsSelected={permissionsSelected} dataStatistical={dataStatistical} />
          </TabPanel>
          <TabPanel index={1} value={value}>
            <Report idUser={user._id} />
          </TabPanel>
        </Paper>
      </Grid>
      <Dialog
        open={openReasonModal}
        onClose={handleCloseReasonModal}
      >
        <DialogTitle>
          Lí dó khóa tài khoản
        </DialogTitle>
        <DialogContent>
          <TextField
            error={!!messageError}
            onChange={handleChangeReason}
            value={reason}
            autoFocus
            variant='outlined'
            label='Lí do'
            placeholder='Nhập lí do...'
            helperText={!!messageError ? messageError : null}
          />
        </DialogContent>
        <DialogActions>
          <Button color='primary' disabled={!reason} onClick={handleLockAndUnlock}>OK</Button>
          <Button color='primary' onClick={handleCloseReasonModal}>Đóng</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openPermissionModal}
        onClose={handleClosePermissionModal}
      >
        <DialogTitle>
          Phân quyền
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            multiple
            id='checkboxes-permission'
            className={classes.textInput}
            options={permissions.map(per => ({ name: per.name, code: per.code }))}
            disableCloseOnSelect
            ChipProps={{ color: 'primary' }}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, v) => permissionsSelected.some(per => per.code === option.code)}
            renderOption={(option, { selected }) => (
              <>
                <Checkbox
                  icon={icon}
                  color='primary'
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </>
            )}
            style={{ width: 500 }}
            renderInput={(param) => (
              <TextField
                error={permissionsSelected.length === 0}
                {...param}
                variant='outlined'
                label='Phân quyền'
                helperText={permissionsSelected.length === 0 ? 'Vui lòng chọn ít nhất 1 quyền' : null}
              />
            )}
            value={permissionsSelected}
            onChange={(e, v) => handleChangePermisionItem(e, v)}
          />
        </DialogContent>
        <DialogActions>
          <Button color='primary' disabled={permissionsSelected.length === 0} onClick={handleChangePermissions}>OK</Button>
          <Button color='primary' onClick={handleClosePermissionModal}>Đóng</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        {isSuccess
          ? (
            <Alert onClose={handleCloseAlert} severity='success'>
              {messageNoitify}
            </Alert>
          ) : (
            <Alert onClose={handleCloseAlert} severity='error'>
              {messageNoitify}
            </Alert>
          )}
      </Snackbar>
    </>
  )
}

export default UserInfo