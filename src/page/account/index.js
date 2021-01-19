import React, { useEffect, useState, useRef } from 'react'
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  TableContainer,
  IconButton,
  Tooltip,
  InputBase,
  Snackbar,
  Chip
} from '@material-ui/core'
import {
  Add as AddIcon,
  Search as SearchIcon
} from '@material-ui/icons'
import { Pagination } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { useMutation } from 'react-apollo'
import Title from '../../components/title'
import { CircularIndeterminate, NoData, Alert } from '../../components'
import { GET_USERS, CREATE_USER } from './queries'
import { Client } from '../../tools'
import FormModal from './formModal'
import { useStyles } from './styles'

const headers = ['Hình ảnh', 'Username', 'Họ và tên', 'Ngày sinh', 'Giới tính', 'Email', 'Ngày đăng ký', 'Tình trạng tài khoản', 'Số lượng báo cáo']
const LIMIT = 10

function Account (props) {
  const { userProfile } = props
  const classes = useStyles()
  const history = useHistory()

  const refSearch = useRef()

  const [users, setUsers] = useState([])
  const [numberOfUsers, setNumberOfUsers] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)

  const [createUser] = useMutation(CREATE_USER)

  const getData = (page = 1, keyword = null) => {
    setLoading(true)
    Client.query({
      query: GET_USERS,
      variables: {
        limit: LIMIT,
        offset: LIMIT * (page - 1),
        keyword
      }
    }).then(res => {
      const { data } = res
      if (data) {
        setLoading(false)
        setUsers(data.users)
        setNumberOfUsers(data.numberOfUsers)
      } else {
        setLoading(false)
        setError(true)
      }
    }).catch(err => {
      setLoading(false)
      setError(true)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const onChagePage = (e, value) => {
    if (value === currentPage) {
      return
    }
    getData(value)
    setCurrentPage(value)
  }

  const onRowClick = (_id) => {
    history.push(`/userInfo/${_id}`)
  }

  const handleCreateUser = async (input) => {
    const res = await createUser({
      variables: {
        input
      }
    })

    if (res.data.createUser) {
      users.push(res.data.createUser)
      setError(false)
      setOpenAlert(true)
      setOpenModal(false)
    } else {
      setError(true)
      setOpenAlert(true)
      setOpenModal(false)
    }
  }

  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      setLoading(true)
      setUsers([])
      setCurrentPage(1)
      setNumberOfUsers(0)
      if (refSearch.current.value === '') {
        getData()
      } else {
        getData(1, refSearch.current.value)
      }
    }
  }

  if (loading) {
    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <CircularIndeterminate />
        </Paper>
      </Grid>
    )
  }

  if (error) {
    return (
      <div>Error</div>
    )
  }

  const allPage = numberOfUsers % LIMIT === 0 ? Math.floor(numberOfUsers / LIMIT) : Math.floor(numberOfUsers / LIMIT) + 1

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <div className={classes.titleWrapper}>
          <Title className={classes.title}>
            Tài khoản (
            {numberOfUsers}
            )
          </Title>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon color='primary' />
            </div>
            <InputBase
              placeholder='Nhập tên user...'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
              inputRef={refSearch}
              onKeyDown={handleSearch}
            />
          </div>
          {userProfile.account.permissions.includes('USER_CREATE') && (
            <Tooltip title='Thêm tài khoản'>
              <IconButton color='primary' onClick={handleOpenModal}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
        {numberOfUsers === 0 ? (
          <NoData />
        ) : (
          <TableContainer className={classes.tableContainer}>
            <Table size='medium' stickyHeader>
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableCell key={index}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id} hover onClick={() => onRowClick(user._id)}>
                    <TableCell><Avatar variant='square' src={user.imageUrl} /></TableCell>
                    <TableCell>{user.account.username}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{moment(user.birthday).format('DD-MM-YYYY')}</TableCell>
                    <TableCell>{user.gender === 'male' ? 'Nam' : 'Nữ'}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{moment(user.createdAt).format('DD-MM-YYYY hh:mm')}</TableCell>
                    <TableCell>
                      {user.account.isLocked ? (
                        <Chip label='Tài khoản bị khóa' color='secondary' variant='outlined' />
                      ) : (
                        <Chip label='Tài khoản còn hoạt động' color='primary' variant='outlined' />
                      )}
                    </TableCell>
                    <TableCell>{user.numberOfReport}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      <Pagination hidePrevButton hideNextButton defaultPage={currentPage} count={allPage} variant='outlined' shape='rounded' onChange={onChagePage} />
      <FormModal open={openModal} onClose={handleCloseModal} onSubmit={handleCreateUser} />
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        {!error
          ? (
            <Alert onClose={handleCloseAlert} severity='success'>
              TẠo tài khoản thành côn
            </Alert>
          ) : (
            <Alert onClose={handleCloseAlert} severity='error'>
              Tạo tài khoản thất bại!!! Có lỗi xảy ra
            </Alert>
          )}
      </Snackbar>
    </Grid>
  )
}

export default Account