import React, { useState, useContext } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Snackbar, Typography, Grid, Paper, TextField, CssBaseline, Button, Avatar, CircularProgress } from '@material-ui/core'
import { useMutation } from 'react-apollo'

import { useStyles } from './styles'
import { Alert } from '../../components'
import { LOGIN, ME } from './queries'
import { AuthContext, Client } from '../../tools'

export default function Login () {
  const classes = useStyles()
  const [state, setState] = useState({ username: '', password: '', isOpenAlert: false, isSucess: false, loading: false })
  const context = useContext(AuthContext)
  const [login] = useMutation(LOGIN)

  const changeInputHandler = (e) => {
    const { target } = e
    const input = { ...state }
    input[target.name] = target.value
    setState(input)
  }

  const handleLogin = () => {
    setState({ ...state, loading: true })
    const { username, password } = state
    login({
      variables: {
        input: {
          username,
          password
        }
      }
    }).then(res => {
      if (res.data && res.data.login) {
        localStorage.setItem('access-token', res.data.login.accessToken)
        Client.query({
          query: ME
        }).then(response => {
          const { data } = response
          if (data && data.me) {
            setState({ ...state, isOpenAlert: true, isSucess: true, loading: false })
            context.dispatch({ type: 'LOGIN', payload: { userProfile: data.me } })
          } else {
            setState({ ...state, isOpenAlert: true, isSucess: false, loading: false })
          }
        }).catch(err => {
          setState({ ...state, isOpenAlert: true, isSucess: false, loading: false })
        })
      } else {
        setState({ ...state, isOpenAlert: true, isSucess: false, loading: false })
      }
    }).catch(err => {
      setState({ ...state, isOpenAlert: true, isSucess: false, loading: false })
    })
  }

  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setState({ ...state, isOpenAlert: false })
  }

  return (
    <>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='username'
                name='username'
                label='Tên đăng nhập'
                value={state.username}
                autoFocus
                onChange={changeInputHandler}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={state.password}
                onChange={changeInputHandler}
              />
              <div className={classes.wrapper}>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  onClick={handleLogin}
                  disabled={state.loading}
                >
                  Đăng nhập
                </Button>
                {state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
      <Snackbar open={state.isOpenAlert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        {state.isSucess
          ? (
            <Alert onClose={handleCloseAlert} severity='success'>
              Đăng nhập thành công
            </Alert>
          ) : (
            <Alert onClose={handleCloseAlert} severity='error'>
              Username hoặc password không đúng
            </Alert>
          )}
      </Snackbar>
    </>
  )
}