import React, { useContext } from 'react'
import { Avatar, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons'
import { AuthContext } from '../../tools'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '80%'
  },
  avatar: {
    margin: 20,
    height: 70,
    width: 70
  },
  button: {
    justifyContent: 'flex-end',
    display: 'flex',
    marginTop: 52
  }
}))

function Info (props) {
  const classes = useStyles()
  const { userProfile } = props
  const { dispatch } = useContext(AuthContext)

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar} variant='circle' src={userProfile.imageUrl} />
      <div style={{ width: '100%', marginRight: 15, marginTop: '16%' }}>
        <div style={{ marginBottom: 20 }}>
          <Typography variant='h6'>
            {userProfile.name}
          </Typography>
          <Typography variant='subtitle1'>
            Username: &nbsp;
            {userProfile.account.username}
          </Typography>
        </div>
        <div className={classes.button}>
          <Button startIcon={<ExitToAppIcon />} variant='outlined' color='primary' onClick={handleLogout}>Đăng xuất</Button>
        </div>
      </div>
    </div>
  )
}

export default Info