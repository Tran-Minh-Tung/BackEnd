import React, { useState, useEffect } from 'react'
import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  Checkbox
} from '@material-ui/core'
import {
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon
} from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateMomentUtils from '@date-io/moment'
import { useQuery } from 'react-apollo'
import { GET_PERMISSIONS } from './queries'
import { useStyles } from './styles'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' color='primary' />
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const initInput = {
  birthday: new Date(),
  email: '',
  name: '',
  address: '',
  gender: 'male',
  username: '',
  password: '',
  permissionsSelected: [{ code: 'POST_APPROVE', name: 'Duyệt bài' }]
}

const initError = {
  email: '',
  name: '',
  address: '',
  username: '',
  password: '',
  permission: ''
}

const FormModal = (props) => {
  const classes = useStyles()
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [input, setInput] = useState(initInput)

  const [error, setError] = useState(initError)

  const { data, loading } = useQuery(GET_PERMISSIONS)

  const { open, onClose, onSubmit } = props
  const { name, birthday, address, email, gender, username, password, permissionsSelected } = input

  const onChangeDate = (date) => {
    setInput({ ...input, birthday: date })
  }

  const handleChangeText = (e, type) => {
    if (type === 'name') {
      if (e.target.value === '') {
        setError({ ...error, name: 'Vui lòng nhập họ tên' })
      } else {
        setError({ ...error, name: '' })
      }
      setInput({ ...input, name: e.target.value })
      return
    }

    if (type === 'email') {
      if (e.target.value === '') {
        setError({ ...error, email: 'Vui lòng nhập email' })
      } else if (!re.test(e.target.value)) {
        setError({ ...error, email: 'Vui lòng nhập đúng định dạng email' })
      } else {
        setError({ ...error, email: '' })
      }

      setInput({ ...input, email: e.target.value })
      return
    }

    if (type === 'address') {
      if (e.target.value === '') {
        setError({ ...error, address: 'Vui lòng nhập địa chỉ' })
      } else {
        setError({ ...error, address: '' })
      }

      setInput({ ...input, address: e.target.value })
      return
    }

    if (type === 'username') {
      if (e.target.value === '') {
        setError({ ...error, username: 'Vui lòng username' })
      } else {
        setError({ ...error, username: '' })
      }

      setInput({ ...input, username: e.target.value })
      return
    }

    if (type === 'password') {
      if (e.target.value === '') {
        setError({ ...error, password: 'Vui lòng password' })
      } else if (e.target.value.length < 8) {
        setError({ ...error, password: 'Password phải có ít nhất 8 kí tự' })
      } else {
        setError({ ...error, password: '' })
      }

      setInput({ ...input, password: e.target.value })
    }
  }

  const handleChangeItemGender = (e) => {
    setInput({ ...input, gender: e.target.value })
  }

  const handleChangePermisionItem = (e, permissions) => {
    if (permissions.length === 0) {
      setError({ ...error, permission: 'Vui lòng chọn ít nhất 1 quyền' })
    } else {
      setError({ ...error, permission: '' })
    }
    setInput({ ...input, permissionsSelected: permissions })
  }

  const isDisable = (!name || !email || !address || !username || !password || permissionsSelected.length === 0)

  const handleSubmit = async () => {
    setLoadingSubmit(true)

    await onSubmit({
      name,
      gender,
      email,
      address,
      birthday: +birthday,
      username,
      password,
      permissions: permissionsSelected.map(per => per.code)
    })

    setLoadingSubmit(false)
    setError(initError)
    setInput(initInput)
  }

  const handleCloseModal = () => {
    onClose()
    setError(initError)
    setInput(initInput)
  }

  return (
    <>
      <Dialog open={open} onClose={handleCloseModal} aria-labelledby='form-dialog-title' fullWidth classes={{ paperWidthSm: classes.modal }}>
        <DialogTitle id='form-dialog-title'>Tạo tài khoản mới</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                autoFocus
                helperText={error.name ? error.name : null}
                error={!!error.name}
                className={classes.textInput}
                fullWidth
                margin='normal'
                label='Họ tên'
                placeholder='Họ tên...'
                variant='outlined'
                value={name}
                onChange={(e) => handleChangeText(e, 'name')}
              />
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel id='gender-label'>Giới tính</InputLabel>
                <Select
                  labelId='gender-label'
                  value={gender}
                  onChange={handleChangeItemGender}
                  label='Giới tính'
                >
                  <MenuItem value={'male'}>Nam</MenuItem>
                  <MenuItem value={'female'}>Nữ</MenuItem>
                </Select>
              </FormControl>
              <MuiPickersUtilsProvider utils={DateMomentUtils}>
                <KeyboardDatePicker
                  className={classes.dateInput}
                  disableToolbar
                  format='DD/MM/YYYY'
                  inputVariant='outlined'
                  margin='normal'
                  id='birthday'
                  label='Ngày sinh'
                  value={birthday}
                  onChange={(date) => onChangeDate(date)}
                />
              </MuiPickersUtilsProvider>
              <TextField
                className={classes.textInput}
                helperText={error.email ? error.email : null}
                error={!!error.email}
                fullWidth
                margin='normal'
                label='Email'
                placeholder='Email...'
                variant='outlined'
                type='email'
                value={email}
                onChange={(e) => handleChangeText(e, 'email')}
              />
              <TextField
                className={classes.textInput}
                helperText={error.address ? error.address : null}
                error={!!error.address}
                fullWidth
                margin='normal'
                label='Địa chỉ'
                placeholder='Địa chỉ...'
                variant='outlined'
                value={address}
                onChange={(e) => handleChangeText(e, 'address')}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                className={classes.textInput}
                helperText={error.username ? error.username : null}
                error={!!error.username}
                fullWidth
                margin='normal'
                label='Username'
                placeholder='Username...'
                variant='outlined'
                value={username}
                onChange={(e) => handleChangeText(e, 'username')}
              />
              <TextField
                className={classes.textInput}
                helperText={error.password ? error.password : null}
                error={!!error.password}
                fullWidth
                margin='normal'
                label='Password'
                placeholder='Password...'
                variant='outlined'
                type='password'
                value={password}
                onChange={(e) => handleChangeText(e, 'password')}
              />
              <Autocomplete
                multiple
                id='checkboxes-permission'
                className={classes.textInput}
                options={!loading ? data.permissions.map(per => ({ name: per.name, code: per.code })) : []}
                disableCloseOnSelect
                loading={loading}
                ChipProps={{ color: 'primary' }}
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) => permissionsSelected.some(per => per.code === option.code)}
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
                renderInput={(params) => (
                  <TextField
                    error={!!error.permission}
                    {...params}
                    variant='outlined'
                    label='Phân quyền'
                    helperText={!!error.permission ? error.permission : null}
                  />
                )}
                value={permissionsSelected}
                onChange={(e, value) => handleChangePermisionItem(e, value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <div className={classes.buttonWrapper}>
            <Button color='primary' disabled={loadingSubmit || isDisable} onClick={handleSubmit}>
              Tạo
            </Button>
            {loadingSubmit && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
          <Button onClick={handleCloseModal} color='primary' disabled={loading}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default FormModal