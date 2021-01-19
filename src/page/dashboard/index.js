/* eslint-disable */

import React, { Suspense, useContext, useRef } from 'react'
import clsx from 'clsx'
import {
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Tooltip,
  Container,
  Grid,
  Link
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import {
  ExitToApp as ExitToAppIcon,
  VpnKey as VpnKeyIcon
} from '@material-ui/icons'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import ChangePasswordModal from './changePasswordModal'
import { LoadableComponent } from '../../components'
import { routers, privateRouters } from '../../config'
import { AuthContext } from '../../tools'
import { useStyles } from './styles'

// function Copyright() {
//   return (
//     <Typography variant='body2' color='textSecondary' align='center'>
//       {'Copyright © '}
//       <Link color='inherit' href='https://material-ui.com/'>
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   )
// }

const NavBar = withRouter((props) => {
  const classes = useStyles()
  const refChangePasswordModal = useRef()
  const { dispatch } = useContext(AuthContext)

  const [open, setOpen] = React.useState(true)
  const [selectedIndex, setSelectedIndex] = React.useState(+sessionStorage.getItem('selectedIndex') || 0)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const itemClick = (index) => {
    setSelectedIndex(index)
    sessionStorage.setItem('selectedIndex', index)
    props.history.push(routers[index].path)
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const handleOpenModal = () => {
    refChangePasswordModal.current.handleOpen()
  }

  const { permissions } = props

  return (
    <>
      <AppBar position='absolute' className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
            Dashboard
          </Typography>
          <Tooltip title='Đổi mật khẩu'>
            <IconButton color='inherit' onClick={handleOpenModal}>
              <VpnKeyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Đăng xuất'>
            <IconButton color='inherit' onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <ChangePasswordModal ref={refChangePasswordModal} />
      </AppBar>
      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {routers.map(item => (!item.permission || permissions.includes(item.permission)) && (
            <ListItem key={item.key} button selected={selectedIndex === item.key} onClick={() => itemClick(item.key)}>
              {open ? (
                <ListItemIcon>{selectedIndex === item.key ? item.selectedIcon : item.icon}</ListItemIcon>
              ) : (
                <Tooltip title={item.displayName}>
                  <ListItemIcon>{selectedIndex === item.key ? item.selectedIcon : item.icon}</ListItemIcon>
                </Tooltip>
              )}
              <ListItemText primary={item.displayName} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
})

function Dashboard(props) {
  const classes = useStyles()
  return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar permissions={props.userProfile.account.permissions} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth={false} className={classes.container}>
            <Grid container spacing={3}>
              <Suspense fallback={<div>Loanding...</div>}>
                <Switch>
                  {routers.map(router => (<Route key={router.key} exact path={router.path} component={LoadableComponent(import(`../${router.component}`), { userProfile: props.userProfile, permission: router.permissions })} />))}
                  {privateRouters.map(router => (<Route key={router.key} exact path={router.path} component={LoadableComponent(import(`../${router.component}`), { userProfile: props.userProfile, permission: router.permissions })} />))}
                  <Redirect to='/overview' />
                </Switch>
              </Suspense>
            </Grid>
            {/* <Box pt={4}>
              <Copyright />
            </Box> */}
          </Container>
        </main>
      </div>
  )
}

export default Dashboard