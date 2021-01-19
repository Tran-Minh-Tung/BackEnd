import React, { forwardRef, useState, useImperativeHandle } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
  Snackbar
} from '@material-ui/core'
import { useMutation } from 'react-apollo'
import { Alert } from '../../components'
import { useStyles } from './styles'
import { CHANGE_PASSWORD } from './queries'

const ChangePasswordModal = forwardRef((props, ref) => {
  const classes = useStyles()

  const [openModal, setOpenModal] = useState(false)
  const [input, setInput] = useState({ password: '', newPassword: '', confirmPassword: '' })
  const [error, setError] = useState({ password: '', newPassword: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)

  const [changePassword] = useMutation(CHANGE_PASSWORD)

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  useImperativeHandle(ref, () => ({
    handleOpen: () => {
      setOpenModal(true)
    }
  }))

  const handleChangeInput = (e, type) => {
    if (type === 'password') {
      if (e.target.value === '') {
        setError({ ...error, password: 'Vui lòng nhập mật khẩu' })
      } else if (e.target.value.length < 8) {
        setError({ ...error, password: 'Mật khẩu có ít nhất 8 kí tự' })
      } else {
        setError({ ...error, password: '' })
      }
      setInput({ ...input, password: e.target.value })
    }

    if (type === 'newPassword') {
      if (e.target.value === '') {
        setError({ ...error, newPassword: 'Vui lòng nhập mật khẩu' })
      } else if (e.target.value.length < 8) {
        setError({ ...error, newPassword: 'Mật khẩu có ít nhất 8 kí tự' })
      } else {
        setError({ ...error, newPassword: '' })
      }
      setInput({ ...input, newPassword: e.target.value })
    }

    if (type === 'confirmPassword') {
      if (e.target.value === '') {
        setError({ ...error, confirmPassword: 'Vui lòng nhập mật khẩu' })
      } else if (e.target.value !== input.newPassword) {
        setError({ ...error, confirmPassword: 'Mật khẩu không trùng khớp với mật khẩu vừa nhập' })
      } else {
        setError({ ...error, confirmPassword: '' })
      }
      setInput({ ...input, confirmPassword: e.target.value })
    }
  }

  const handleCloseAlert = (e, r) => {
    if (r === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }

  const handleChangePassword = () => {
    setLoading(true)
    changePassword({
      variables: {
        oldPassword: input.password,
        newPassword: input.newPassword
      }
    }).then(res => {
      const { data } = res
      if (data && changePassword) {
        setLoading(false)
        setOpenAlert(true)
        setSuccess(true)
        setOpenModal(false)
        setInput({ password: '', newPassword: '', confirmPassword: '' })
        setError({ password: '', newPassword: '', confirmPassword: '' })
      } else {
        setLoading(false)
        setOpenAlert(false)
        setSuccess(false)
        setError({ ...error, password: 'Mật khẩu không đúng' })
      }
    })
  }

  const buttonDisable = (!!error.password || !!error.newPassword || !!error.confirmPassword || !input.password || !input.newPassword || !input.confirmPassword)

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>
          Đổi mật khẫu
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            error={!!error.password}
            helperText={!!error.password ? error.password : null}
            className={classes.textField}
            variant='outlined'
            label='Mật khẩu cũ'
            placeholder='Nhập mật khẩu cũ...'
            type='password'
            value={input.password}
            onChange={(e) => handleChangeInput(e, 'password')}
          />
          <TextField
            fullWidth
            error={!!error.newPassword}
            helperText={!!error.newPassword ? error.newPassword : null}
            className={classes.textField}
            variant='outlined'
            label='Mật khẩu mới'
            placeholder='Nhập mật khẩu mới...'
            type='password'
            value={input.newPassword}
            onChange={(e) => handleChangeInput(e, 'newPassword')}
          />
          <TextField
            fullWidth
            error={!!error.confirmPassword}
            helperText={!!error.confirmPassword ? error.confirmPassword : null}
            className={classes.textField}
            variant='outlined'
            label='Nhập lại mật khẩu mới'
            placeholder='Nhập lại mật khẩu mới...'
            type='password'
            value={input.confirmPassword}
            onChange={(e) => handleChangeInput(e, 'confirmPassword')}
          />
        </DialogContent>
        <DialogActions>
          <div className={classes.buttonWrapper}>
            <Button color='primary' disabled={buttonDisable || loading} onClick={handleChangePassword}>
              OK
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
          <Button color='primary' onClick={handleCloseModal} disabled={loading}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        {success && (
          <Alert onClose={handleCloseAlert} severity='success'>
            Thao tác thành công
          </Alert>
        )}
      </Snackbar>
    </>
  )
})

export default ChangePasswordModal
